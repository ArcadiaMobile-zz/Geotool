class UserSession {
    private _productDescription?: string;

    private _discount?: string;

    public pdvs: Pdv[] = [];

    public readonly agencyInfo: AgencyInfo = new AgencyInfo();

    public readonly manualData: ManualData = new ManualData();

    public readonly flow3: Flow3 = new Flow3();

    public readonly bulkData: BulkData = new BulkData();

    public readonly tailoredCustomContents = new Map<string, string>();

    public searchText: string;

    public businessName: string;

    public businessCategoryId?: string;

    public objective: EvaluationObjective;

    public objectiveDescription: string;

    public advertisementType: AdvertisementType;

    public advertisementTypeDescription: string;

    public selectedCopyItem?: ProposalCopyItem;

    public selectedBannerId?: string;

    public campaignStartDate: Date;

    public isFlow2: boolean;

    public tailored: boolean;

    public gender: GenderType = GenderType.BOTH;

    public workDays: number = 2;

    constructor() {
    }

    // Property

    public get formattedBalance(): string[] {
        return this.agencyInfo.balance.toPriceFormat();
    }

    public get originalBusinessName(): string {
        return (this.pdvs.length > 0) ? this.pdvs[0].detail.Name : "";
    }

    public get productDescription(): string | undefined {
        return this._productDescription;
    }

    public set productDescription(value: string | undefined) {
        this._productDescription = value;
    }

    public get discount(): string | undefined {
        return this._discount;
    }

    public set discount(value: string | undefined) {
        this._discount = value;
    }

    public get showPrice(): boolean {
        return !this.agencyInfo.agency.IsAgencySales;
    }

    public get totalPotentialUsers(): number {
        return this.pdvs.Sum(p => p.detail.PotentialUsers);
    }

    public get totalUniqueUsers(): number {
        return this.pdvs.Sum(p => p.selectedProduct && p.selectedProduct.item.Value);
    }

    public get totalPrice(): number {
        let sum = this.pdvs.Sum(p => p.selectedProduct && p.selectedProduct.item.Price);
        if (this.tailored) {
            // TODO: evaluate better implementation
            sum += 50;
        }

        return sum;
    }

    public get totalVatPrice(): number {
        return this.totalPrice * 1.22;
    }

    public get formattedTotalPrice(): string[] {
        return this.totalPrice.toPriceFormat();
    }

    public get searchRow2Description(): string {
        let description = (this.selectedCopyItem && (this.selectedCopyItem as SearchProposalCopyItem).SuggestedRow2) || "";
        if (description) {
            description = description.replace("[prezzo]", this.discount!).replace("[sconto]", this.discount!);
            description = description.replace("[il tuo prodotto qui]", this.productDescription!).replace("[il tuo prodotto qui ]", this.productDescription!);
        }

        return description;
    }

    public get getCustomName(): string {
        return this.originalBusinessName;
    }

    // Method

    public clear(): void {
        //this.isFlow2 = false;
        this.pdvs = [];
        this.manualData.isSet = false;
        this.flow3.address = undefined;
        this.flow3.radius = undefined;
    }

    public removePdv(pdv: Pdv): void {
        this.pdvs.Remove(pdv);
        for (let p = 0; p < this.pdvs.length; p++) {
            this.pdvs[p].number = p + 1;
        }
    }

    public getPdvById(id: string): Pdv | undefined {
        let r = this.pdvs.FirstOrDefault(p => p.id == id);
        return (r === null) ? undefined : r;
    }

    public async addPdv(result: BaseLocationBindingResult): Promise<Pdv> {
        var p = await this.addPdvAsync(result.Name, result.Address, result.Geometry.location, result.ID);

        // Primo pdv, determino il nome esatto dell'insegna
        if (this.pdvs.length === 1) {
            this.businessName = result.Name;
        }

        this.pdvs.push(p);

        return p;
    }

    public async addBulkPdv(name: string, addressPDV: AddressComponentBinding, addressCDE: AddressComponentBinding, landingUrl: string, trackingPixel: string, level: number, googleId: string, detail: BaseDetailBindingResult): Promise<Pdv> {
        var placeId = googleId !== undefined ? googleId : addressCDE.PlaceId;
        var p = await this.addPdvAsync(name, addressCDE.FormattedAddress, addressCDE.Location, placeId!, detail);

        p.detail.Name = name;
        p.detail.Address = addressCDE.FormattedAddress;
        p.geocodeAddressPDV = addressPDV;
        p.geocodeAddressCDE = addressCDE;
        p.bulkLandingUrl = landingUrl || "";
        p.bulkTrackingPixel = trackingPixel || "";
        p.level = level || 1;
        p.phoneNumber = "";

        this.pdvs.push(p);

        return p;
    }

    private async addPdvAsync(name: string, locationAddress: string, location: LocationCoordinates, googleId: string, detail?: BaseDetailBindingResult): Promise<Pdv> {
        let p = new Pdv(this);
        p.number = this.pdvs.length + 1;

        p.address = locationAddress;
        p.originalLocation = location;

        p.locationAddress = locationAddress;
        p.location = location;

        p.id = (this.pdvs.Select(pm => parseInt(pm.id)).Max() + 1).toString();
        p.googleId = googleId;

        p.firstNumberInsert = p.number;

        await p.load(detail);

        return p;
    }

    public async duplicatePdv(originalId: string, mapItem: MapItem): Promise<Pdv | undefined> {
        let pdv = this.getPdvById(originalId);
        if (!pdv) return;

        // Clono il pdv
        let p = new Pdv(this);

        p.number = this.pdvs.length + 1;
        p.address = pdv.address;

        // Duplico con l'indirizzo di partenza originale del pdv clonato
        p.locationAddress = pdv.address;
        p.originalLocation = pdv.originalLocation;

        p.location = pdv.originalLocation;

        p.googleId = pdv.googleId;
        p.id = mapItem.id;
        await p.load();
        //p.detail = pdv.detail;
        //p.categoryDetail = pdv.categoryDetail;
        await p.loadProducts(true);
        this.pdvs.push(p);

        return p;
    }

    public getTailoredCustomContentsUris(): string[] | undefined {
        if (!this.tailored) return undefined;

        let result: string[] = [];
        this.tailoredCustomContents.forEach(v => result.push(v));

        return result;
    }

    public async evaluateBulk(): Promise<Proposal> {
        let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);

        return campaignServiceAgent.evaluateBulk();
    }

    public async moreProductsBulk(request: MoreProductsBulkRequest): Promise<PointBulk[]> {
        let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);

        return await campaignServiceAgent.moreProductsBulk(request);
    }
}

