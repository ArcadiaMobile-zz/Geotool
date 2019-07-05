/// <reference path="../../references.ts" />

class map extends Page {

    private _plugin: any;

    private selectedPdv: Pdv | undefined;

    public onNewPdv: (pdv: Pdv) => void;

    public onUpdatePdv: (mapItem: MapItem) => void;

    constructor() {
        super("map.html");
    }

    public onLoad(): void {
        super.onLoad();

        this.html.find("[data-business-name]").text(this.userSession.originalBusinessName);
        $("#add-pdi-form").submit(this.addPdiFormSubmit.bind(this));
        this.sidebar.insights.find("form").submit(this.onInsightsForm.bind(this));

        // Form di selezione multipla
        this.html.find("#mpopup-multi form").submit(this.popupSubmit.bind(this));

        // Radio button gender
        this.html.find("#both").prop("checked", true);
        
        // attivo gender solo per duu e fb
        var gender = this.html.find('.gender');
        if( $.inArray(this.userSession.advertisementType, [0,1,2,5]) >= 0)  gender.removeClass('hide');
        
    }

    public onChangeGender(e: JQueryEventObject): void {
        e.preventDefault();
        let gender: GenderType = (<any>GenderType)[e.currentTarget.id.toUpperCase()];
        this.userSession.gender = gender;
        let id: string = this._plugin.getSelected().id;

        let pdv = this.userSession.getPdvById(id);
        if (!pdv) return;
        
        this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
        
        // seleziono il primo importo se non selezionato
        //console.log('seleziono il primo elemento');
        var prices = this.html.find('#prices .owl-item.active');
        //console.log(prices);
        //console.log(prices.find('.a-box'));
        if(prices.find('.well.selected').length <= 0) prices.find('.well:first').trigger('click');
        else console.log(prices.find('.well.selected').length);
        
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Full);

