---
type: user_story
id: US-003
epic_id: EPIC-002
status: pending
points: 2
assignee: TBD
---

# User Story: Update Person Details

## Description
**As a** Admin,
**I want** to update a Person's details (Name and Address) so that the records remain accurate,
**So that** the records remain accurate.

## Business Rules
1.  **Uniqueness**: The same uniqueness rule applies (Name + Address must be unique), excluding the current record being edited.

## Acceptance Criteria
```gherkin
Feature: Update Person Details

  Scenario: Successfully update person name and address
    Given validation person "Maria Souza" exists with address "Rua A"
    When I navigate to "Edit Person" for "Maria Souza"
    And I change "Name" to "Maria da Silva"
    And I change "Address" to "Av. Paulista, 900"
    And I click "Update"
    Then I should see a success message "Person updated successfully"
    And "Maria da Silva" should appear in the list with address "Av. Paulista, 900"

  Scenario: Attempt to update to a duplicate person
    Given person "João" exists with address "Rua B"
    And I am editing person "Maria"
    When I change "Name" to "João"
    And I change "Address" to "Rua B"
    And I click "Update"
    Then I should see an error message "A person with this Name and Address already exists"
```

## Tasks
No specific technical tasks defined in this spec. See implementation plan.

## Dependencies
- US-002
