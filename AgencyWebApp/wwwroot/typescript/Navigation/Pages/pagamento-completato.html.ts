/// <reference path="../../references.ts" />

class pagamentocompletato extends Page {

    constructor() {
        super("pagamento-completato.html");
    }

    public onLoad(): void {
        super.onLoad();

        let campaignName = $("[name=campaign_name]");
        let obj: { customName: string, campaignGroupId: string } | undefined = undefined;

        if ($.cookie) {
            let v: string = $.cookie("lastCampaignGroup");
            if (v) {
                obj = JSON.parse(v);
                campaignName.val(obj!.customName);
            }
        }

        this.html.find("form").submit(async e => {
            e.preventDefault();

            if (obj) {
                await this.runAsync(async () => {
                    let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                    await campaignServiceAgent.renameCampaign(obj!.campaignGroupId, campaignName.val());
                });
            }

            this.navigo.navigate("dashboard");
        });
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }
}
