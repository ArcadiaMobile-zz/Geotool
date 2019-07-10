var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
moment.prototype.userLocale = function () {
    var lang = (navigator.language || navigator.browserLanguage).slice(0, 2);
    return this.locale(lang);
};
moment.prototype.addWorkdays = function (days) {
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
Number.prototype.toPriceFormat = function () {
    var d = (Math.round((Math.abs(this) % 1) * 100)).toString();
    if (d.length === 1)
        d += "0";
    //return [Math.trunc(this).toString(), d];
    return [Math.trunc(this).toLocaleString(), d];
};
if (!String.prototype.formatDate) {
    String.prototype.formatDate = function () {
        return moment.parseZone(this).local().format("DD/MM/YY");
    };
}
if (!String.prototype.uriFormat) {
    String.prototype.uriFormat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var x = 1; x < args.length; x++) {
            args[x] = encodeURIComponent(args[x]);
        }
        return this.format.apply(this, args);
    };
}
if (!String.prototype.parseQuery) {
    String.prototype.parseQuery = function () {
        var query = {};
        var q = this.indexOf("?");
        var a = (q >= 0 ? this.substr(q + 1) : this).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    };
}
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };
}
if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };
}
if (!String.prototype.toMoment) {
    String.prototype.toMoment = function () {
        return moment(this, "YYYY-MM-DD").toDate();
    };
}
if (!String.prototype.toMomentObject) {
    String.prototype.toMomentObject = function () {
        return moment(this, "YYYY-MM-DD");
    };
}
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
(function ($) {
    $.fn.textAndTitle = function (text) {
        return this.each(function () {
            $(this).text(text).attr("title", text);
        });
    };
}(jQuery));
Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
/// <reference path="Campaign.ts" />
/// <reference path="../Invoice/Invoice.ts" />
var EvaluationObjective;
(function (EvaluationObjective) {
    EvaluationObjective[EvaluationObjective["PromotionPrice"] = 0] = "PromotionPrice";
    EvaluationObjective[EvaluationObjective["PromotionDiscount"] = 1] = "PromotionDiscount";
    EvaluationObjective[EvaluationObjective["NewOffer"] = 2] = "NewOffer";
    EvaluationObjective[EvaluationObjective["Branding"] = 3] = "Branding";
    EvaluationObjective[EvaluationObjective["AnotherTarget"] = 4] = "AnotherTarget";
})(EvaluationObjective || (EvaluationObjective = {}));
var AdvertisementType;
(function (AdvertisementType) {
    AdvertisementType[AdvertisementType["DISPLAYCLICK"] = 0] = "DISPLAYCLICK";
    AdvertisementType[AdvertisementType["DISPLAYUU"] = 1] = "DISPLAYUU";
    AdvertisementType[AdvertisementType["SOCIALFB"] = 2] = "SOCIALFB";
    AdvertisementType[AdvertisementType["SMS"] = 3] = "SMS";
    AdvertisementType[AdvertisementType["SEARCHGOOGLE"] = 4] = "SEARCHGOOGLE";
    AdvertisementType[AdvertisementType["FLYER"] = 5] = "FLYER";
})(AdvertisementType || (AdvertisementType = {}));
var GenderType;
(function (GenderType) {
    GenderType[GenderType["BOTH"] = 0] = "BOTH";
    GenderType[GenderType["MALE"] = 1] = "MALE";
    GenderType[GenderType["FEMALE"] = 2] = "FEMALE";
})(GenderType || (GenderType = {}));
var CampaignStatusEnum;
(function (CampaignStatusEnum) {
    CampaignStatusEnum[CampaignStatusEnum["All"] = 0] = "All";
    CampaignStatusEnum[CampaignStatusEnum["Active"] = 1] = "Active";
    CampaignStatusEnum[CampaignStatusEnum["Scheduled"] = 2] = "Scheduled";
    CampaignStatusEnum[CampaignStatusEnum["End"] = 3] = "End";
    CampaignStatusEnum[CampaignStatusEnum["ToApprove"] = 4] = "ToApprove";
    CampaignStatusEnum[CampaignStatusEnum["Waiting"] = 5] = "Waiting";
    CampaignStatusEnum[CampaignStatusEnum["Rejected"] = 6] = "Rejected";
})(CampaignStatusEnum || (CampaignStatusEnum = {}));
var BannerSize;
(function (BannerSize) {
    BannerSize[BannerSize["Format300x250"] = 0] = "Format300x250";
    BannerSize[BannerSize["Format320x50"] = 1] = "Format320x50";
    BannerSize[BannerSize["Format728x90"] = 2] = "Format728x90";
    BannerSize[BannerSize["Format1200x628"] = 3] = "Format1200x628";
    BannerSize[BannerSize["Format640x1024"] = 4] = "Format640x1024";
    BannerSize[BannerSize["Format2020x1320"] = 5] = "Format2020x1320";
    BannerSize[BannerSize["Format320x480"] = 6] = "Format320x480";
    BannerSize[BannerSize["None"] = 7] = "None";
})(BannerSize || (BannerSize = {}));
var GeocodeStatus;
(function (GeocodeStatus) {
    GeocodeStatus[GeocodeStatus["OK"] = 0] = "OK";
    GeocodeStatus[GeocodeStatus["ZERO_RESULTS"] = 1] = "ZERO_RESULTS";
    GeocodeStatus[GeocodeStatus["OVER_QUERY_LIMIT"] = 2] = "OVER_QUERY_LIMIT";
    GeocodeStatus[GeocodeStatus["REQUEST_DENIED"] = 3] = "REQUEST_DENIED";
    GeocodeStatus[GeocodeStatus["INVALID_REQUEST"] = 4] = "INVALID_REQUEST";
    GeocodeStatus[GeocodeStatus["UNKNOW_ERROR"] = 5] = "UNKNOW_ERROR";
})(GeocodeStatus || (GeocodeStatus = {}));
var ServiceAgentContext = /** @class */ (function () {
    function ServiceAgentContext(baseUrl) {
        this.baseUrl = baseUrl;
        this.reload();
    }
    ServiceAgentContext.prototype.reload = function () {
        if ($.cookie !== undefined) {
            this._accessToken = $.cookie("accessToken");
        }
    };
    Object.defineProperty(ServiceAgentContext.prototype, "accessToken", {
        get: function () {
            return this._accessToken;
        },
        set: function (value) {
            this._accessToken = value;
            if (value && $.cookie !== undefined) {
                $.cookie("accessToken", value, { expires: this.accessTokenExpiration });
            }
            else {
                $.removeCookie("accessToken");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceAgentContext.prototype, "accessTokenObject", {
        get: function () {
            if (!this.accessToken) {
                return {};
            }
            return jwt_decode(this.accessToken);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceAgentContext.prototype, "accessTokenExpiration", {
        get: function () {
            if (this.accessTokenObject.exp) {
                return moment.unix(this.accessTokenObject.exp).toDate();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceAgentContext.prototype, "accessTokenExpired", {
        get: function () {
            return !this.accessTokenExpiration || new Date() >= this.accessTokenExpiration;
        },
        enumerable: true,
        configurable: true
    });
    return ServiceAgentContext;
}());
var ServiceAgent = /** @class */ (function () {
    function ServiceAgent(context) {
        this.context = context;
    }
    ServiceAgent.prototype.doCall = function (operation, args) {
        var _this = this;
        var finalUri = this.context.baseUrl;
        if (typeof operation.uri === "string") {
            finalUri += operation.uri;
        }
        else {
            finalUri += operation.uri(args);
        }
        var setting = {
            method: operation.method || "GET",
            url: finalUri,
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "bearer " + _this.context.accessToken);
            }
        };
        var body;
        if (operation.body) {
            body = operation.body(args);
            if (body instanceof FormData) {
                setting.contentType = false;
                setting.processData = false;
            }
            // Serializzo in JSON se è un oggetto
            else if (typeof body === "object") {
                body = JSON.stringify(body);
            }
            setting.data = body;
        }
        return new Promise(function (resolve, reject) {
            setting.success = function (r) { return resolve((operation.responseCallback) ? operation.responseCallback(r) : r); };
            setting.error = function (r, status, errorThrown) { return reject(new Error(errorThrown)); };
            $.ajax(setting);
            //$.ajax({
            //    method: operation.method || "GET",
            //    url: finalUri,
            //    contentType: operation.contentType || "application/json",
            //    processData: operation.processData || true,
            //    data: body,
            //    beforeSend: (xhr) => {
            //        xhr.setRequestHeader("Authorization", "bearer " + this.context.accessToken);
            //        //xhr.setRequestHeader("Content-Type", operation.contentType || "application/json");
            //    },
            //    success: r => resolve((operation.responseCallback) ? operation.responseCallback(r) : r),
            //    error: (r: XMLHttpRequest, status: string, errorThrown: string) => reject(new Error(errorThrown))
            //})
        });
    };
    /**
    * Formatta un indirizzo concatenando i path e un oggetto di querystring
    */
    ServiceAgent.prototype.formatUri = function (uri, paths, queryString) {
        if (paths) {
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var p = paths_1[_i];
                if (!uri.endsWith("/")) {
                    uri += "/";
                }
                uri += encodeURIComponent(p);
            }
        }
        if (queryString) {
            if (!uri.endsWith("?")) {
                uri += "?";
            }
            var first = true;
            for (var p in queryString) {
                if (typeof queryString[p] === "undefined")
                    continue;
                if (!first) {
                    uri += "&";
                }
                uri += encodeURIComponent(p) + "=" + encodeURIComponent(queryString[p]);
                first = false;
            }
        }
        return uri;
    };
    return ServiceAgent;
}());
;
;
var AutoServiceAgent = /** @class */ (function (_super) {
    __extends(AutoServiceAgent, _super);
    function AutoServiceAgent(context) {
        var operations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            operations[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, context) || this;
        var thisDic = _this;
        var _loop_1 = function (o) {
            thisDic[(o.name)] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.doCall(o, args);
            };
        };
        for (var _a = 0, operations_1 = operations; _a < operations_1.length; _a++) {
            var o = operations_1[_a];
            _loop_1(o);
        }
        return _this;
    }
    return AutoServiceAgent;
}(ServiceAgent));
var ServiceAgentFactory = /** @class */ (function () {
    function ServiceAgentFactory() {
    }
    ServiceAgentFactory.get = function (c) {
        return new c(ServiceAgentFactory.context);
    };
    return ServiceAgentFactory;
}());
var BusinessCategoryServiceAgent = /** @class */ (function (_super) {
    __extends(BusinessCategoryServiceAgent, _super);
    function BusinessCategoryServiceAgent(context) {
        return _super.call(this, context, { name: "getAll", uri: "/api/BusinessCategory" }) || this;
    }
    return BusinessCategoryServiceAgent;
}(AutoServiceAgent));
var CampaignServiceAgent = /** @class */ (function (_super) {
    __extends(CampaignServiceAgent, _super);
    function CampaignServiceAgent(context) {
        var _this = _super.call(this, context, { name: "getAll", uri: "/api/Campaign" }, { name: "get", uri: function (args) { return _this.formatUri("/api/Campaign", args); } }, { name: "moreProducts", uri: function (args) { return _this.formatUri("/api/Campaign/MoreProducts", [], { proposalItemId: args[0], diagnosticData: args[1] || false }); } }, { name: "moreProductsBulk", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/MoreProductsBulk"); }, body: function (args) { return args[0]; } }, { name: "moreCopyItems", uri: function (args) { return _this.formatUri("/api/Campaign/MoreCopyItems", [], { proposalProductItemId: args[0] }); } }, { name: "moreBanners", uri: function (args) { return _this.formatUri("/api/Campaign/MoreBanners", [], { proposalCopyItemId: args[0] }); } }, { name: "evaluate", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/Evaluate"); }, body: function (args) { return args[0]; } }, { name: "evaluateBulk", uri: "/api/Campaign/EvaluateBulk" }, { name: "prepareCampaignGroupDraft", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/PrepareCampaignGroupDraft"); }, body: function (args) { return args[0]; } }, { name: "bulkPrepareCampaign", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/BulkPrepareCampaign"); }, body: function (args) { return args[0]; } }, { name: "handleCampaignPayment", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/HandleCampaignPayment", args); } }, { name: "renameCampaign", method: "POST", uri: function (args) { return _this.formatUri("/api/Campaign/Rename", [args[0]]); }, body: function (args) { return JSON.stringify(args[1]); } }, { name: "getSeo", uri: function (args) { return _this.formatUri("/api/Campaign/Seo", [], { businessName: args[0] }); } }, { name: "getDeliveryDays", method: "GET", uri: function (args) { return _this.formatUri("/api/Campaign/Bulk/" + args[0], undefined, undefined); } }, { name: "getBulkMaxBudget", method: "GET", uri: "/api/Campaign/MaxBudget" }) || this;
        if (dev.fakeCampaign) {
            _this.evaluate = function () { return Promise.resolve(JSON.parse('{"Proposals":[{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"DISPLAYUU","Efficacy":1.0,"MinBudget":0.0,"MaxBudget":0.0},"Id":"ec13b17e65de40759e0deb5965d30b38","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYUU","CampaignProviderId":"APPNEXUS","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SOCIALFB","Efficacy":0.9,"MinBudget":0.0,"MaxBudget":0.0},"Id":"9e53734547874c698359abb8a31fd497","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SOCIALFB","CampaignProviderId":"FACEBOOK","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"DISPLAYCLICK","Efficacy":0.8,"MinBudget":0.0,"MaxBudget":0.0},"Id":"764484b08ed049ed8634c59998833976","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYCLICK","CampaignProviderId":"APPNEXUS","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SEARCHGOOGLE","Efficacy":0.3,"MinBudget":0.0,"MaxBudget":0.0},"Id":"61b6dc80599146ae95014daf5b5360f7","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SEARCHGOOGLE","CampaignProviderId":"GOOGLE","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SMS","Efficacy":0.2,"MinBudget":0.0,"MaxBudget":0.0},"Id":"3f619106feb14c709c52d9efc9840745","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SMS","CampaignProviderId":"APPNEXUS","Products":[]}],"Tracing":null,"MobileUserRadius":1500,"CompetitorsNumber":20}')); };
            _this.moreProducts = function () { return Promise.resolve(JSON.parse('{"ProposalInfo":{"CreatedOn":"2017-06-06T08:20:48.2675292+00:00","Name":"","Description":"DISPLAYUU","Efficacy":1.0,"MinBudget":0.0,"MaxBudget":0.0},"Id":"c542f2ad36cc45dcb9491f16b2eec779","EstimatedDuration":"14.00:00:00","Tracing":"AdvertisementType: DISPLAYUU MobileUsers: 34508 MobileUserRadius: 3000 AreaType: Urbana ","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYUU","CampaignProviderId":"APPNEXUS","Products":[{"Id":"AQc=","Price":180.00,"VAT":39.60,"EstimatedDuration":"30.00:00:00","Value":6000,"Description":"Descrizione prod - lorem ipsum - 7","CopyItems":[]},{"Id":"AQk=","Price":225.00,"VAT":49.50,"EstimatedDuration":"30.00:00:00","Value":7500,"Description":"Descrizione prod - lorem ipsum - 9","CopyItems":[]},{"Id":"AQs=","Price":300.00,"VAT":66.00,"EstimatedDuration":"30.00:00:00","Value":10000,"Description":"Descrizione prod - lorem ipsum - 11","CopyItems":[]},{"Id":"AQ0=","Price":450.00,"VAT":99.00,"EstimatedDuration":"30.00:00:00","Value":15000,"Description":"Descrizione prod - lorem ipsum - 13","CopyItems":[]}]}')); };
            _this.moreCopyItems = function () { return Promise.resolve(JSON.parse('{"Id":"AQc=","Price":180.00,"VAT":39.60,"EstimatedDuration":"30.00:00:00","Value":6000,"Description":"Descrizione prod - lorem ipsum - 7","CopyItems":[{"SuggestedTitle":"Ordina ciò che vuoi.","SuggestedDescription":"Il nostro menù è così vario che faremo fatica a proporti qualcosa che non corrisponda esattamente a ciò che desideri. Vieni a provarlo.","Id":"a407d88246b54818841d43138fec87c2","BannerIds":["IT.RS0100a.0101.0100-a501"]},{"SuggestedTitle":"C’è più gusto nella tradizione.","SuggestedDescription":"L’eccellenza a tavola non si trova dappertutto.Smetti di cercarla: ti proponiamo un menù che riscopre la tradizione, solo con ingredienti freschi e di stagione.","Id":"a67565a905ae4a879fce3ef7a59f7b68","BannerIds":["IT.RS0100a.0202.0100- a102"]},{"SuggestedTitle":"Autentico.Locale.Buono.","SuggestedDescription":"Ti proponiamo un’esperienza culinaria unica in una location d’eccezione.Riscopri il sapore dell’autenticità. Vieni a trovarci. ","Id":"ee57a7ab8b1a447f8149e94fbf7c4619","BannerIds":["IT.RS0100a.0303.0100-a203"]}]}')); };
        }
        if (dev.fakeGeocodeAddress) {
            _this.getSeo = function () { return Promise.resolve(JSON.parse('"anima-cozze"')); };
        }
        return _this;
    }
    return CampaignServiceAgent;
}(AutoServiceAgent));
var InvoiceServiceAgent = /** @class */ (function (_super) {
    __extends(InvoiceServiceAgent, _super);
    function InvoiceServiceAgent(context) {
        var _this = _super.call(this, context, { name: "prepareForCampaign", method: "POST", uri: function (args) { return _this.formatUri("/api/Invoice/PrepareForCampaign", [args[0]]); }, body: function (args) { return args[1]; } }, { name: "prepareForCampaignGroup", method: "POST", uri: function (args) { return _this.formatUri("/api/Invoice/PrepareForCampaignGroup", [args[0]]); }, body: function (args) { return args[1]; } }, { name: "get", method: "GET", uri: "/api/Invoice" }) || this;
        return _this;
    }
    return InvoiceServiceAgent;
}(AutoServiceAgent));
var SemanticWebServiceAgent = /** @class */ (function (_super) {
    __extends(SemanticWebServiceAgent, _super);
    function SemanticWebServiceAgent(context) {
        var _this = _super.call(this, context, { name: "searchLocation", uri: function (args) { return _this.formatUri("/api/SemanticWeb/SearchLocation", args); } }, { name: "search", uri: function (args) { return _this.formatUri("/api/SemanticWeb/Search", args); } }, { name: "getDetails", uri: function (args) { return _this.formatUri("/api/SemanticWeb/GetDetails", [args[0], args[1]], { latitude: args[2].latitude, longitude: args[2].longitude, isBulkUpload: args[3], proposalBulkId: args[4] }); } }, { name: "getBulkDetails", uri: function (args) { return _this.formatUri("/api/SemanticWeb/GetBulkDetails", [args[0], args[1]]); } }, { name: "GeocodeAddress", uri: function (args) { return _this.formatUri("/api/SemanticWeb/GeocodeAddress", args); } }, { name: "Geocode", uri: function (args) { return _this.formatUri("/api/SemanticWeb/Geocode", [args[0], args[1], args[2]]); } }, { name: "GeocodeLocationFile", method: "POST", uri: "/api/SemanticWeb/Geocode/File", body: function (args) { return args[0]; } }) || this;
        if (dev.fakeSemanticWeb) {
            _this.getDetails = function () { return Promise.resolve(JSON.parse('{"Url":"https://maps.google.com/?cid=9154458214224756504","Website":"http://illorenzaccio.wordpress.com/","PhoneNumber":"030 220457","PotentialUsers":50547,"MaleStats":26819.957859411254,"MaleStatsPercentage":0.53,"MaleStatsAverageAge":29.0,"FemaleStats":23727.466440728695,"FemaleStatsPercentage":0.47,"FemaleStatsAverageAge":39.0,"BugdetMinValue":10,"BugdetMaxValue":60,"PublicOfficesNumber":43,"PrivatesNumber":13,"PublicTransportNumber":14,"Radius":3000,"Tracing":null,"Population":610,"Address":"Via Cipro, 78, 25124 Brescia BS","Geometry":{"location":{"lat":45.523879499999993,"lng":10.2103229}},"ID":"ChIJxXJsdHZ2gUcRGP8FUj4rC38","Name":"Il Lorenzaccio","Categories":[{"Category":"RS0100","Description":"Ristorante","Score":100.0,"Competitors":20},{"Category":"RS0101","Description":"Ristorante di carne","Score":0.0,"Competitors":20},{"Category":"RS0102","Description":"Ristorante di pesce","Score":0.0,"Competitors":17},{"Category":"RS0103","Description":"Trattoria","Score":0.0,"Competitors":20}]}')); };
        }
        if (dev.fakeGeocodeAddress) {
            _this.GeocodeAddress = function () { return Promise.resolve(JSON.parse('{ "PlaceId": "ChIJV6OfdBXBhkcRvXTuKvwoTZo", "StreetNumber": "41", "Address": "Corso Sempione", "City": "Milano","Province": "MI", "Region": "Lombardia","Country": "Italy", "PostalCode": "20145", "Location":{"lat": 45.4811075,"lng": 9.1644886}, "FormattedAddress": "Corso Sempione, 41, 20145 Milano MI, Italy"}')); };
        }
        return _this;
    }
    return SemanticWebServiceAgent;
}(AutoServiceAgent));
var GoogleServiceAgent = /** @class */ (function () {
    function GoogleServiceAgent() {
    }
    GoogleServiceAgent.prototype.geocode = function (location) {
        return new Promise(function (resolver, reject) {
            var geocoder = new google.maps.Geocoder();
            var request = (typeof location === "string") ? { address: location } : { location: location };
            geocoder.geocode(request, function (r, s) {
                if (r.length > 0) {
                    resolver(r[0]);
                }
                else {
                    reject(s);
                }
            });
        });
    };
    return GoogleServiceAgent;
}());
var SecurityServiceAgent = /** @class */ (function (_super) {
    __extends(SecurityServiceAgent, _super);
    function SecurityServiceAgent(context) {
        return _super.call(this, context, { name: "signupAgency", method: "POST", uri: function (args) { return "/api/security/agency"; }, body: function (args) { return args[0]; } }) || this;
    }
    return SecurityServiceAgent;
}(AutoServiceAgent));
var AgencyServiceAgent = /** @class */ (function (_super) {
    __extends(AgencyServiceAgent, _super);
    function AgencyServiceAgent(context) {
        var _this = _super.call(this, context, { name: "get", method: "GET", uri: "/api/agency" }, { name: "getAgency", method: "GET", uri: "/api/agency/getAgency" }, { name: "creditBalance", method: "GET", uri: "/api/agency/creditBalance" }, { name: "askCredit", method: "POST", uri: "/api/agency/askCredit", body: function (args) { return args[0]; } }, { name: "updateAgency", method: "PUT", uri: "/api/agency/UpdateAgency", body: function (args) { return args[0]; } }, { name: "getTransactions", method: "GET", uri: function (args) { return _this.formatUri("/api/agency/transactions", undefined, { $top: args[0], $skip: args[1] }); } }) || this;
        return _this;
    }
    return AgencyServiceAgent;
}(AutoServiceAgent));
var ReportServiceAgent = /** @class */ (function (_super) {
    __extends(ReportServiceAgent, _super);
    function ReportServiceAgent(context) {
        var _this = _super.call(this, context, { name: "groupsSummary", method: "GET", uri: "/api/report/groupssummary" }, { name: "groups", method: "GET", uri: function (args) { return _this.formatUri("/api/report/groups", undefined, { status: args[0], $top: args[1], $skip: args[2] }); } }, { name: "groupsCount", method: "GET", uri: function (args) { return _this.formatUri("/api/report/groups", undefined, { $select: "Id", status: args[0] }); }, responseCallback: function (r) { return r.length; } }, { name: "getCampaignById", method: "GET", uri: function (args) { return _this.formatUri("/api/report/" + args[0], undefined, undefined); } }, { name: "getCampaignGroupById", method: "GET", uri: function (args) { return _this.formatUri("/api/report/group/" + args[0], undefined, undefined); } }, { name: "getCampaignDetailsById", method: "GET", uri: function (args) { return _this.formatUri("/api/report/" + args[0] + "/details", undefined, undefined); } }, { name: "getCampaignDetailsByGroupId", method: "GET", uri: function (args) { return _this.formatUri("/api/report/group/" + args[0] + "/details", undefined, undefined); } }, { name: "campaigns", method: "GET", uri: function (args) { return _this.formatUri("/api/report", undefined, { status: args[0], $top: args[1], $skip: args[2] }); } }, { name: "getCampaignsModeration", method: "GET", uri: "/api/report/moderation" }, { name: "GetReportPowerBI", method: "GET", uri: function (args) { return _this.formatUri("/api/report/group/" + args[0] + "/powerbi", undefined, undefined); } }) || this;
        return _this;
    }
    return ReportServiceAgent;
}(AutoServiceAgent));
var UserSession = /** @class */ (function () {
    function UserSession() {
        this.pdvs = [];
        this.agencyInfo = new AgencyInfo();
        this.manualData = new ManualData();
        this.flow3 = new Flow3();
        this.bulkData = new BulkData();
        this.tailoredCustomContents = new Map();
        this.gender = GenderType.BOTH;
        this.workDays = 2;
    }
    Object.defineProperty(UserSession.prototype, "formattedBalance", {
        // Property
        get: function () {
            return this.agencyInfo.balance.toPriceFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "originalBusinessName", {
        get: function () {
            return (this.pdvs.length > 0) ? this.pdvs[0].detail.Name : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "productDescription", {
        get: function () {
            return this._productDescription;
        },
        set: function (value) {
            this._productDescription = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "discount", {
        get: function () {
            return this._discount;
        },
        set: function (value) {
            this._discount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "showPrice", {
        get: function () {
            return !this.agencyInfo.agency.IsAgencySales;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "totalPotentialUsers", {
        get: function () {
            return this.pdvs.Sum(function (p) { return p.detail.PotentialUsers; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "totalUniqueUsers", {
        get: function () {
            return this.pdvs.Sum(function (p) { return p.selectedProduct && p.selectedProduct.item.Value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "totalPrice", {
        get: function () {
            var sum = this.pdvs.Sum(function (p) { return p.selectedProduct && p.selectedProduct.item.Price; });
            if (this.tailored) {
                // TODO: evaluate better implementation
                sum += 50;
            }
            return sum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "totalVatPrice", {
        get: function () {
            return this.totalPrice * 1.22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "formattedTotalPrice", {
        get: function () {
            return this.totalPrice.toPriceFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "searchRow2Description", {
        get: function () {
            var description = (this.selectedCopyItem && this.selectedCopyItem.SuggestedRow2) || "";
            if (description) {
                description = description.replace("[prezzo]", this.discount).replace("[sconto]", this.discount);
                description = description.replace("[il tuo prodotto qui]", this.productDescription).replace("[il tuo prodotto qui ]", this.productDescription);
            }
            return description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "getCustomName", {
        get: function () {
            return this.originalBusinessName;
        },
        enumerable: true,
        configurable: true
    });
    // Method
    UserSession.prototype.clear = function () {
        //this.isFlow2 = false;
        this.pdvs = [];
        this.manualData.isSet = false;
        this.flow3.address = undefined;
        this.flow3.radius = undefined;
    };
    UserSession.prototype.removePdv = function (pdv) {
        this.pdvs.Remove(pdv);
        for (var p = 0; p < this.pdvs.length; p++) {
            this.pdvs[p].number = p + 1;
        }
    };
    UserSession.prototype.getPdvById = function (id) {
        var r = this.pdvs.FirstOrDefault(function (p) { return p.id == id; });
        return (r === null) ? undefined : r;
    };
    UserSession.prototype.addPdv = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addPdvAsync(result.Name, result.Address, result.Geometry.location, result.ID)];
                    case 1:
                        p = _a.sent();
                        // Primo pdv, determino il nome esatto dell'insegna
                        if (this.pdvs.length === 1) {
                            this.businessName = result.Name;
                        }
                        this.pdvs.push(p);
                        return [2 /*return*/, p];
                }
            });
        });
    };
    UserSession.prototype.addBulkPdv = function (name, addressPDV, addressCDE, landingUrl, trackingPixel, level, googleId, detail) {
        return __awaiter(this, void 0, void 0, function () {
            var placeId, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        placeId = googleId !== undefined ? googleId : addressCDE.PlaceId;
                        return [4 /*yield*/, this.addPdvAsync(name, addressCDE.FormattedAddress, addressCDE.Location, placeId, detail)];
                    case 1:
                        p = _a.sent();
                        p.detail.Name = name;
                        p.detail.Address = addressCDE.FormattedAddress;
                        p.geocodeAddressPDV = addressPDV;
                        p.geocodeAddressCDE = addressCDE;
                        p.bulkLandingUrl = landingUrl || "";
                        p.bulkTrackingPixel = trackingPixel || "";
                        p.level = level || 1;
                        p.phoneNumber = "";
                        this.pdvs.push(p);
                        return [2 /*return*/, p];
                }
            });
        });
    };
    UserSession.prototype.addPdvAsync = function (name, locationAddress, location, googleId, detail) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = new Pdv(this);
                        p.number = this.pdvs.length + 1;
                        p.address = locationAddress;
                        p.originalLocation = location;
                        p.locationAddress = locationAddress;
                        p.location = location;
                        p.id = (this.pdvs.Select(function (pm) { return parseInt(pm.id); }).Max() + 1).toString();
                        p.googleId = googleId;
                        p.firstNumberInsert = p.number;
                        return [4 /*yield*/, p.load(detail)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        });
    };
    UserSession.prototype.duplicatePdv = function (originalId, mapItem) {
        return __awaiter(this, void 0, void 0, function () {
            var pdv, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pdv = this.getPdvById(originalId);
                        if (!pdv)
                            return [2 /*return*/];
                        p = new Pdv(this);
                        p.number = this.pdvs.length + 1;
                        p.address = pdv.address;
                        // Duplico con l'indirizzo di partenza originale del pdv clonato
                        p.locationAddress = pdv.address;
                        p.originalLocation = pdv.originalLocation;
                        p.location = pdv.originalLocation;
                        p.googleId = pdv.googleId;
                        p.id = mapItem.id;
                        return [4 /*yield*/, p.load()];
                    case 1:
                        _a.sent();
                        //p.detail = pdv.detail;
                        //p.categoryDetail = pdv.categoryDetail;
                        return [4 /*yield*/, p.loadProducts(true)];
                    case 2:
                        //p.detail = pdv.detail;
                        //p.categoryDetail = pdv.categoryDetail;
                        _a.sent();
                        this.pdvs.push(p);
                        return [2 /*return*/, p];
                }
            });
        });
    };
    UserSession.prototype.getTailoredCustomContentsUris = function () {
        if (!this.tailored)
            return undefined;
        var result = [];
        this.tailoredCustomContents.forEach(function (v) { return result.push(v); });
        return result;
    };
    UserSession.prototype.evaluateBulk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var campaignServiceAgent;
            return __generator(this, function (_a) {
                campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                return [2 /*return*/, campaignServiceAgent.evaluateBulk()];
            });
        });
    };
    UserSession.prototype.moreProductsBulk = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var campaignServiceAgent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                        return [4 /*yield*/, campaignServiceAgent.moreProductsBulk(request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserSession;
}());
var Pdv = /** @class */ (function () {
    function Pdv(session) {
        this.session = session;
        /**
            Informazioni personalizzate inserite tramite scenario 2
        */
        this.manualData = new ManualPdvData();
        this.products = [];
    }
    Object.defineProperty(Pdv.prototype, "phoneNumber", {
        get: function () {
            return this._phoneNumber;
        },
        set: function (value) {
            this._phoneNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "clickToCallCustom", {
        get: function () {
            return this._clickToCall;
        },
        set: function (value) {
            this._clickToCall = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "clickToMapCustom", {
        get: function () {
            return this._clickToMap;
        },
        set: function (value) {
            this._clickToMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "mapItem", {
        get: function () {
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
                        Ranking: (!this.evaluation || this.evaluation.Ranking == null) ? [3, 6, 7] : this.evaluation.Ranking,
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "clickToCall", {
        get: function () {
            return this.clickToCallCustom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "clickToMap", {
        get: function () {
            return this.clickToMapCustom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "uriClickToMap", {
        get: function () {
            if (this.clickToMap == undefined || this.clickToMap == null)
                return "";
            else {
                if (this.clickToMap == this.address)
                    return "https://www.google.it/maps/?q={0}+{1}".uriFormat(this.session.originalBusinessName, this.clickToMap);
                else
                    return "https://www.google.it/maps/?q={0}".uriFormat(this.clickToMap);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "formattedPrices", {
        get: function () {
            if (this.selectedProduct) {
                return this.selectedProduct.item.Price.toPriceFormat();
            }
            return ["-", "-"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "formattedMaleStats", {
        get: function () {
            return Math.round(this.detail.MaleStats).toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pdv.prototype, "formattedFemaleStats", {
        get: function () {
            return Math.round(this.detail.FemaleStats).toString();
        },
        enumerable: true,
        configurable: true
    });
    Pdv.prototype.getProductsGrouped = function (by, gender) {
        if (gender === void 0) { gender = GenderType.BOTH; }
        return this.products
            .Where(function (p) { return p.item.GenderTargets == gender; })
            .map(function (p, i) { return ({ product: p, index: i }); })
            .GroupBy(function (p) { return Math.floor(p.index / by); })
            .map(function (p) { return p.map(function (pp) { return pp.product; }); });
    };
    Pdv.prototype.getCustomBannerUris = function () {
        if (!this.manualData.isSet && !this.session.manualData.isSet)
            return [];
        return [
            this.getBannerUri(BannerSize.Format1200x628),
            this.getBannerUri(BannerSize.Format640x1024),
            this.getBannerUri(BannerSize.Format2020x1320),
            this.getBannerUri(BannerSize.Format300x250),
            this.getBannerUri(BannerSize.Format320x480),
            this.getBannerUri(BannerSize.Format320x50),
            this.getBannerUri(BannerSize.Format728x90),
        ];
    };
    Pdv.prototype.getBannerUri = function (size, customBannerId) {
        if (customBannerId === void 0) { customBannerId = undefined; }
        var defaultUri = "/assets/img/placeholders/" + BannerSize[size] + ".jpg";
        //if (this.manualData.isSet && this.manualData.customBanners.has(size)) {
        //    return this.manualData.customBanners.get(size) || defaultUri;
        //}
        if (this.session.manualData.isSet) {
            return this.session.manualData.customBanners.get(size) || defaultUri;
        }
        if (!this.session.selectedBannerId) {
            return defaultUri;
        }
        return "{0}/api/Banner/Preview/{1}/{2}/{3}/{4}/{5}/{6}/{7}".uriFormat(baseUrl, customBannerId || this.session.selectedBannerId, size, (this.session.businessName && this.session.businessName.length > 0) ? this.session.businessName : "[la tua insegna qui]", this.clickToMap, this.clickToCall, (this.session.discount && this.session.discount.length > 0) ? parseFloat(this.session.discount).toLocaleString() : "[XX]", (this.session.productDescription && this.session.productDescription.length > 0) ? this.session.productDescription : "[il tuo prodotto qui]");
    };
    Pdv.prototype.load = function (detail) {
        return __awaiter(this, void 0, void 0, function () {
            var semanticWebServiceAgent, _a, _b, _c, c, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!detail) return [3 /*break*/, 1];
                        this.detail = detail;
                        return [3 /*break*/, 5];
                    case 1:
                        semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                        _a = this;
                        return [4 /*yield*/, semanticWebServiceAgent.getDetails(this.googleId, this.session.businessName, { latitude: this.location.lat, longitude: this.location.lng })];
                    case 2:
                        _a.detail = _f.sent();
                        _b = this;
                        return [4 /*yield*/, semanticWebServiceAgent.GeocodeAddress(this.locationAddress)];
                    case 3:
                        _b.geocodeAddressCDE = _f.sent();
                        _c = this;
                        return [4 /*yield*/, semanticWebServiceAgent.GeocodeAddress(this.address)];
                    case 4:
                        _c.geocodeAddressPDV = _f.sent();
                        _f.label = 5;
                    case 5:
                        // Cerco la categoria per avere i competitor
                        // Tolgo eventuali 00 messi per uniformità di codice a 6 cifre; businessCategoryId invece può essere a 4
                        if (this.session.businessCategoryId) {
                            c = this.detail.Categories.FirstOrDefault(function (c) { return c.Category.replace("00", "") == _this.session.businessCategoryId; });
                            this.categoryDetail = (c !== null) ? c : undefined;
                        }
                        else if (this.session.isFlow2 || this.session.flow3.address || detail) {
                            // Cerco in automatico: si verifica nel flusso 2 e 3 dove non viene chiesta la categoria
                            this.session.businessCategoryId = this.detail.Categories[0].Category.replace("00", "");
                            this.categoryDetail = this.detail.Categories[0];
                        }
                        this.phoneNumber = this.detail.PhoneNumber ? this.detail.PhoneNumber.replace(/\D/g, '') : null;
                        // Set default value cta
                        this.clickToMapCustom = this.address;
                        this.clickToCallCustom = null; // Default value ctc
                        _d = this;
                        if (!(this.session.pdvs.length == 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, ServiceAgentFactory.get(CampaignServiceAgent).getSeo(this.session.businessName)];
                    case 6:
                        _e = _f.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _e = this.session.pdvs[0].seo.match(/\d+/g) != null
                            ? this.session.pdvs[0].seo.replace(/\d+/g, (+this.session.pdvs[0].seo.match(/\d+/)[0] + this.session.pdvs.length).toString())
                            : this.session.pdvs[0].seo + "-" + this.session.pdvs.length;
                        _f.label = 8;
                    case 8:
                        _d.seo = _e;
                        return [2 /*return*/];
                }
            });
        });
    };
    Pdv.prototype.reset = function () {
        this.locationAddress = this.address;
        this.location = this.originalLocation;
    };
    Pdv.prototype.loadProducts = function (forceEvaluation) {
        if (forceEvaluation === void 0) { forceEvaluation = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, p, campaignServiceAgent, proposalItem;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.evaluation || forceEvaluation)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.evaluate()];
                    case 1:
                        _a.evaluation = _b.sent();
                        _b.label = 2;
                    case 2:
                        p = this.evaluation.Proposals.FirstOrDefault(function (p) { return p.AdvertisementType.toString() === AdvertisementType[_this.session.advertisementType]; });
                        if (p === null)
                            throw new Error("Cannot find proposal for " + AdvertisementType[this.session.advertisementType]);
                        this.proposal = p;
                        campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                        return [4 /*yield*/, campaignServiceAgent.moreProducts(this.proposal.Id)];
                    case 3:
                        proposalItem = _b.sent();
                        this.products = proposalItem.Products.Select(function (c) { return new Product(_this, c); });
                        this.selectedProduct = this.products[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Pdv.prototype, "reachWording", {
        get: function () {
            var result = "";
            if (this.session.advertisementType == AdvertisementType.DISPLAYCLICK || this.session.advertisementType == AdvertisementType.SEARCHGOOGLE) {
                result = "Click";
            }
            else if (this.session.advertisementType == AdvertisementType.FLYER) {
                result = "Impressions";
            }
            else {
                result = "Utenti Unici";
            }
            result += this.session.gender == GenderType.FEMALE ? " Donna" : this.session.gender == GenderType.MALE ? " Uomo" : "";
            return (result);
        },
        enumerable: true,
        configurable: true
    });
    Pdv.prototype.evaluate = function () {
        var campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
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
    };
    return Pdv;
}());
var BulkData = /** @class */ (function () {
    function BulkData() {
        this.orderBy = "Level";
    }
    Object.defineProperty(BulkData.prototype, "enhancementBudget", {
        get: function () {
            return this.Landings.length <= 100 ? 0 : this.Landings.length - 100;
        },
        enumerable: true,
        configurable: true
    });
    return BulkData;
}());
var ManualData = /** @class */ (function () {
    function ManualData() {
        this.isSet = false;
        this.customBanners = new Map();
    }
    return ManualData;
}());
var ManualPdvData = /** @class */ (function () {
    function ManualPdvData() {
        this.isSet = false;
        this.customBanners = new Map();
    }
    return ManualPdvData;
}());
var Product = /** @class */ (function () {
    function Product(pdv, item) {
        this.pdv = pdv;
        this.item = item;
    }
    Object.defineProperty(Product.prototype, "isSelected", {
        get: function () {
            return this.pdv.selectedProduct === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "showPrice", {
        get: function () {
            return this.pdv.session.showPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "formattedPrice", {
        get: function () {
            return this.item.Price.toPriceFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "reachWording", {
        get: function () {
            return this.pdv.reachWording;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
var AgencyInfo = /** @class */ (function () {
    function AgencyInfo() {
    }
    Object.defineProperty(AgencyInfo.prototype, "onlinePayment", {
        get: function () {
            return this.agency.PaymentMethodId === "BANCASELLA-AGENCY";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgencyInfo.prototype, "postPayment", {
        get: function () {
            return this.agency.PaymentMethodId === "POSTPAID";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgencyInfo.prototype, "prePayment", {
        get: function () {
            return this.agency.PaymentMethodId === "PREPAID";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgencyInfo.prototype, "canAskCredit", {
        get: function () {
            return this.prePayment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgencyInfo.prototype, "currentUserIsAdmin", {
        get: function () {
            return this.agency && this.agency.IsAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgencyInfo.prototype, "isAtClosure", {
        get: function () {
            return this.agency.AgencyPayMode === "ATCLOSURE";
        },
        enumerable: true,
        configurable: true
    });
    AgencyInfo.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serviceAgent, agencies, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        serviceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
                        return [4 /*yield*/, serviceAgent.get()];
                    case 1:
                        agencies = _b.sent();
                        if (agencies.length == 0) {
                            throw new Error("No agency available");
                        }
                        this.agency = agencies[0];
                        _a = this;
                        return [4 /*yield*/, serviceAgent.creditBalance()];
                    case 2:
                        _a.balance = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AgencyInfo;
}());
var Flow3 = /** @class */ (function () {
    function Flow3() {
    }
    return Flow3;
}());
var NavigationService = /** @class */ (function () {
    function NavigationService(baseUrl) {
        this.baseUrl = baseUrl;
        this._pages = {};
        this._journal = [];
        // Pagine ad accesso anonimo
        this._anonymousKeys = ["index", "registrati", "errore"];
        // Pagine ad accesso autenticato, ma anche se è la prima pagina ad essere caricata
        this._authenticatedKeys = ["dashboard", "account", "pagamentocompletato", "pagamentoerrore", "sceltaflusso"];
        this._userSession = new UserSession();
        this._insightsPane = new Sidebar();
        this._navigo = new Navigo(null, true);
        this._navigo.on("*", this.navigoOn.bind(this)).resolve();
        $(document).on("click", ".btn-back:not([data-navigo])", function () { return history.back(); });
        // Chiusura automatica del menu di sinistra quando si clicca su un link
        $(document).on("click", "#menu-left a", function () { return $("#open-menu").click(); });
        this.setHomeButton();
        this.setLoginButton();
    }
    Object.defineProperty(NavigationService.prototype, "currentPage", {
        get: function () {
            return (this._currentPage) ? this._currentPage.page : undefined;
        },
        enumerable: true,
        configurable: true
    });
    NavigationService.prototype.setLoginButton = function () {
        var _this = this;
        var b = ServiceAgentFactory.context.accessTokenExpired;
        var loginButton = $("[data-page-loginout]")
            .text(b ? "Login" : "Logout")
            .attr("href", b ? getLoginUrl() : "#")
            .click(function (e) {
            if (!ServiceAgentFactory.context.accessTokenExpired) {
                e.preventDefault();
                setTimeout(_this.navigateToStart.bind(_this), 10);
            }
            // Annullo sempre il cookie
            ServiceAgentFactory.context.accessToken = undefined;
        });
    };
    NavigationService.prototype.setHomeButton = function () {
        var b = ServiceAgentFactory.context.accessTokenExpired;
        $("[data-page-home]").attr("href", b ? "/" : "/#home-flusso-3");
    };
    NavigationService.prototype.checkAadResponse = function (current) {
        var _this = this;
        var query = current.url.parseQuery();
        // Errore da AAD
        if (query["error"]) {
            console.error("Error from Azure AAD", query["error"]);
            return function () { return _this.navigateToStart(); };
        }
        else if (query["id_token"]) {
            // Decode del token
            var idToken = query["id_token"] || "";
            // Imposto il token
            ServiceAgentFactory.context.accessToken = idToken;
            // Lo azzero per evitare che cerchi una pagina con questo nome
            current.url = "";
            var newKey_1 = query["state"] || "home-flusso-3";
            // Ritorno di navigare alla pagina di scelta categoria
            return function () { return _this._navigo.navigate(newKey_1); };
        }
        return undefined;
    };
    NavigationService.prototype.navigateToStart = function () {
        document.location.href = "/";
    };
    NavigationService.prototype.checkBackNavigation = function (key) {
        // Cerco l'indice nella storia di navigazione
        var keyIndex = this._journal.lastIndexOf(key);
        if (keyIndex < 0)
            return false;
        // Controllo se sto navigando indietro di una pagina
        if (this._currentPage && this._journal.lastIndexOf(this._currentPage.key) == keyIndex + 1) {
            // Rimuovo quelli successivi
            keyIndex++;
        }
        for (var i = keyIndex; i < this._journal.length; i++) {
            var keyToRemove = this._journal[i];
            var pageToRemove = this._pages[keyToRemove];
            if (pageToRemove) {
                // Disattivo tutti gli eventi intercettati
                pageToRemove.html.find("*").off();
                // Rimuovo l'intero html
                pageToRemove.html.remove();
            }
            delete this._pages[keyToRemove];
            // Rimuovo anche dalla storia
            this._journal.splice(i, 1);
            i--;
        }
        return false;
    };
    NavigationService.prototype.navigoOn = function (p, query) {
        var _this = this;
        var postLoadAction;
        var current = this._navigo.lastRouteResolved();
        // Controllo eventuali callback da AAD
        postLoadAction = this.checkAadResponse(current);
        // Identifico la chiave, la classe da istanziare
        var key = current.url.toLowerCase().replace(/^\/+/, "").replace(/[#_-]+/g, "");
        if (key.length === 0 || key.indexOf("http") === 0) {
            // Fallback sulla prima pagina
            key = "index";
        }
        var isAnonymousKey = this._anonymousKeys.indexOf(key) >= 0;
        var isProtectedKey = this._authenticatedKeys.indexOf(key) >= 0;
        // Pagina protetta ad accesso diretto
        if (isProtectedKey) {
            if (ServiceAgentFactory.context.accessTokenExpired) {
                // Mando alla login
                document.location.href = getLoginUrl(key);
                return;
            }
        }
        else if (!(
        // Pagine anonime ad accesso diretto
        isAnonymousKey
            ||
                // Altre pagine protette con accesso dalla prima pagina
                (this._currentPage && !ServiceAgentFactory.context.accessTokenExpired))) {
            // Forzo la navigazione alla prima pagina
            this.navigateToStart();
            return;
        }
        // Sto navigando all'indietro
        if (this.checkBackNavigation(key)) {
            return;
        }
        // Cerco nella history la pagina
        var pageHistory = this._pages[key];
        if (!pageHistory) {
            // Cerco la classe da istanziare
            var pageClass = window[key];
            if (!pageClass) {
                throw Error("Cannot find class " + key);
            }
            // Istanzio la classe e creo la voce di history
            pageHistory = {
                page: new pageClass(),
                url: current.url.substr(1),
                key: key
            };
            pageHistory.page.navigo = this._navigo;
            pageHistory.page.userSession = this._userSession;
            pageHistory.page.sidebar = this._insightsPane;
            this._pages[key] = pageHistory;
            this._journal.push(key);
        }
        // Se l'html esiste già, nascondo gli altri elementi e lo mostro
        if (pageHistory.html) {
            this.changePage(pageHistory);
            if (postLoadAction)
                postLoadAction();
        }
        else {
            var cachebuster = "?" + Math.round(new Date().getTime() / 1000).toString();
            // Carico l'HTML da remote
            $.get(this.baseUrl + pageHistory.page.relativeUri + cachebuster, function (d, s, j) {
                // Parsing dell'HTML
                pageHistory.page.html = pageHistory.html = $("<div/>").html(d);
                // Aggiungo il nuovo elemento
                pageHistory.page.pagePlaceholder.append(pageHistory.html);
                // Aggiorno per gestire <a data-navigo>
                _this._navigo.updatePageLinks();
                // Gestisco il cambio di pagina
                _this.changePage(pageHistory, true);
                if (postLoadAction)
                    postLoadAction();
            }, "html");
        }
    };
    NavigationService.prototype.changePage = function (pageHistory, fireOnLoad) {
        if (fireOnLoad === void 0) { fireOnLoad = false; }
        if (this._currentPage) {
            this._currentPage.page.onNavigatedFrom();
            // Nascondo gli elementi
            this._currentPage.html.hide();
        }
        this._currentPage = pageHistory;
        // Mostro l'elemento
        pageHistory.html.show();
        window.scroll(0, 0);
        // Evento di caricamento pagina
        if (fireOnLoad === true) {
            pageHistory.page.onLoad();
        }
        pageHistory.page.onNavigatedTo();
    };
    return NavigationService;
}());
/// <reference path="../references.ts" />
var Page = /** @class */ (function () {
    function Page(relativeUri) {
        this.relativeUri = relativeUri;
        Handlebars.registerHelper('for', function (from, to, incr, block) {
            var accum = '';
            for (var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        });
        Handlebars.registerHelper("formatDate", function (datetime, format) {
            if (moment) {
                return moment(datetime).format(format);
            }
            else {
                return datetime;
            }
        });
    }
    Object.defineProperty(Page.prototype, "pagePlaceholder", {
        get: function () {
            return $("[data-page-html]");
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.onLoad = function () {
        var _this = this;
        this.html.find('input,textarea').characterCounter().trigger('change');
        setTimeout(function () {
            _this.html.find('input,textarea').trigger('change');
        }, 200);
    };
    Page.prototype.onNavigatedTo = function () {
        //setTimeout(() => {
        //    this.html.find('input').trigger('change');
        //    debugger;
        //}, 200);
        //console.log(`onNavigatedTo: ${this.relativeUri}`);
        this.setNavigationLinks();
    };
    Page.prototype.onNavigatedFrom = function () {
        //console.log(`onNavigatedFrom: ${this.relativeUri}`);
    };
    Page.prototype.setNavigationLinks = function () {
        $("[data-security-isadmin]").toggle(this.userSession.agencyInfo.currentUserIsAdmin);
    };
    Page.prototype.runAsync = function (run, policy, showLoader, isBulk) {
        if (policy === void 0) { policy = RunPolicy.AskForRetry; }
        if (showLoader === void 0) { showLoader = true; }
        if (isBulk === void 0) { isBulk = false; }
        return __awaiter(this, void 0, void 0, function () {
            var preloader_1, end_1, overlay_1, e_1, buttonTitle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 9]);
                        end_1 = false;
                        overlay_1 = $("<div class='overlay'></div>");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        // Blocca eventuali input nel frattempo che arriva il preloader
                        $(document.body).append(overlay_1);
                        // Mostro l'attesa solo se passa più di mezzo secondo
                        delay(500).then(function () {
                            overlay_1.remove();
                            // Solo se l'operazione non è già terminata
                            if (!end_1 && showLoader) {
                                var opt = isBulk ? { complex: true, strings: ['uno', 'due', 'tre', 'stella!'] } : null;
                                preloader_1 = CMS.preloader(opt);
                            }
                        });
                        return [4 /*yield*/, run()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        overlay_1.remove();
                        end_1 = true;
                        if (preloader_1) {
                            preloader_1.close();
                        }
                        return [7 /*endfinally*/];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        e_1 = _a.sent();
                        console.error(e_1);
                        buttonTitle = void 0;
                        switch (policy) {
                            case RunPolicy.RaiseError:
                                throw e_1;
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
                        return [4 /*yield*/, this.showAlert("Errore", e_1.message, buttonTitle)];
                    case 6:
                        // Mostro il messaggio di errore
                        _a.sent();
                        if (!(policy == RunPolicy.AskForRetry)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.runAsync(run, policy)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.showAlert = function (title, message, buttonTitle) {
        if (buttonTitle === void 0) { buttonTitle = "OK"; }
        return new Promise(function (resolve, reject) {
            var dialog;
            dialog = CMS.showAlert(title, message, [
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
    };
    Page.prototype.getTemplateScript = function (templateId, context) {
        var scriptTemplate = $("#" + templateId);
        var templateSource = scriptTemplate.html();
        var template = Handlebars.compile(templateSource);
        var html = template(context || this);
        return html;
    };
    Page.prototype.renderTemplateScript = function (templateId, context) {
        var scriptTemplate = this.html.find("#" + templateId);
        var html = this.getTemplateScript(templateId, context);
        var placeholderId = templateId + "Out";
        var placeholder = this.html.find("#" + placeholderId);
        if (placeholder.length === 0) {
            placeholder = $("<div/>").attr("id", placeholderId);
            placeholder.insertBefore(scriptTemplate);
        }
        return placeholder.html(html);
    };
    Object.defineProperty(Page.prototype, "reachWording", {
        get: function () {
            var result = "";
            if (this.userSession.advertisementType == AdvertisementType.DISPLAYCLICK || this.userSession.advertisementType == AdvertisementType.SEARCHGOOGLE) {
                result = "Click";
            }
            else if (this.userSession.advertisementType == AdvertisementType.FLYER) {
                result = "Impressions";
            }
            else {
                result = "Utenti Unici";
            }
            return (result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "disableHolidayWeekendDays", {
        get: function () {
            var days = [];
            var d = new Date();
            // Disabilito solo il primo weekend
            var diff = 7 - d.getDay();
            days.push(d.addDays(diff));
            days.push(d.addDays(--diff));
            // Easter Monday
            days.push(this.easterSunday(d.getFullYear()).addDays(1));
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
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.easterSunday = function (year) {
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
        return new Date(year, month - 1, day);
    };
    return Page;
}());
var RunPolicy;
(function (RunPolicy) {
    RunPolicy[RunPolicy["Try"] = 0] = "Try";
    RunPolicy[RunPolicy["AskForRetry"] = 1] = "AskForRetry";
    RunPolicy[RunPolicy["RaiseError"] = 2] = "RaiseError";
})(RunPolicy || (RunPolicy = {}));
var Sidebar = /** @class */ (function () {
    function Sidebar() {
        this.carouselPdiTemplate = $('#owl-dashboard .row.item:first').removeClass('hide').remove();
    }
    Sidebar.prototype.changeMode = function (mode) {
        this.editAddress.hide();
        this.owlDashboard.hide();
        this.insights.hide();
        this.sidebarButton.hide();
        switch (mode) {
            case SidebarMode.Full:
                this.editAddress.show();
                this.owlDashboard.show();
                this.sidebarButton.show();
                this.insights.show();
                break;
            case SidebarMode.ReadOnly:
                this.sidebarButton.show();
                this.owlDashboard.show();
                this.insights.show();
                break;
            case SidebarMode.Hidden:
                this.sidebarButton.show();
                if (this.isOpen) {
                    this.toggle();
                }
                break;
            case SidebarMode.Unavailable:
                if (this.isOpen) {
                    this.toggle();
                }
                break;
        }
    };
    Sidebar.prototype.toggle = function () {
        $("#open-sidebar").click();
    };
    Object.defineProperty(Sidebar.prototype, "isOpen", {
        get: function () {
            return $("#sidebar-dashboard").hasClass("open");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "insights", {
        get: function () {
            return $("#insights");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "sidebarButton", {
        get: function () {
            return $(".sidebar-button");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "editAddress", {
        get: function () {
            return $("#editAddress");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "locationAddress", {
        get: function () {
            return $("#locationAddress");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "owlDashboard", {
        get: function () {
            return $("#owl-dashboard");
        },
        enumerable: true,
        configurable: true
    });
    return Sidebar;
}());
var SidebarMode;
(function (SidebarMode) {
    SidebarMode[SidebarMode["Unavailable"] = 0] = "Unavailable";
    SidebarMode[SidebarMode["Hidden"] = 1] = "Hidden";
    SidebarMode[SidebarMode["ReadOnly"] = 2] = "ReadOnly";
    SidebarMode[SidebarMode["Full"] = 3] = "Full";
})(SidebarMode || (SidebarMode = {}));
/// <reference path="../../references.ts" />
var index = /** @class */ (function (_super) {
    __extends(index, _super);
    function index() {
        return _super.call(this, "index.html") || this;
    }
    index.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    index.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        $("[data-page-login]").click(function (e) {
            e.preventDefault();
            document.location.href = getLoginUrl();
        });
    };
    return index;
}(Page));
var sceltacategoria = /** @class */ (function (_super) {
    __extends(sceltacategoria, _super);
    function sceltacategoria() {
        return _super.call(this, "scelta-categoria.html") || this;
    }
    sceltacategoria.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //if (dev.preset === "single") {
        //    $("[name=address]").val("brescia");
        //    this._categoriesDictionary = { "Ristorante": "RS01" };
        //    $("#category").val("Ristorante");
        //    $("[name=businessName]").val("lorenzaccio");
        //} else if (dev.preset === "multi") {
        //    $("[name=address]").val("milano");
        //    this._categoriesDictionary = { "Tavola calda": "RS05" };
        //    $("#category").val("Tavola calda");
        //    $("[name=businessName]").val("panini durini");
        //}
        this.removeDuplicatedFields();
        // Form principale
        this.html.find("form:first").submit(this.formSubmit.bind(this));
        // Form di selezione multipla
        this.html.find("#popup-multi form").submit(this.popupSubmit.bind(this));
        this.html.on("click", "[data-nocategory]", this.noCategoryClick.bind(this));
        this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
    };
    sceltacategoria.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.removeDuplicatedFields();
    };
    sceltacategoria.prototype.removeDuplicatedFields = function () {
        if (this.userSession.isFlow2 === true) {
            this.html.find("[data-row-flow1]").remove();
        }
        else {
            this.html.find("[data-row-flow2]").remove();
        }
    };
    sceltacategoria.prototype.noCategoryClick = function (e) {
        e.preventDefault();
        var address = this.html.find("[name=address]").val();
        var businessName = this.html.find("[name=businessName]").val();
        this.searchPdv(businessName, undefined, address);
    };
    sceltacategoria.prototype.popupSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        this.html.find("#popup-multi").modal("hide");
        var item = this.html.find(".slogan.selected").data("item");
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userSession.businessName = item.Name;
                        return [4 /*yield*/, this.userSession.addPdv(item)];
                    case 1:
                        _a.sent();
                        this.gotoNextStep();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    sceltacategoria.prototype.gotoNextStep = function () {
        this.userSession.objective = EvaluationObjective[$(".selected[data-objective]").data("objective")];
        this.userSession.objectiveDescription = $(".selected[data-objective] p:first").text();
        if (!this.userSession.businessCategoryId)
            this.userSession.businessCategoryId = "No cat";
        if (this.userSession.isFlow2) {
            this.navigo.navigate("scelta-prodotto");
        }
        else {
            this.navigo.navigate("prodotto-obiettivo");
        }
    };
    sceltacategoria.prototype.searchPdv = function (businessName, businessCategoryId, address) {
        var _this = this;
        this.userSession.clear();
        this.userSession.businessCategoryId = businessCategoryId;
        this.userSession.businessName = businessName;
        this.userSession.searchText = businessName;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var semanticWebServiceAgent, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                        return [4 /*yield*/, semanticWebServiceAgent.searchLocation(address, this.userSession.businessName)];
                    case 1:
                        result = _a.sent();
                        this.userSession.clear();
                        if (!(result.Results.length > 0)) return [3 /*break*/, 5];
                        if (!(result.Results.length > 1)) return [3 /*break*/, 2];
                        this.renderTemplateScript("slogan-list-template", result.Results);
                        this.html.find(".slogan").each(function (i, e) {
                            $(e).data("item", result.Results[i]);
                        });
                        // Seleziono il primo
                        this.html.find(".slogan").first().trigger('click');
                        // Mostro la modale
                        this.html.find("#popup-multi").modal("show");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.userSession.addPdv(result.Results[0])];
                    case 3:
                        _a.sent();
                        this.gotoNextStep();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.showAlert("Non trovato", "Nessuna insegna trovata");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    sceltacategoria.prototype.formSubmit = function (e) {
        e.preventDefault();
        var address = $(e.target).find("[name=address]").val();
        var businessName = $(e.target).find("[name=businessName]").val();
        if (this.userSession.isFlow2 === false) {
            var businessCategoryId = this._categoriesDictionary[$("#category").val()];
            // Categoria obbligatoria, in questo caso
            if (!businessCategoryId) {
                this.html.find("#category").focus();
                return;
            }
            this.searchPdv(businessName, businessCategoryId, address);
        }
        else {
            this.searchPdv(businessName, undefined, address);
        }
    };
    sceltacategoria.prototype.prepareCategoryBloodhound = function (query, prepare) {
        prepare.url += encodeURIComponent(query) + "?$top=50";
        return prepare;
    };
    sceltacategoria.prototype.transformCategoryBloodhound = function (categories) {
        var _this = this;
        var result = {};
        this._categoriesDictionary = {};
        categories.forEach(function (v) {
            result[v.BusinessCategoryId] = v.BusinessCategoryDescription;
            _this._categoriesDictionary[v.BusinessCategoryDescription] = v.BusinessCategoryId;
        });
        return result;
    };
    sceltacategoria.prototype.selectedCategoryBloodhound = function (obj, datum) {
        console.log(this._categoriesDictionary[datum]);
    };
    return sceltacategoria;
}(Page));
/// <reference path="../../references.ts" />
var prodottoobiettivo = /** @class */ (function (_super) {
    __extends(prodottoobiettivo, _super);
    function prodottoobiettivo() {
        return _super.call(this, "prodotto-obiettivo.html") || this;
    }
    prodottoobiettivo.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        // Alcune categorie non sono consentite con Google
        if (["PH01"].findIndex(function (v) { return _this.userSession.businessCategoryId == v; }) >= 0) {
            this.html.find("[data-type='SEARCHGOOGLE']").hide();
        }
    };
    prodottoobiettivo.prototype.onNavigatedFrom = function () {
        _super.prototype.onNavigatedFrom.call(this);
        this.userSession.advertisementType = AdvertisementType[$(".selected[data-type]").data("type")];
        this.userSession.advertisementTypeDescription = $(".selected[data-type] .panel-heading").text();
        if (this.userSession.isFlow2 === false) {
            this.userSession.objective = EvaluationObjective[$(".selected[data-objective]").data("objective")];
            this.userSession.objectiveDescription = $(".selected[data-objective] p:first").text();
        }
    };
    prodottoobiettivo.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    return prodottoobiettivo;
}(Page));
/// <reference path="../../references.ts" />
var map = /** @class */ (function (_super) {
    __extends(map, _super);
    function map() {
        return _super.call(this, "map.html") || this;
    }
    map.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.html.find("[data-business-name]").text(this.userSession.originalBusinessName);
        $("#add-pdi-form").submit(this.addPdiFormSubmit.bind(this));
        this.sidebar.insights.find("form").submit(this.onInsightsForm.bind(this));
        // Form di selezione multipla
        this.html.find("#mpopup-multi form").submit(this.popupSubmit.bind(this));
        // Radio button gender
        this.html.find("#both").prop("checked", true);
        // attivo gender solo per duu e fb
        var gender = this.html.find('.gender');
        if ($.inArray(this.userSession.advertisementType, [0, 1, 2, 5]) >= 0)
            gender.removeClass('hide');
    };
    map.prototype.onChangeGender = function (e) {
        e.preventDefault();
        var gender = GenderType[e.currentTarget.id.toUpperCase()];
        this.userSession.gender = gender;
        var id = this._plugin.getSelected().id;
        var pdv = this.userSession.getPdvById(id);
        if (!pdv)
            return;
        this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
        // seleziono il primo importo se non selezionato
        //console.log('seleziono il primo elemento');
        var prices = this.html.find('#prices .owl-item.active');
        //console.log(prices);
        //console.log(prices.find('.a-box'));
        if (prices.find('.well.selected').length <= 0)
            prices.find('.well:first').trigger('click');
        else
            console.log(prices.find('.well.selected').length);
    };
    map.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Full);
        if (!this.sidebar.isOpen) {
            this.sidebar.toggle();
        }
    };
    map.prototype.updateNextButton = function () {
        // Abilito o disabilito il pulsante avanti
        this.html.find("[data-navigo]").toggleClass("disabled", this.userSession.pdvs.length == 0);
    };
    /**
        Pulsante "aggiungi pdv"
    */
    map.prototype.addPdiFormSubmit = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            var _this = this;
            return __generator(this, function (_a) {
                e.preventDefault();
                address = $(e.target).find("[name=address]").val();
                this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                    var semanticWebServiceAgent, result, addressesToRemove, _loop_2, item, _i, addressesToRemove_1, address_1, pdv;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                                return [4 /*yield*/, semanticWebServiceAgent.searchLocation(address, this.userSession.businessName)];
                            case 1:
                                result = _a.sent();
                                if (!(result.Results.length > 0)) return [3 /*break*/, 6];
                                if (!(result.Results.length > 1)) return [3 /*break*/, 2];
                                addressesToRemove = this.userSession.pdvs.Select(function (c) { return c.address; }).Distinct();
                                _loop_2 = function (address_1) {
                                    item = result.Results.First(function (c) { return c.Address == address_1; });
                                    if (item) {
                                        result.Results.Remove(item);
                                    }
                                };
                                for (_i = 0, addressesToRemove_1 = addressesToRemove; _i < addressesToRemove_1.length; _i++) {
                                    address_1 = addressesToRemove_1[_i];
                                    _loop_2(address_1);
                                }
                                if (result.Results.length == 0) {
                                    this.showAlert("Spiacenti", "Non siamo riusciti a trovare altri punti di vendita con nome \"" + this.userSession.businessName + "\" nella citt\uFFFD di " + address + ".");
                                    return [2 /*return*/];
                                }
                                this.renderTemplateScript("mslogan-list-template", result.Results);
                                this.html.find(".slogan").each(function (i, e) {
                                    $(e).data("item", result.Results[i]);
                                });
                                // Seleziono il primo
                                this.html.find(".slogan").first().trigger('click');
                                // Mostro la modale
                                this.html.find("#mpopup-multi").modal("show");
                                return [3 /*break*/, 5];
                            case 2: return [4 /*yield*/, this.userSession.addPdv(result.Results[0])];
                            case 3:
                                pdv = _a.sent();
                                // Temporaneamente non lo metto nella lista
                                this.userSession.pdvs.Remove(pdv);
                                return [4 /*yield*/, pdv.loadProducts()];
                            case 4:
                                _a.sent();
                                if (this.onNewPdv)
                                    this.onNewPdv(pdv);
                                _a.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                this.showAlert("Esito negativo", "Nessun risultato trovato con il nome " + this.userSession.businessName + " all'indirizzo " + address);
                                _a.label = 7;
                            case 7:
                                // Abilitato o disabilito il pulsante avanti
                                this.updateNextButton();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
        Form indirizzo sulla sidebar
    */
    map.prototype.onInsightsForm = function (e) {
        var _this = this;
        e.preventDefault();
        var id = this._plugin.getSelected().id;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var pdv, googleServiceAgent, result, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pdv = this.userSession.getPdvById(id);
                        if (!pdv)
                            return [2 /*return*/];
                        googleServiceAgent = new GoogleServiceAgent();
                        return [4 /*yield*/, googleServiceAgent.geocode(this.sidebar.locationAddress.val())];
                    case 1:
                        result = _a.sent();
                        // Aggiorno l'indirizzo
                        pdv.locationAddress = result.formatted_address;
                        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
                        // Aggiorno la posizione
                        pdv.location = {
                            lat: result.geometry.location.lat(), lng: result.geometry.location.lng()
                        };
                        // Aggiorno gli insights
                        return [4 /*yield*/, pdv.load()];
                    case 2:
                        // Aggiorno gli insights
                        _a.sent();
                        return [4 /*yield*/, pdv.loadProducts(true)];
                    case 3:
                        _a.sent();
                        products = pdv.getProductsGrouped(6, this.userSession.gender);
                        this.renderTemplateScript("products-template", products);
                        if (this.onUpdatePdv)
                            this.onUpdatePdv(pdv.mapItem);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    map.prototype.popupSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        this.html.find("#mpopup-multi").modal("hide");
        var item = this.html.find(".slogan.selected").data("item");
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var pdv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSession.addPdv(item)];
                    case 1:
                        pdv = _a.sent();
                        // Temporaneamente non lo metto nella lista
                        this.userSession.pdvs.Remove(pdv);
                        return [4 /*yield*/, pdv.loadProducts()];
                    case 2:
                        _a.sent();
                        if (this.onNewPdv)
                            this.onNewPdv(pdv);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    map.prototype.pdiReset = function (id) {
        var _this = this;
        var pdv = this.userSession.getPdvById(id);
        if (!pdv)
            return;
        pdv.reset();
        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Aggiorno gli insights
                    return [4 /*yield*/, pdv.load()];
                    case 1:
                        // Aggiorno gli insights
                        _a.sent();
                        return [4 /*yield*/, pdv.loadProducts(true)];
                    case 2:
                        _a.sent();
                        // Mostro la lista dei prodotti
                        this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
                        if (this.onUpdatePdv)
                            this.onUpdatePdv(pdv.mapItem);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    map.prototype.pdiSelected = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var pdv;
            return __generator(this, function (_a) {
                pdv = this.userSession.getPdvById(id);
                this.selectedPdv = pdv;
                if (!pdv)
                    return [2 /*return*/];
                this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
                this.userSession.gender = GenderType[this.html.find("[name=gender]:checked").val().toUpperCase()];
                // Mostro la lista dei prodotti
                this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
                return [2 /*return*/];
            });
        });
    };
    map.prototype.budgetSelected = function (id) {
        if (!this.selectedPdv)
            return;
        this.selectedPdv.selectedProduct = this.selectedPdv.products.First(function (p) { return p.item.Id === id; });
    };
    map.prototype.pdiRemoved = function (id) {
        var pdv = this.userSession.getPdvById(id);
        if (pdv) {
            this.userSession.removePdv(pdv);
        }
        if (this.userSession.pdvs.length == 0) {
            this.navigo.navigate("scelta-categoria");
        }
        else {
            // Aggiorno lato mappa
            if (this.onUpdatePdv) {
                for (var _i = 0, _a = this.userSession.pdvs; _i < _a.length; _i++) {
                    var p = _a[_i];
                    this.onUpdatePdv(p.mapItem);
                }
            }
        }
        // Abilitato o disabilito il pulsante avanti
        this.updateNextButton();
    };
    map.prototype.pdiDuplicated = function (originalId, mapItem) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                    var pdv;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.userSession.duplicatePdv(originalId, mapItem)];
                            case 1:
                                pdv = _a.sent();
                                if (pdv) {
                                    // Ricalcolo l'indirizzo sulla base della nuova posizione
                                    this.pdiMoved(pdv.id, pdv.location);
                                    if (this.onUpdatePdv)
                                        this.onUpdatePdv(pdv.mapItem);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    map.prototype.pdiMoved = function (id, location) {
        return __awaiter(this, void 0, void 0, function () {
            var pdv, googleServiceAgent, _a, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pdv = this.userSession.getPdvById(id);
                        if (!pdv) return [3 /*break*/, 4];
                        pdv.location = location;
                        pdv.locationAddress = "-";
                        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        googleServiceAgent = new GoogleServiceAgent();
                        _a = pdv;
                        return [4 /*yield*/, googleServiceAgent.geocode(location)];
                    case 2:
                        _a.locationAddress = (_b.sent()).formatted_address;
                        this.sidebar.locationAddress.val(pdv.locationAddress).trigger('change');
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    map.prototype.updatePdi = function (id) {
        var _this = this;
        var pdv = this.userSession.getPdvById(id);
        if (!pdv)
            return;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pdv.load()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pdv.loadProducts(true)];
                    case 2:
                        _a.sent();
                        // Mostro la lista dei prodotti
                        this.renderTemplateScript("products-template", pdv.getProductsGrouped(6, this.userSession.gender));
                        if (this.onUpdatePdv)
                            this.onUpdatePdv(pdv.mapItem);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    map.prototype.preparePlugin = function (plugin) {
        var _this = this;
        this._plugin = plugin;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, pdv, _b, _c, pdv;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _i = 0, _a = this.userSession.pdvs;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        pdv = _a[_i];
                        return [4 /*yield*/, pdv.loadProducts(!this.userSession.isFlow2)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        for (_b = 0, _c = this.userSession.pdvs; _b < _c.length; _b++) {
                            pdv = _c[_b];
                            plugin.actions("add", false, pdv.mapItem);
                        }
                        if (!this.sidebar.isOpen) {
                            this.sidebar.toggle();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return map;
}(Page));
/// <reference path="../../references.ts" />
var riepilogopdv = /** @class */ (function (_super) {
    __extends(riepilogopdv, _super);
    function riepilogopdv() {
        return _super.call(this, "riepilogo-pdv.html") || this;
    }
    riepilogopdv.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        if (this.userSession.agencyInfo.askedCredit) {
            // imposto anticipo credito su complete
            this.html.find(".anticipo_credito").addClass('complete');
            // elimino il bordo rosso sul prezzo
            this.html.find(".endprice").removeClass('pricef');
        }
        this.html.on("click", "[data-ask-credit]", function (e) {
            e.preventDefault();
            _this.html.find("[data-budget-warning]").popover("hide");
            _this.html.find("#credit").modal('show');
        });
        this.html.find("#creditsRequest").click(function (e) { return __awaiter(_this, void 0, void 0, function () {
            var euroAmount, serviceAgent, button;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        euroAmount = this.userSession.totalVatPrice - this.userSession.agencyInfo.balance;
                        serviceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
                        button = $(e.target);
                        button.button('loading');
                        // Invoco il servizio per chiedere il credito
                        return [4 /*yield*/, this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, serviceAgent.askCredit({ EuroAmount: euroAmount })];
                                        case 1:
                                            _a.sent();
                                            this.userSession.agencyInfo.askedCredit = true;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, undefined, false)];
                    case 1:
                        // Invoco il servizio per chiedere il credito
                        _a.sent();
                        button.button('reset');
                        // Chiudo la modale
                        this.html.find("#credit").modal('hide');
                        // imposto anticipo credito su complete
                        this.html.find(".anticipo_credito").addClass('complete');
                        // elimino il bordo rosso sul prezzo
                        this.html.find(".endprice").removeClass('pricef');
                        // Continuo sugli scenari
                        //this.navigo.navigate("seleziona-scenari");
                        // riabilito il tasto conferma
                        this.html.find("a[data-navigo]").removeClass('disabled');
                        return [2 /*return*/];
                }
            });
        }); });
        this.renderPdvTotals();
        this.pdvs = this.userSession.pdvs;
        this.pdvs.forEach(function (v) { return v.potentialUsersString = v.detail.PotentialUsers.toLocaleString(); });
        this.pdvs.forEach(function (v) { return v.formattedMaleStatsString = (+v.formattedMaleStats).toLocaleString(); });
        this.pdvs.forEach(function (v) { return v.formattedFemaleStatsString = (+v.formattedFemaleStats).toLocaleString(); });
        this.pdvs.forEach(function (v) { return v.showCompetitorsRanking = v.session.businessCategoryId == undefined || v.session.businessCategoryId == "No cat" ? false : true; });
        this.pdvs.forEach(function (v) { return v.competitorsRanking = (v.mapItem.insights.data.Competitors <= v.mapItem.insights.data.Ranking[0]) ? "< " + v.mapItem.insights.data.Ranking[0] :
            v.mapItem.insights.data.Competitors > v.mapItem.insights.data.Ranking[0] + 1 && v.mapItem.insights.data.Competitors <= v.mapItem.insights.data.Ranking[1] ? (v.mapItem.insights.data.Ranking[0] + 1) + " - " + v.mapItem.insights.data.Ranking[1]
                : "> " + v.mapItem.insights.data.Ranking[2]; });
        this.renderTemplateScript("pdvs-template", { pdvs: this.pdvs });
    };
    riepilogopdv.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.ReadOnly);
        if (this.sidebar.isOpen) {
            this.sidebar.toggle();
        }
    };
    Object.defineProperty(riepilogopdv.prototype, "hasNotEnoughBudget", {
        get: function () {
            if (this.userSession.agencyInfo.askedCredit == undefined || this.userSession.agencyInfo.askedCredit == false) {
                return this.userSession.agencyInfo.canAskCredit && this.userSession.agencyInfo.balance < this.userSession.totalVatPrice;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogopdv.prototype, "budgetNeed", {
        get: function () {
            return (Math.round((this.userSession.totalVatPrice - this.userSession.agencyInfo.balance) * 100) / 100).toLocaleString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogopdv.prototype, "budgetNeedActions", {
        get: function () {
            if (!this.budgetNeed)
                return [];
            var list = [];
            if (this.userSession.agencyInfo.canAskCredit) {
                list.push("<a href='#' data-ask-credit>Richiedere un Anticipo Credito</a>");
            }
            list.push("Diminuire i budget per PdV");
            list.push("Eliminare 1 o più PdV");
            return list.map(function (v, i) { return (i + 1) + " - " + v; });
        },
        enumerable: true,
        configurable: true
    });
    riepilogopdv.prototype.pdiShowBudget = function (id) {
        var pdv = this.userSession.getPdvById(id);
        this.selectedPdv = pdv;
        if (!pdv)
            return;
        // Mostro la lista dei prodotti
        this.renderTemplateScript("rproducts-template", pdv.getProductsGrouped(6, this.userSession.gender));
    };
    riepilogopdv.prototype.budgetSelected = function (id) {
        var _this = this;
        if (!this.selectedPdv)
            return;
        this.selectedPdv.selectedProduct = this.selectedPdv.products.First(function (p) { return p.item.Id === id; });
        var temp = $(this.getTemplateScript("pdvs-template", { pdvs: this.pdvs }));
        // Sostituisco l'intestazione del pdv nella lista
        var heading = temp.find("[data-pdi-id]").filter(function (i, e) { return $(e).data("pdi-id") == _this.selectedPdv.id; }).find(".panel-heading");
        this.html.find("[data-pdi-id='" + this.selectedPdv.id + "'] .panel-heading").empty().append(heading.children());
        // Aggiorno i totali
        this.renderPdvTotals();
    };
    riepilogopdv.prototype.pdiRemoved = function (id) {
        var pdv = this.userSession.getPdvById(id);
        if (pdv) {
            this.userSession.removePdv(pdv);
        }
        if (this.userSession.pdvs.length == 0) {
            this.navigo.navigate("scelta-categoria");
        }
        else {
            // Aggiorno lato mappa
            if (this.onUpdatePdv) {
                for (var _i = 0, _a = this.userSession.pdvs; _i < _a.length; _i++) {
                    var p = _a[_i];
                    this.onUpdatePdv(p.mapItem);
                }
            }
            // Aggiorno i totali
            this.renderPdvTotals();
        }
    };
    /*
    public preparePlugin(plugin: any): void {
        for (let pdv of this.userSession.pdvs) {
            let mapItem = { ...pdv.mapItem, duplicable: false, editable: false, resettable: false, circle: {lat:pdv.location.lat,lng:pdv.location.lng}  };
            // Il nuovo centro è la posizione individuata nella pagina precedente
            // l'utente può avere spostato il cerchio
            mapItem.lat = pdv.location.lat;
            mapItem.lng = pdv.location.lng;
            plugin.actions("add", false, mapItem);
        }
    }
    */
    riepilogopdv.prototype.preparePlugin = function (plugin) {
        // location.lat è la circonferenza
        // originLocation è il pdv (marker)
        for (var _i = 0, _a = this.userSession.pdvs; _i < _a.length; _i++) {
            var pdv = _a[_i];
            var mapItem = __assign({}, pdv.mapItem, { duplicable: false, editable: false, resettable: false, circle: { lat: pdv.location.lat, lng: pdv.location.lng } });
            // Il nuovo centro è la posizione individuata nella pagina precedente
            // l'utente può avere spostato il cerchio
            mapItem.lat = pdv.originalLocation.lat;
            mapItem.lng = pdv.originalLocation.lng;
            plugin.actions("add", false, mapItem);
        }
    };
    riepilogopdv.prototype.renderPdvTotals = function () {
        this.renderTemplateScript("pdvTotals-template");
        // Posso proseguire se ho abbastanza budget e se ho almeno un pdv
        this.html.find("a[data-navigo]").toggleClass("disabled", this.hasNotEnoughBudget && this.userSession.pdvs.length > 0);
    };
    return riepilogopdv;
}(Page));
/// <reference path="../../references.ts" />
var selezionascenari = /** @class */ (function (_super) {
    __extends(selezionascenari, _super);
    function selezionascenari() {
        return _super.call(this, "seleziona-scenari.html") || this;
    }
    selezionascenari.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        // Nascondi l'opzione creatività ADMove se è stato scelto "Altro" come obiettivo
        // Oppure se la categoria è sconosciuta
        if (this.userSession.objective == EvaluationObjective.AnotherTarget
            || !this.userSession.businessCategoryId || this.userSession.businessCategoryId == "No cat") {
            // Nascondi l'opzione creatività di AdMove
            this.html.find("[data-creativity-admove-container]").hide().find(".selected").removeClass("selected");
            // Pre-seleziona l'opzione creatività scelta dal cliente
            setTimeout(function () { return _this.html.find("[data-creativity=LOADED]").click(); }, 1);
        }
        else {
            this.html.find("[data-creativity-admove-container]").show();
        }
        this.html.on("change", "input[type=radio]", function (e) {
            var id = e.currentTarget.id;
            _this.userSession.selectedCopyItem = _this.copyItems.First(function (c) { return c.Id == id; });
            // Seleziono automaticamente il primo banner
            _this.userSession.selectedBannerId = _this.userSession.selectedCopyItem.BannerIds[0];
        });
        // Click su pulsante avanti
        this.html.find("[data-page-scenario]").click(function () {
            var selectedDiv = _this.html.find("#scenario .selected[data-id]");
            var scenarioId = selectedDiv.data("id");
            // Calcolo i giorni di partenza della campagna
            _this.userSession.workDays = parseInt(selectedDiv.data("time"));
            var today = moment().startOf("day");
            _this.userSession.campaignStartDate = today.addWorkdays(_this.userSession.workDays).toDate();
            // Se ho selezionato la creatività di ad-move
            switch (scenarioId) {
                case 1:
                    _this.showToneOfVoice();
                    break;
                case 2:
                    _this.navigo.navigate("personalizza-campagna-creativita");
                    break;
                case 3:
                    _this.navigo.navigate("campagna-creativita-ad-hoc");
                    break;
            }
        });
        // Click su pulsante personalizza campagna
        this.html.find("[data-page-personalizza]").click(function (e) {
            e.preventDefault();
            _this.toneOfVoiceModal.modal("hide");
            _this.navigo.navigate("personalizza-campagna");
        });
    };
    selezionascenari.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
        if (this.sidebar.isOpen) {
            this.sidebar.toggle();
        }
        // Resetto le informazioni manuali
        this.userSession.manualData.isSet = false;
        this.userSession.manualData.customBanners.clear();
        this.userSession.selectedCopyItem = undefined;
        this.userSession.selectedBannerId = undefined;
        this.userSession.tailored = false;
        this.userSession.productDescription = undefined;
        this.userSession.discount = undefined;
        this.userSession.businessName = this.userSession.originalBusinessName;
    };
    Object.defineProperty(selezionascenari.prototype, "toneOfVoiceModal", {
        get: function () {
            return this.html.find("#tone-of-voice");
        },
        enumerable: true,
        configurable: true
    });
    selezionascenari.prototype.showToneOfVoice = function () {
        var _this = this;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var p, product, bannerSize, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = this.userSession.pdvs[0].selectedProduct;
                        if (!p)
                            return [2 /*return*/];
                        return [4 /*yield*/, ServiceAgentFactory.get(CampaignServiceAgent).moreCopyItems(p.item.Id)];
                    case 1:
                        product = _a.sent();
                        this.copyItems = product.CopyItems;
                        bannerSize = this.userSession.advertisementType == AdvertisementType.SOCIALFB ? 3
                            : this.userSession.advertisementType == AdvertisementType.FLYER ? 6 : 0;
                        items = product.CopyItems.map(function (p, i) { return (__assign({}, p, { Uri: "{0}/api/Banner/Preview/{1}/{2}/{3}/{4}/{5}/{6}/{7}".uriFormat(baseUrl, p.BannerIds[0], bannerSize, "[la tua insegna qui]", _this.userSession.pdvs[0].clickToMapCustom, _this.userSession.pdvs[0].clickToCallCustom, "[XX]", "[il tuo prodotto qui]") })); });
                        this.renderTemplateScript("tone-template", items);
                        // Seleziono il primo elemento
                        this.html.find("input[type=radio]:first").prop("checked", true).trigger("change");
                        if (this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE)
                            this.navigo.navigate("personalizza-campagna");
                        else
                            this.toneOfVoiceModal.modal("show");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    selezionascenari.prototype.getWorkDays = function (days) {
        var d = moment().startOf("day");
        return moment(d.addWorkdays(days).toDate()).userLocale().format("dddd, D MMMM YYYY");
    };
    return selezionascenari;
}(Page));
/// <reference path="../../references.ts" />
var campagnaBase = /** @class */ (function (_super) {
    __extends(campagnaBase, _super);
    function campagnaBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    campagnaBase.prototype.onLoad = function (isBulk) {
        if (isBulk === void 0) { isBulk = false; }
        _super.prototype.onLoad.call(this);
        // Decido quali banner mostrare
        this.getPagerTooltips();
        var banners = this.getVisibleBannerIndexes(isBulk);
        var remover = function (i, e) { return !banners.Contains(i); };
        // Tolgo gli elementi HTML in eccesso
        this.pagerTooltips = this.pagerTooltips.filter(function (v, i) { return banners.Contains(i); });
        this.html.find(".item-preview-device, .item-preview-banner").filter(remover).remove();
        this.html.find(".switch-preview li").filter(remover).remove();
        this.html.find("[data-image-logo]").attr("src", this.userSession.pdvs[0].mapItem.image);
        this.html.find("[data-number-banner]").text((banners.length - (this.userSession.advertisementType === AdvertisementType.FLYER ? 1 : 2)) + " banner");
    };
    campagnaBase.prototype.getPagerTooltips = function () {
        switch (this.relativeUri) {
            case "bulk-creativita.html":
            case "bulk-riepilogo.html":
                this.pagerTooltips = ['LANDING PAGE PER SMARTPHONE', 'LANDING PAGE PER TABLET', 'FORMATO RETTANGOLO MEDIO', 'FORMATO INTERSTITIAL', 'FORMATO LEADERBOARD SMARTPHONE', 'FORMATO LEADERBOARD TABLET'];
                break;
            default:
                this.pagerTooltips = ['FORMATO PUBBLICITARIO FACEBOOK', 'ANNUNCIO GOOGLE ADS', 'LANDING PAGE PER SMARTPHONE', 'LANDING PAGE PER TABLET',
                    'FORMATO RETTANGOLO MEDIO', 'FORMATO INTERSTITIAL', 'FORMATO LEADERBOARD SMARTPHONE', 'FORMATO LEADERBOARD TABLET'];
                break;
        }
        ;
    };
    campagnaBase.prototype.getVisibleBannerIndexes = function (isBulk) {
        if (isBulk === void 0) { isBulk = false; }
        // Indice delle tipologie di banner da mostrare
        var banners = [0, 1, 2, 3, 4, 5, 6, 7];
        switch (this.userSession.advertisementType) {
            case AdvertisementType.DISPLAYCLICK:
            case AdvertisementType.DISPLAYUU:
                banners = this.userSession.bulkData.Landings != undefined
                    ? (this.userSession.bulkData.Landings.length == 0 || !isBulk ? banners.slice(0, 6) : banners.slice(2, 6))
                    : banners.slice(2, 8);
                break;
            case AdvertisementType.SEARCHGOOGLE:
                banners = [1, 2, 3];
                break;
            case AdvertisementType.SOCIALFB:
                banners = [0, 2, 3];
                break;
            case AdvertisementType.FLYER:
                banners = isBulk ? (this.userSession.bulkData.Landings.length == 0 ? [0, 3] : [3]) : [2, 5];
                break;
        }
        return banners;
    };
    campagnaBase.prototype.verifyAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                        return [4 /*yield*/, this.semanticServiceAgent.GeocodeAddress(address)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.FormattedAddress.replace(", Italy", "").replace("/", "-")];
                }
            });
        });
    };
    campagnaBase.prototype.setClickToCall = function () {
        var _this = this;
        this.html.find("input[data-link-call]:checkbox").each(function (i, e) {
            var t = $(e), isChecked = t.is(":checked"), box = t.closest('.calltoaction'), input = box.find('input[type=text]');
            if (isChecked)
                _this.userSession.pdvs[i].clickToCallCustom = input.val() !== "" ? input.val() : null;
            else
                _this.userSession.pdvs[i].clickToCallCustom = null;
        });
    };
    campagnaBase.prototype.setClickToMap = function () {
        var _this = this;
        this.html.find("input[data-link-map]:checkbox").each(function (i, e) {
            var t = $(e), isChecked = t.is(":checked"), box = t.closest('.calltoaction'), input = box.find('input[type=text]');
            if (isChecked)
                _this.userSession.pdvs[i].clickToMapCustom = input.val();
            else
                _this.userSession.pdvs[i].clickToMapCustom = null;
        });
    };
    Object.defineProperty(campagnaBase.prototype, "minCampaignDate", {
        get: function () {
            return moment().addWorkdays(this.userSession.workDays).userLocale().toDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(campagnaBase.prototype, "maxCampaignDate", {
        get: function () {
            return moment().userLocale().toDate().addDays(365);
        },
        enumerable: true,
        configurable: true
    });
    campagnaBase.prototype.datePickerSelect = function (date) {
        this.userSession.campaignStartDate = date;
    };
    return campagnaBase;
}(Page));
var personalizzacampagna = /** @class */ (function (_super) {
    __extends(personalizzacampagna, _super);
    function personalizzacampagna() {
        return _super.call(this, "personalizza-campagna.html") || this;
    }
    personalizzacampagna.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        // Nome del prodotto non serve in caso di branding
        if (this.userSession.objective === EvaluationObjective.Branding) {
            this.html.find("[data-product-description]").remove();
        }
        // Personalizzazione sconto
        if (this.userSession.objective !== EvaluationObjective.PromotionDiscount) {
            this.html.find("[data-discount]").remove();
        }
        // Personalizzazione prodotto
        if (this.userSession.objective !== EvaluationObjective.PromotionPrice) {
            this.html.find("[data-price]").remove();
        }
        // Aggiorna l'anteprima
        //this.html.find("[data-update-banners]").click(e => {
        //    e.preventDefault();
        //    this.setCustomValues();
        //    this.setClickToCall();
        //    this.setClickToMap();
        //    this.updateBanners();
        //    this.updateNextButton();
        //});
        // TODO: solo su scenario 1 e 2
        this.html.find("[data-change-graphics]").click(function (e) {
            _this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                var p, banners, bannerSize, items;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p = this.selectedPdv;
                            if (!p)
                                return [2 /*return*/];
                            return [4 /*yield*/, ServiceAgentFactory.get(CampaignServiceAgent).moreBanners(this.userSession.selectedCopyItem.Id)];
                        case 1:
                            banners = _a.sent();
                            bannerSize = this.userSession.advertisementType == AdvertisementType.SOCIALFB ? BannerSize.Format1200x628
                                : this.userSession.advertisementType == AdvertisementType.FLYER ? BannerSize.Format320x480 : BannerSize.Format300x250;
                            items = banners.BannerIds.map(function (p, i) { return { Id: p, Uri: _this.selectedPdv.getBannerUri(bannerSize, p) }; });
                            this.renderTemplateScript("modal-change-graphics-template-alt1", items[1]);
                            this.renderTemplateScript("modal-change-graphics-template-current", items[0]);
                            this.renderTemplateScript("modal-change-graphics-template-alt2", items[2]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        this.renderTemplateScript("customUI-template");
        this.setClickToMap();
        this.setClickToCall();
    };
    personalizzacampagna.prototype.updateNextButton = function () {
        // Abilitato o disabilito il pulsante scegli data
        this.html.find("#submitter").prop("disabled", this.switch());
    };
    personalizzacampagna.prototype.switch = function () {
        switch (this.userSession.objective) {
            case EvaluationObjective.Branding:
                return false;
            case EvaluationObjective.NewOffer:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined);
            case EvaluationObjective.PromotionDiscount:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined || this.customDiscount.val() === "" || this.customDiscount.val() === "[XX]" || this.customDiscount.val() === undefined);
            case EvaluationObjective.PromotionPrice:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined || this.customPrice.val() === "" || this.customPrice.val() === "[XX]" || this.customPrice.val() === undefined);
            default:
                return false;
        }
    };
    personalizzacampagna.prototype.onNavigatedTo = function () {
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.selectedPdv = this.userSession.pdvs[0];
        this.customBusinessName.val(this.userSession.businessName !== this.userSession.originalBusinessName ? this.userSession.businessName : this.userSession.originalBusinessName);
        this.customProductDescription.val(this.userSession.productDescription);
        this.customDiscount.val(this.userSession.discount);
        this.customPrice.val(this.userSession.discount);
        this.updateNextButton();
    };
    personalizzacampagna.prototype.goToRiepilogo = function (e) {
        e.preventDefault();
        this.setCustomValues();
        this.setClickToCall();
        this.setClickToMap();
        this.updateBanners();
        this.navigo.navigate("riepilogo-campagna");
    };
    Object.defineProperty(personalizzacampagna.prototype, "customBusinessName", {
        get: function () {
            return this.html.find("#customBusinessName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(personalizzacampagna.prototype, "customProductDescription", {
        get: function () {
            return this.html.find("#customProductDescription");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(personalizzacampagna.prototype, "customDiscount", {
        get: function () {
            return this.html.find("#customDiscount");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(personalizzacampagna.prototype, "customPrice", {
        get: function () {
            return this.html.find("#customPrice");
        },
        enumerable: true,
        configurable: true
    });
    personalizzacampagna.prototype.setCustomValues = function () {
        this.userSession.businessName = this.customBusinessName.val();
        this.userSession.discount = (this.userSession.objective === EvaluationObjective.PromotionPrice) ? this.customPrice.val() : this.customDiscount.val();
        this.userSession.productDescription = this.customProductDescription.val();
        this.updateNextButton();
    };
    personalizzacampagna.prototype.contactsCarouselChanged = function (index) {
        this.selectedPdv = this.userSession.pdvs[index];
        this.updateBanners();
        this.html.find(".number").text(this.selectedPdv.number);
    };
    personalizzacampagna.prototype.updateBanners = function () {
        var _this = this;
        this.html.find("[data-banner-size]").each(function (i, e) {
            var $e = $(e);
            var s = BannerSize[$e.data("banner-size")];
            var uri = _this.selectedPdv.getBannerUri(s);
            if ($e.is("img")) {
                $e.attr("src", uri);
            }
            else {
                $e.attr("href", uri);
            }
        });
        var title = this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedTitle : "";
        var description = this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedDescription : "";
        var headline = (this.userSession.selectedCopyItem && this.userSession.businessName + ' | ' + this.userSession.selectedCopyItem.SuggestedHeadline) || "";
        var row1 = (this.userSession.selectedCopyItem && this.userSession.selectedCopyItem.SuggestedRow1) || "";
        var row2 = this.userSession.searchRow2Description;
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");
        // Facebook
        this.html.find("#slider-preview .title").textAndTitle(title);
        this.html.find("#slider-preview .description").textAndTitle(description);
        // Google
        this.html.find("#slider-preview .headline").textAndTitle(headline);
        this.html.find("#slider-preview .row1").textAndTitle(row1);
        this.html.find("#slider-preview .row2").textAndTitle(row2);
        this.html.find("#slider-preview .website").textAndTitle(website);
    };
    return personalizzacampagna;
}(campagnaBase));
/// <reference path="../../references.ts" />
var riepilogocampagna = /** @class */ (function (_super) {
    __extends(riepilogocampagna, _super);
    function riepilogocampagna() {
        return _super.call(this, "riepilogo-campagna.html") || this;
    }
    riepilogocampagna.prototype.onLoad = function () {
        this.renderTemplateScript("riepilogo-template");
        this.renderTemplateScript("riepilogo-template-2");
        this.renderTemplateScript("riepilogo-invoice-template");
        _super.prototype.onLoad.call(this);
        //this.selectPicker.change(this.selectPickerChanged.bind(this));
        //this.selectPickerChanged();
        this.html.find("#invoice-form").validator();
        // processPayment parte tramite la form della fattura o tramite pulsante
        this.html.find("[data-page-ordine]").click(this.processPayment.bind(this));
        this.html.find("[data-page-ordine-panel]").toggle(!this.needInvoiceData);
        this.html.find(".approvingly").toggle(this.userSession.manualData.isSet);
        this.html.find("#invoice-form").submit(this.processPayment.bind(this));
        $('html, body, #page').trigger('click');
    };
    riepilogocampagna.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.ReadOnly);
    };
    Object.defineProperty(riepilogocampagna.prototype, "formattedTotalVatPrice", {
        get: function () {
            return this.userSession.totalVatPrice.toPriceFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "formattedTotalPrice", {
        get: function () {
            return this.userSession.tailored
                ? (this.userSession.totalPrice - 50).toPriceFormat()
                : this.userSession.formattedTotalPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "formattedVat", {
        get: function () {
            return (this.userSession.totalVatPrice - this.userSession.totalPrice).toPriceFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "needInvoiceData", {
        get: function () {
            return this.userSession.agencyInfo.onlinePayment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "isSearchType", {
        get: function () {
            return this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "keywords", {
        /*
        public get selectPicker(): JQuery {
            return this.html.find(".selectpicker");
        }*/
        get: function () {
            var keywords = [];
            if (this.userSession.manualData.isSet) {
                keywords = this.userSession.manualData.keywords;
            }
            else {
                var searchCopyItem = this.userSession.selectedCopyItem;
                if (searchCopyItem.SuggestedKeywords) {
                    keywords = searchCopyItem.SuggestedKeywords;
                }
            }
            return keywords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "formattedStartDate", {
        get: function () {
            return moment(this.userSession.campaignStartDate).userLocale().format("ddd, D MMMM YYYY");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "formattedEndDate", {
        get: function () {
            var endDate = moment(this.userSession.campaignStartDate).add(moment.duration(this.userSession.pdvs.Select(function (c) { return c.selectedProduct && c.selectedProduct.item.EstimatedDuration; }).Max()));
            return moment(endDate).userLocale().format("ddd, D MMMM YYYY");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "totalReach", {
        get: function () {
            return this.userSession.pdvs.Sum(function (p) { return (p.selectedProduct) ? p.selectedProduct.item.Value : 0; }).toLocaleString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(riepilogocampagna.prototype, "texts", {
        get: function () {
            if (this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE) {
                if (this.userSession.manualData.isSet) {
                    return [this.userSession.manualData.headline, this.userSession.manualData.row1, this.userSession.manualData.row2];
                }
                else if (this.userSession.selectedCopyItem) {
                    var search = this.userSession.selectedCopyItem;
                    return [this.userSession.businessName + ' - ' + search.SuggestedHeadline, landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX"), search.SuggestedRow1, this.userSession.searchRow2Description];
                }
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    riepilogocampagna.prototype.processPayment = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.html.find("#invoice-form").has('.has-error').length === 0) {
            this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                var campaignServiceAgent, response, invoiceServiceAgent, paymentResponse;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                            return [4 /*yield*/, campaignServiceAgent.prepareCampaignGroupDraft({
                                    Campaigns: this.userSession.pdvs.map(function (p) { return _this.getPdvDraft(p); })
                                })];
                        case 1:
                            response = _a.sent();
                            if (!this.userSession.agencyInfo.onlinePayment) return [3 /*break*/, 3];
                            invoiceServiceAgent = ServiceAgentFactory.get(InvoiceServiceAgent);
                            return [4 /*yield*/, invoiceServiceAgent.prepareForCampaignGroup(response.CampaignGroupId, {
                                    Address: this.html.find("[name=address]").val(),
                                    City: this.html.find("[name=citta]").val(),
                                    CompanyName: this.html.find("[name=ragioneSociale]").val(),
                                    InvoiceEmail: this.html.find("[name=email]").val(),
                                    InvoiceVatCode: this.html.find("[name=piva]").val(),
                                    PhoneNumber: this.userSession.agencyInfo.agency.AgencyReferralPhoneNumber,
                                    PostalCode: this.html.find("[name=cap]").val(),
                                    CountryId: 3574,
                                    CouponCode: "",
                                    State: "Italy",
                                    // New invoice
                                    SDICode: this.html.find("[name=SDICode]").val(),
                                    InvoicePECMail: this.html.find("[name=PECMail]").val(),
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ;
                            // Salvo il cookie utilizzato poi dalla pagina di conferma
                            if ($.cookie) {
                                $.cookie("lastCampaignGroup", JSON.stringify({ customName: this.userSession.getCustomName, campaignGroupId: response.CampaignGroupId }));
                            }
                            return [4 /*yield*/, campaignServiceAgent.handleCampaignPayment(response.CampaignGroupId)];
                        case 4:
                            paymentResponse = _a.sent();
                            if (paymentResponse.RedirectUri) {
                                document.location.href = paymentResponse.RedirectUri;
                            }
                            else {
                                this.navigo.navigate("pagamento-completato");
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    //private getCustomName(): string {
    //    return `${this.userSession.originalBusinessName} ${moment(this.userSession.campaignStartDate).format("L")}`;
    //}
    riepilogocampagna.prototype.getPdvDraft = function (p) {
        return ({
            ProposalItemId: p.proposal.Id,
            ProposalCopyItemId: (this.userSession.selectedCopyItem) ? this.userSession.selectedCopyItem.Id : undefined,
            ProposalProductItemId: (p.selectedProduct) ? p.selectedProduct.item.Id : undefined,
            BannerCode: p.session.selectedBannerId,
            ProductDescription: this.userSession.productDescription,
            Discount: this.userSession.discount,
            SearchText: this.userSession.searchText,
            BusinessName: this.userSession.businessName,
            Address: (p.clickToMap == undefined || p.clickToMap == null) ? p.address : p.clickToMap,
            MobilePhone: p.phoneNumber,
            BusinessCategoryId: this.userSession.businessCategoryId,
            StartDate: this.userSession.campaignStartDate,
            Budget: p.selectedProduct.item.Price,
            Locations: [{ Latitude: p.location.lat, Longitude: p.location.lng }],
            Objective: this.userSession.objective,
            Website: p.detail.Website,
            FacebookPage: p.detail.Url,
            DisplayUrl: landingUrlAdmove + p.seo,
            CampaignCustomName: (this.userSession.getCustomName.length < 100) ? this.userSession.getCustomName : this.userSession.getCustomName.slice(0, 100),
            Headline: (this.userSession.manualData.isSet && this.userSession.manualData.headline) || (this.userSession.selectedCopyItem && this.userSession.selectedCopyItem.SuggestedHeadline) || "",
            Row1: (this.userSession.manualData.isSet && this.userSession.manualData.row1) || (this.userSession.selectedCopyItem && this.userSession.selectedCopyItem.SuggestedRow1) || "",
            Row2: (this.userSession.manualData.isSet && this.userSession.manualData.row2) || this.userSession.searchRow2Description || "",
            Title: (this.userSession.manualData.isSet && this.userSession.manualData.title) || (this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedTitle : ""),
            Description: (this.userSession.manualData.isSet && this.userSession.manualData.description) || (this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedDescription : ""),
            CustomKeywords: (this.userSession.manualData.isSet && this.userSession.manualData.keywords) || [],
            ButtonLink: p.uriClickToMap,
            CtcLink: p.clickToCall,
            CustomBanners: p.getCustomBannerUris(),
            TailoredBanners: this.userSession.getTailoredCustomContentsUris(),
            IsBulk: false,
            Cluster: p.detail.Cluster,
            Radius: p.detail.Radius
        });
    };
    riepilogocampagna.prototype.selectPickerChanged = function (id) {
        //console.log('id',id);
        this.selectedPdv = this.userSession.pdvs[id]; // (this.selectPicker.get(0) as HTMLSelectElement).selectedIndex
        this.renderTemplateScript("dettaglioRiepilogo-template", { Pdv: this.selectedPdv, isNotTailored: !this.userSession.tailored });
        this.html.find(".number").text(this.selectedPdv.number);
        this.updateBanners();
    };
    riepilogocampagna.prototype.updateBanners = function () {
        var _this = this;
        this.html.find("[data-banner-size]").each(function (i, e) {
            var $e = $(e);
            var s = BannerSize[$e.data("banner-size")];
            var uri = _this.selectedPdv.getBannerUri(s);
            $e.attr("src", uri);
        });
        var draft = this.getPdvDraft(this.selectedPdv);
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");
        this.html.find("#slider-preview .title").textAndTitle(draft.Title);
        this.html.find("#slider-preview .description").textAndTitle(draft.Description);
        var headline = draft.BusinessName + ' | ' + draft.Headline;
        this.html.find("#slider-preview .headline").textAndTitle(headline);
        this.html.find("#slider-preview .row1").textAndTitle(draft.Row1);
        this.html.find("#slider-preview .row2").textAndTitle(draft.Row2);
        this.html.find("#slider-preview .website").textAndTitle(website);
    };
    return riepilogocampagna;
}(campagnaBase));
/// <reference path="../../references.ts" />
var pagamentocompletato = /** @class */ (function (_super) {
    __extends(pagamentocompletato, _super);
    function pagamentocompletato() {
        return _super.call(this, "pagamento-completato.html") || this;
    }
    pagamentocompletato.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        var campaignName = $("[name=campaign_name]");
        var obj = undefined;
        if ($.cookie) {
            var v = $.cookie("lastCampaignGroup");
            if (v) {
                obj = JSON.parse(v);
                campaignName.val(obj.customName);
            }
        }
        this.html.find("form").submit(function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!obj) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                                var campaignServiceAgent;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                                            return [4 /*yield*/, campaignServiceAgent.renameCampaign(obj.campaignGroupId, campaignName.val())];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.navigo.navigate("dashboard");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    pagamentocompletato.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    return pagamentocompletato;
}(Page));
/// <reference path="../../references.ts" />
var personalizzacampagnacreativita = /** @class */ (function (_super) {
    __extends(personalizzacampagnacreativita, _super);
    function personalizzacampagnacreativita() {
        return _super.call(this, "personalizza-campagna-creativita.html") || this;
    }
    personalizzacampagnacreativita.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.userSession.manualData.isSet = true;
        this.selectedPdv = this.userSession.pdvs[0];
        var banners = this.getVisibleBannerIndexes();
        this.html.find("[data-file]").each(function (i, e) {
            var div = $(e);
            // Rimuovo tutti gli upload che non contengono gli indici
            if (!banners.Contains(parseInt(div.data("file")))) {
                div.remove();
            }
        });
        this.html.find('#add-graphic').on("cssClassChanged", function () {
            _this.updateBanners();
        });
        if (this.userSession.advertisementType === AdvertisementType.SOCIALFB) { // facebook
            this.html.find('p.hide.facebook').removeClass('hide');
        }
        else if (this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE) { // google
            this.html.find('p.hide.google').removeClass('hide');
        }
        else {
            this.html.find('p.hide.app').removeClass('hide');
        }
        // Se cambia uno dei testi personalizzabili, aggiorno i banners
        this.html.find("[data-main-title],[data-main-description],[data-main-headline],[data-main-row1],[data-main-row2]").keyup(this.updateBanners.bind(this));
        this.renderTemplateScript("customUI-template");
        this.setClickToMap();
        this.setClickToCall();
    };
    personalizzacampagnacreativita.prototype.onNavigatedTo = function () {
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.selectedPdv = this.userSession.pdvs[0];
        this.setClickToMap();
        this.setClickToCall();
        this.updateBanners();
    };
    personalizzacampagnacreativita.prototype.goToRiepilogo = function (e) {
        e.preventDefault();
        this.setClickToMap();
        this.setClickToCall();
        this.updateBanners();
        this.navigo.navigate("riepilogo-campagna");
    };
    personalizzacampagnacreativita.prototype.dropzoneComplete = function (xhr, size, pdvIndex) {
        var set;
        if (typeof pdvIndex !== "undefined") {
            set = this.userSession.pdvs[pdvIndex].manualData.customBanners;
        }
        else {
            set = this.userSession.manualData.customBanners;
        }
        if (xhr.status === 200) {
            set.set(size, JSON.parse(xhr.responseText).TempUri);
        }
        else {
            set.delete(size);
        }
        this.updateBanners();
    };
    personalizzacampagnacreativita.prototype.dropzoneRemove = function (size, pdvIndex) {
        var set;
        if (typeof pdvIndex !== "undefined") {
            set = this.userSession.pdvs[pdvIndex].manualData.customBanners;
        }
        else {
            set = this.userSession.manualData.customBanners;
        }
        set.delete(size);
        this.updateBanners();
    };
    personalizzacampagnacreativita.prototype.contactsCarouselChanged = function (index) {
        this.selectedPdv = this.userSession.pdvs[index];
        this.updateBanners();
        this.html.find(".number").text(this.selectedPdv.number);
    };
    personalizzacampagnacreativita.prototype.updateBanners = function () {
        var _this = this;
        this.html.find("[data-banner-size]").each(function (i, e) {
            var $e = $(e);
            var s = BannerSize[$e.data("banner-size")];
            var uri = _this.selectedPdv.getBannerUri(s);
            if ($e.is("img")) {
                $e.attr("src", uri);
            }
            else {
                $e.attr("href", uri);
            }
        });
        var title = this.html.find("[data-main-title]").val();
        var description = this.html.find("[data-main-description]").val();
        var headline = this.userSession.businessName + ' - ' + this.html.find("[data-main-headline]").val();
        var row1 = this.html.find("[data-main-row1]").val();
        var row2 = this.html.find("[data-main-row2]").val();
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");
        this.userSession.manualData.description = description;
        this.userSession.manualData.title = title;
        // Facebook
        this.html.find("#slider-preview .title").textAndTitle(title);
        this.html.find("#slider-preview .description").textAndTitle(description);
        // Google
        this.html.find("#slider-preview .headline").textAndTitle(headline);
        this.html.find("#slider-preview .row1").textAndTitle(row1);
        this.html.find("#slider-preview .row2").textAndTitle(row2);
        this.html.find("#slider-preview .website").textAndTitle(website);
    };
    return personalizzacampagnacreativita;
}(campagnaBase));
///// <reference path="../../references.ts" />
//class registrati extends Page {
//    constructor() {
//        super("registrati.html");
//    }
//    public onLoad(): void {
//        super.onLoad();
//        this.html.find("form").validator().submit(e => {
//            if (e.isDefaultPrevented()) return;
//            e.preventDefault();
//            this.runAsync(async () => {
//                let securityServiceAgent = ServiceAgentFactory.get(SecurityServiceAgent);
//                try {
//                    await securityServiceAgent.signupAgency({
//                        description: this.html.find("[name=business_name]").val(),
//                        email: this.html.find("[name=email]").val(),
//                        password: this.html.find("[name=password]").val(),
//                        redirectUri: getLoginUrl(),
//                        referralFirstName: this.html.find("[name=name]").val(),
//                        referralLastName: this.html.find("[name=surname]").val(),
//                        referralPhoneNumber: this.html.find("[name=phone]").val()
//                    });
//                    this.html.find("[data-signup-completed]").show();
//                    this.html.find("[data-signup-form]").hide();
//                }
//                catch (e) {
//                    if (e.message.toLowerCase() === "conflict") {
//                        this.showAlert("Errore", "Indirizzo e-mail già esistente", "OK");
//                    } else throw e;
//                }
//            });
//        });
//    }
//    onNavigatedTo(): void {
//        super.onNavigatedTo();
//        this.sidebar.changeMode(SidebarMode.Unavailable);
//    }
//}
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
/// <reference path="../../references.ts" />
var account = /** @class */ (function (_super) {
    __extends(account, _super);
    function account() {
        return _super.call(this, "account.html") || this;
    }
    account.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.loadData();
        this.html.find("[data-page-edit]").click(function (e) {
            _this.agencyEdit(e, true);
        });
        this.html.find("[data-page-edit-cancel]").click(function (e) {
            _this.agencyEdit(e, false);
        });
        this.html.find("[data-page-edit-save]").click(function (e) {
            _this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                var agencyServiceAgent, d;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
                            d = this.html.find("[name=description]").eq(0).val();
                            // La descrizione � modificabile da due sezioni
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
                            return [4 /*yield*/, agencyServiceAgent.updateAgency(this.account)];
                        case 1:
                            _a.sent();
                            // Torno in modalit� lettura
                            this.agencyEdit(e, false);
                            // Aggiorno i placeholder di lettura
                            this.renderTemplateScript("account-template");
                            this.renderTemplateScript("invoice-data-template");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        this.html.find("[data-action-account]").click(function (e) {
            _this.changeMenuActive(e);
            _this.showDiv("data-page-div-account");
        });
        this.html.find("[data-action-invoice]").click(function (e) {
            _this.changeMenuActive(e);
            _this.showDiv("data-page-div-invoice");
        });
        this.html.find("[data-action-credit]").click(function (e) {
            _this.changeMenuActive(e);
            _this.showDiv("data-page-div-credit");
        });
        this.html.find("[data-action-history]").click(function (e) {
            _this.changeMenuActive(e);
            _this.showDiv("data-page-div-history");
        });
        this.html.find("[data-action-historytransactions]").click(function (e) {
            _this.changeMenuActive(e);
            _this.showDiv("data-page-div-historytransactions");
        });
        this.html.find("[data-action-request-credits]").click(function (e) {
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
        this.html.find("[data-page-size]").click(function (e) {
            console.log($(e.target).val());
        });
        this.html.on("change", "#pageSizeHistory", function (e) {
            e.preventDefault();
            _this.loadHistory();
        });
        this.html.on("click", "[data-page-previous-history]", function (e) {
            e.preventDefault();
            if (_this.currentPage > 0) {
                _this.currentPage--;
                _this.loadHistory();
            }
        });
        this.html.on("click", "[data-page-next-history]", function (e) {
            e.preventDefault();
            if (_this.currentPage < _this.availablePages - 1) {
                _this.currentPage++;
                _this.loadHistory();
            }
        });
        this.html.on("click", "[data-page-history]", function (e) {
            e.preventDefault();
            _this.currentPage = parseInt($(e.target).data("page-history")) - 1;
            _this.loadHistory();
        });
        this.html.on("change", "#pageSizeTransaction", function (e) {
            e.preventDefault();
            _this.loadTransaction();
        });
        this.html.on("click", "[data-page-previous-transaction]", function (e) {
            e.preventDefault();
            if (_this.currentPageTransaction > 0) {
                _this.currentPageTransaction--;
                _this.loadTransaction();
            }
        });
        this.html.on("click", "[data-page-next-transaction]", function (e) {
            e.preventDefault();
            if (_this.currentPageTransaction < _this.availablePagesTransaction - 1) {
                _this.currentPageTransaction++;
                _this.loadTransaction();
            }
        });
        this.html.on("click", "[data-page-transaction]", function (e) {
            e.preventDefault();
            _this.currentPageTransaction = parseInt($(e.target).data("page-transaction")) - 1;
            _this.loadTransaction();
        });
        this.showDiv("data-page-div-account");
    };
    account.prototype.changeMenuActive = function (e) {
        var ulContainer = $(e.target).closest("ul[class*=nav]");
        $(ulContainer).find("li[class=active]").removeClass("active");
        $(e.target).closest("li[role=presentation]").addClass("active");
    };
    account.prototype.showDiv = function (divAttribute) {
        $.each($("div[class=container]").find("div[data-page-section]"), function (i, element) {
            if ($(element).is("[" + divAttribute + "]")) {
                $(element).show();
            }
            else {
                $(element).hide();
            }
        });
    };
    account.prototype.agencyEdit = function (ev, showEditMode) {
        if (ev) {
            ev.preventDefault();
        }
        var buttonsContainer = this.html.find("[data-page-div-buttons]");
        var table = buttonsContainer.parent().find("table");
        $.each(table.find("tr"), function (i, e) {
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
    };
    account.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.agencyEdit(undefined, false);
    };
    account.prototype.loadData = function () {
        var _this = this;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var agencyServiceAgent, campaignServiceAgent, invoiceServiceAgent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
                        campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                        invoiceServiceAgent = ServiceAgentFactory.get(InvoiceServiceAgent);
                        return [4 /*yield*/, this.userSession.agencyInfo.load()];
                    case 1:
                        _b.sent();
                        this.setNavigationLinks();
                        // Solo se supporta l'anticipo credito
                        if (!this.userSession.agencyInfo.canAskCredit) {
                            this.html.find("[data-action-credit]").parent("li").remove();
                        }
                        this.account = this.userSession.agencyInfo.agency;
                        //this.credit = await agencyServiceAgent.creditBalance();
                        return [4 /*yield*/, this.loadHistory()];
                    case 2:
                        //this.credit = await agencyServiceAgent.creditBalance();
                        _b.sent();
                        return [4 /*yield*/, this.loadTransaction()];
                    case 3:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, invoiceServiceAgent.get()];
                    case 4:
                        _a.invoices = _b.sent();
                        this.renderTemplateScript("account-header-template");
                        this.renderTemplateScript("account-template");
                        this.renderTemplateScript("invoice-data-template");
                        this.renderTemplateScript("credit-template");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    account.prototype.loadHistory = function () {
        var _this = this;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var pageSizeElement, pageSize, reportServiceAgent, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pageSizeElement = this.html.find("#pageSizeHistory");
                        pageSize = pageSizeElement.val();
                        this.campaignsPerPage = parseInt((pageSize != "" && pageSize != undefined) ? pageSize : 10);
                        if (this.currentPage == undefined) {
                            this.currentPage = 0;
                        }
                        reportServiceAgent = ServiceAgentFactory.get(ReportServiceAgent);
                        _a = this;
                        return [4 /*yield*/, reportServiceAgent.groups(CampaignStatusEnum.All, this.campaignsPerPage, this.currentPage * this.campaignsPerPage)];
                    case 1:
                        _a.campaigns = (_c.sent()).OrderByDescending(function (c) { return c.StartDate; });
                        this.campaigns.forEach(function (v) { return v.formattedAmount = (v.Amount && v.Amount != null) ? v.Amount.toPriceFormat() : ["-", "-"]; });
                        _b = this;
                        return [4 /*yield*/, reportServiceAgent.groupsCount(CampaignStatusEnum.All)];
                    case 2:
                        _b.totalCampaigns = _c.sent();
                        this.availablePages = Math.ceil(this.totalCampaigns / this.campaignsPerPage);
                        this.pages = Array(this.availablePages).fill(0).map(function (v, i) { return ({ value: i + 1, isCurrent: i === _this.currentPage }); });
                        this.startIndex = (this.currentPage * this.campaignsPerPage) + 1;
                        this.endIndex = this.startIndex + this.campaignsPerPage - 1;
                        this.renderTemplateScript("history-template");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    account.prototype.loadTransaction = function () {
        var _this = this;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var pageSizeElement, pageSize, agencyServiceAgent, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pageSizeElement = this.html.find("#pageSizeTransaction");
                        pageSize = pageSizeElement.val();
                        this.transactionsPerPage = parseInt((pageSize != "" && pageSize != undefined) ? pageSize : 10);
                        if (this.currentPageTransaction == undefined) {
                            this.currentPageTransaction = 0;
                        }
                        agencyServiceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
                        _a = this;
                        return [4 /*yield*/, agencyServiceAgent.getTransactions(this.transactionsPerPage, this.currentPageTransaction * this.transactionsPerPage)];
                    case 1:
                        _a.transactions = _c.sent();
                        this.transactions.forEach(function (v) { return v.formattedAmount = (v.AgencyTransactionEuroAmount && v.AgencyTransactionEuroAmount != null)
                            ? v.AgencyTransactionEuroAmount.toPriceFormat() : ["-", "-"]; });
                        this.transactions.forEach(function (v) { return v.description = (v.AgencyTransactionEuroAmount < 0)
                            ? "Campaign Purchased" : "Client Requested Charge"; });
                        _b = this;
                        return [4 /*yield*/, agencyServiceAgent.getTransactions()];
                    case 2:
                        _b.totalTransactions = (_c.sent()).length;
                        this.availablePagesTransaction = Math.ceil(this.totalTransactions / this.transactionsPerPage);
                        this.pagesTransaction = Array(this.availablePagesTransaction).fill(0).map(function (v, i) { return ({ value: i + 1, isCurrent: i === _this.currentPageTransaction }); });
                        this.startIndexTransaction = (this.currentPageTransaction * this.transactionsPerPage) + 1;
                        this.endIndexTransaction = this.startIndexTransaction + this.transactionsPerPage - 1;
                        this.renderTemplateScript("transaction-template");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return account;
}(Page));
/// <reference path="../../references.ts" />
var sceltaflusso = /** @class */ (function (_super) {
    __extends(sceltaflusso, _super);
    function sceltaflusso() {
        return _super.call(this, "scelta-flusso.html") || this;
    }
    sceltaflusso.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    sceltaflusso.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.html.find(".content-flusso").hide();
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSession.agencyInfo.load()];
                    case 1:
                        _a.sent();
                        this.setNavigationLinks();
                        this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
                        if (this.userSession.agencyInfo.onlinePayment == true)
                            this.html.find(".flusso.col-lg-3").removeClass('col-lg-3').addClass('col-lg-4').filter(".bulk").remove();
                        this.html.find(".content-flusso").fadeIn(100);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return sceltaflusso;
}(Page));
/// <reference path="../../references.ts" />
var homeflusso3 = /** @class */ (function (_super) {
    __extends(homeflusso3, _super);
    function homeflusso3() {
        return _super.call(this, "home-flusso-3.html") || this;
    }
    homeflusso3.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.userSession.clear();
    };
    homeflusso3.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // Form principale
        this.html.find("#main").submit(this.formSubmit.bind(this));
        // Form di selezione multipla
        this.html.find("#popup3-multi form").submit(this.popupSubmit.bind(this));
        // Imposto il nome dell'agenzia
        // this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
    };
    homeflusso3.prototype.popupSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        this.html.find("#popup3-multi").modal("hide");
        var item = this.html.find(".slogan.selected").data("item");
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSession.addPdv(item)];
                    case 1:
                        _a.sent();
                        this.navigo.navigate("mappa-flusso-3");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    homeflusso3.prototype.formSubmit = function (e) {
        var _this = this;
        if (!e.isDefaultPrevented()) {
            e.preventDefault();
            this.userSession.clear();
            this.userSession.businessName = this.userSession.searchText = this.html.find("[name=businessName]").val();
            this.userSession.flow3.address = this.html.find("[name=address]").val();
            this.userSession.flow3.radius = parseInt("1000");
            this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                var semanticWebServiceAgent, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                            return [4 /*yield*/, semanticWebServiceAgent.searchLocation(this.userSession.flow3.address || "", this.userSession.businessName)];
                        case 1:
                            result = _a.sent();
                            if (!(result.Results.length != 0)) return [3 /*break*/, 5];
                            if (!(result.Results.length > 1)) return [3 /*break*/, 2];
                            this.renderTemplateScript("slogan-list-template", result.Results);
                            this.html.find(".slogan").each(function (i, e) {
                                $(e).data("item", result.Results[i]);
                            });
                            // Seleziono il primo
                            this.html.find(".slogan").first().trigger('click');
                            // Mostro la modale
                            this.html.find("#popup3-multi").modal("show");
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.userSession.addPdv(result.Results[0])];
                        case 3:
                            _a.sent();
                            this.navigo.navigate("mappa-flusso-3");
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.showAlert("Non trovato", "Nessuna insegna trovata");
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    return homeflusso3;
}(Page));
/// <reference path="../../references.ts" />
var sceltaprodotto = /** @class */ (function (_super) {
    __extends(sceltaprodotto, _super);
    function sceltaprodotto() {
        return _super.call(this, "scelta-prodotto.html") || this;
    }
    sceltaprodotto.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    sceltaprodotto.prototype.updateHeading = function (product) {
        // base awareness
        var text = '<strong>Per le attività</strong> che vogliono ';
        switch (this.userSession.objectiveDescription) {
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
    };
    sceltaprodotto.prototype.selectBestProposal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = this;
                        return [4 /*yield*/, this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                                var evaluation, bestProposalItem, bestEfficacy;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.userSession.pdvs[0].evaluate()];
                                        case 1:
                                            evaluation = _a.sent();
                                            // Gli imposto già questa valutazione perché non servirà successivamente
                                            this.userSession.pdvs[0].evaluation = evaluation;
                                            bestProposalItem = evaluation.Proposals.OrderByDescending(function (p) { return p.ProposalInfo.Efficacy; }).First();
                                            bestEfficacy = bestProposalItem.ProposalInfo.Efficacy;
                                            this.html.find("[data-value]").each(function (i, e) {
                                                var $e = $(e);
                                                var at = $e.parents("[data-type]:first").data("type");
                                                // Cerco la proposta per il pannello corrente
                                                var proposalItem = evaluation.Proposals.find(function (p) { return p.AdvertisementType == at; });
                                                if (proposalItem) {
                                                    // Cambio la percentuale di efficienza per la proposta
                                                    var dataValue = e.attributes.getNamedItem("data-value");
                                                    dataValue.value = (proposalItem.ProposalInfo.Efficacy / bestEfficacy * 100).toString();
                                                    $e.data('value', dataValue.value).attr('data-value', dataValue.value);
                                                }
                                                else {
                                                    // Proposta non disponibile
                                                    $e.parents(".cont:first").remove();
                                                }
                                                if (bestProposalItem == proposalItem) {
                                                    _this.bestProposalDiv = $e.parents(".cont:first").find(".proposal");
                                                }
                                            });
                                            t.html.find('.parent-target').trigger('sorting');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    sceltaprodotto.prototype.onNavigatedFrom = function () {
        _super.prototype.onNavigatedFrom.call(this);
        this.userSession.advertisementType = AdvertisementType[$(".proposal-selected [data-type]").data("type")];
        this.userSession.advertisementTypeDescription = $(".proposal-selected .panel-heading").text();
    };
    sceltaprodotto.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    return sceltaprodotto;
}(Page));
/// <reference path="../../references.ts" />
var mappaflusso3 = /** @class */ (function (_super) {
    __extends(mappaflusso3, _super);
    function mappaflusso3() {
        return _super.call(this, "mappa-flusso-3.html") || this;
    }
    mappaflusso3.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    mappaflusso3.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.renderTemplateScript("business-template", {
            businessName: this.userSession.businessName,
            address: this.userSession.pdvs[0].address,
            phoneNumber: this.userSession.pdvs[0].phoneNumber,
            image: this.userSession.pdvs[0].detail.Categories[0].Category === "No cat" ? "/assets/img/logo.png" : this.userSession.pdvs[0].mapItem.image
        });
    };
    mappaflusso3.prototype.updatePdi = function (id) {
        var _this = this;
        var pdv = this.userSession.getPdvById(id);
        if (!pdv)
            return;
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pdv.load()];
                    case 1:
                        _a.sent();
                        if (this.onUpdatePdv)
                            this.onUpdatePdv(pdv.mapItem);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    mappaflusso3.prototype.pdiMoved = function (id, location) {
        return __awaiter(this, void 0, void 0, function () {
            var pdv, googleServiceAgent, _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pdv = this.userSession.getPdvById(id);
                        if (!pdv) return [3 /*break*/, 4];
                        pdv.location = location;
                        pdv.locationAddress = "-";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        googleServiceAgent = new GoogleServiceAgent();
                        _a = pdv;
                        return [4 /*yield*/, googleServiceAgent.geocode(location)];
                    case 2:
                        _a.locationAddress = (_b.sent()).formatted_address;
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _b.sent();
                        console.error(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    mappaflusso3.prototype.pdiReset = function (id) {
        var _this = this;
        var pdv = this.userSession.getPdvById(id);
        if (!pdv)
            return;
        pdv.reset();
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Aggiorno gli insights
                    return [4 /*yield*/, pdv.load()];
                    case 1:
                        // Aggiorno gli insights
                        _a.sent();
                        if (this.onUpdatePdv)
                            this.onUpdatePdv(pdv.mapItem);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return mappaflusso3;
}(Page));
/// <reference path="../../references.ts" />
var campagnacreativitaadhoc = /** @class */ (function (_super) {
    __extends(campagnacreativitaadhoc, _super);
    function campagnacreativitaadhoc() {
        return _super.call(this, "campagna-creativita-ad-hoc.html") || this;
    }
    campagnacreativitaadhoc.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    campagnacreativitaadhoc.prototype.onNavigatedTo = function () {
        this.sidebar.changeMode(SidebarMode.ReadOnly);
    };
    campagnacreativitaadhoc.prototype.dropzoneComplete = function (xhr, type) {
        if (xhr.status === 200) {
            this.userSession.tailoredCustomContents.set(type, JSON.parse(xhr.responseText).Uri);
        }
        else {
            this.userSession.tailoredCustomContents.delete(type);
        }
    };
    campagnacreativitaadhoc.prototype.dropzoneRemove = function (size, type) {
        this.userSession.tailoredCustomContents.delete(type);
    };
    campagnacreativitaadhoc.prototype.goToRiepilogo = function (e) {
        e.preventDefault();
        this.userSession.productDescription = this.html.find("textarea").val();
        this.userSession.tailored = true;
        this.navigo.navigate("riepilogo-campagna");
    };
    return campagnacreativitaadhoc;
}(campagnaBase));
/// <reference path="../../references.ts" />
var errore = /** @class */ (function (_super) {
    __extends(errore, _super);
    function errore() {
        return _super.call(this, "errore.html") || this;
    }
    errore.prototype.onNavigatedTo = function () {
        _super.prototype.onNavigatedTo.call(this);
        this.sidebar.changeMode(SidebarMode.Unavailable);
    };
    errore.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var query = document.location.href.parseQuery();
        this.html.find("[data-title]").text(query.title || "Errore");
        this.html.find("[data-description]").text(query.description || "Si è verificato un errore imprevisto");
    };
    return errore;
}(Page));
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
/// <reference path="../../references.ts" />
var bulkcopertura = /** @class */ (function (_super) {
    __extends(bulkcopertura, _super);
    function bulkcopertura() {
        var _this = this;
        // aggiungo un metodo custom
        Handlebars.registerHelper("tooltip", function (di) {
            var msg = 'densità ';
            if (di <= 4) {
                msg += 'minima';
            }
            else if (di > 4 && di <= 9) {
                msg += 'moderata';
            }
            else if (di > 8 && di <= 12) {
                msg += 'considerevole';
            }
            else {
                msg += 'massima';
            }
            var html = "<div class='text-left'><div class='mt-5 mb-5 fs-12 text-left'><b class='fs-15'>Density index: </b>" + msg + "</div><div class='di screw-content d" + di + "'>";
            for (var i = 1; i <= 17; i++) {
                var cls = (i <= di) ? 'active' : '';
                html += "<div class='" + cls + " part screw'></div>";
            }
            return html + "</div><div class='di-number' style='margin-left:calc(100%/16*" + (di - 1) + ")'>" + di + "</div></div>";
        });
        _this = _super.call(this, "bulk-copertura.html") || this;
        return _this;
    }
    bulkcopertura.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
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
            Target: this.userSession.pdvs.Sum(function (c) { return c.selectedProduct.item.Value; }).toLocaleString(),
            Budget: (+this.userSession.pdvs.Sum(function (c) { return c.products[0].item.Price; })).toPriceFormat(),
            MobUsers: this.userSession.pdvs.Sum(function (c) { return c.detail.PotentialUsers; }).toLocaleString(),
            MalePercentage: Math.round(this.userSession.pdvs.Average(function (c) { return c.detail.MaleStatsPercentage; }) * 100) + "%",
            FemalePercentage: Math.round(this.userSession.pdvs.Average(function (c) { return c.detail.FemaleStatsPercentage; }) * 100) + "%",
        });
        this.renderTemplateScript("sidebar-bulk", {
            BusinessName: this.userSession.businessName,
            CountPdv: this.userSession.pdvs.length,
            CountCde: this.userSession.pdvs.length,
            ProductDesc: this.userSession.advertisementTypeDescription,
            MaxBudget: (+this.userSession.bulkData.budget).toPriceFormat(),
            StartDate: this.userSession.campaignStartDate.toLocaleDateString(),
            EndDate: this.userSession.bulkData.EndDate.toLocaleDateString(),
            Budget: (+this.userSession.pdvs.Sum(function (c) { return c.products[0].item.Price; })).toPriceFormat(),
            CountCity: this.userSession.pdvs.GroupBy(function (c) { return c.geocodeAddressCDE.City; }).Count(),
            CountProvince: this.userSession.pdvs.GroupBy(function (c) { return c.geocodeAddressCDE.Province; }).Count(),
            CountRegion: this.userSession.pdvs.GroupBy(function (c) { return c.geocodeAddressCDE.Region; }).Count(),
            TargetName: this.userSession.pdvs[0].reachWording,
            Target: this.userSession.pdvs.Sum(function (c) { return c.selectedProduct.item.Value; }).toLocaleString(),
            MobUsers: this.userSession.pdvs.Sum(function (c) { return c.detail.PotentialUsers; }).toLocaleString(),
            MalePercentage: Math.round(this.userSession.pdvs.Average(function (c) { return c.detail.MaleStatsPercentage; }) * 100) + "%",
            FemalePercentage: Math.round(this.userSession.pdvs.Average(function (c) { return c.detail.FemaleStatsPercentage; }) * 100) + "%",
        });
    };
    bulkcopertura.prototype.preparePlugin = function (plugin) {
        var _this = this;
        this._plugin = plugin;
        // elimino prima tutti i punti se esistono
        this._plugin.removeAll();
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, pdv;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.userSession.pdvs; _i < _a.length; _i++) {
                    pdv = _a[_i];
                    this._plugin.actions("add", false, pdv.mapItem);
                }
                return [2 /*return*/];
            });
        }); });
        this._plugin.actions("added-all", false);
    };
    bulkcopertura.prototype.getFlow = function () {
        return this.userSession.bulkData.flow.toString();
    };
    bulkcopertura.prototype.getOrderBy = function () {
        return this.userSession.bulkData.orderBy;
    };
    return bulkcopertura;
}(Page));
/// <reference path="../../references.ts" />
var bulkcreativita = /** @class */ (function (_super) {
    __extends(bulkcreativita, _super);
    function bulkcreativita() {
        return _super.call(this, "bulk-creativita.html") || this;
    }
    bulkcreativita.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this, true);
        this.selectedPdv = this.userSession.pdvs[0];
        var banners = this.getVisibleBannerIndexes(true);
        //this.html.find("[data-image]").attr('src', this.userSession.pdvs[0].mapItem.image);
        this.html.find("[data-file]").each(function (i, e) {
            var div = $(e);
            // Rimuovo tutti gli upload che non contengono gli indici
            if (!banners.Contains(parseInt(div.data("file")))) {
                div.remove();
            }
        });
        this.userSession.manualData.isSet = true;
        this.updateBanners();
    };
    bulkcreativita.prototype.dropzoneComplete = function (xhr, size) {
        var set;
        set = this.userSession.manualData.customBanners;
        if (xhr.status === 200) {
            set.set(size, JSON.parse(xhr.responseText).TempUri);
        }
        else {
            set.delete(size);
        }
        this.updateBanners();
    };
    bulkcreativita.prototype.dropzoneRemove = function (size) {
        var set;
        set = this.userSession.manualData.customBanners;
        set.delete(size);
    };
    bulkcreativita.prototype.updateBanners = function () {
        var _this = this;
        this.html.find("[data-banner-size]").each(function (i, e) {
            var $e = $(e);
            var s = BannerSize[$e.data("banner-size")];
            var uri = _this.selectedPdv.getBannerUri(s);
            if ($e.is("img")) {
                $e.attr("src", uri);
            }
            else {
                $e.attr("href", uri);
            }
        });
    };
    return bulkcreativita;
}(campagnaBase));
/// <reference path="../../references.ts" />
var bulkpianificazione = /** @class */ (function (_super) {
    __extends(bulkpianificazione, _super);
    function bulkpianificazione() {
        return _super.call(this, "bulk-pianificazione.html") || this;
    }
    bulkpianificazione.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.userSession.clear();
        this.html.find("form").submit(this.formUploadFile.bind(this));
    };
    bulkpianificazione.prototype.gotoConfigurazione = function () {
        return __awaiter(this, void 0, void 0, function () {
            var semanticWebServiceAgent, allDetails, x, item, detail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                        return [4 /*yield*/, semanticWebServiceAgent.getBulkDetails(this.userSession.businessName, this.userSession.bulkData.proposalBulkId)];
                    case 1:
                        allDetails = _a.sent();
                        x = 0;
                        _a.label = 2;
                    case 2:
                        if (!(x < this.bulkData.length)) return [3 /*break*/, 5];
                        item = this.bulkData[x];
                        detail = allDetails[x];
                        return [4 /*yield*/, this.userSession.addBulkPdv(item.Label, item.AddressPDV, item.AddressCDE, item.LandingUrl, item.TrackingPixel, item.Level, item.GoogleId, detail)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.navigo.navigate("bulk-configurazione");
                        return [2 /*return*/];
                }
            });
        });
    };
    bulkpianificazione.prototype.formUploadFile = function (e) {
        var _this = this;
        e.preventDefault();
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var formData, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bulkData = [];
                        this.bulkDataError = [];
                        formData = new FormData(this.html.find("form")[0]);
                        this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                        return [4 /*yield*/, this.semanticServiceAgent.GeocodeLocationFile(formData)];
                    case 1:
                        data = _a.sent();
                        this.userSession.bulkData.proposalBulkId = data.ProposalBulkId;
                        this.userSession.bulkData.Landings = data.Results.Select(function (c) { return c.LandingUrl; }).Distinct();
                        if (this.userSession.bulkData.Landings.First() == "")
                            this.userSession.bulkData.Landings = [];
                        this.userSession.businessName = $(e.target).find("[name=businessName]").val();
                        this.userSession.businessCategoryId = "No cat";
                        data.Results.forEach(function (c) { return c.Status ? _this.bulkData.push(c) : _this.bulkDataError.push(c); });
                        if (!(this.bulkDataError.length == 0)) return [3 /*break*/, 3];
                        this.html.closest('body').trigger('preloader', [this.bulkData.length]);
                        return [4 /*yield*/, this.gotoConfigurazione()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.renderTemplateScript("error-list-template", this.bulkDataError);
                        this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                        this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
                        this.html.find("#popup-error").modal("show");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); }, RunPolicy.Try, true, true);
    };
    bulkpianificazione.prototype.updateAll = function (e, divs) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                e.preventDefault();
                this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _i, divs_1, div, googleId, item, address, newAddressComponent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, divs_1 = divs;
                                _a.label = 1;
                            case 1:
                                if (!(_i < divs_1.length)) return [3 /*break*/, 4];
                                div = divs_1[_i];
                                googleId = div.children[0].attributes[1].nodeValue;
                                item = this.bulkDataError.FirstOrDefault(function (c) { return c.GoogleId == googleId; });
                                address = div.children[1].value;
                                if (!address) return [3 /*break*/, 3];
                                this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                                return [4 /*yield*/, this.semanticServiceAgent.Geocode(this.userSession.bulkData.proposalBulkId, googleId, address)];
                            case 2:
                                newAddressComponent = _a.sent();
                                if (newAddressComponent != null) {
                                    if (!this.bulkData.Any(function (c) { return c.GoogleId == newAddressComponent.PlaceId; }))
                                        item.GoogleId = newAddressComponent.PlaceId;
                                    item.AddressCDE = newAddressComponent;
                                    item.Status = true;
                                    this.bulkDataError.Remove(item);
                                    this.bulkData.push(item);
                                    this.html.find(e.target.parentElement.parentElement).addClass("done");
                                }
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4:
                                if (!(this.bulkDataError.length == 0)) return [3 /*break*/, 6];
                                this.html.find("#popup-error").modal("hide");
                                this.html.closest('body').trigger('preloader', [this.bulkData.length]);
                                return [4 /*yield*/, this.gotoConfigurazione()];
                            case 5:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 6:
                                this.renderTemplateScript("error-list-template", this.bulkDataError);
                                this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                                this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); }, RunPolicy.Try, true, true);
                return [2 /*return*/];
            });
        });
    };
    bulkpianificazione.prototype.updateRow = function (e, googleId, address) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                e.preventDefault();
                this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                    var item, newAddressComponent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                item = this.bulkDataError.FirstOrDefault(function (c) { return c.GoogleId == googleId; });
                                if (!address) return [3 /*break*/, 4];
                                this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                                return [4 /*yield*/, this.semanticServiceAgent.Geocode(this.userSession.bulkData.proposalBulkId, googleId, address)];
                            case 1:
                                newAddressComponent = _a.sent();
                                if (!(newAddressComponent != null)) return [3 /*break*/, 4];
                                if (!this.bulkData.Any(function (c) { return c.GoogleId == newAddressComponent.PlaceId; }))
                                    item.GoogleId = newAddressComponent.PlaceId;
                                item.AddressCDE = newAddressComponent;
                                item.Status = true;
                                this.bulkDataError.Remove(item);
                                this.bulkData.push(item);
                                this.html.find(e.target.parentElement.parentElement).addClass("done");
                                if (!(this.bulkDataError.length == 0)) return [3 /*break*/, 3];
                                this.html.find("#popup-error").modal("hide");
                                this.html.closest('body').trigger('preloader', [this.bulkData.length]);
                                return [4 /*yield*/, this.gotoConfigurazione()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                this.renderTemplateScript("error-list-template", this.bulkDataError);
                                this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                                this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, RunPolicy.Try, true, true);
                return [2 /*return*/];
            });
        });
    };
    return bulkpianificazione;
}(Page));
/// <reference path="../../references.ts" />
var bulkriepilogo = /** @class */ (function (_super) {
    __extends(bulkriepilogo, _super);
    function bulkriepilogo() {
        return _super.call(this, "bulk-riepilogo.html") || this;
    }
    bulkriepilogo.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this, true);
        this.html.find("[data-page-ordine-panel]").click(this.processPayment.bind(this));
        this.renderTemplateScript("riepilogo-bulk", {
            AgencyName: this.userSession.agencyInfo.agency.AgencyDescription,
            AgencyPhone: this.userSession.agencyInfo.agency.AgencyReferralPhoneNumber,
            ReferentName: this.userSession.agencyInfo.agency.AgencyReferralFirstName,
            ReferentSurame: this.userSession.agencyInfo.agency.AgencyReferralLastName,
            ReferentEmail: this.userSession.agencyInfo.agency.AgencyReferralEmail,
            BusinessName: this.userSession.businessName,
            ProductDesc: this.userSession.advertisementTypeDescription,
            TargetName: this.userSession.pdvs[0].reachWording,
            Target: this.userSession.pdvs.Sum(function (c) { return c.selectedProduct.item.Value; }).toLocaleString(),
            Budget: this.userSession.bulkData.flow === BulkFlow.High
                ? (+this.userSession.pdvs.Sum(function (c) { return c.products[0].item.Price; })).toPriceFormat()
                : (+this.userSession.bulkData.budget).toPriceFormat(),
            StartDate: moment(this.userSession.campaignStartDate).userLocale().format("ddd, D MMMM YYYY"),
            EndDate: moment(this.userSession.bulkData.EndDate).userLocale().format("ddd, D MMMM YYYY"),
            TotalPdv: this.userSession.pdvs.length,
            TotalCde: this.userSession.pdvs.length,
        });
        this.renderTemplateScript("riepilogo-bulk-ordine", {
            formattedTotalVatPrice: this.userSession.totalVatPrice.toPriceFormat(),
            formattedTotalPrice: this.userSession.formattedTotalPrice,
            formattedVat: (this.userSession.totalVatPrice - this.userSession.totalPrice).toPriceFormat()
        });
        this.selectedPdv = this.userSession.pdvs[0];
        this.updateBanners();
    };
    bulkriepilogo.prototype.getCustomName = function (p) {
        return p.detail.Name + " " + moment(this.userSession.campaignStartDate).format("L");
    };
    bulkriepilogo.prototype.getPdvDraft = function (p) {
        var customName = this.getCustomName(p);
        return ({
            SearchText: this.userSession.searchText || this.userSession.businessName,
            ProposalItemId: p.proposal.Id,
            ProposalCopyItemId: (this.userSession.selectedCopyItem) ? this.userSession.selectedCopyItem.Id : undefined,
            ProposalProductItemId: (p.selectedProduct) ? p.selectedProduct.item.Id : undefined,
            BannerCode: p.session.selectedBannerId,
            ProductDescription: this.userSession.productDescription,
            Discount: this.userSession.discount,
            BusinessName: this.userSession.businessName,
            Address: p.address,
            MobilePhone: p.phoneNumber,
            BusinessCategoryId: this.userSession.businessCategoryId,
            StartDate: this.userSession.campaignStartDate,
            Budget: p.selectedProduct.item.Price,
            Locations: [{ Latitude: p.location.lat, Longitude: p.location.lng }],
            Objective: this.userSession.objective,
            Website: p.detail.Website,
            FacebookPage: p.detail.Url,
            DisplayUrl: "",
            CampaignCustomName: customName,
            Headline: "",
            Row1: "",
            Row2: "",
            Title: "",
            Description: "",
            CustomKeywords: [],
            ButtonLink: p.uriClickToMap,
            CtcLink: p.clickToCall,
            CustomBanners: p.getCustomBannerUris(),
            TailoredBanners: this.userSession.getTailoredCustomContentsUris(),
            AddressComponent: {
                Address: p.geocodeAddressCDE.Address,
                City: p.geocodeAddressCDE.City,
                Country: p.geocodeAddressCDE.Country,
                FormattedAddress: p.geocodeAddressCDE.FormattedAddress,
                Location: p.geocodeAddressCDE.Location,
                PlaceId: p.geocodeAddressCDE.PlaceId,
                PostalCode: p.geocodeAddressCDE.PostalCode,
                Province: p.geocodeAddressCDE.Province,
                Region: p.geocodeAddressCDE.Region,
                StreetNumber: p.geocodeAddressCDE.StreetNumber
            },
            BulkLandingUrl: p.bulkLandingUrl,
            BulkTrackingPixel: p.bulkTrackingPixel,
            IsBulk: true,
            Cluster: p.detail.Cluster,
            Radius: p.detail.Radius,
            BulkFlow: this.userSession.bulkData.flow,
            ProposalBulkId: this.userSession.bulkData.proposalBulkId
        });
    };
    bulkriepilogo.prototype.processPayment = function (e) {
        var _this = this;
        e.preventDefault();
        this.runAsync(function () { return __awaiter(_this, void 0, void 0, function () {
            var campaignServiceAgent, campaignGroupId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);
                        return [4 /*yield*/, campaignServiceAgent.bulkPrepareCampaign({
                                Campaigns: this.userSession.pdvs.map(function (p) { return _this.getPdvDraft(p); })
                            })];
                    case 1:
                        campaignGroupId = _a.sent();
                        // Salvo il cookie utilizzato poi dalla pagina di conferma
                        if ($.cookie) {
                            $.cookie("lastCampaignGroup", JSON.stringify({ customName: this.userSession.getCustomName, campaignGroupId: campaignGroupId }));
                        }
                        // Avvio il pagamento
                        this.navigo.navigate("pagamento-completato");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    bulkriepilogo.prototype.updateBanners = function () {
        var _this = this;
        this.html.find("[data-banner-size]").each(function (i, e) {
            var $e = $(e);
            var s = BannerSize[$e.data("banner-size")];
            var uri = _this.selectedPdv.getBannerUri(s);
            $e.attr("src", uri);
        });
    };
    return bulkriepilogo;
}(campagnaBase));
var dev = {
    preset: "multi",
    fakeSemanticWeb: false,
    fakeCampaign: false,
    fakeGeocodeAddress: false,
};
var isLocalHost = (document.location.href.indexOf("localhost") > 0);
// Per evitare dimenticanze
if (!isLocalHost) {
    dev.preset = "none";
    dev.fakeSemanticWeb = false;
    dev.fakeCampaign = false;
    dev.fakeGeocodeAddress = false;
}
// Definizioni delle chiavi per ogni host
var clientIds = {
    "localhost": {
        clientId: "6759ca85-3e16-4f75-b91d-0eedcc98b948",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app-dev.azurewebsites.net": {
        clientId: "5ed992e4-c93d-4a26-a889-6702c1760dd5",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app-staging.azurewebsites.net": {
        clientId: "5a16b955-6a69-419e-87c8-285ce2e3ea3c",
        baseUrl: "https://arcadia-api-staging.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app.azurewebsites.net": {
        clientId: "171c5f1a-59a9-4c65-8abe-2ed067d2288f",
        baseUrl: "https://arcadia-api.azurewebsites.net",
        policy: "B2C_1_AgencySignIn"
    },
    "agency.admove.com": {
        clientId: "171c5f1a-59a9-4c65-8abe-2ed067d2288f",
        baseUrl: "https://arcadia-api.azurewebsites.net",
        policy: "B2C_1_AgencySignIn"
    }
};
var redirect = document.location.protocol + "//" + document.location.host;
var config = clientIds[document.location.hostname.toLowerCase()];
var baseUrl;
var getLoginUrl;
if (!config) {
    console.error("No configuration for " + document.location.host);
}
else {
    baseUrl = config.baseUrl;
    console.log(config.policy);
    console.log(config.clientId);
    console.log(encodeURIComponent(""));
    console.log(encodeURIComponent(redirect));
    getLoginUrl = function (r) {
        if (r === void 0) { r = ""; }
        return "https://login.microsoftonline.com/admovecom.onmicrosoft.com/oauth2/v2.0/authorize?p=" + config.policy + "&client_id=" + config.clientId + "&nonce=defaultNonce&redirect_uri=" + encodeURIComponent(redirect) + "&scope=openid&response_type=id_token&prompt=login&state=" + encodeURIComponent(r);
    };
}
var landingUrlAdmove = (isLocalHost || document.location.hostname.toLowerCase() == "admove-agenzie-app-dev.azurewebsites.net") ? 'https://ads-dev.admove.com/' : 'https://ads.admove.com/';
/// <reference path="extensions.ts" />
/// <reference path="Models/BaseVersion.ts" />
/// <reference path="Models/Agency/Agency.ts" />
/// <reference path="Models/AgencyTransaction/AgencyTransaction.ts" />
/// <reference path="Models/Business/Business.ts" />
/// <reference path="Models/BusinessCategory/BusinessCategory.ts" />
/// <reference path="Models/BusinessLocation/BusinessLocation.ts" />
/// <reference path="Models/Campaign/Campaign.ts" />
/// <reference path="Models/Campaign/CampaignGroup.ts" />
/// <reference path="Models/Campaign/CampaignInfoBase.ts" />
/// <reference path="Models/Campaign/CampaignStatus.ts" />
/// <reference path="Models/Campaign/CampaignType.ts" />
/// <reference path="Models/Campaign/CampaignUserData.ts" />
/// <reference path="Models/Campaign/Coupon.ts" />
/// <reference path="Models/Campaign/EvaluateRequest.ts" />
/// <reference path="Models/Campaign/Evaluation.ts" />
/// <reference path="Models/Campaign/HandleCampaignPayment.ts" />
/// <reference path="Models/Campaign/Proposal.ts" />
/// <reference path="Models/Campaign/SaveCampaignDraft.ts" />
/// <reference path="Models/Campaign/SaveCampaignGroupDraftResponse.ts" />
/// <reference path="Models/Campaign/ValidatedCoupon.ts" />
/// <reference path="Models/CampaignDashboard/CampaignDashboard.ts" />
/// <reference path="Models/Country/Country.ts" />
/// <reference path="Models/Customer/Customer.ts" />
/// <reference path="Models/GeoStatistics/CityPopulationResult.ts" />
/// <reference path="Models/GeoStatistics/StatsInRangeResult.ts" />
/// <reference path="Models/Invoice/Invoice.ts" />
/// <reference path="Models/Invoice/PrepareForCampaignRequest.ts" />
/// <reference path="Models/Payment/Payment.ts" />
/// <reference path="Models/PaymentMethod/PaymentMethod.ts" />
/// <reference path="Models/Report/ReportCampaign.ts" />
/// <reference path="Models/Report/ReportCampaignById.ts" />
/// <reference path="Models/Report/ReportCampaignDetailsById.ts" />
/// <reference path="Models/Report/ReportCampaignsSummary.ts" />
/// <reference path="Models/SemanticWeb/BaseDetailBindingResult.ts" />
/// <reference path="Models/SemanticWeb/BaseLocationBindingResult.ts" />
/// <reference path="Models/SemanticWeb/BaseSearchBindingResult.ts" />
/// <reference path="Models/SemanticWeb/BaseGeocodeLocationBindingResult.ts" />
/// <reference path="Models/SemanticWeb/BulkImportBindingResult.ts" />
/// <reference path="Models/SemanticWeb/CategoryCompetitor.ts" />
/// <reference path="Models/SemanticWeb/MetadataBindingResult.ts" />
/// <reference path="Models/UserAccounts/UserAccounts.ts" />
/// <reference path="Models/Security/AgencySignupRequest.ts" />
/// <reference path="ServiceAgents/ServiceAgentContext.ts" />
/// <reference path="ServiceAgents/ServiceAgent.ts" />
/// <reference path="ServiceAgents/ServiceAgentFactory.ts" />
/// <reference path="ServiceAgents/BusinessCategoryServiceAgent.ts" />
/// <reference path="ServiceAgents/CampaignServiceAgent.ts" />
/// <reference path="ServiceAgents/InvoiceServiceAgent.ts" />
/// <reference path="ServiceAgents/SemanticWebServiceAgent.ts" />
/// <reference path="ServiceAgents/GoogleServiceAgent.ts" />
/// <reference path="ServiceAgents/SecurityServiceAgent.ts" />
/// <reference path="ServiceAgents/AgencyServiceAgent.ts" />
/// <reference path="ServiceAgents/ReportServiceAgent.ts" />
/// <reference path="Navigation/UserSession.ts" />
/// <reference path="Navigation/NavigationService.ts" />
/// <reference path="Navigation/Page.ts" />
/// <reference path="Navigation/Sidebar.ts" />
/// <reference path="Navigation/Pages/index.html.ts" />
/// <reference path="Navigation/Pages/scelta-categoria.html.ts" />
/// <reference path="Navigation/Pages/prodotto-obiettivo.html.ts" />
/// <reference path="Navigation/Pages/map.html.ts" />
/// <reference path="Navigation/Pages/riepilogo-pdv.html.ts" />
/// <reference path="Navigation/Pages/seleziona-scenari.html.ts" />
/// <reference path="Navigation/Pages/personalizza-campagna.html.ts" />
/// <reference path="Navigation/Pages/riepilogo-campagna.html.ts" />
/// <reference path="Navigation/Pages/pagamento-completato.html.ts" />
/// <reference path="Navigation/Pages/personalizza-campagna-creativita.html.ts" />
/// <reference path="Navigation/Pages/registrati.html.ts" />
/// <reference path="Navigation/Pages/dashboard.html.ts" />
/// <reference path="Navigation/Pages/account.html.ts" />
/// <reference path="Navigation/Pages/scelta-flusso.html.ts" />
/// <reference path="Navigation/Pages/home-flusso-3.html.ts" />
/// <reference path="Navigation/Pages/scelta-prodotto.html.ts" />
/// <reference path="Navigation/Pages/mappa-flusso-3.html.ts" />
/// <reference path="Navigation/Pages/campagna-creativita-ad-hoc.html.ts" />
/// <reference path="Navigation/Pages/errore.ts" />
/// <reference path="Navigation/Pages/bulk-configurazione.html.ts" />
/// <reference path="Navigation/Pages/bulk-copertura.html.ts" />
/// <reference path="Navigation/Pages/bulk-creativita.html.ts" />
/// <reference path="Navigation/Pages/bulk-pianificazione.html.ts" />
/// <reference path="Navigation/Pages/bulk-riepilogo.html.ts" />
/// <reference path="config.ts" />
/// <reference path="references.ts" />
ServiceAgentFactory.context = new ServiceAgentContext(baseUrl);
var navigationService = new NavigationService("typescript/Navigation/Pages/");
var AreaType;
(function (AreaType) {
    AreaType[AreaType["Metropolitana"] = 0] = "Metropolitana";
    AreaType[AreaType["Urbana"] = 1] = "Urbana";
    AreaType[AreaType["Cittadina"] = 2] = "Cittadina";
    AreaType[AreaType["Rurale"] = 3] = "Rurale";
})(AreaType || (AreaType = {}));
var BulkFlow;
(function (BulkFlow) {
    BulkFlow[BulkFlow["Small"] = 0] = "Small";
    BulkFlow[BulkFlow["Medium"] = 1] = "Medium";
    BulkFlow[BulkFlow["High"] = 2] = "High";
})(BulkFlow || (BulkFlow = {}));
