/// <reference path="../../references.ts" />

class account extends Page {

    private account: AgencyBinding;
    //private credit: number;
    private campaigns: ReportCampaignGroupBinding[];
    private invoices: Invoice[];
    private transactions: AgencyTransactionBinding[];

    private transactionsPerPage: number;
    private campaignsPerPage: number;
    private currentPage: number;
    private currentPageTransaction: number;

    public pages: { value: number, isCurrent: boolean }[];
    public availablePages: number;
    public totalCampaigns: number;
    public startIndex: number;
    public endIndex: number;

    public pagesTransaction: { value: number, isCurrent: boolean }[];
    public availablePagesTransaction: number;
    public totalTransactions: number;
    public startIndexTransaction: number;
    public endIndexTransaction: number;

    constructor() {
        super("account.html");
    }

    public onLoad(): void {
        super.onLoad();
        this.loadData();

        this.html.find("[data-page-edit]").click(e => {
            this.agencyEdit(e, true);
        });

        this.html.find("[data-page-edit-cancel]").click(e => {            
            this.agencyEdit(e, false);
        });

        this.html.find("[data-page-edit-save]").click(e => {
            this.runAsync(async () => {
                let agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);

                let d = this.html.find("[name=description]").eq(0).val();
                // La descrizione è modificabile da due sezioni
                if (d === this.account.AgencyDescription) {
                    d = this.html.find("[name=description]").eq(1).val();
                }
                this.account.AgencyDescription = d;
                this.account.AgencyReferralFirstName = this.html.find("[name=firstName]").val();
                this.account.AgencyReferralLastName = this.html.find("[name=lastName]").val();
                this.account.AgencyReferralEmail = this.html.find("[name=email]").val();
                this.account.AgencyReferralPhoneNumber = this.html.find("[name=phoneNumber]").val();

                this.account.AgencyAddress = this.html.find("[name=address]").val();
                this.account.AgencyPostalCode = this.html.find("[name=postalCode]").val();
                this.account.AgencyCity = this.html.find("[name=city]").val();

                await agencyServiceAgent.updateAgency(this.account);

                // Torno in modalità lettura
                this.agencyEdit(e, false);

                // Aggiorno i placeholder di lettura
                this.renderTemplateScript("account-template");
                this.renderTemplateScript("invoice-data-template");
            });
        });

        this.html.find("[data-action-account]").click(e => {
            this.changeMenuActive(e);
            this.showDiv("data-page-div-account");
        });

        this.html.find("[data-action-invoice]").click(e => {
            this.changeMenuActive(e);
            this.showDiv("data-page-div-invoice");
        });

        this.html.find("[data-action-credit]").click(e => {
            this.changeMenuActive(e);
            this.showDiv("data-page-div-credit");
        });

        this.html.find("[data-action-history]").click(e => {
            this.changeMenuActive(e);
            this.showDiv("data-page-div-history");
        });

        this.html.find("[data-action-historytransactions]").click(e => {
            this.changeMenuActive(e);
            this.showDiv("data-page-div-historytransactions");
        });

        this.html.find("[data-action-request-credits]").click(e => {
            $("#credit").modal('show');
        });

        // Spostato nel riepilogo
        //this.html.find("#creditsRequest").click(async e => {
        //    let serviceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
        //    let button = $(e.target);
        //    button.button('loading');
        //    await this.runAsync(serviceAgent.askCredit, undefined, false);
        //    button.button('reset');

        //    this.html.find("#credit").modal('hide');
        //});

        this.html.find("[data-page-size]").click(e => {
            console.log($(e.target).val());
        });

        this.html.on("change", "#pageSizeHistory", e => {
            e.preventDefault();
            this.loadHistory();
        });
        this.html.on("click", "[data-page-previous-history]", e => {
            e.preventDefault();
            if (this.currentPage > 0) {
                this.currentPage--;
                this.loadHistory();
            }
        });
        this.html.on("click", "[data-page-next-history]", e => {
            e.preventDefault();
            if (this.currentPage < this.availablePages - 1) {
                this.currentPage++;
                this.loadHistory();
            }
        });
        this.html.on("click", "[data-page-history]", e => {
            e.preventDefault();
            this.currentPage = parseInt($(e.target).data("page-history")) - 1;
            this.loadHistory();
        });

        this.html.on("change", "#pageSizeTransaction", e => {
            e.preventDefault();
            this.loadTransaction();
        });
        this.html.on("click", "[data-page-previous-transaction]", e => {
            e.preventDefault();
            if (this.currentPageTransaction > 0) {
                this.currentPageTransaction--;
                this.loadTransaction();
            }
        });
        this.html.on("click", "[data-page-next-transaction]", e => {
            e.preventDefault();
            if (this.currentPageTransaction < this.availablePagesTransaction - 1) {
                this.currentPageTransaction++;
                this.loadTransaction();
            }
        });
        this.html.on("click", "[data-page-transaction]", e => {
            e.preventDefault();
            this.currentPageTransaction = parseInt($(e.target).data("page-transaction")) - 1;
            this.loadTransaction();
        });
        
