# Technical Design Plan: EPIC-002 Person Management

**Status**: Draft (Waiting for Approval)
**Persona**: Frontend Architect
**Scope**: Full implementation of Person CRUD (Create, Read, Update, Delete)
**User Stories**:
-   [US-002: Create Person](docs/spec/stories/US-002-Create-Person.md)
-   [US-003: Update Person](docs/spec/stories/US-003-Update-Person.md)
-   [US-004: List Persons](docs/spec/stories/US-004-List-Persons.md)
-   [US-005: Delete Person](docs/spec/stories/US-005-Delete-Person.md)

## 1. Project Initialization (Foundational)
-   **Framework**: Nuxt 3 (Vue 3 + Nuxt UI).
-   **Structure**: Configure `srcDir: 'src/'` in `nuxt.config.ts`.
-   **Dependencies**: `pinia`, `@pinia/nuxt`, `@tanstack/vue-query`, `zod`, `vee-validate`, `@nuxt/ui`, `axios`.

## 2. Module Architecture: `src/modules/PersonManagement`

### 2.1. Directory Structure
```
src/modules/PersonManagement/
├── api/
│   └── PersonService.ts       # Implementation of CRUD operations calling ApiProvider
├── components/
│   ├── PersonForm.vue         # Reusable form (Name, Address) for Create/Edit
│   └── PersonList.vue         # Data table for List view with Edit/Delete actions
├── models/
│   ├── Person.ts              # Entity Interface
│   └── PersonDTOs.ts          # CreatePersonDTO, UpdatePersonDTO
├── routes/
│   └── index.ts               # Routes: /persons, /persons/new, /persons/:id/edit
└── views/
    ├── PersonListView.vue     # US-004, US-005
    ├── PersonCreateView.vue   # US-002
    └── PersonEditView.vue     # US-003
```

### 2.2. Components Design
1.  **`PersonForm.vue`**:
    -   **Props**: `initialData` (Person | null), `loading` (boolean).
    -   **Events**: `submit(data: DTO)`.
    -   **Validation**: Zod (Name + Address required).
2.  **`PersonList.vue`**:
    -   **Props**: `persons` (Array).
    -   **Actions**: Edit (navigates), Delete (emits event).
    -   **UI**: `UTable` from Nuxt UI.

### 2.3. Views Configuration
-   **Create**: `/persons/new` -> Uses `PersonForm`. Calls `PersonService.create`.
-   **Edit**: `/persons/:id/edit` -> Fetches Person by ID (Vue Query). Pass data to `PersonForm`. Calls `PersonService.update`.
-   **List**: `/persons` -> Fetches all (Vue Query). Renders `PersonList`. Handles Delete.

## 3. API Layer & Swagger
-   **Contract**: Use `contracts/swagger.json` as the source of truth.
-   **HttpClient**: Ensure `src/api/AxiosHttpClient.ts` handles generic requests correctly.
-   **Mocking**: Use `json-server` configured with `db.json` to simulate the backend during isolation.
    -   **Validation**: Mock server must mimic the "Unique Name+Address" 409 Conflict logic.

## 4. State Management strategy
-   **Vue Query**:
    -   `useQuery(['persons'])` for listing.
    -   `useQuery(['person', id])` for editing.
    -   `useMutation` for Create/Update/Delete (invalidates 'persons' query on success).
-   **Pinia**: Not strictly needed for CRUDS, will assume local/server state is sufficient.

## 5. Implementation Steps
1.  **Scaffold**: Init Project, Install Deps, Setup `src/` and `Generic API`.
2.  **Mock**: Setup `json-server` with `contracts/swagger.json` schemas in mind.
3.  **Module Init**: Create `PersonManagement` structure.
4.  **Service**: Implement `PersonService`.
5.  **Components**: Implement `PersonForm` (Zod) and `PersonList`.
6.  **Views**: Implement Create, Edit, List views.
7.  **Routing**: Connect routes.
8.  **Verification**: Test all Gherkin scenarios (Create, Duplicate, Update, Delete).
