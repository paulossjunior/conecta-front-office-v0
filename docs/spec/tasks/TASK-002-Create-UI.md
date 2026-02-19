---
type: task
id: TASK-002
user_story_id: US-002
status: pending
assignee: Frontend Architect
---

# Task: Implement Person Create UI

## Description
Implement the User Interface for creating a person, including the generic Form component and the Page View.

## Technical Details
-   **Components**:
    -   `PersonForm.vue`: Reusable form with Zod validation.
    -   `PersonCreateView.vue`: Orchestration view using Vue Query.
-   **Routing**:
    -   Add route `/persons/new`.
-   **Validation**:
    -   Name (Required)
    -   Address (Required)

## Checklist
- [ ] Install `zod` and `@vee-validate/zod`
- [ ] Implement `PersonForm.vue`
- [ ] Implement `PersonCreateView.vue`
- [ ] Register route in `pages/persons/new.vue`
- [ ] Verify TypeCheck (Fix "red" vs "error" color issues in Nuxt UI)