        this.showDiv("data-page-div-account");
    }

    private changeMenuActive(e: JQueryEventObject) {
        let ulContainer = $(e.target).closest("ul[class*=nav]");
        $(ulContainer).find("li[class=active]").removeClass("active");
        $(e.target).closest("li[role=presentation]").addClass("active");
    }

    private showDiv(divAttribute: String) {
        $.each($("div[class=container]").find("div[data-page-section]"), function (i, element) {
            if ($(element).is("[" + divAttribute + "]")) {
                $(element).show();
            }
            else {
                $(element).hide();
            }
        });
    }

    private agencyEdit(ev: JQueryEventObject | undefined, showEditMode: boolean): void {
        if (ev) {
            ev.preventDefault();
        }
        
        let buttonsContainer = this.html.find("[data-page-div-buttons]");
        let table = buttonsContainer.parent().find("table");
        $.each(table.find("tr"), (i, e) => {
            // Se sono in modifica
            if (showEditMode) {
                // Nascondo il td con solamente il testo
                $($(e).find("td")[1]).hide();
                // Mostro il td con l'input
                $($(e).find("td")[2]).show();
            }
            // altrimenti
            else {
                // Mostro il td con solamente il testo
                $($(e).find("td")[1]).show();
                // Nascondo il td con l'input
                $($(e).find("td")[2]).hide();
            }
        });

        this.html.find("[data-page-edit]").toggle(!showEditMode);
        this.html.find("[data-page-edit-cancel]").toggle(showEditMode);
        this.html.find("[data-page-edit-save]").toggle(showEditMode);
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);

        this.agencyEdit(undefined, false);
    }

    private loadData() {
        this.runAsync(async () => {
            let agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
            let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
            let invoiceServiceAgent = ServiceAgentFactory.get(InvoiceServiceAgent);
            
            await this.userSession.agencyInfo.load();
            this.setNavigationLinks();

            // Solo se supporta l'anticipo credito
            if (!this.userSession.agencyInfo.canAskCredit) {
                this.html.find("[data-action-credit]").parent("li").remove();
            }

            this.account = this.userSession.agencyInfo.agency;
            //this.credit = await agencyServiceAgent.creditBalance();

            await this.loadHistory();
            await this.loadTransaction();

            this.invoices = await invoiceServiceAgent.get();

            this.renderTemplateScript("account-header-template");
            this.renderTemplateScript("account-template");
            this.renderTemplateScript("invoice-data-template");
            this.renderTemplateScript("credit-template");
        });
    }

    private loadHistory() {
        this.runAsync(async () => {
            let pageSizeElement = this.html.find("#pageSizeHistory");
            let pageSize = pageSizeElement.val();
            
            this.campaignsPerPage = parseInt((pageSize != "" && pageSize != undefined) ? pageSize : 10);
            if (this.currentPage == undefined) {
                this.currentPage = 0;
            }

            let reportServiceAgent = ServiceAgentFactory.get(ReportServiceAgent);
            this.campaigns = (await reportServiceAgent.groups(CampaignStatusEnum.All, this.campaignsPerPage, this.currentPage * this.campaignsPerPage)).OrderByDescending(c => c.StartDate);
            this.campaigns.forEach(v => (<any>v).formattedAmount = (v.Amount && v.Amount != null) ? v.Amount.toPriceFormat() : ["-", "-"])
            
            this.totalCampaigns = await reportServiceAgent.groupsCount(CampaignStatusEnum.All);
            
            this.availablePages = Math.ceil(this.totalCampaigns / this.campaignsPerPage);
            this.pages = Array(this.availablePages).fill(0).map((v, i) => ({ value: i + 1, isCurrent: i === this.currentPage }));

            this.startIndex = (this.currentPage * this.campaignsPerPage) + 1;
            this.endIndex = this.startIndex + this.campaignsPerPage - 1;

            this.renderTemplateScript("history-template");
        });
    }

    private loadTransaction() {
        this.runAsync(async () => {
            let pageSizeElement = this.html.find("#pageSizeTransaction");
            let pageSize = pageSizeElement.val();
            
            this.transactionsPerPage = parseInt((pageSize != "" && pageSize != undefined) ? pageSize : 10);
            if (this.currentPageTransaction == undefined) {
                this.currentPageTransaction = 0;
            }
            
            let agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
            this.transactions = await agencyServiceAgent.getTransactions(this.transactionsPerPage, this.currentPageTransaction * this.transactionsPerPage);
            
            this.transactions.forEach(v => (<any>v).formattedAmount = (v.AgencyTransactionEuroAmount && v.AgencyTransactionEuroAmount != null)
                ? v.AgencyTransactionEuroAmount.toPriceFormat() : ["-", "-"])

            this.transactions.forEach(v => (<any>v).description = (v.AgencyTransactionEuroAmount < 0)
                ? "Campaign Purchased" : "Client Requested Charge")
            
            this.totalTransactions = (await agencyServiceAgent.getTransactions()).length;

            this.availablePagesTransaction = Math.ceil(this.totalTransactions / this.transactionsPerPage);
            this.pagesTransaction = Array(this.availablePagesTransaction).fill(0).map((v, i) => ({ value: i + 1, isCurrent: i === this.currentPageTransaction }));

            this.startIndexTransaction = (this.currentPageTransaction * this.transactionsPerPage) + 1;
            this.endIndexTransaction = this.startIndexTransaction + this.transactionsPerPage - 1;

            this.renderTemplateScript("transaction-template");
        })
    }
}