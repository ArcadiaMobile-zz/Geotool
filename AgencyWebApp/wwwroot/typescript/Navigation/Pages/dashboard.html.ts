///// <reference path="../../references.ts" />

//class dashboard extends Page {

//    private reportServiceAgent: ReportServiceAgent;
//    private groups: ReportCampaignGroupBinding[];
//    private campaigns: ReportCampaignBinding[];

//    public loadMap: (data: ReportLocationCampaignByIdBinding[]) => void;
//    public loadCharts: (data: {labelName: string, labels: string[], values: number[] }[]) => void;
//    public loadDetailsCharts: (data: {labelName: string, labels: string[], values: number[] }[]) => void;

//    constructor() {
//        super("dashboard.html");
//    }

//    public onLoad(): void {
//        super.onLoad();

//        this.reportServiceAgent = ServiceAgentFactory.get(ReportServiceAgent);
        
//        this.runAsync(async () => {

//            await this.userSession.agencyInfo.load();
//            this.setNavigationLinks();

//            this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);

//            let summary = await this.reportServiceAgent.groupsSummary();

//            this.html.find("[data-status]").each((i, e) => {
//                let element = $(e);
//                let v = (<any>summary)[element.data("status")];
//                let baseText = element.text();
//                if (baseText.indexOf("(") != -1) {
//                    baseText = baseText.substr(0, baseText.indexOf("("));
//                }
//                element.text(`${baseText} (${v})`);
//            });

//            await this.loadCampaignGroups(CampaignStatusEnum.Active);
//        });

//        this.html.find("[data-status]").click(e => {
//            e.preventDefault();

//            this.runAsync(async () => {
//                let element = $(e.currentTarget);
//                $.each($(this.html.find("[data-status]")), (i, ds) => {
//                    $(ds).parent().removeClass("active")
//                });

//                $(element).parent().addClass("active");

//                let campaignStatus: CampaignStatusEnum = (<any>CampaignStatusEnum)[element.data("status")];
//                if (campaignStatus === CampaignStatusEnum.Waiting || campaignStatus === CampaignStatusEnum.ToApprove) {
//                    await this.loadCampaignsModeration();
//                } else {
//                    await this.loadCampaignGroups(campaignStatus);
//                }
//            });
//        });

//        this.html.on("change", "#group-selectpicker select", e => this.loadCampaigns());
//        this.html.on("change", "#pdv-selectpicker select", e => this.loadCampaignsData());
//    }

//    public onNavigatedTo(): void {
//        super.onNavigatedTo();
//        this.sidebar.changeMode(SidebarMode.Unavailable);

//    }

//    public loadCampaignsDetailsData(): void {
//        this.runAsync(async () => {
//            let data: ReportCampaignDetailsById[] = [];
//            let topApps: ReportCampaignTopApps[] = [];
//            let keywords: ReportCampaignDetailNumbersById[] = [];
//            let keywordsProv: ReportCampaignDetailNumbersById[] = [];
//            let advertisement: AdvertisementType;
//            let reportTotalProductViews: ReportProductNumbersCampaignById[] = [];
//            let reportTotalProductClicks: ReportProductNumbersCampaignById[] = [];
//            let reportTotalProductUniqueUsers: ReportProductNumbersCampaignById[] = [];
//            let reportTotalReachUniqueUsers: ReportProductNumbersCampaignById[] = [];

//            if (this.currentCampaigns.length > 1) {
//                let campaignGroupId = this.html.find("#group-selectpicker select").val();
//                let d = await this.reportServiceAgent.getCampaignDetailsByGroupId(campaignGroupId);
//                data.push(d);
//            }
//            else {
//                for (let c of this.currentCampaigns) {
//                    let d = await this.reportServiceAgent.getCampaignDetailsById(c.Id);
//                    // Parsing delle date
//                    d.StartDate = d.StartDate.toMoment();
//                    d.EndDate = d.EndDate.toMoment();
//                    data.push(d);
//                }
//            }

//            advertisement = (<any>AdvertisementType)[data[0].AdvertisementType];

