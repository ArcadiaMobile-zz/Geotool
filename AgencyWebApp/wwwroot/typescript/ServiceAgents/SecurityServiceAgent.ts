interface SecurityServiceAgent {
    signupAgency(request: AgencySignupRequest): Promise<void>;
}

class SecurityServiceAgent extends AutoServiceAgent<SecurityServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "signupAgency", method: "POST", uri: args => "/api/security/agency", body: args => args[0] }
        );
    }
}