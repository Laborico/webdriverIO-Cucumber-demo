@history
Feature: Appointment history
  As a logged-in patient
  I want to see my booked appointments
  So that I can keep track of my upcoming visits

  Background:
    Given I am logged in

  Scenario Outline: Booked appointment at <facility> appears in the history
    Given I have booked an appointment with:
      | facility    | <facility>    |
      | readmission | <readmission> |
      | program     | <program>     |
      | date        | <date>        |
      | comment     | <comment>     |
    When I open the appointment history
    Then the history should contain an appointment with:
      | facility    | <facility>    |
      | readmission | <readmission> |
      | program     | <program>     |
      | date        | <date>        |
      | comment     | <comment>     |

    Examples:
      | facility                     | readmission | program  | date       | comment                |
      | Tokyo CURA Healthcare Center | Yes         | Medicare | 15/12/2026 | Follow-up consultation |

  Scenario: History is empty before any appointment is booked
    When I open the appointment history
    Then I should see that there are no appointments