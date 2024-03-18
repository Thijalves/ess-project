import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

before(() => {
    // create user
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/user/create_user',
      body: {
        name: 'Marcela',
        surname: 'Asfora',
        username: 'maa5',
        email: 'maa@example.com',
        password: 'senha',
        repeated_password: 'senha',
        phone_number: '123456789',
        field_of_interest: 'Testing'
      },
      failOnStatusCode: false // Do not fail the test on non-2xx response
    }).then((response) => {
      if (response.status === 409) {
        // User already exists, log a message and continue
        cy.log('User already exists, skipping user creation');
      } else if (response.status !== 201) {
        // Handle other non-successful status codes if needed
        throw new Error(`Failed to create user. Status: ${response.status}`);
      }
    });
  
    //create course
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/discipline/add',
      body: {
        name: 'Engenharia de Software e Sistemas',
        code: 'ess',
        department: 'Computer Science',
        semester: 6,
        professor: 'Breno Miranda',
        description: 'Engenharia de Software e Sistemas é uma disciplina que aborda os princípios, técnicas e práticas relacionadas ao desenvolvimento de software e sistemas de grande escala. Ela envolve o estudo de métodos de engenharia de software, gerenciamento de projetos, design de sistemas, entre outros aspectos.'
      },
      failOnStatusCode: false // Do not fail the test on non-2xx response
    }).then((response) => {
      if (response.status === 409) {
        // Discipline already exists, log a message and continue
        cy.log('Discipline already exists, skipping discipline creation');
      } else if (response.status !== 201) {
        // Handle other non-successful status codes if needed
        throw new Error(`Failed to create discipline. Status: ${response.status}`);
      }
    });
  
});

     //the user "maa5" does not have a folder named "1o periodo" in the library
Given('the user {string} does not have a folder named {string} in the library', (username, folder_name) => {
    const currUser = localStorage.getItem('user') || '{}';
    const currUser_id = JSON.parse(currUser).id;
    cy.request({
      method: 'DELETE',
      url: `http://localhost:8000/library/${folder_name}/delete_folder?user_id=${currUser_id}`,
      failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
      // Check if the response status code is either 200 or 404
      expect(response.status).to.be.oneOf([200, 404]);
    });
  });
  
  Given('the user with username {string} and password {string} is logged in', (username, password) => {
    cy.visit('/login');
    cy.get('input[id="username"]').type(username);
    cy.get('input[id="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

  Given('the user is on the page {string}', (page) => {
    cy.visit(page);
  });
  
  When('the user clicks on {string}', (buttonText) => {
    cy.contains(buttonText).click();
  });

  When('the user fills the {string} field with {string}',(field, folder_name) =>{
    cy.get(`input[id="${field}"]`).type(folder_name);
  });

  When('the user confirms on {string}',(buttonText) =>{
    cy.get('button[type="submit"]').click();
  });

  Then('the user is redirected to the page {string}', (page) => {
    cy.url().should('include', page);
  });
  
  Then("it's possible to see the folder card with link to {string}", (text) => {
    cy.get(`a[href*="${text}"]`);
  });
  