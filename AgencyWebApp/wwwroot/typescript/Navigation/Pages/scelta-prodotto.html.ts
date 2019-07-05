/// <reference path="../../references.ts" />

class sceltaprodotto extends Page {

    private bestProposalDiv: JQuery;

    constructor() {
        super("scelta-prodotto.html");
    }

    public onLoad(): void {
        super.onLoad();
    }
    
    public updateHeading(product:any): void {
    
        // base awareness
        let text:string = '<strong>Per le attività</strong> che vogliono ';
    
        switch(this.userSession.objectiveDescription) {

            case 'PROMO':
                text += 'mettere in evidenza le loro promozioni';
                break;
            case 'PUSH':
                text += 'proporre uno specifico prodotto o servizio';
                break;
            case 'DISCOUNT':
                text += 'dare rilievo ai propri sconti';
                break;
            default:
                text += 'aumentare la loro visibilità';
        }
        
        text += ' e battere la concorrenza, il prodotto migliore è: ';
        
        this.html.find('[data-best_text]').empty().html(text);
        
        this.html.find('[data-best_product]').text(product);
    
    }

    public async selectBestProposal(): Promise<void> {
        var t = this;

        await this.runAsync(async () => {
            let evaluation: Proposal = await this.userSession.pdvs[0].evaluate();
            // Gli imposto già questa valutazione perché non servirà successivamente
            this.userSession.pdvs[0].evaluation = evaluation;
            
            //console.log(this.userSession);
            
            let bestProposalItem: ProposalItem = evaluation.Proposals.OrderByDescending(p => p.ProposalInfo.Efficacy).First();
            let bestEfficacy: number = bestProposalItem.ProposalInfo.Efficacy;

            this.html.find("[data-value]").each((i, e) => {

                let $e: JQuery = $(e);
                let at: AdvertisementType = <AdvertisementType>$e.parents("[data-type]:first").data("type");

                // Cerco la proposta per il pannello corrente
                let proposalItem: ProposalItem | undefined = evaluation.Proposals.find(p => p.AdvertisementType == at);
                if (proposalItem) {
                    // Cambio la percentuale di efficienza per la proposta
                    var dataValue = e.attributes.getNamedItem("data-value");
                    dataValue!.value = (proposalItem.ProposalInfo.Efficacy / bestEfficacy * 100).toString();
                    
                    $e.data('value',dataValue!.value).attr('data-value',dataValue!.value);

                } else {
                    // Proposta non disponibile
                    $e.parents(".cont:first").remove();
                }

                if (bestProposalItem == proposalItem) {
                    this.bestProposalDiv = $e.parents(".cont:first").find(".proposal");
                }
            });

            t.html.find('.parent-target').trigger('sorting');

        });
    }

    onNavigatedFrom(): void {
        super.onNavigatedFrom();

        this.userSession.advertisementType = (<any>AdvertisementType)[$(".proposal-selected [data-type]").data("type")];
        this.userSession.advertisementTypeDescription = $(".proposal-selected .panel-heading").text();
    }
    
    onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }
}