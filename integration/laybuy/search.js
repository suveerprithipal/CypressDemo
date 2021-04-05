function WhenISearchForAMerchant(shop){
    cy.get('input[type="search"]').scrollIntoView().type(shop,{force: true});
    cy.get('input[type="search"]').should('have.value', shop);
}

function ThenIExpectAShopDirectoryCountOf(expectedLength){
    cy.get('[class^=shop-directory-]').not('[class*=shop-directory-module--tag-matches]').should('have.length', expectedLength);
}

context('Store Search Smoke Test', () => {
    beforeEach(() => {
        cy.visit('https://sandbox-www.laybuy.com/nz/shop-here/');
        cy.get('button').contains('Accept').click();
        cy.wait(1000);
    });

    describe('Stirling should return 2 results', () => {
        it('I search for Stirling and expect 2 results', (shop = 'Stirling', expectedLength = 2) => {
            WhenISearchForAMerchant(shop);
            ThenIExpectAShopDirectoryCountOf(expectedLength);
        })
    });
    describe('SideQuest: PBTech should return 1 result', () => {
        it('I search for PbTech and expect 1 results', (shop = 'PbTech', expectedLength = 1) => {
            WhenISearchForAMerchant(shop);
            ThenIExpectAShopDirectoryCountOf(expectedLength);
        })
    });

    describe('Open Store in new Window', () => {
        it('I click Stirling and expect the store to open in a new window', (shop = 'Stirling') => {
            WhenISearchForAMerchant(shop);
            cy.wait(1000);
            cy.get('[class^=shop-directory-module--tiles]').not('[class*=shop-directory-module--tag-matches]')
                .within(($form) => {
                    cy.get('[class*=tile-module--tile]').eq(0).should('have.attr', 'target', '_blank').click();
                    cy.go('back');
            })
        })
    });
})
