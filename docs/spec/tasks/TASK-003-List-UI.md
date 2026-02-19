---
type: task
id: TASK-003
user_story_id: US-004
status: pending
assignee: Frontend Architect
---

# Task: Implement Person List UI

## Description
Implement the User Interface for listing persons, including the Table component and the Page View. Also includes Delete functionality (US-005) as actions in the list.

## Technical Details
-   **Components**:
    -   `PersonList.vue`: Table using `UTable` with columns (Name, Address, Actions).
    -   `PersonListView.vue`: Orchestration view using Vue Query (`useQuery`).
-   **Service**:
    -   Ensure `PersonService.getAll` and `PersonService.delete` are implemented.
-   **Routing**:
    -   Add route `/persons/index.vue` (or just `/persons` via folder structure).

## Checklist
- [ ] Implement `PersonList.vue`
- [ ] Implement `PersonListView.vue`
- [ ] Implement `PersonService.getAll` and `delete` (Already in global service, verify)
- [ ] Register route (Nuxt auto-route)
