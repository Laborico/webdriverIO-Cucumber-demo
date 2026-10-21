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
      | facility | <facility> |
      | program  | <program>  |
      | date     | <date>     |
      | comment  | <comment>  |
    Then I should see the appointment confirmation
    And the confirmation should show the facility "<facility>"
    And the confirmation should show the program "<program>"
    And the confirmation should show the date "<date>"

    Examples:
      | facility                        | program  | date       | comment         |
      | Hongkong CURA Healthcare Center | Medicaid | 30/11/2026 | Annual check-up |
      | Hongkong CURA Healthcare Center | Medicare | 30/11/2026 | Annual check-up |
      | Hongkong CURA Healthcare Center | None     | 30/11/2026 | Annual check-up |

  Scenario: Book an appointment without a visit date
    When I book an appointment with:
      | facility | Hongkong CURA Healthcare Center |
      | program  | Medicaid                        |
      | comment  | Annual check-up                 |
    Then the appointment should not be booked
