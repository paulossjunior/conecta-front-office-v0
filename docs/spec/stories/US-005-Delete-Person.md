---
type: user_story
id: US-005
epic_id: EPIC-002
status: pending
points: 1
assignee: TBD
---

# User Story: Delete Person

## Description
**As a** Admin,
**I want** to delete a person record so that I can remove incorrect or obsolete data,
**So that** I can remove incorrect or obsolete data.

## Acceptance Criteria
```gherkin
Feature: Delete Person

  Scenario: Successfully delete a person
    Given person "Carlos" exists
    When I click "Delete" for "Carlos"
    And I confirm the deletion
    Then I should see a success message "Person deleted successfully"
    And "Carlos" should no longer appear in the list
```

## Tasks
No specific technical tasks defined in this spec. See implementation plan.

## Dependencies
- US-002