//            var sumTotalKeywords = 0;
//            for (let d of data) {
//                // Prendo le prime 5 applicazioni per ogni campagna
//                var app = {
//                    Name: this.currentCampaigns.length > 1 ? d.Location[0].Name + ' - Multi Address (' + this.currentCampaigns.length + ')' : d.Location[0].Name + ' - ' + d.Location[0].Address,
//                    topApp: d.TopApps.GroupBy(c => c.Name).map(function (item) {
//                        let report: ReportCampaignDetailNumbersById = {
//                            Name: item.First().Name,
//                            ImgClass: item.First().ImgClass,
//                            Value: item.Sum(c => c.Value)
//                        }
//                        return report;
//                    }).OrderByDescending(c => c.Value).Take(5)
//                };
//                topApps.push(app);

//                // Prendo le prime 10 keywords per ogni campagna
//                var keysWithoutExt = d.TopKeywords.Where(c => c.Name.charAt(0) != "+" && c.Value > 0);
//                sumTotalKeywords += d.TopKeywords.Where(c => c.Name.charAt(0) != "+").Sum(c => c.Value);

//                for (let k of keysWithoutExt) {
//                    if (keywordsProv.Any(c => c.Name === k.Name)) {
//                        var key = keywords.First(c => c.Name === k.Name);
//                        key.Value += k.Value;
//                    }
//                    else {
//                        keywordsProv.push(k);
//                    }
//                }
//            }

//            for (let k of keywordsProv) {
//                k.Value = Math.round(k.Value / keywordsProv.Sum(c => c.Value) * 100);
//                keywords.push(k);
//            }

//            keywords = keywords.OrderByDescending(c => c.Value).Take(10);

//            for (let d of data) {
//                for (var i = 0; i < d.ProductViews.length; i++) {
//                    var day = moment(d.StartDate).add(i, 'days').format("DD/MM/YY");
//                    if (reportTotalProductViews.Any(p => p.Date.formatDate() == day)) {
//                        var view = reportTotalProductViews.First(p => p.Date.formatDate() == day);
//                        var click = reportTotalProductClicks.First(p => p.Date.formatDate() == day);
//                        var uniqueUsers = reportTotalProductUniqueUsers.First(p => p.Date.formatDate() == day);
//                        var reach = reportTotalReachUniqueUsers.First(p => p.Date.formatDate() == day);

//                        view.Value += d.ProductViews[i].Value;
//                        click.Value += d.ProductClicks[i].Value;
//                        uniqueUsers.Value += d.ProductUniqueUsers[i].Value;
//                        reach.Value += d.ProductReachUniqueUsers != null
//                            ? (d.ProductReachUniqueUsers[i] != null ? d.ProductReachUniqueUsers[i].Value : 0)
//                            : 0;
//                    }
//                    else {
//                        reportTotalProductViews.Add(d.ProductViews[i]);
//                        reportTotalProductClicks.Add(d.ProductClicks[i]);
//                        reportTotalProductUniqueUsers.Add(d.ProductUniqueUsers[i]);
//                        reportTotalReachUniqueUsers.Add(d.ProductReachUniqueUsers != null
//                            ? (d.ProductReachUniqueUsers[i] != null ? d.ProductReachUniqueUsers[i] : { Date: d.ProductViews[i].Date, Value: 0 })
//                            : { Date: d.ProductViews[i].Date, Value: 0 });
//                    }
//                }
//            }
            
