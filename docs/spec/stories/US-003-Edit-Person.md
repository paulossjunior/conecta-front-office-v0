---
type: user_story
id: US-003
epic_id: EPIC-002
status: pending
points: 2
assignee: TBD
---

# User Story: Edit Person Address

## Description
**As a** Admin,
**I want** to update a Person's address so that the records remain accurate,
**So that** the records remain accurate.

## Acceptance Criteria
```gherkin
Feature: Edit Person Address

  Scenario: Update address
    Given validation person "Maria Souza" exists
    When I navigate to "Edit Person" for "Maria Souza"
    And I change "Address" to "Av. Paulista, 900"
    And I click "Update"
    Then the address for "Maria Souza" should be "Av. Paulista, 900"
```

## Tasks
No specific technical tasks defined in this spec. See implementation plan.

## Dependencies
- US-002
