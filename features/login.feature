Feature: Login
  As a patient
  I want to log in to CURA Healthcare
  So that I can manage my appointments

  Scenario Outline: Login with <description>
    Given I am on the login page
    When I log in with username "<username>" and password "<password>"
    Then I should see <result>

    Examples:
      | description         | username       | password       | result                   |
      | valid credentials   | $CURA_USERNAME | $CURA_PASSWORD | the appointment form     |
      | an invalid password | $CURA_USERNAME | wrongPassword  | a login failed message   |
      | an unknown user     | Jane Roe       | $CURA_PASSWORD | a login failed message   |