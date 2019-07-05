class ServiceAgentContext {
    constructor(public baseUrl: string) {
        this.reload();
    }

    private _accessToken?: string;

    public reload(): void {
        if ($.cookie !== undefined) {
            this._accessToken = $.cookie("accessToken");
        }
    }

    public get accessToken(): string | undefined {
        return this._accessToken;
    }

    private get accessTokenObject(): { exp?: number } {
        if (!this.accessToken) {
            return {};
        }
        return <{ exp?: number }> jwt_decode(this.accessToken);
    }

    public set accessToken(value: string | undefined) {
        this._accessToken = value;
        if (value && $.cookie !== undefined) {
            $.cookie("accessToken", value, { expires: this.accessTokenExpiration });
        }
        else {
            $.removeCookie("accessToken");
        }
    }

    public get accessTokenExpiration(): Date | undefined {
        if (this.accessTokenObject.exp) {
            return moment.unix(this.accessTokenObject.exp).toDate();
        }
        return undefined;
    }

    public get accessTokenExpired(): boolean {
        return !this.accessTokenExpiration || new Date() >= this.accessTokenExpiration;
    }
}