        if (!this.sidebar.isOpen) {
            this.sidebar.toggle();
        }
    }

    private updateNextButton(): void {
        // Abilito o disabilito il pulsante avanti
        this.html.find("[data-navigo]").toggleClass("disabled", this.userSession.pdvs.length == 0);
    }

    /**
        Pulsante "aggiungi pdv"
    */
    private async addPdiFormSubmit(e: JQueryEventObject): Promise<void> {
        e.preventDefault();

        let address = $(e.target).find("[name=address]").val();
        this.runAsync(async () => {
            let semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
            let result: BaseLocationBindingResults = await semanticWebServiceAgent.searchLocation(address, this.userSession.businessName);

            // TODO: gestire badwords
            if (result.Results.length > 0) {
                if (result.Results.length > 1) {

                    let addressesToRemove: string[] = this.userSession.pdvs.Select(c => c.address).Distinct();
                    for (let address of addressesToRemove){
                        var item = result.Results.First(c => c.Address == address);
                        if (item) {
                            result.Results.Remove(item);
                        }
                    }

                    if (result.Results.length == 0) {
                        this.showAlert("Spiacenti", `Non siamo riusciti a trovare altri punti di vendita con nome "${this.userSession.businessName}" nella città di ${address}.`);
                        return;
                    }
                    
                    this.renderTemplateScript("mslogan-list-template", result.Results);
                    this.html.find(".slogan").each((i, e) => {
                        $(e).data("item", result.Results[i]);
                    });
                    // Seleziono il primo
                    this.html.find(".slogan").first().trigger('click');

                    // Mostro la modale
                    this.html.find("#mpopup-multi").modal("show");
                } else {
                    let pdv: Pdv = await this.userSession.addPdv(result.Results[0]);
                    // Temporaneamente non lo metto nella lista
                    this.userSession.pdvs.Remove(pdv);

                    await pdv.loadProducts();

                    if (this.onNewPdv) this.onNewPdv(pdv);
                }
            } else {
                this.showAlert("Esito negativo", `Nessun risultato trovato con il nome ${this.userSession.businessName} all'indirizzo ${address}`);
            }

            // Abilitato o disabilito il pulsante avanti
            this.updateNextButton();
        });
    }

    /**
        Form indirizzo sulla sidebar
    */
    public onInsightsForm(e: JQueryEventObject): void {
        e.preventDefault();
        let id: string = this._plugin.getSelected().id;

        this.runAsync(async () => {
            let pdv = this.userSession.getPdvById(id);
            if (!pdv) return;

            let googleServiceAgent = new GoogleServiceAgent();
            let result = await googleServiceAgent.geocode(this.sidebar.locationAddress.val());

            // Aggiorno l'indirizzo
            pdv.locationAddress = result.formatted_address;
            this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
            // Aggiorno la posizione
            pdv.location = {
                lat: result.geometry.location.lat(), lng: result.geometry.location.lng()
            };
            // Aggiorno gli insights
            await pdv!.load();

            await pdv!.loadProducts(true);
        
            // Mostro la lista dei prodotti    
            var products = pdv!.getProductsGrouped(6, this.userSession.gender);
            this.renderTemplateScript("products-template", products);

            if (this.onUpdatePdv) this.onUpdatePdv(pdv.mapItem);
        });
    }

    private popupSubmit(e: JQueryEventObject): void {
        e.preventDefault();

        this.html.find("#mpopup-multi").modal("hide");

        let item: BaseLocationBindingResult = this.html.find(".slogan.selected").data("item");
        this.runAsync(async () => {
            var pdv = await this.userSession.addPdv(item);
            // Temporaneamente non lo metto nella lista
            this.userSession.pdvs.Remove(pdv);
            await pdv.loadProducts();
            if (this.onNewPdv) this.onNewPdv(pdv);
        });
    }

    public pdiReset(id: string): void {
        let pdv = this.userSession.getPdvById(id);
        if (!pdv) return;
        
        pdv.reset();
        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');

        this.runAsync(async () => {
            // Aggiorno gli insights
            await pdv!.load();
            await pdv!.loadProducts(true);
            // Mostro la lista dei prodotti
            this.renderTemplateScript("products-template", pdv!.getProductsGrouped(6, this.userSession.gender));
            if (this.onUpdatePdv) this.onUpdatePdv(pdv!.mapItem);
        });
    }

    public async pdiSelected(id: string): Promise<void> {
        let pdv = this.userSession.getPdvById(id);
        this.selectedPdv = pdv;
        if (!pdv) return;

        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');

        this.userSession.gender = (<any>GenderType)[this.html.find("[name=gender]:checked").val().toUpperCase()]

        // Mostro la lista dei prodotti
        this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
    }

    public budgetSelected(id: string) {
        if (!this.selectedPdv) return;

        this.selectedPdv.selectedProduct = this.selectedPdv.products.First(p => p.item.Id === id);
    }

    public pdiRemoved(id: string) {
        let pdv = this.userSession.getPdvById(id);
        if (pdv) {
            this.userSession.removePdv(pdv);
        }
        
        if (this.userSession.pdvs.length == 0) {
            this.navigo.navigate("scelta-categoria");
        }
        else {
            // Aggiorno lato mappa
            if (this.onUpdatePdv) {
                for (let p of this.userSession.pdvs) {
                    this.onUpdatePdv(p.mapItem);
                }
            }
        }

        // Abilitato o disabilito il pulsante avanti
        this.updateNextButton();
    }

    public async pdiDuplicated(originalId: string, mapItem: MapItem) {
        this.runAsync(async () => {
            let pdv = await this.userSession.duplicatePdv(originalId, mapItem);
            if (pdv) {

                // Ricalcolo l'indirizzo sulla base della nuova posizione
                this.pdiMoved(pdv.id, pdv.location);
                if (this.onUpdatePdv) this.onUpdatePdv(pdv.mapItem);
            }
        });
    }

    public async pdiMoved(id: string, location: LocationCoordinates) {
        let pdv = this.userSession.getPdvById(id);
        if (pdv) {
            pdv.location = location;
            pdv.locationAddress = "-";
            this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');

            try {
                var googleServiceAgent = new GoogleServiceAgent();
                pdv.locationAddress = (await googleServiceAgent.geocode(location)).formatted_address;

                this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    public updatePdi(id: string) {
        let pdv = this.userSession.getPdvById(id);
        if (!pdv) return;
        
        this.runAsync(async () => {
            await pdv!.load();
            await pdv!.loadProducts(true);
            // Mostro la lista dei prodotti
            this.renderTemplateScript("products-template", pdv!.getProductsGrouped(6, this.userSession.gender));
            if (this.onUpdatePdv) this.onUpdatePdv(pdv!.mapItem);
        });
    }

    public preparePlugin(plugin: any): void {
        this._plugin = plugin;

        this.runAsync(async () => {
            for (let pdv of this.userSession.pdvs) {
                await pdv.loadProducts(!this.userSession.isFlow2);
            }
            
            for (let pdv of this.userSession.pdvs) {
                plugin.actions("add", false, pdv.mapItem);
            }

            if (!this.sidebar.isOpen) {
                this.sidebar.toggle();
            }
        });
    }
}
