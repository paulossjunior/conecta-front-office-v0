---
type: user_story
id: US-002
epic_id: EPIC-002
status: pending
points: 3
assignee: TBD
---

# User Story: Create Person Record

## Description
**As a** Admin,
**I want** to register a new Person so that I can store their contact details,
**So that** I can store their contact details.

## Business Rules
1.  **Uniqueness**: Two people cannot have the same Name AND the same Address.

## Acceptance Criteria
```gherkin
Feature: Create Person

  Scenario: Successfully register a person with valid data
    Given I am on the "New Person" page
    When I fill "Name" with "João da Silva"
    And I fill "Address" with "Rua das Flores, 123"
    And I click "Save"
    Then I should see a success message "Person registered successfully"
    And I should see "João da Silva" in the person list

  Scenario: Attempt validation with missing name
    Given I am on the "New Person" page
    When I fill "Address" with "Rua das Flores, 123"
    And I leave "Name" empty
    And I click "Save"
    Then I should see a validation error "Name is required"

  Scenario: Attempt to register duplicate person (Name + Address)
    Given a person exists with Name "João da Silva" and Address "Rua das Flores, 123"
    And I am on the "New Person" page
    When I fill "Name" with "João da Silva"
    And I fill "Address" with "Rua das Flores, 123"
    And I click "Save"
    Then I should see an error message "A person with this Name and Address already exists"
```

## Tasks
No specific technical tasks defined in this spec. See implementation plan.

## Dependencies
- None