//            this.renderTemplateScript("insights-details-template", {
//                hasLandingPageDetails: data.Sum(c => c.ProductViews.length) > 0 && data.Sum(c => c.ProductClicks.length) > 0,
//                ProductName: advertisement === AdvertisementType.DISPLAYUU ? "utenti unici mobile app" : "visualizzazioni della tua pubblicità",
//                sawAds: advertisement === AdvertisementType.DISPLAYUU
//                    ? reportTotalProductUniqueUsers.Sum(i => i.Value).toLocaleString()
//                    : reportTotalProductViews.Sum(i => i.Value).toLocaleString(),
//                clickedAds: reportTotalProductClicks.Sum(i => i.Value).toLocaleString(),
//                buttonClicks: Math.round(data.Sum(c => c.ButtonClicks) * 100 / (data.Sum(c => c.ButtonClicks) + data.Sum(c => c.CTCClicks))),
//                CTCClicks: Math.round(data.Sum(c => c.CTCClicks) * 100 / (data.Sum(c => c.ButtonClicks) + data.Sum(c => c.CTCClicks))),
//                //nightPercentage: data.Sum(c => c.Timings.Where(p => p.Name === "Night").Sum(t => t.Value)) / data.Sum(c => c.Timings.Sum(t => t.Value)) * 100,
//                morningPercentage: data.Sum(c => c.Timings.Where(p => p.Name === "Morning").Sum(t => t.Value)) / data.Sum(c => c.Timings.Sum(t => t.Value)) * 100,
//                afternoonPercentage: data.Sum(c => c.Timings.Where(p => p.Name === "Afternoon").Sum(t => t.Value)) / data.Sum(c => c.Timings.Sum(t => t.Value)) * 100,
//                eveningPercentage: data.Sum(c => c.Timings.Where(p => p.Name === "Evening").Sum(t => t.Value)) / data.Sum(c => c.Timings.Sum(t => t.Value)) * 100,
//                apps: topApps,
//                keywords: keywords,
//                keywordsFirstColumn: keywords.Take(5),
//                keywordsSecondColumn: keywords.Skip(5),
//                timeSlotsSpecified: data.Sum(c => c.Timings.length) > 0,
//                showKeywords: data[0].Type === "Google",
//                showToApps: data[0].Type === "App Nexus",
//                showFacebookReach: data[0].Type === "Facebook",
//                isDisplay: (data[0].Objective === EvaluationObjective.Branding || data[0].Objective === EvaluationObjective.NewOffer) && (data[0].Type != "Facebook" && data[0].Type != "Google"),
//                facebookReach: reportTotalReachUniqueUsers.Sum(i => i.Value),
//                isUniqueUsersOrClick: advertisement == AdvertisementType.DISPLAYUU || advertisement == AdvertisementType.DISPLAYCLICK,
//                LastReportDownload: data[0].LastReportDownload ? `Dati aggiornati al ${moment(data[0].LastReportDownload).userLocale().format("DD/MM/YYYY")} alle ore ${moment(data[0].LastReportDownload).userLocale().format("HH:MM")}` : `Nessun report scaricato`,
//            });

//            this.loadDetailsCharts([
//                {
//                    // Visualizzazioni prodotto
//                    labelName: (advertisement === AdvertisementType.DISPLAYUU || advertisement === AdvertisementType.SOCIALFB) ? "UU" : "View",
//                    labels: reportTotalProductViews.Select(p => p.Date.formatDate()),
//                    values: (advertisement === AdvertisementType.DISPLAYUU || advertisement === AdvertisementType.SOCIALFB)
//                        ? reportTotalProductUniqueUsers.Select(d => d.Value != undefined ? d.Value : 0)
//                        : reportTotalProductViews.Select(d => d.Value != undefined ? d.Value : 0)
//                },
//                {
//                    // Click prodotto
//                    labelName: "Click",
//                    labels: reportTotalProductClicks.Select(p => p.Date.formatDate()),
//                    values: reportTotalProductClicks.Select(d => d.Value != undefined ? d.Value : 0)
//                },
//                {
//                    // Reach Unique Users di Facebook
//                    labelName: "UU",
//                    labels: reportTotalReachUniqueUsers.Select(f => f.Date.formatDate()),
//                    values: reportTotalReachUniqueUsers.Select(d => d.Value != undefined ? d.Value : 0)
                    
//                },
//                {
//                    // Devices
//                    labelName: "",
//                    labels: data[0].Devices.map(p => p.Name),
//                    values: data[0].Devices.map((p, i) => Math.round(data.Average(d => (d.Devices[i] != undefined) ? d.Devices[i].Value : 0)))
//                },
//                {
//                    // Report OS
//                    labelName: "",
//                    labels: data[0].OperatingSystems.map(p => p.Name),
//                    values: data[0].OperatingSystems.map((p, i) => Math.round(data.Average(d => (d.OperatingSystems[i] != undefined) ? d.OperatingSystems[i].Value : 0)))
//                },
//                {
//                    // ADV Sizes
//                    labelName: "",
//                    labels: (data[0].Type === "App Nexus") ? data[0].Sizes.map(d => d.Name) : [],
//                    values: (data[0].Type === "App Nexus") ? data[0].Sizes.map((p, i) => Math.round(data.Average(d => (d.Sizes[i] != undefined) ? d.Sizes[i].Value : 0))) : [],
//                },
//            ]);
//        });
//    }

//    private get currentCampaigns(): ReportCampaignBinding[] {
//        let campaignGroupId = this.html.find("#group-selectpicker select").val();
//        let campaignId = this.html.find("#pdv-selectpicker select").val();
//        return (campaignId) ? [this.campaigns.First(c => c.Id === campaignId)] : this.campaigns.filter(c => c.CampaignGroupId == campaignGroupId);
//    }

