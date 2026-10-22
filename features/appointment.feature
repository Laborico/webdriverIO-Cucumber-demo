@appointment
Feature: Book an appointment
  As a logged-in patient
  I want to book a medical appointment
  So that I can get care at the right facility

  Background:
    Given I am logged in

  @smoke
  Scenario Outline: Book an appointment with <program>
    When I book an appointment with:
      | facility    | <facility>    |
      | readmission | <readmission> |
      | program     | <program>     |
      | date        | <date>        |
      | comment     | <comment>     |
    Then I should see the appointment confirmation
    And the confirmation should show:
      | facility    | <facility>    |
      | readmission | <readmission> |
      | program     | <program>     |
      | date        | <date>        |
      | comment     | <comment>     |

    Examples:
      | facility                        | readmission | program  | date            | comment         |
      | Hongkong CURA Healthcare Center | No          | Medicaid | today + 30 days | Annual check-up |
      | Hongkong CURA Healthcare Center | No          | Medicare | today + 30 days | Annual check-up |
      | Hongkong CURA Healthcare Center | No          | None     | today + 30 days | Annual check-up |

  Scenario: Book an appointment without a visit date
    When I book an appointment with:
      | facility | Hongkong CURA Healthcare Center |
      | program  | Medicaid                        |
      | comment  | Annual check-up                 |
    Then the appointment should not be booked
