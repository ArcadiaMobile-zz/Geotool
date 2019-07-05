/// <reference path="../references.ts" />
abstract class Page {

    public navigo: Navigo;

    public html: JQuery;

    public userSession: UserSession;

    public sidebar: Sidebar;

    protected constructor(public relativeUri: string) {
        Handlebars.registerHelper('for', function (from: number, to: number, incr: number, block: any) {
            var accum = '';
            for (var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        });

        Handlebars.registerHelper("formatDate", function (datetime: Date, format: String) {
            if (moment) {
                return moment(datetime).format(format);
            }
            else {
                return datetime;
            }
        });
    }

    public get pagePlaceholder(): JQuery {
        return $("[data-page-html]");
    }

    public onLoad(): void {
        this.html.find('input,textarea').characterCounter().trigger('change');
        setTimeout(() => {
            this.html.find('input,textarea').trigger('change');
        }, 200);
    }

    public onNavigatedTo(): void {
        //setTimeout(() => {
        //    this.html.find('input').trigger('change');
        //    debugger;
        //}, 200);
        //console.log(`onNavigatedTo: ${this.relativeUri}`);
        this.setNavigationLinks();
    }

    public onNavigatedFrom(): void {
        //console.log(`onNavigatedFrom: ${this.relativeUri}`);
    }

    protected setNavigationLinks(): void {
        $("[data-security-isadmin]").toggle(this.userSession.agencyInfo.currentUserIsAdmin);
    }

    protected async runAsync(run: () => Promise<void>, policy: RunPolicy = RunPolicy.AskForRetry, showLoader: boolean = true, isBulk: boolean = false): Promise<void> {
        try {
            let preloader: any;
            let end = false;

            let overlay = $("<div class='overlay'></div>");
            try {
                // Blocca eventuali input nel frattempo che arriva il preloader
                $(document.body).append(overlay);

                // Mostro l'attesa solo se passa più di mezzo secondo
                delay(500).then(() => {
                    overlay.remove();

                    // Solo se l'operazione non è già terminata
                    if (!end && showLoader) {
                        var opt = isBulk ? {complex:true, strings: ['uno', 'due', 'tre', 'stella!']} : null;
                        preloader = CMS.preloader(opt);
                    }
                });
                await run();
            }
            finally {
                overlay.remove();
                end = true;
                if (preloader) {
                    preloader.close();
                }
            }
        }
        catch (e) {       
            console.error(e);

            let buttonTitle: string;
            switch (policy) {
                case RunPolicy.RaiseError:
                    throw e;
                case RunPolicy.Try:
                    buttonTitle = "OK";
                    break;
                case RunPolicy.AskForRetry:
                    buttonTitle = "Riprova";
                    break;
                default:
                    throw Error("Unknown policy");
            }

            // Mostro il messaggio di errore
            await this.showAlert("Errore", e.message, buttonTitle);

            if (policy == RunPolicy.AskForRetry) {
                await this.runAsync(run, policy);
            }
        }
    }

    protected showAlert(title: string, message: string, buttonTitle: string = "OK"): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let dialog: any;
            dialog = CMS.showAlert(title, message, [ // mostro il dialog
                {
                    id: "alertDialog",
                    label: buttonTitle,
                    icon: "glyphicon glyphicon-ok-circle",
                    cssClass: 'btn-primary',
                    action: function () {
                        dialog.close();
                        resolve();
                    }
                }
            ], BootstrapDialog.TYPE_DANGER, BootstrapDialog.SIZE_LARGE);
        });
    }

    protected getTemplateScript(templateId: string, context?: any): string {
        let scriptTemplate = $(`#${templateId}`);
        let templateSource: string = scriptTemplate.html();
        let template: HandlebarsTemplateDelegate = Handlebars.compile(templateSource);
        let html: string = template(context || this);

        return html;
    }

    protected renderTemplateScript(templateId: string, context?: any): JQuery {
        let scriptTemplate = this.html.find(`#${templateId}`);
        let html = this.getTemplateScript(templateId, context);

        let placeholderId = `${templateId}Out`;
        let placeholder: JQuery = this.html.find("#" + placeholderId);
        if (placeholder.length === 0) {
            placeholder = $("<div/>").attr("id", placeholderId);
            placeholder.insertBefore(scriptTemplate);
        }

        return placeholder.html(html);
    }

    public get reachWording(): string {
        let result: string = "";

        if (this.userSession.advertisementType == AdvertisementType.DISPLAYCLICK || this.userSession.advertisementType == AdvertisementType.SEARCHGOOGLE) {
            result = "Click";
        }
        else if (this.userSession.advertisementType == AdvertisementType.FLYER) {
            result = "Impressions"
        }
        else {
            result = "Utenti Unici";
        }

        return (result);
    }

    public get disableHolidayWeekendDays(): any[] {
        let days: any[] = [];
        var d = new Date()
  
        // Disabilito solo il primo weekend
        var diff = 7 - d.getDay();
        days.push(d.addDays(diff));
        days.push(d.addDays(--diff))
        
        // Easter Monday
        days.push(this.easterSunday(d.getFullYear()).addDays(1))
        days.push(new Date(d.getFullYear(), 0, 1));
        days.push(new Date(d.getFullYear(), 0, 6));
        days.push(new Date(d.getFullYear(), 3, 25));
        days.push(new Date(d.getFullYear(), 4, 1));
        days.push(new Date(d.getFullYear(), 5, 2));
        days.push(new Date(d.getFullYear(), 7, 15));
        days.push(new Date(d.getFullYear(), 10, 1));
        days.push(new Date(d.getFullYear(), 11, 7));
        days.push(new Date(d.getFullYear(), 11, 8));
        days.push(new Date(d.getFullYear(), 11, 24));
        days.push(new Date(d.getFullYear(), 11, 25));
        days.push(new Date(d.getFullYear(), 11, 26));
        days.push(new Date(d.getFullYear(), 11, 31));
        return days;
    }

    private easterSunday(year: number): Date {
        var g = year % 19;
        var c = year / 100;
        var h = (Math.floor(c) - Math.floor(c / 4) - Math.floor((8 * c + 13) / 25) + 19 * g + 15) % 30;
        var i = h - Math.floor(h / 28) * (1 - Math.floor(h / 28) * Math.floor(29 / (h + 1)) * Math.floor((21 - g) / 11));

        var day = i - ((year + Math.floor(year / 4) + i + 2 - Math.floor(c) + Math.floor(c / 4)) % 7) + 28;
        var month = 3;

        if (day > 31) {
            month++;
            day -= 31;
        }

        return new Date(year, month-1, day);
    }
}

enum RunPolicy {
    Try,
    AskForRetry,
    RaiseError
}