class Pdv {

    private _phoneNumber?: string | null;

    private _clickToCall?: string | null;

    private _clickToMap?: string | null;

    public evaluation?: Proposal;

    public proposal: ProposalItem;

    public selectedProduct?: Product;

    public detail: BaseDetailBindingResult;

    public address: string;

    public id: string;

    public googleId: string;

    public number: number;

    /**
        Informazioni personalizzate inserite tramite scenario 2
    */
    public manualData: ManualPdvData = new ManualPdvData();

    public products: Product[] = [];

    /**
        Indirizzo personalizzato relativo al cerchio
    */
    public locationAddress: string;

    /**
        Posizione del cerchio
    */
    public location: LocationCoordinates;

    /**
        Posizione originale dell'indirizzo
    */
    public originalLocation: LocationCoordinates;

    public categoryDetail: CategoryCompetitor | undefined;

    /**
        Only Bulk Upload
    */
    public bulkLandingUrl: string;

    public bulkTrackingPixel: string;

    public level: number;

    public geocodeAddressPDV?: AddressComponentBinding;

    public geocodeAddressCDE?: AddressComponentBinding;

    public firstNumberInsert: number;

    public DensityPotentialUsersNumber: number;

    public seo: string;

    public get phoneNumber(): string | undefined | null {
        return this._phoneNumber;
    }

    public set phoneNumber(value: string | undefined | null) {
        this._phoneNumber = value;
    }

