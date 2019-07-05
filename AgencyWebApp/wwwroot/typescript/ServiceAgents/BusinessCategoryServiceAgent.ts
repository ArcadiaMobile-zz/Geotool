interface BusinessCategoryServiceAgent {
    getAll(): Promise<BusinessCategory[]>;
}

class BusinessCategoryServiceAgent extends AutoServiceAgent<BusinessCategoryServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "getAll", uri: "/api/BusinessCategory" }
        );
    }
}