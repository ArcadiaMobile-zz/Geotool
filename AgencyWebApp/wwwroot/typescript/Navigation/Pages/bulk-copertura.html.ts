/// <reference path="../../references.ts" />

class bulkcopertura extends Page {
    public _plugin: any;
    public onNewPdv: (pdv: Pdv) => void;

    constructor() {
    
        // aggiungo un metodo custom
        Handlebars.registerHelper("tooltip", function(di: any):string {
        
            var msg = 'densità ';
            if(di <= 4 ){
                msg += 'minima';
            }else if(di > 4 && di <= 9){
                msg += 'moderata';
            }else if(di > 8 && di <= 12){
                msg += 'considerevole';
            }else{
                msg += 'massima';
            }
            
            var html = "<div class='text-left'><div class='mt-5 mb-5 fs-12 text-left'><b class='fs-15'>Density index: </b>"+msg+"</div><div class='di screw-content d"+di+"'>";
            
            for(var i = 1; i<=17; i++){
            
                var cls = (i <= di) ? 'active' : '';
            
                html += "<div class='"+cls+" part screw'></div>";
                
            }
            return html+"</div><div class='di-number' style='margin-left:calc(100%/16*"+(di-1)+")'>"+di+"</div></div>";
        });

        super("bulk-copertura.html");
    }

    public onLoad(): void {
        super.onLoad();

        //this.userSession.pdvs = this.userSession.bulkData.flow === BulkFlow.High
        //    ? this.userSession.pdvs.OrderByDescending(c => this.userSession.bulkData.orderBy == "MobUsers" ? c.mapItem.insights.data.DensityPotentialUsers : c.level)
        //    : this.userSession.pdvs.OrderBy(c => c.firstNumberInsert);

        //let id: number = 1;
        //for (let p of this.userSession.pdvs) {
        //    p.id = id.toString();
        //    p.number = id;
        //    id++;
        //}

        this.renderTemplateScript("grid-pdv", {
            Pdvs: this.userSession.pdvs,
            TargetName: this.userSession.pdvs[0].reachWording,
        });
        
        this.renderTemplateScript("plan-bulk", {
            TargetName: this.userSession.pdvs[0].reachWording,
            Target: this.userSession.pdvs.Sum(c => c.selectedProduct!.item.Value).toLocaleString(),
            Budget: (+this.userSession.pdvs.Sum(c => c.products[0].item.Price)).toPriceFormat(),
            MobUsers: this.userSession.pdvs.Sum(c => c.detail.PotentialUsers).toLocaleString(),
            MalePercentage: `${Math.round(this.userSession.pdvs.Average(c => c.detail.MaleStatsPercentage) * 100)}%`,
            FemalePercentage: `${Math.round(this.userSession.pdvs.Average(c => c.detail.FemaleStatsPercentage) * 100)}%`,
        });

        this.renderTemplateScript("sidebar-bulk", {
            BusinessName: this.userSession.businessName,
            CountPdv: this.userSession.pdvs.length,
            CountCde: this.userSession.pdvs.length,
            ProductDesc: this.userSession.advertisementTypeDescription,
            MaxBudget: (+this.userSession.bulkData.budget).toPriceFormat(),
            StartDate: this.userSession.campaignStartDate.toLocaleDateString(),
            EndDate: this.userSession.bulkData.EndDate.toLocaleDateString(),
            Budget: (+this.userSession.pdvs.Sum(c => c.products[0].item.Price)).toPriceFormat(),
            CountCity: this.userSession.pdvs.GroupBy(c => c.geocodeAddressCDE!.City).Count(),
            CountProvince: this.userSession.pdvs.GroupBy(c => c.geocodeAddressCDE!.Province).Count(),
            CountRegion: this.userSession.pdvs.GroupBy(c => c.geocodeAddressCDE!.Region).Count(),
            TargetName: this.userSession.pdvs[0].reachWording,
            Target: this.userSession.pdvs.Sum(c => c.selectedProduct!.item.Value).toLocaleString(),
            MobUsers: this.userSession.pdvs.Sum(c => c.detail.PotentialUsers).toLocaleString(),
            MalePercentage: `${Math.round(this.userSession.pdvs.Average(c => c.detail.MaleStatsPercentage) * 100)}%`,
            FemalePercentage: `${Math.round(this.userSession.pdvs.Average(c => c.detail.FemaleStatsPercentage) * 100)}%`,
        });
    }

    public preparePlugin(plugin: any): void {
        this._plugin = plugin;

        // elimino prima tutti i punti se esistono
        this._plugin.removeAll();

        this.runAsync(async () => {
            for (let pdv of this.userSession.pdvs) {
                this._plugin.actions("add", false, pdv.mapItem);
            }
        });
        this._plugin.actions("added-all", false);
    }

    public getFlow(): string {
        return this.userSession.bulkData.flow.toString();
    }

    public getOrderBy(): string {
        return this.userSession.bulkData.orderBy;
    }
}