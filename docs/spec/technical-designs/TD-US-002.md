# Technical Design Plan: US-002 Create Person

**Status**: Draft (Waiting for Approval)
**Persona**: Frontend Architect
**User Story**: [US-002](doc/spec/stories/US-002-Create-Person.md)

## 1. Project Initialization (Foundational)
Since the repository is currently empty of code, this plan includes the initial project setup based on `docs/architecture/arc.md`.

-   **Framework**: Nuxt 3 (compatible with Vue 3 & Nuxt UI).
-   **Directory Structure**: Configure Nuxt to use `src/` directory.
-   **Dependencies**:
    -   `@nuxt/ui` (UI Framework)
    -   `pinia` + `@pinia/nuxt` (State)
    -   `@tanstack/vue-query` (Data Fetching)
    -   `zod` (Validation)
    -   `vee-validate` (Form Handling)

## 2. Module Architecture: PersonManagement
We will create a new module `src/modules/PersonManagement` following the Domain-Driven Design approach.

### Directory Structure
```
src/modules/PersonManagement/
├── components/
│   ├── PersonForm.vue         # Reusable form for Create/Edit
│   └── PersonList.vue         # (Future US-004)
├── views/
│   ├── PersonCreateView.vue   # The page for US-002
├── routes.ts                  # Route definitions
├── types.ts                   # TypeScript interfaces (Person, CreatePersonDTO)
└── service.ts                 # API interactions (PersonService)
```

### Components
1.  **`PersonCreateView.vue`**:
    -   **Route**: `/people/new`
    -   **Responsibility**: Orchestrates the creation process. Uses `PersonForm` and calls `PersonService.create()`.
    -   **State**: Uses `useMutation` from Vue Query for the API call status.

2.  **`PersonForm.vue`**:
    -   **Props**: `initialData` (optional, for edit), `loading` (boolean).
    -   **Emits**: `submit(data: CreatePersonDTO)`.
    -   **Validation**: Zod schema (`PersonSchema`).
    -   **UI**: Inputs for Name and Address. Uses Nuxt UI components (`UInput`, `UButton`, `UFormGroup`).

## 3. API Layer
-   **Contract**: `contracts/swagger.json` (OpenAPI 3.0 definition).
-   **Interface**: `src/api/HttpClientInterface.ts` (Generic HTTP client contract).
-   **Adapter**: `src/api/AxiosHttpClient.ts` (Axios implementation).
-   **Provider**: `src/api/ApiProvider.ts` (Singleton to provide the client).
-   **Service**: `PersonService` in the module will use `ApiProvider` to POST to `/api/persons`.

## 4. State Management
-   **Local State**: Form state managed by `vee-validate`.
-   **Server State**: Mutation state managed by Vue Query.
-   **Global State**: Not needed for this specific feature yet (maybe a Toast notification store).

## 5. Mocking (For Development)
-   Since the backend might not exist, we will implement a `MockHttpClient` or use `json-server` to simulate the API.
-   **Validation Rule**: The mock must enforce "Name + Address" uniqueness to satisfy the acceptance criteria.

## 6. Implementation Steps
1.  **Scaffold Project**: Init Nuxt, install deps, configure `src/`.
2.  **Setup Architecture**: Create `src/api` generic layer.
3.  **Create Module**: Set up `PersonManagement` folder.
4.  **Implement Form**: Build `PersonForm.vue` with Zod validation.
5.  **Implement View**: Build `PersonCreateView.vue`.
6.  **Implement Mock API**: Ensure duplication check works.
7.  **Verify**: Run the Gherkin scenarios manually.
