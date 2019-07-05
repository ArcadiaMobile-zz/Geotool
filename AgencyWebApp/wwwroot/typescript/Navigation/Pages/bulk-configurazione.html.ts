///// <reference path="../../references.ts" />

//class bulkconfigurazione extends Page {
//    private campaignServiceAgent: CampaignServiceAgent;

//    constructor() {
//        super("bulk-configurazione.html");
//    }

//    public onLoad(): void {
//        super.onLoad();

//        this.renderTemplateScript("count", {
//            count: this.userSession.pdvs.length
//        })

//        this.html.find("form").submit(this.formConfig.bind(this));

//        if (this.userSession.pdvs.All(c => c.level == 1)) $("[data-order-by=Level]").addClass("disabled").removeClass("card");
//    }

//    private formConfig(e: BaseJQueryEventObject): void {
//        e.preventDefault();  

//        this.runAsync(async () => {
//            this.userSession.bulkData.budget = parseFloat(this.html.find("[name=budget]").val()) - this.userSession.bulkData.enhancementBudget;

//            this.userSession.objective = EvaluationObjective.Branding;

//            this.userSession.advertisementType = (<any>AdvertisementType)[$(".selected[data-type-adv]").data("type-adv")];
//            this.userSession.advertisementTypeDescription = $(".selected[data-type-adv] .panel-heading").text();
            
//            this.userSession.bulkData.flow = (<any>BulkFlow)[$(".selected[data-flow]").data("flow")];
//            this.userSession.bulkData.orderBy = $(".selected[data-order-by]").data("order-by");

//            let proposal = await this.userSession.evaluateBulk();
//            let proposalItem = proposal.Proposals.FirstOrDefault(c => c.AdvertisementType.toString() === AdvertisementType[this.userSession.advertisementType]);

//            let request: MoreProductsBulkRequest = {
//                Name: this.userSession.businessName,
//                Budget: this.userSession.bulkData.budget,
//                StartDate: this.userSession.campaignStartDate,
//                EndDate: this.userSession.bulkData.EndDate,
//                Flow: this.userSession.bulkData.flow,
//                GenderTargets: this.userSession.gender,
//                ProposalBulkId: this.userSession.bulkData.proposalBulkId,
//                ProposalItemId: proposalItem!.Id,
//                OrderBy: this.userSession.bulkData.orderBy
//            }

//            let pointBulk = await this.userSession.moreProductsBulk(request);
            
//            for (let pdv of this.userSession.pdvs) {
//                pdv.proposal = proposalItem!
//                pdv.products = pointBulk.First(c => c.GoogleId == pdv.googleId).ProductItem.Select(c => new Product(pdv, c));
//                pdv.selectedProduct = pdv.products[0];
//                pdv.DensityPotentialUsersNumber = pointBulk.First(c => c.GoogleId == pdv.googleId).DensityMobUsersNumber;
//            }

//            this.navigo.navigate("bulk-copertura");
//        }, RunPolicy.Try);
//    } 

//    public async GetDeliveryDays(budget: number): Promise<number[]> {
//        let result: number[] = [];
        
//        await this.runAsync(async () => {
//            this.campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
//            result = await this.campaignServiceAgent.getDeliveryDays(budget);
//        })

//        return result;
//    }

//    public get averageBudget(): number {
//        var budget = this.html.find("[name=budget]").val();
//        if (budget > 0){
//            return (parseFloat(budget) - this.userSession.bulkData.enhancementBudget) / this.userSession.pdvs.Count();
//        } else {
//            this.html.find("[name=budget]").val("500").trigger('change');
//            this.html.find("input[name=budget]").trigger("click");
//            return 50;
//        }
//    }
    
//    // per pickadate
//    public get minCampaignDate(): Date {
//        return moment().addWorkdays(3).userLocale().toDate();
//    }

//    public get maxCampaignDate(): Date {
//        return moment().userLocale().toDate().addDays(365);
//    }

//    public datePickerSelect(name: string, date: Date): void {
//        if (name.startsWith("start")) {
//            this.userSession.campaignStartDate = moment(date).userLocale().toDate();
//        }
//        else {
//            this.userSession.bulkData.EndDate = moment(date).userLocale().toDate();
//        }
//    }   

//    public async GetBulkMaxBudget(): Promise<number> {
//        let result: number = 0;

//        await this.runAsync(async () => {
//            this.campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
//            result = await this.campaignServiceAgent.getBulkMaxBudget();
//        })

//        return result;
//    }
//    public show(): void {
//        this.showAlert("Attenzione", "Il budget inserito risulta troppo alto");
//    }
//}