//    private loadCampaignsModeration(): void {
//        this.runAsync(async () => {
//            $("[data-showCampaignDetails]").hide();
//            $("#showTotalReport").hide();
//            $("[data-showPowerBI]").hide();
//            $("[data-showSelectPicker]").hide();
//            $("[data-showMaps]").hide();
//            $("[data-LandingCharts]").hide();
//            $("[data-noLandingCharts]").hide();
//            $('#linkToCreativity').hide();

//            let data: ReportCampaignsModerationBinding[] = await this.reportServiceAgent.getCampaignsModeration();
//            if (data.length == 0) {
//                $("[data-showModeration]").hide();
//                $("[data-noCampaignDetails]").show();
//            }
//            else {
//                $("[data-showModeration]").show();
//                $("[data-noCampaignDetails]").hide();
//                data.forEach(v => {
//                    let gv: any = v;
//                    gv.showPrice = this.userSession.showPrice;
//                    gv.formattedTotalAmount = (v.TotalAmount && v.TotalAmount != null) ? v.TotalAmount.toPriceFormat() : ["-", "-"];
//                    gv.statusDesc = v.Campaigns.First().Status === "WAITING" ? "Campagna in sviluppo creativo" : v.Campaigns.First().Status === "TOAPPROVE" ? "Campagna in attesa di approvazione" : "Campagna in attesa di pagamento";
//                    gv.statusFooter = v.Campaigns.First().Status === "WAITING" ? "La tua creatività è in lavorazione. Riceverai una nostra proposta entro 3 gg lavorativi" : v.Campaigns.First().Status === "TOAPPROVE" ? "Stiamo valutando la tua creatività. In caso di esito negativo ti contatteremo entro 1 giorno lavorativo" : "Procedi al pagamento entro l’inizio della campagna per permetterne la pianificazione. Se hai già provveduto, ti preghiamo di contattaci al numero 02.359.481.98";
//                });
//                for (let group of data) {
//                    group.Campaigns.forEach(v => {
//                        let gv: any = v;
//                        gv.showPrice = this.userSession.showPrice;
//                        gv.formattedAmount = (v.Amount && v.Amount != null) ? v.Amount.toPriceFormat() : ["-", "-"];
//                    });
//                }

//                this.renderTemplateScript("moderationTemplate", {
//                    groups: data
//                })
//            }
//        })
//    }

//    private getPowerBIReport(): void {
//        this.runAsync(async () => {
//            var id = this.html.find("#group-selectpicker select").val();
//            let d = await this.reportServiceAgent.GetReportPowerBI(id);

//            var models = (<any>window)['powerbi-client'].models;

//            var basicFilter = {
//                $schema: "http://powerbi.com/product/schema#basic",
//                target: {
//                    table: "Arcadia Campaigns",
//                    column: "CampaignGroupId"
//                },
//                operator: "Contains",
//                values: [id],
//                filterType: models.FilterType.Basic
//            }

//            var config = {
//                type: 'report',
//                tokenType: models.TokenType.Embed,
//                accessToken: d!.Token.Token,
//                embedUrl: d!.EmbedUrl,
//                id: d!.Id,
//                permissions: models.Permissions.Read,
//                filters: [basicFilter],
//                settings: {
//                    filterPaneEnabled: false,
//                    navContentPaneEnabled: true,
//                    layoutType: models.LayoutType.Custom,
//                    customLayout: {
//                        pageSize: {
//                            type: models.PageSizeType.Custom,
//                            width: 1152,
//                            height: 1000,
//                        },
//                        displayOption: models.DisplayOption.ActualSize,
//                    },
//                },
//            };

//            // Get a reference to the embedded report HTML element
//            var reportContainer = this.html.find('#powerBI-container')[0];

//            // Embed the report and display it within the div container.
//            var report = (<any>window)['powerbi'].embed(reportContainer, config);
//        })
//    }

//    private loadCampaignsData(): void {
//        this.runAsync(async () => {
//            let data: ReportCampaignById[] = [];
//            let reportTotalProductViews: ReportProductNumbersCampaignById[] = [];
//            let reportTotalProductClicks: ReportProductNumbersCampaignById[] = [];
//            let reportTotalProductUniqueUsers: ReportProductNumbersCampaignById[] = [];
//            let reportTotalReachUniqueUsers: ReportProductNumbersCampaignById[] = [];
//            let advertisement: AdvertisementType;

