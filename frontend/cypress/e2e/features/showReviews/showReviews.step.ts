    import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

    before(() => {
            cy.request({
            method: 'DELETE',
            url: `http://localhost:8000/review/delete_all`,
            failOnStatusCode: false,
            }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404])
        })});

    
    after(() => {
        cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/review/delete_all`,
        failOnStatusCode: false,
        }).then((response) => {
    expect(response.status).to.be.oneOf([200, 404])
    })});
    
    When('não há reviews registradas em {string}', (course) =>{
        cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/review/delete_all`,
        failOnStatusCode: false,
        }).then((response) => {
    expect(response.status).to.be.oneOf([200, 404])
    })});

    Then('o usuário irá ver a mensagem de erro {string}', (error_message) => {
        cy.contains(`${error_message}`).should('exist');
    }
    );

    Given('a review do usuário {string} com comentário {string} e nota {string} está cadastrada para {string}', (username, comment, rating, course) =>{
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/review/add',
            body: {
              discipline: course,
              username: username,
              rating: rating,
              comment: comment
            }
          }).then((response) => {
            expect(response.status).to.equal(200);
          })});

    When('a ordenação escolhida for de {string}', (order) => {
        cy.contains(`${order}`).should('exist');
    }
    );
    
    Then('o usuário irá ver a review de {string} com nota {string} e comentário {string}', (username, rating, comment) => {
      cy.contains(`${username}`).should('exist');
      cy.contains(`${rating}`).should('exist');
      cy.contains(`${comment}`).should('exist');
    });

    Then('o usuário não irá ver a review de {string} com nota {string}', (username, rating) => {
        cy.contains(`${username}`).should('not.exist');
        cy.contains(`${rating}`).should('not.exist');
      });

    Then('o usuário não irá ver a review de {string} com time {string}', (username, time) => {
        cy.contains(`${username}`).should('not.exist');
        cy.contains(`${time}`).should('not.exist');
      });
    