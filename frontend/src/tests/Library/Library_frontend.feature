Scenario: Go to Library
    Given a logged in user with id "123340" is in the "/login" page
    And the user "123340" has "2" folders in the library named "1o periodo" and "2o periodo"
    When the user "123340" clicks on the "Biblioteca" button
    Then the user "123340" is redirected to the page "/library"
    And the page "/library" displays two folders headers named "1o periodo" and "2o periodo"

Scenario: Go to Folder
    Given a logged in user with id "123340" is in the "/library" page
    And the user "123340" has "1" folder in the library named "1o periodo" with no classes inside it
    When the user "123340" clicks on the folder "1o periodo"
    Then the user "123340" is redirected to the page "/library/1o_periodo"
    And the page "/library/1o_periodo" displays the message "Pasta vazia"