//            if (this.currentCampaigns.length == 0) {
//                $("[data-noCampaignDetails]").show();
//                $("[data-showCampaignDetails]").hide();
//                $("[data-showPowerBI]").hide();
//                $("#showTotalReport").hide();
//                $("#showTotalReport").siblings("span").hide();
//                $("[data-LandingCharts]").hide();
//                $("[data-noLandingCharts]").hide();
//                $("[data-showSelectPicker]").hide();
//                $("[data-showMaps]").hide();
//                $('#linkToCreativity').hide();
//                $("[data-showModeration]").hide();
//                return;
//            }

//            if (this.currentCampaigns.length > 1) {
//                let campaignGroupId = this.html.find("#group-selectpicker select").val();
//                let d = await this.reportServiceAgent.getCampaignGroupById(campaignGroupId);
//                data.push(d);
//            }
//            else {
//                for (let c of this.currentCampaigns) {
//                    let d = await this.reportServiceAgent.getCampaignById(c.Id);
//                    // Parsing delle date
//                    d.StartDate = moment.parseZone(d.StartDate);
//                    d.EndDate = moment.parseZone(d.EndDate);
//                    data.push(d);
//                }
//            }

//            // Trova il range di date minimo e massimo
//            let startDate = moment(data.Min(c => c.StartDate)!.StartDate),
//                endDate = moment(data.Max(c => c.EndDate)!.EndDate);

//            advertisement = (<any>AdvertisementType)[data[0].AdvertisementType];

//            let description: string = "";
//            if (advertisement === AdvertisementType.DISPLAYCLICK || advertisement === AdvertisementType.SEARCHGOOGLE)
//                description = "Click";
//            else if (advertisement === AdvertisementType.FLYER) description = "Impressions";
//            else description = "Utenti Unici";

//            this.renderTemplateScript("current-template", {
//                percentage: data.Average(c => c.Reach),
//                type: data[0].Type === "App Nexus" ? "Pubblicità sulle APP" : data[0].Type,
//                description: data.Sum(v => v.Product.Value).toLocaleString() + ' ' + description,
//                euroAmount: data.Sum(c => c.Budget).toLocaleString(),
//                showPrice: this.userSession.showPrice,
//                startDate: startDate.local().format("DD/MM/YY"),
//                endDate: endDate.local().format("DD/MM/YY"),
//            });
            
//            // Creo i link per i banners
//            let linkToCreativity: JQuery = this.html.find('#linkToCreativity');
//            if (this.currentCampaigns.length === 1 || data[0].IsBulk) {
//                // Creo la variabile di appoggio
//                let sourceBanners: ReportBannerCampaignById[] = data[0].Banners;
//                // Azzero la variabile che verrà usata
//                data[0].Banners = [];
//                // Ciclo per tutto i banner
//                for (let i = 0; i < sourceBanners.length; i++) {
//                    let b: ReportBannerCampaignById = sourceBanners[i];
//                    var position;

//                    switch (b.Size) {
//                        case BannerSize.None: {
//                            position = 0;
//                            break;
//                        }
//                        case BannerSize.Format300x250: {
//                            position = 1;
//                            break;
//                        }
//                        case BannerSize.Format320x480: {
//                            position = 2;
//                            break;
//                        }
//                        case BannerSize.Format320x50: {
//                            position = 3;
//                            break;
//                        }
//                        case BannerSize.Format728x90: {
//                            position = 4;
//                            break;
//                        }
//                        case BannerSize.Format1200x628: {
//                            position = 5;
//                            break;
//                        }
//                        case BannerSize.Format640x1024: {
//                            position = 6;
//                            break;
//                        }
//                        case BannerSize.Format2020x1320: {
//                            position = 7;
//                            break;
//                        }
//                    }

