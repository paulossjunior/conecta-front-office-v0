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

5.  **Create GitHub Issue**
    -   Use `github-mcp-server:issue_write` (method='create') to create an Issue for the task.
    -   **Title**: `feat: <Task Title>`
    -   **Body**: Include the Technical Design Plan and link to artifacts.
    -   **Assignee**: Self (if applicable).

6.  **Start Feature (Gitflow)**
    -   Once approved and Issue created, use `gitflow.start_feature("feat-<component-or-screen-name>")`.

6.  **TDD Cycle (Red-Green-Refactor)**
    -   **Red**: Write a failing test for the feature/component in `src/modules/{Module}/__tests__/`.
    -   **Green**: Implement the *minimum* code to make the test pass.
    -   **Refactor**: Clean up the code while keeping tests green.
    -   *Repeat for each logical unit.*

7.  **Implementation (Continued)**
    -   Complete the UI/Logic integration following the approved plan.
    -   Use `smart_commit` for incremental commits.

8.  **Verification**
    -   **Run Tests**: `npm run test` (All tests must pass).
    -   Run linting/type-checking.
    -   Verify scenarios from the User Story.

8.  **Finish Feature (Gitflow)**
    -   Use `gitflow.finish_feature("<feature_name>", "<Commit Title>", "Implements ...")`.
