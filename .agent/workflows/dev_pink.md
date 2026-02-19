---
description: Workflow for development of screens using the Frontend Architect persona, requiring mandatory technical design review before implementation.
---

# Dev Pink Workflow

This workflow guides the development of frontend screens, emphasizing planning, architectural compliance, and mandatory approval before coding starts.

## Steps

1.  **Adopt Persona**
    -   Read the persona definition: `.agent/personas/frontend_architect.md`.
    -   Adopt the `Frontend Architect` mindset (Plan First, Clean Architecture, Strict Typing).

2.  **Analyze Request**
    -   Ask the user for the User Story or Task ID to be implemented (e.g., `US-002`, `TASK-001`).
    -   Read the relevant artifacts in `docs/spec/` to understand the requirements and acceptance criteria.
    -   Check `docs/architecture/arc.md` for relevant patterns.

3.  **Technical Design Plan**
    -   Create a plan outlining:
        -   **Components**: What components will be created or modified? (include paths).
        -   **State Management**: Will you use Pinia? Vue Query? Local state?
        -   **Routes**: New routes to differ in `src/modules/{Module}/routes.ts`.
        -   **API**: What `HttpClientInterface` methods are needed?
    -   **STOP** and present this plan to the user.

4.  **Approval Gate**
    -   **DO NOT** write any implementation code until the user approves the Technical Design Plan.
    -   If changes are requested, revise the plan and re-submit.

5.  **Start Feature (Gitflow)**
    -   Once approved, use `gitflow.start_feature("feat-<component-or-screen-name>")`.

6.  **Implementation**
    -   Implement the code following the approved plan and architectural guidelines.
    -   Create/Update files in `src/modules/`.
    -   Use `smart_commit` for incremental commits if the task is large.

7.  **Verification**
    -   Run linting/type-checking.
    -   Verify scenarios from the User Story.

8.  **Finish Feature (Gitflow)**
    -   Use `gitflow.finish_feature("<feature_name>", "<Commit Title>", "Implements ...")`.