    public get clickToCallCustom(): string | undefined | null {
        return this._clickToCall;
    }

    public set clickToCallCustom(value: string | undefined | null) {
        this._clickToCall = value;
    }

    public get clickToMapCustom(): string | undefined | null {
        return this._clickToMap;
    }

    public set clickToMapCustom(value: string | undefined | null) {
        this._clickToMap = value;
    }

    public get mapItem(): MapItem {
        return {
            id: this.id,
            lat: this.location.lat,
            lng: this.location.lng,
            address: this.address,
            radius: this.detail.Radius,
            phoneNumber: this.phoneNumber,
            title: this.session.bulkData ? this.detail.Name : this.session.originalBusinessName,
            insights: {
                data: {
                    PotentialUsers: Math.round(this.detail.PotentialUsers).toString(),
                    MaleStats: Math.round(this.detail.MaleStats).toString(),
                    FemaleStats: Math.round(this.detail.FemaleStats).toString(),
                    MaleStatsPercentage: this.detail.MaleStatsPercentage * 100,
                    FemaleStatsPercentage: this.detail.FemaleStatsPercentage * 100,
                    PublicOfficesNumber: this.detail.PublicOfficesNumber,
                    PrivatesNumber: this.detail.PrivatesNumber,
                    PublicTransportNumber: this.detail.PublicTransportNumber,
                    Competitors: (this.categoryDetail) ? this.categoryDetail.Competitors : 0,
                    Ranking: (!this.evaluation || this.evaluation!.Ranking == null) ? [3, 6, 7] : this.evaluation!.Ranking,
                    Cluster: this.detail.Cluster,
                    DensityPotentialUsers: Math.round(this.detail.PotentialUsers / (Math.pow(this.detail.Radius / 1000, 2) * 3.14)),
                    DensityPotentialUsersNumber: this.DensityPotentialUsersNumber,
                }
            },
            image: (!this.session.businessCategoryId || this.session.businessCategoryId == 'No cat') ? '/assets/img/logo-admove.png' : '/assets/img/categories/' + this.session.businessCategoryId + '.jpg',
            budget: {
                id: (this.selectedProduct) ? this.selectedProduct.item.Id : "-",
                value: (this.selectedProduct) ? this.selectedProduct.item.Price.toLocaleString() : "-",
                reach: (this.selectedProduct) ? this.selectedProduct.item.Value : 0,
                target: (this.selectedProduct) ? this.selectedProduct.reachWording : "-"
            }
        };
    }

    constructor(public session: UserSession) {

    }

    public get clickToCall(): string | undefined | null {
        return this.clickToCallCustom;
    }

    public get clickToMap(): string | undefined | null {
        return this.clickToMapCustom;
    }

    public get uriClickToMap(): string {
        if (this.clickToMap == undefined || this.clickToMap == null) return ""
        else {
            if (this.clickToMap == this.address)
                return "https://www.google.it/maps/?q={0}+{1}".uriFormat(this.session.originalBusinessName, this.clickToMap)
            else 
                return "https://www.google.it/maps/?q={0}".uriFormat(this.clickToMap)
        }
    }

    public get formattedPrices(): string[] {
        if (this.selectedProduct) {
            return this.selectedProduct.item.Price.toPriceFormat();
        }
        return ["-", "-"]
    }

    public get formattedMaleStats(): string {
        return Math.round(this.detail.MaleStats).toString();
    }

    public get formattedFemaleStats(): string {
        return Math.round(this.detail.FemaleStats).toString();
    }

    public getProductsGrouped(by: number, gender: GenderType = GenderType.BOTH): Product[][] {
        return this.products
            .Where(p => p.item.GenderTargets == gender)
            .map((p, i) => ({ product: p, index: i }))
            .GroupBy(p => Math.floor(p.index / by))
            .map(p => p.map(pp => pp.product));
    }