//                    let newBanner: any = {
//                        Position: position, // Utilizzo la posizione per mettere al primo posto il banner con dimensione None
//                        Size: b.Size,
//                        Url: b.Url,
//                        IsDisplay: b.IsDisplay,
//                        IsSearch: b.IsSearch && b.Size === BannerSize.None, // è Search se la tipologia è search e la dimensione è None
//                        IsFacebook: b.IsFacebook && b.Size === BannerSize.Format1200x628, // è Facebook se la tipologia è Facebook e se la dimensione è quella di Facebook
//                        IsSmartphone: b.Size === BannerSize.Format640x1024 && !data[0].IsBulk, // dimensione per gli smartphone
//                        IsTablet: advertisement != AdvertisementType.FLYER && b.Size === BannerSize.Format2020x1320 && !data[0].IsBulk, // dimensione per i tablet
//                        IsUniqueUsersOrClicks: (advertisement === AdvertisementType.DISPLAYUU || advertisement === AdvertisementType.DISPLAYCLICK) && (b.Size === BannerSize.Format300x250 || b.Size === BannerSize.Format320x50 || b.Size === BannerSize.Format728x90 || b.Size === BannerSize.Format320x480), // generici non sono smartphone,tablet e con la dimensione None
//                        Copy: (b.IsFacebook) ? <FacebookCampaignUserData>data[0].Copy : ((b.IsSearch) ? <SearchCampaignUserData>data[0].Copy : null), // faccio il cast del copy in base al tipo di campagna, la display non necessita di alcun cast
//                        IsFlyer: advertisement === AdvertisementType.FLYER && b.Size === BannerSize.Format320x480,
//                    };
//                    data[0].Banners.push(newBanner);
//                }
//                // Sposto al primo posto il banner con posizione None di modo da averlo come primo nel carosello
//                data[0].Banners = data[0].Banners.OrderBy(b => b.Position);

//                this.renderTemplateScript("creativity-preview3-template", data[0].Banners);

//                let owl = this.html.find('#slider-preview');
//                let source = this;

//                // Inizializzo il carosello
//                owl.on('initialize.owl.carousel', function (elem: any) {
//                    source.handleSliderNavigation(elem);
//                });
//                owl.on('changed.owl.carousel', function (event: any) {
//                    let items = event.item.count; // Number of items
//                    if (items === 0) {
//                        items = $("#slider-preview").find(".item-preview-banner").length;
//                    }
//                    let item = event.item.index;
//                    if (!item) {
//                        item = 0;
//                    }

//                    let left = $('.container-slider-preview').find('.prev-preview'), right = $('.container-slider-preview').find('.next-preview');

//                    // Gestisco la navigazione del carosello
//                    source.handleSliderNavigation(item);
//                    source.handleSlideChange(item);

//                    if (item == 0) {
//                        left.hide();
//                    } else {
//                        left.show();
//                    }
//                    if (item == items - 1) {
//                        right.hide();
//                    } else {
//                        right.show();
//                    }

//                });
//                // Creo il carosello
//                owl.owlCarousel({
//                    loop: false,
//                    nav: false,
//                    dots: false,
//                    margin: 10,
//                    items: 1
//                });
//                // Go to the next item
//                $('.next-preview').click(function () {
//                    owl.trigger('next.owl.carousel');
//                });
//                // Go to the previous item
//                $('.prev-preview').click(function () {
//                    owl.trigger('prev.owl.carousel');
//                });

//                linkToCreativity.show();

//                // Se il pulsante di report è visibile mostro anche il separatore, altrimenti lo lascio nascosto
//                //if (this.html.find("#showTotalReport").is(":visible")) {
//                //    linkToCreativity.next().show();
//                //}
//            }
//            else {
//                this.renderTemplateScript("creativity-preview3-template", []);

//                // Se ho più di una campagna selezionata nascondo il pulsante per mostrare le creatività
//                linkToCreativity.next().hide();
//                linkToCreativity.hide();
//            }

//            $("[data-showModeration]").hide();
//            $("[data-showSelectPicker]").show();

//            var isBulk = false;

//            if (isBulk) {
//                $("[data-showPowerBI]").show();
//                $("[data-showCampaignDetails]").hide();
//                $("[data-noCampaignDetails]").hide();
//                $("#showTotalReport").hide();
//                $("#showTotalReport").siblings("span").hide();
//                $("[data-LandingCharts]").hide();
//                $("[data-noLandingCharts]").hide();
//                $("#pdv-selectpicker").hide();
//                $("[data-showMaps]").hide();
//                linkToCreativity.show();
//                linkToCreativity.next().hide();
//                this.getPowerBIReport();
//            }
//            else {
//                $("[data-showPowerBI]").hide();
//                $("[data-showMaps]").show();
//                $("#pdv-selectpicker").show();

