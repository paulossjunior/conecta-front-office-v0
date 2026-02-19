---
type: user_story
id: US-004
epic_id: EPIC-002
status: pending
points: 1
assignee: TBD
---

# User Story: List Persons

## Description
**As a** Admin,
**I want** to view a list of all registered people so that I can manage them,
**So that** I can manage them.

## Acceptance Criteria
```gherkin
Feature: List Persons

  Scenario: View person list
    Given the following people exist:
      | Name | Address |
      | Ana  | Rua A   |
      | Bob  | Rua B   |
    When I navigate to the "People" page
    Then I should see a table with 2 rows
    And I should see "Ana" and "Bob" in the table
```

## Tasks
No specific technical tasks defined in this spec. See implementation plan.

## Dependencies
- US-002