    public getCustomBannerUris(): string[] {
        if (!this.manualData.isSet && !this.session.manualData.isSet) return [];

        return [
            this.getBannerUri(BannerSize.Format1200x628),
            this.getBannerUri(BannerSize.Format640x1024),
            this.getBannerUri(BannerSize.Format2020x1320),
            this.getBannerUri(BannerSize.Format300x250),
            this.getBannerUri(BannerSize.Format320x480),
            this.getBannerUri(BannerSize.Format320x50),
            this.getBannerUri(BannerSize.Format728x90),
        ];
    }

    public getBannerUri(size: BannerSize, customBannerId: string | undefined = undefined): string {
        const defaultUri = `/assets/img/placeholders/${BannerSize[size]}.jpg`;
        //if (this.manualData.isSet && this.manualData.customBanners.has(size)) {
        //    return this.manualData.customBanners.get(size) || defaultUri;
        //}
        if (this.session.manualData.isSet) {
            return this.session.manualData.customBanners.get(size) || defaultUri;
        }

        if (!this.session.selectedBannerId) {
            return defaultUri;
        }
        
        return "{0}/api/Banner/Preview/{1}/{2}/{3}/{4}/{5}/{6}/{7}".uriFormat(
            baseUrl,
            customBannerId || this.session.selectedBannerId,
            size,
            (this.session.businessName && this.session.businessName.length > 0) ? this.session.businessName : "[la tua insegna qui]",
            this.clickToMap,
            this.clickToCall,
            (this.session.discount && this.session.discount.length > 0) ? parseFloat(this.session.discount).toLocaleString() : "[XX]",
            (this.session.productDescription && this.session.productDescription.length > 0) ? this.session.productDescription : "[il tuo prodotto qui]");
    }

    public async load(detail?: BaseDetailBindingResult): Promise<void> {
        if (detail) {
            this.detail = detail;
        } else {
            let semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
            this.detail = await semanticWebServiceAgent.getDetails(this.googleId, this.session.businessName, { latitude: this.location.lat, longitude: this.location.lng });

            this.geocodeAddressCDE = await semanticWebServiceAgent.GeocodeAddress(this.locationAddress);
            this.geocodeAddressPDV = await semanticWebServiceAgent.GeocodeAddress(this.address);
        }

        // Cerco la categoria per avere i competitor
        // Tolgo eventuali 00 messi per uniformità di codice a 6 cifre; businessCategoryId invece può essere a 4
        if (this.session.businessCategoryId) {
            let c = this.detail.Categories.FirstOrDefault(c => c.Category.replace("00", "") == this.session.businessCategoryId);
            this.categoryDetail = (c !== null) ? c : undefined;
        } else if (this.session.isFlow2 || this.session.flow3.address || detail) {
            // Cerco in automatico: si verifica nel flusso 2 e 3 dove non viene chiesta la categoria
            this.session.businessCategoryId = this.detail.Categories[0].Category.replace("00", "");
            this.categoryDetail = this.detail.Categories[0];
        }

        this.phoneNumber = this.detail.PhoneNumber ? this.detail.PhoneNumber.replace(/\D/g, '') : null;

        // Set default value cta
        this.clickToMapCustom = this.address;
        this.clickToCallCustom = null; // Default value ctc
        
        this.seo = this.session.pdvs.length == 0
            ? await ServiceAgentFactory.get(CampaignServiceAgent).getSeo(this.session.businessName)
            : this.session.pdvs[0].seo.match(/\d+/g) != null
                ? this.session.pdvs[0].seo.replace(/\d+/g, (+this.session.pdvs[0].seo.match(/\d+/)![0] + this.session.pdvs.length).toString())
                : this.session.pdvs[0].seo + "-" + this.session.pdvs.length;
    }

    public reset(): void {
        this.locationAddress = this.address;
        this.location = this.originalLocation;
    }

