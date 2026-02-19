---
type: task
id: TASK-004
user_story_id: US-003
status: pending
assignee: Frontend Architect
---

# Task: Implement Person Edit UI

## Description
Implement the User Interface for updating a person. Reuse `PersonForm.vue` and create `PersonEditView.vue`.

## Technical Details
-   **Components**:
    -   `PersonEditView.vue`: Orchestration view using Vue Query (`useQuery` to fetch, `useMutation` to update).
-   **Routing**:
    -   Add route `/persons/[id]/edit.vue`.
-   **Logic**:
    -   Fetch person by ID.
    -   Pass data to `PersonForm` as `initialData`.
    -   Handle update submission.

## Checklist
- [ ] Implement `PersonEditView.vue`
- [ ] Register route in `pages/persons/[id]/edit.vue`
- [ ] Verify functionality
