---
description: Workflow to define requirements and create artifacts with mandatory planning review using the Senior PO persona.
---

# Requirements Specification Workflow

This workflow guides the process of defining requirements and creating project artifacts (Epics, User Stories, Tasks) using the Senior Product Owner persona. It includes a mandatory planning review step before any files are created.

## Steps

1.  **Adopt Persona**
    -   Read the persona definition: `.agent/personas/senior_product_owner.md`.
    -   Adopt the `Senior Product Owner` mindset.

2.  **Analyze Request**
    -   Ask the user for the high-level requirement or feature request if not already provided.
    -   Run the Analysis phase of the `product_owner` skill.
    -   **DO NOT** create any files yet.

3.  **Present Plan**
    -   Output a markdown summary of the proposed structure:
        -   **Epic**: Title, Business Value.
        -   **User Stories**: Titles, Points, key Acceptance Criteria.
        -   **Tasks**: Technical breakdown for each story.
    -   **STOP** and ask the user for approval or adjustments.

4.  **Create Artifacts**
    -   **ONLY** proceed after user confirmation.
    -   **Start Feature (Gitflow)**: Use `gitflow.start_feature("docs-reqs-<FeatureName>")`.
    -   Execute the Creation phase of the `product_owner` skill:
        -   Create the Epic file (`create_epic`).
        -   Create User Story files linked to the Epic (`create_user_story`).
        -   Create Task files linked to the User Stories (`create_task`).

5.  **Review Created Files**
    -   List the paths of all created files.
    -   Ask the user if they want to proceed with committing the changes.

6.  **Commit and Finish (Gitflow)**
    -   If approved, stage the new files (`git add ...`).
    -   Use `smart_commit` to generate a commit message and commit.
    -   Use `gitflow.finish_feature` to push and create a Pull Request.