//                if (data.length == 0) {
//                    $("[data-showCampaignDetails]").hide();
//                    $("[data-noCampaignDetails]").show();
//                    return;
//                }
//                else {
//                    let element = $(".active [data-status]");
//                    let campaignStatus: CampaignStatusEnum = (<any>CampaignStatusEnum)[element.data("status")];
//                    if (campaignStatus === CampaignStatusEnum.Scheduled) {
//                        $("#showTotalReport").hide();
//                        $("#showTotalReport").siblings("span").hide();
//                    }
//                    else {
//                        $("#showTotalReport").show();
//                        $("#showTotalReport").siblings("span").show();
//                    }
//                    $("[data-showCampaignDetails]").show();
//                    $("[data-noCampaignDetails]").hide();
//                }

//                for (let d of data) {
//                    for (var i = 0; i < d.ProductViews.length; i++) {
//                        var day = moment(d.StartDate).add(i, 'days').format("DD/MM/YY");
//                        if (reportTotalProductViews.Any(p => p.Date.formatDate() == day)) {
//                            var view = reportTotalProductViews.First(p => p.Date.formatDate() == day);
//                            var click = reportTotalProductClicks.First(p => p.Date.formatDate() == day);
//                            var uniqueUsers = reportTotalProductUniqueUsers.First(p => p.Date.formatDate() == day);
//                            var reach = reportTotalReachUniqueUsers.First(p => p.Date.formatDate() == day);

//                            view.Value += d.ProductViews[i].Value;
//                            click.Value += d.ProductClicks[i].Value;
//                            uniqueUsers.Value += d.ProductUniqueUsers[i].Value;
//                            reach.Value += d.ProductReachUniqueUsers != null
//                                ? (d.ProductReachUniqueUsers[i] != null ? d.ProductReachUniqueUsers[i].Value : 0)
//                                : 0;
//                        }
//                        else {
//                            reportTotalProductViews.Add(d.ProductViews[i]);
//                            reportTotalProductClicks.Add(d.ProductClicks[i]);
//                            reportTotalProductUniqueUsers.Add(d.ProductUniqueUsers[i]);
//                            reportTotalReachUniqueUsers.Add(d.ProductReachUniqueUsers != null
//                                ? (d.ProductReachUniqueUsers[i] != null ? d.ProductReachUniqueUsers[i] : { Date: d.ProductViews[i].Date, Value: 0 })
//                                : { Date: d.ProductViews[i].Date, Value: 0 });
//                        }
//                    }
//                }

//                var smartReportDays = $("[data-smart-report-days]").data("smart-report-days");
//                //var skip = moment() > startDate && moment() <= endDate ?
//                //    (moment().diff(startDate, 'days') < smartReportDays ? 0 : moment().diff(startDate, 'days') - smartReportDays + 1) :
//                //    endDate.diff(moment(), 'days') + endDate.diff(startDate, 'days') > reportTotalProductViews.length || endDate.diff(moment(), 'days') + endDate.diff(startDate, 'days') <= 0 
//                //        ? reportTotalProductViews.length - smartReportDays + 1
//                //        : endDate.diff(moment(), 'days') + endDate.diff(startDate, 'days') - smartReportDays + 1;

//                var skip = reportTotalProductViews.length < smartReportDays ? 0 : reportTotalProductViews.length - smartReportDays;

//                this.renderTemplateScript("insights-template", {
//                    smartReportdays: smartReportDays,
//                    CTCClicks: Math.round(data.Sum(c => c.CTCClicks) * 100 / (data.Sum(c => c.ButtonClicks) + data.Sum(c => c.CTCClicks))),
//                    buttonClicks: Math.round(data.Sum(c => c.ButtonClicks) * 100 / (data.Sum(c => c.ButtonClicks) + data.Sum(c => c.CTCClicks))),
//                    ProductName: advertisement === AdvertisementType.DISPLAYUU ? "utenti unici mobile app"
//                        : advertisement === AdvertisementType.SOCIALFB ? "utenti unici facebook"
//                            : "visualizzazioni della tua pubblicità",
//                    ProductViews: advertisement === AdvertisementType.DISPLAYUU
//                        ? reportTotalProductUniqueUsers.Skip(skip).Take(smartReportDays).Sum(c => c.Value).toLocaleString()
//                        : advertisement === AdvertisementType.SOCIALFB ? reportTotalReachUniqueUsers.Skip(skip).Take(smartReportDays).Sum(c => c.Value).toLocaleString()
//                            : reportTotalProductViews.Skip(skip).Take(smartReportDays).Sum(c => c.Value).toLocaleString(),
//                    ProductClicks: reportTotalProductClicks.Skip(skip).Take(smartReportDays).Sum(c => c.Value).toLocaleString()
//                });

