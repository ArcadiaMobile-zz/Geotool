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