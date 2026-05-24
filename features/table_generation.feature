Feature: Table Generation
    Scenario: Verify the page title
        Given I navigate to the SARweb home page
        Then the page title should contain "SARweb"
    Scenario: Successfully Generate table with 6 participants
        Given I navigate to the SARweb home page
        When I enter the participant names: 
            | Sabi      |
            | Reto      |
            | Charly    |
            | Isi       |
            | Roseline  |
            | Peanut    |
        And I create the table
        Then I should see a table generated for 6 participants
        And the table should display the columns "Round", "Observer", and "Idle"

        Scenario: Successfully Generate table with 5 participants
        Given I navigate to the SARweb home page
        When I enter the participant names: 
            | Sabi      |
            | Reto      |
            | Charly    |
            | Isi       |
            | Roseline  |
        And I create the table
        Then I should see a table generated for 5 participants
        And the table should display the columns "Round", "Observer", and "Idle"