    public async loadProducts(forceEvaluation: boolean = false): Promise<void> {
        // La valutazione può esserci già se sono nel flusso 2
        // perché è l'utente a scegliere tra le proposte
        if (!this.evaluation || forceEvaluation) {
            this.evaluation = await this.evaluate();
        }

        let p = this.evaluation.Proposals.FirstOrDefault(p => p.AdvertisementType.toString() === AdvertisementType[this.session.advertisementType]);

        if (p === null)
            throw new Error("Cannot find proposal for " + AdvertisementType[this.session.advertisementType]);

        this.proposal = p;

        let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
        let proposalItem = await campaignServiceAgent.moreProducts(this.proposal.Id);

        this.products = proposalItem.Products.Select(c => new Product(this, c));
        this.selectedProduct = this.products[0];
    }

    public get reachWording(): string {
        let result: string = "";

        if (this.session.advertisementType == AdvertisementType.DISPLAYCLICK || this.session.advertisementType == AdvertisementType.SEARCHGOOGLE) {
            result = "Click";
        }
        else if (this.session.advertisementType == AdvertisementType.FLYER) {
            result = "Impressions"
        }
        else {
            result = "Utenti Unici";
        }

        result += this.session.gender == GenderType.FEMALE ? " Donna" : this.session.gender == GenderType.MALE ? " Uomo" : "";

        return (result);
    }

    public evaluate(): Promise<Proposal> {
        let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);

        return campaignServiceAgent.evaluate({
            Evaluation: {
                BusinessName: this.session.originalBusinessName,
                BusinessCategoryId: this.session.businessCategoryId,
                FreeText: this.session.originalBusinessName,
                StartDate: new Date(),
                Budget: 0,
                Website: "",
                Proposal: this.session.objective,
                FacebookPage: "",
                Locations: [{ Latitude: this.location.lat, Longitude: this.location.lng }],
                Top: 10
            },
            DiagnosticData: false
        });
    }
}

class BulkData {

    public proposalBulkId: string;

    public budget: number;

    public flow: BulkFlow;

    public orderBy: string = "Level";

    public EndDate: Date;

    public Landings: string[];

    public get enhancementBudget(): number {
        return this.Landings.length <= 100 ? 0 : this.Landings.length - 100;
    }
}

class ManualData {

    public isSet: boolean = false;

    public keywords: string[];

    public clickToCall: string;

    public clickToMap: string;

    public headline: string;

    public row1: string;

    public row2: string;

    public title: string;

    public description: string;

    public customBanners: Map<BannerSize, string> = new Map<BannerSize, string>();
}

class ManualPdvData {

    public isSet: boolean = false;

    public clickToCall: string;

    public clickToMap: string;

    public customBanners: Map<BannerSize, string> = new Map<BannerSize, string>();
}

class Product {
    constructor(public pdv: Pdv, public item: ProposalProductItem) {
        
    }

    public get isSelected(): boolean {
        return this.pdv.selectedProduct === this;
    }

    public get showPrice(): boolean {
        return this.pdv.session.showPrice;
    }

    public get formattedPrice(): string[] {
        return this.item.Price.toPriceFormat();
    }

    public get reachWording(): string {
        return this.pdv.reachWording;
    }
}

class AgencyInfo {

    public agency: AgencyBinding;

    public balance: number;

    public askedCredit: boolean;

    constructor() {

    }

    public get onlinePayment(): boolean {
        return this.agency.PaymentMethodId === "BANCASELLA-AGENCY";
    }

    public get postPayment(): boolean {
        return this.agency.PaymentMethodId === "POSTPAID";
    }

    public get prePayment(): boolean {
        return this.agency.PaymentMethodId === "PREPAID";
    }

    public get canAskCredit(): boolean {
        return this.prePayment;
    }

    public get currentUserIsAdmin(): boolean {
        return this.agency && this.agency.IsAdmin;
    }

    public get isAtClosure(): boolean {
        return this.agency.AgencyPayMode === "ATCLOSURE";
    }

    public async load(): Promise<void> {
        let serviceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
        let agencies = await serviceAgent.get();

        if (agencies.length == 0) {
            throw new Error("No agency available");
        }
        this.agency = agencies[0];
        this.balance = await serviceAgent.creditBalance();
    }
}

class Flow3 {
    /**
     Indirizzo inserito dall'utente
    */
    public address?: string;

    /**
     Raggio selezionato dall'utente
    */
    public radius?: number;
}