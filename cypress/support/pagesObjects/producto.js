class ProductoPage {
    constructor(){
        this.financiacion = "#open-modal-installments"; 
        this.seleccionarBanco = "#selectBank";
        this.seleccionarTarjeta = "#selectCardByBank";
        this.filasTablaFinanciacion = "#bodyTable tr";
    }

    elegirFinanciacion(banco, tarjeta){
        cy.get(this.financiacion).click();
        cy.get(this.seleccionarBanco).select(banco);
        cy.get(this.seleccionarTarjeta).select(tarjeta);
    }

    noExistaCuotas(cuotas){
        cy.get(this.filasTablaFinanciacion).each(($el) => {
            cy.wrap($el).within(() => {
                cy.get("td").eq(0).should("not.have.text", cuotas);
            })
        })
    }
}

export default ProductoPage;