//                // TODO: valutare se usare una funzione per avere labels e values
//                this.loadCharts([
//                    {
//                        labelName: (advertisement === AdvertisementType.DISPLAYUU || advertisement === AdvertisementType.SOCIALFB) ? "UU" : "View",
//                        labels: reportTotalProductViews.Skip(skip).Take(smartReportDays).Select(p => p.Date.formatDate()),
//                        values: advertisement === AdvertisementType.DISPLAYUU
//                            ? reportTotalProductUniqueUsers.Skip(skip).Take(smartReportDays).Select(d => d.Value != undefined ? d.Value : 0)
//                            : advertisement === AdvertisementType.SOCIALFB
//                                ? reportTotalReachUniqueUsers.Skip(skip).Take(smartReportDays).Select(d => d.Value != undefined ? d.Value : 0)
//                                : reportTotalProductViews.Skip(skip).Take(smartReportDays).Select(d => d.Value != undefined ? d.Value : 0),
//                    },
//                    {
//                        labelName: "Click",
//                        labels: reportTotalProductClicks.Skip(skip).Take(smartReportDays).Select(p => p.Date.formatDate()),
//                        values: reportTotalProductClicks.Skip(skip).Take(smartReportDays).Select(d => d.Value != undefined ? d.Value : 0),
//                    }
//                ]);

//                this.loadMap(data[0].Location);
//            } 

//            // Avvia i cerchi con le percentuali
//            CMS.circle(this.html);
//        });
//    }

//    private loadCampaigns() {
//        let select = this.html.find("#pdv-selectpicker select").empty();
//        // Devo distruggere il picker per ricrearlo
//        select.append("<option value=''>Tutti i punti vendita</option>");

//        let campaignGroupId = this.html.find("#group-selectpicker select").val();
//        for (let campaign of this.campaigns.filter(c => c.CampaignGroupId == campaignGroupId)) {
//            select.append($("<option>").attr("value", campaign.Id).text(campaign.CampaignName));
//        }

//        // refresh il picker
//        this.html.find('select.selectpicker').selectpicker('refresh');

//        this.loadCampaignsData();
//    }

//    private async loadCampaignGroups(campaignStatus: CampaignStatusEnum): Promise<void> {
//        if (campaignStatus === CampaignStatusEnum.ToApprove || campaignStatus === CampaignStatusEnum.Waiting) {
//            this.loadCampaignsModeration();
//        } else {
//            this.groups = await this.reportServiceAgent.groups(campaignStatus);
//            this.campaigns = await this.reportServiceAgent.campaigns(campaignStatus);

//            this.renderTemplateScript("choice-template", { groups: this.groups });
//            this.loadCampaigns();
//        }
//    }

//    private handleSliderNavigation (item: any) {

//        let paginatorsLink = $('.switch-preview li');

//        paginatorsLink.each(function (i) {
//            if (item != i) {
//                $(paginatorsLink[i]).removeClass('selected');
//            } else {
//                $(paginatorsLink[i]).addClass('selected');
//            }
//            $(paginatorsLink[i]).click(function () {
//                let owl = $('#slider-preview');
//                owl.trigger('to.owl.carousel', i);
//            });
//        });

//    };

//    private handleSlideChange (item: any) {
//        let pagerTooltips = [];
//        pagerTooltips.push('FORMATO PUBBLICITARIO FACEBOOK');
//        pagerTooltips.push('ANNUNCIO GOOGLE ADWORDS');
//        pagerTooltips.push('FORMATO RETTANGOLO MEDIO');
//        pagerTooltips.push('FORMATO INTERSTITIAL');
//        pagerTooltips.push('FORMATO LEADERBOARD SMARTPHONE');
//        pagerTooltips.push('FORMATO LEADERBOARD TABLET');
//        pagerTooltips.push('LANDING PAGE PER SMARTPHONE');
//        pagerTooltips.push('LANDING PAGE PER TABLET');
//        $('#creativityTitle').html(pagerTooltips[item]);
//    };
//}