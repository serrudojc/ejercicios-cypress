class HomePage {
    constructor(){
        this.itemLast = ".item.last"; 
        this.menuBarHover = "div.dnavigation__link";
        this.subItem = "a.dnavigation__link";
        this.menuNavbar = "a.navigation-secondary__user-type";
    }

    elegirItem(nroDeItem){
        nroDeItem -= 1
        cy.get(this.itemLast).eq(nroDeItem).click();
    }

    elegirEnMenuBarHover(subItemDelMenu){
        cy.get(this.menuBarHover).trigger("mouseover");
        cy.get(this.subItem).contains(subItemDelMenu).click();
    }

    elegirEnNavBar(menu){
        cy.get(this.menuNavbar).contains(menu).click({force: true});
    }
}

export default HomePage;