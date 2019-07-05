interface PageConstructor {
    new (): Page;
}

type PageHistory = { url: string, key: string, page: Page, html: JQuery };

class NavigationService {

    private readonly _navigo: Navigo;
    private readonly _pages: { [id: string]: PageHistory; } = {};
    private readonly _journal: string[] = [];
    private _currentPage?: PageHistory;
    private _userSession: UserSession;
    private _insightsPane: Sidebar;

    // Pagine ad accesso anonimo
    private _anonymousKeys = ["index", "registrati", "errore"];
    // Pagine ad accesso autenticato, ma anche se è la prima pagina ad essere caricata
    private _authenticatedKeys = ["dashboard", "account", "pagamentocompletato", "pagamentoerrore", "sceltaflusso"];

    constructor(public baseUrl: string) {
        this._userSession = new UserSession();
        this._insightsPane = new Sidebar();

        this._navigo = new Navigo(null, true);
        this._navigo.on("*", this.navigoOn.bind(this)).resolve();

        $(document).on("click", ".btn-back:not([data-navigo])", () => history.back());
        // Chiusura automatica del menu di sinistra quando si clicca su un link
        $(document).on("click", "#menu-left a", () => $("#open-menu").click());
        
        this.setHomeButton();
        this.setLoginButton();
    }

    public get currentPage(): Page | undefined {
        return (this._currentPage) ? this._currentPage.page : undefined;
    }

    private setLoginButton(): void {
        let b = ServiceAgentFactory.context.accessTokenExpired;
        let loginButton = $("[data-page-loginout]")
            .text(b ? "Login" : "Logout")
            .attr("href", b ? getLoginUrl() : "#")
            .click(e => {
                if (!ServiceAgentFactory.context.accessTokenExpired) {
                    e.preventDefault();
                    setTimeout(this.navigateToStart.bind(this), 10);
                }
                // Annullo sempre il cookie
                ServiceAgentFactory.context.accessToken = undefined;
            });
    }

    private setHomeButton(): void {
        let b = ServiceAgentFactory.context.accessTokenExpired;
        $("[data-page-home]").attr("href", b ? "/" : "/#home-flusso-3");
    }

    private checkAadResponse(current: { url: string, query: string }): (() => void) | undefined {
        let query = current.url.parseQuery();
        // Errore da AAD
        if (query["error"]) {
            console.error("Error from Azure AAD", query["error"]);
            return () => this.navigateToStart();
        } else if (query["id_token"]) {
            // Decode del token
            let idToken = query["id_token"] || "";

            // Imposto il token
            ServiceAgentFactory.context.accessToken = idToken;

            // Lo azzero per evitare che cerchi una pagina con questo nome
            current.url = "";

            let newKey = query["state"] || "home-flusso-3";

            // Ritorno di navigare alla pagina di scelta categoria
            return () => this._navigo.navigate(newKey);
        }

        return undefined;
    }

    private navigateToStart(): void {
        document.location!.href = "/";
    }

    private checkBackNavigation(key: string): boolean {
        // Cerco l'indice nella storia di navigazione
        let keyIndex = this._journal.lastIndexOf(key);
        if (keyIndex < 0) return false;

        // Controllo se sto navigando indietro di una pagina
        if (this._currentPage && this._journal.lastIndexOf(this._currentPage.key) == keyIndex + 1) {
            // Rimuovo quelli successivi
            keyIndex++;
        }

        for (let i = keyIndex; i < this._journal.length; i++) {
            let keyToRemove = this._journal[i];
            let pageToRemove = this._pages[keyToRemove];
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
    }

    private navigoOn(p: any, query: string) {
        let postLoadAction: (() => void) | undefined;

        let current: { url: string, query: string } = (this._navigo as any).lastRouteResolved();
        // Controllo eventuali callback da AAD
        postLoadAction = this.checkAadResponse(current);
        
        // Identifico la chiave, la classe da istanziare
        let key: string = current.url.toLowerCase().replace(/^\/+/, "").replace(/[#_-]+/g, "");
        if (key.length === 0 || key.indexOf("http") === 0) {
            // Fallback sulla prima pagina
            key = "index";
        }
        
        let isAnonymousKey = this._anonymousKeys.indexOf(key) >= 0;
        let isProtectedKey = this._authenticatedKeys.indexOf(key) >= 0;
        // Pagina protetta ad accesso diretto
        if (isProtectedKey) {
            if (ServiceAgentFactory.context.accessTokenExpired) {
                // Mando alla login
                document.location!.href = getLoginUrl(key);
                return;
            }
        } else if (! // Se nessuna è soddisfatta
            (
            // Pagine anonime ad accesso diretto
            isAnonymousKey
            ||
            // Altre pagine protette con accesso dalla prima pagina
            (this._currentPage && !ServiceAgentFactory.context.accessTokenExpired)
        )) {
            // Forzo la navigazione alla prima pagina
            this.navigateToStart();
            return;
        }

        // Sto navigando all'indietro
        if (this.checkBackNavigation(key)) {
            return;
        }

        // Cerco nella history la pagina
        let pageHistory: PageHistory = this._pages[key];
        if (!pageHistory) {

            // Cerco la classe da istanziare
            let pageClass: PageConstructor = (window as any)[key]
            if (!pageClass) {
                throw Error(`Cannot find class ${key}`);
            }
            // Istanzio la classe e creo la voce di history
            pageHistory = <PageHistory>{
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
            if (postLoadAction) postLoadAction();
        } else {
            let cachebuster = "?" + Math.round(new Date().getTime() / 1000).toString();

            // Carico l'HTML da remote
            $.get(this.baseUrl + pageHistory.page.relativeUri + cachebuster, (d, s, j) => {
                // Parsing dell'HTML
                pageHistory.page.html = pageHistory.html = $("<div/>").html(d);
                // Aggiungo il nuovo elemento
                pageHistory.page.pagePlaceholder.append(pageHistory.html);
                // Aggiorno per gestire <a data-navigo>
                this._navigo.updatePageLinks();
                // Gestisco il cambio di pagina
                this.changePage(pageHistory, true);
                if (postLoadAction) postLoadAction();
            }, "html");
        }
    }

    private changePage(pageHistory: PageHistory, fireOnLoad: boolean = false): void {
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
    }

}