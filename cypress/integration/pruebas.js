/*
Caso 1:
CP003-Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista -Banco.Credicoop -Tarjeta.Visa
Descripción: El objetivo del caso de prueba es visitar la tienda de Movistar (https://tienda.movistar.com.ar/), luego ingresar al tercer equipo de la lista inicial que se obtenga y verificar que NO exista el metodo de pago de 60 cuotas para el banco Credicoop con Tarjeta VISA.
Resultado esperado:
 - Que se pueda ingresar a la pagina indicada
 - Que el equipo seleccionado sea el tercero de la lista
 - Que no exista un medio de pago con 60 cuotas para el banco Credicoop con tarjeta VISA

Caso 2:
Pasos:
1) Ingresar a la Tienda Movistar.
2) En "Productos y Servicios" seleccionar "Planes de TV".
3) Validar que se haya redirigido a la url que contenga "television/planes".
4) Indicar los planes que aparezcan en la página con sus montos actuales (inculyendo descuento).
5) Validar que el número de planes sea igual o mayor a 3.

Caso 3:
Pasos:
1) Ingresar a la Tienda Movistar.
2) Ingresar al perfil de "Negocios" (esquina superior izquierda)
3) Validar que se haya redirigido a negocios realizando un assert con la url
4) Validar que posean "Tienda", "Productos y Servicios", "Ayuda" y "Beneficios"
5) En "Productos y Servicios" validar de manera dinámica que no se encuentren: "Prepago", "Cambio de Plan", "Packs Postpago" y "Servicios para tu línea"

*/

/// <reference types="Cypress" />

import HomePage from "../support/pagesObjects/home";

describe("Casos de Prueba varios", () => {

    beforeEach(() => {
        cy.visit("https://tienda.movistar.com.ar/");
    })

    //------------------------------------------------------

    it("Validar que compra no tenga 60 cuotas",()=>{
        const nroDeItem = 3;
        let nombreDelProducto; 

        cy.get("div[productname]").eq(nroDeItem - 1).then(($input) => {                         //Motorola Moto G9 Power   
            nombreDelProducto = $input.attr("productname").toLowerCase().replaceAll(" ", "-");  
            cy.log(nombreDelProducto);                                                          //motorola-moto-g9-power
        })
        cy.log(nombreDelProducto);                                                              //no definido
        
        cy.get(".item.last").eq(nroDeItem - 1).click();
        //cy.url().should("include", "samsung-galaxy-a11");
        cy.url().should("include", nombreDelProducto);

        cy.get("#open-modal-installments").click();
        cy.get("#selectBank").select("Credicoop");
        cy.get("#selectCardByBank").select("Visa");

        cy.get("#bodyTable tr").each(($el) => {
            cy.wrap($el).within(() => {
                cy.get("td").eq(0).should("not.have.text", "60");
            })
        })
    })

    //------------------------------------------------------

    it("Validar acceso y numero de Planes de TV", () => {
        const homePage = new HomePage();
        homePage.elegirEnMenuBarHover("Planes de TV");

        //cy.url().should("include", "/television/planes");
        cy.URLDebeIncluir("/television/planes")

        //listar planes y precios
        
        cy.get(".box-azul").should('have.length.gte', 3);
    })

    //------------------------------------------------------

    it("Validar página Negocios",()=>{
        
        //cy.get("a.navigation-secondary__user-type").contains("Negocios").click({force: true});
        const homePage = new HomePage();
        homePage.elegirEnNavBar("Negocios");

        //cy.url().should("include","https://tienda.movistar.com.ar/negocios.html");
        cy.URLDebeIncluir("https://tienda.movistar.com.ar/negocios.html")
        
        /*
        //esto no va, pq me toma 18 textos y no solo los 4 items
        cy.get("ul > li > .dnavigation__link > span").each(($el,index,$list) => {
            cy.get($el).should("have.text", "Tienda")
            //tengo que salir de la iteracion
        })
        */
        cy.get('.dnavigation > :nth-child(1) > .dnavigation__link > span').should("have.text", "Tienda")
        cy.get('div.dnavigation__link > :nth-child(1)').should("have.text", "Productos y Servicios")
        cy.get('.dnavigation > :nth-child(3) > .dnavigation__link > span').should("have.text", "Ayuda")
        cy.get('.dnavigation > :nth-child(4) > .dnavigation__link > span').should("have.text", "Beneficios")
/*
        const items = ["Prepago", "Cambio de Plan", "Planes de TV", "Packs Postpago", "Servicios para tu línea"]
        for (let i = 0; i < items.length; i++){
            cy.get("ul.dnavigation__submenu__2 > li > a > span").each(($el,index,$list) => {
                cy.get($el).should("not.have.text", items[i])
            })
        }
*/
        const items = ["Prepago", "Cambio de Plan", "Packs Postpago", "Servicios para tu línea"]
        for (let i = 0; i < items.length; i++){
            cy.get("ul.dnavigation__submenu").should("not.contain", items[i]);

        }
    })
})

//********************************************************************************* */
/*
Notas
Tuve que agregar esto al principio del caso o en support/index.js 

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Sino, rompia cuando queria ingresar a la web 
    cy.visit("https://www.movistar.com.ar/productos-y-servicios/television/planes");
    cy.url().should("include", "/television/planes");

lo mismo, tuve que manejar la excepcion para poder ingresar a esta web, se ocultaba el navbar de Negocios
    //cy.visit("https://tienda.movistar.com.ar/negocios.html");    
*/