class ServiceAgentFactory {

    static context: ServiceAgentContext;

    static get<T extends ServiceAgent>(c: { new (context: ServiceAgentContext): T; }): T {
        return new c(ServiceAgentFactory.context);
    }
}