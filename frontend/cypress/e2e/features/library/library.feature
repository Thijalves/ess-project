Feature: library
    As a usuário cadastrado no sistema de reviews
    I want to armazenar cadeiras do sistema em pastas de uma biblioteca
    So that eu possa me organizar melhor

Scenario: Go to Library
    Given a logged in user with username "maa5" is in the "/login" page
    And the user has "2" folders in the library named "1o periodo" and "2o periodo"
    When the user clicks on the "Biblioteca" button
    Then the user is redirected to the page "/library"
    And the page "/library" displays two folders headers named "1o periodo" and "2o periodo"

Scenario: Go to Folder
    Given a logged in user with username "maa5" is in the "/library" page
    And the user has "1" folder in the library named "1o periodo" with no classes inside it
    When the user clicks on the folder "1o periodo"
    Then the user is redirected to the page "/library/1o_periodo"
    And the page "/library/1o_periodo" displays the message "Nenhuma cadeira adicionada"

Scenario: Successfully creating a folder
	Given the user "maa5" does not have a folder named "1o periodo" in the library
    And the user with username "maa5" and password "senha" is logged in
    And the user is on the page "/library"
	When the user clicks on "ADICIONAR PASTA"
    And the user fills the "Nome" field with "1o periodo"
    And the user confirms on "Adicionar"
	Then the user is redirected to the page "/library"
    And it's possible to see the folder card with link to "/library/1o_periodo"
	
Scenario: Creating a repeated folder
	Given a logged in user with username "maa5" is in the "/library" page
	And the library already has a folder named "1o periodo"
	When the user clicks on "ADICIONAR PASTA"
    And the user fills the "Nome" field with "1o periodo"
    And the user clicks on "ADICIONAR"
	Then the page displays the message "Erro ao adicionar pasta: Nome de pasta ja existe"
    And the user is still in the page "/library/create-folder"
	
Scenario: Successfully inserting a course in the folder
	Given a logged in user with username "maa5" is in the "/library/1o_periodo" page
	And the folder does not have any courses in it
	When the user clicks on "EDITAR PASTA"
    And the user fills the "Adicionar Cadeiras" field with "ESS"
    And the user clicks on the toggle
    And the user clicks on "CONFIRMAR"
	Then the course "ESS" is added to the folder "1o periodo"

	
Scenario: Changing folder name to another folder's name
	Given a logged in user with username "maa5" is in the "/library/1o_periodo" page
    And the user has already a folder with name "2o periodo"
	When the user clicks on "EDITAR PASTA"
    And the user fills the "Nome" field with "2o periodo"
    And the user clicks on "CONFIRMAR"
	Then the message "Erro ao adicionar pasta: Nome de pasta ja existe" appears
    And the user is still on the page "/library/1o_periodo/edit"