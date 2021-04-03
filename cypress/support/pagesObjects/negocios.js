class NegociosPage {
    constructor(){
        this.spanDeItems = "ul.dnavigation__submenu__2 > li > a > span"; 
        this.listadoDeItems = "ul.dnavigation__submenu";
    }

    noDebeContener(items){
        for (let i = 0; i < items.length; i++){
            cy.get(this.spanDeItems).each(($el,index,$list) => {
                cy.get($el).should("not.have.text", items[i])
            })
        }
    }
    
    noDebeContenerVersionCorta(items){
        for (let i = 0; i < items.length; i++){
            cy.get(this.listadoDeItems).should("not.contain", items[i]);

        }
    }

}

export default NegociosPage;