class ServiceAgent {

    constructor(public context: ServiceAgentContext) {

    }

    protected doCall(operation: AutoServiceAgentOperation, args: any[]): Promise<any> {
        let finalUri: string = this.context.baseUrl;
        if (typeof operation.uri === "string") {
            finalUri += operation.uri;
        } else {
            finalUri += operation.uri(args);
        }

        let setting: JQueryAjaxSettings = {
            method: operation.method || "GET",
            url: finalUri,
            contentType: "application/json",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "bearer " + this.context.accessToken);
            }
        }

        let body: any;
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

        

        return new Promise<any>((resolve: any, reject: any) => {
            setting.success = r => resolve((operation.responseCallback) ? operation.responseCallback(r) : r);
            setting.error = (r: XMLHttpRequest, status: string, errorThrown: string) => reject(new Error(errorThrown));

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
    }

    /**
    * Formatta un indirizzo concatenando i path e un oggetto di querystring
    */
    protected formatUri(uri: string, paths?: string[], queryString?: { [key: string]: string }): string {
        if (paths) {
            for (let p of paths) {
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
            let first = true;
            for (let p in queryString) {
                if (typeof queryString[p] === "undefined") continue;
                if (!first) {
                    uri += "&";
                }
                uri += `${encodeURIComponent(p)}=${encodeURIComponent(queryString[p])}`;
                first = false;
            }
        }
        return uri;
    }
}

type UriProvider = string | ((args: any[]) => string);

interface AutoServiceAgentOperation {
    uri: UriProvider,
    method?: "GET" | "POST" | "PUT",
    body?: (args: any[]) => any,
    responseCallback?: (response: any) => any,
};

interface AutoServiceAgentOperationOf<T> extends AutoServiceAgentOperation {
    name: keyof T
};

class AutoServiceAgent<T> extends ServiceAgent {

    public constructor(context: ServiceAgentContext, ...operations: AutoServiceAgentOperationOf<T> []) {
        super(context)

        let thisDic = (this as { [key: string]: any });
        for (let o of operations) {
            thisDic[<string>(o.name)] = (...args: any[]) => this.doCall(o, args);
        }
    }


}