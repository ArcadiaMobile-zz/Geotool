declare var moment: any;
declare var CMS: any;
declare var BootstrapDialog: { TYPE_DANGER: number, SIZE_LARGE: number };

interface Number {
    toPriceFormat(): string[];
}

interface String {
    uriFormat(...args: any[]): string;
    parseQuery(): { [key: string]: string | undefined } ;
    format(...replacements: string[]): string;
    toMoment(): any;
    toMomentObject(): any;
    formatDate(): string;
}

interface JQuery {
    textAndTitle(text: string): JQuery;
    validator(): JQuery;
    selectpicker(e: any): JQuery;
}

interface Date {
    addDays(days: number): Date;
}

moment.prototype.userLocale = function (this: any) {
    var lang = (navigator.language || (<any>navigator).browserLanguage).slice(0, 2);
    return this.locale(lang);
}

moment.prototype.addWorkdays = function (this: any, days: number) {
    var increment = days / Math.abs(days);
    var date = this.clone().add(Math.floor(Math.abs(days) / 5) * 7 * increment, "days");
    var remaining = days % 5;
    while (remaining != 0) {
        date.add(increment, "days");
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7)
            remaining -= increment;
    }
    return date;
};

Number.prototype.toPriceFormat = function (this: number): string[] {
    let d = (Math.round((Math.abs(this) % 1) * 100)).toString();
    if (d.length === 1) d += "0";
    //return [Math.trunc(this).toString(), d];
    return [Math.trunc(this).toLocaleString(), d];
}

if (!String.prototype.formatDate) {
    String.prototype.formatDate = function (this: String): string {
        return moment.parseZone(this).local().format("DD/MM/YY");
    }
}
if (!String.prototype.uriFormat) {
    String.prototype.uriFormat = function (this: String, ...args: any[]): string {
        for (let x = 1; x < args.length; x++) {
            args[x] = encodeURIComponent(args[x]);
        }

        return this.format(...args);
    }
}
if (!String.prototype.parseQuery) {
    String.prototype.parseQuery = function (this: string): {[key: string]: string | undefined} {
        let query: any = {};
        let q = this.indexOf("?");
        let a = (q >= 0 ? this.substr(q + 1) : this).split('&');
        for (let i = 0; i < a.length; i++) {
            let b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }
}

if (!String.prototype.format) {
    String.prototype.format = function (this: String): string {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (this: Date, days: number) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }
}

if (!String.prototype.toMoment) {
    String.prototype.toMoment = function (this: String) {
        return moment(this, "YYYY-MM-DD").toDate();
    }
}

if (!String.prototype.toMomentObject) {
    String.prototype.toMomentObject = function (this: String) {
        return moment(this, "YYYY-MM-DD");
    }
}

function delay(ms: number) {
    return new Promise<void>(function (resolve) {
        setTimeout(resolve, ms);
    });
}

(function ($) {
    $.fn.textAndTitle = function (this: JQuery, text: string) {
        return this.each(function (this: HTMLElement) {
            $(this).text(text).attr("title", text);
        });
    };
}(jQuery));

Handlebars.registerHelper('times', function (n: number, block: any) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});