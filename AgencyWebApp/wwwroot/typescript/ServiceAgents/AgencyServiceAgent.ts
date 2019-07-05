interface AgencyServiceAgent {
    get(): Promise<AgencyBinding[]>;
    getAgency(): Promise<AgencyBinding>;
    creditBalance(): Promise<number>;
    askCredit(ask: AskCreditBinding): Promise<void>;
    updateAgency(agency: AgencyBinding): Promise<void>;
    getTransactions(top?: number, skip?: number): Promise<AgencyTransactionBinding[]>;
}

class AgencyServiceAgent extends AutoServiceAgent<AgencyServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "get", method: "GET", uri: "/api/agency" },
            { name: "getAgency", method: "GET", uri: "/api/agency/getAgency" },
            { name: "creditBalance", method: "GET", uri: "/api/agency/creditBalance" },
            { name: "askCredit", method: "POST", uri: "/api/agency/askCredit", body: args => args[0] },
            { name: "updateAgency", method: "PUT", uri: "/api/agency/UpdateAgency", body: args => args[0] },
            { name: "getTransactions", method: "GET", uri: args => this.formatUri("/api/agency/transactions", undefined, { $top: args[0], $skip: args[1] }) }
        );
    }
}