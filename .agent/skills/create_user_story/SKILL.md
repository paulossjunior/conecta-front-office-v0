---
name: create_user_story
description: Creates a new User Story file using the defined template, prompting for details and linking it to an Epic.
---

# Create User Story Skill

This skill helps you create a new User Story file in the project documentation.

## Instructions

1.  **Prompt for Details**: Ask the user for the following information:
    -   **Title**: The title of the User Story.
    -   **Description**: A brief description in the standard "As a... I want... So that..." format.
    -   **Points**: Estimated story points (e.g., 1, 2, 3, 5, 8).
    -   **Assignee**: Who is assigned to this story?

2.  **Ask for Epic ID**: Ask the user for the ID of the Epic this story belongs to (e.g., `EPIC-001`). If they don't know, suggest checking `docs/spec/epics/` first.

3.  **Read Template**: Read the content of `.agent/templates/USER_STORY.md`.

4.  **Populate Template**: Replace the placeholders in the template with the provided information.
    -   `[Title]` -> Title
    -   `[Description]` -> FULL description (As a... I want... So that...)
    -   `[Story Points]` -> Points
    -   `[Assignee Name]` -> Assignee
    -   `[EPIC-ID]` -> Epic ID provided by the user.

5.  **Generate Filename**: Create a filename based on the title (e.g., `US-001-Title-Of-Story.md`). Ask the user for a preferred ID or auto-generate one if possible (though auto-generating unique IDs might be tricky without a centralized counter, so asking for an ID is safer).

6.  **Create File**: Write the populated content to a new file in `docs/spec/stories/` (create directory if it doesn't exist).
    -   **IMPORTANT**: If the user specifies a different location, use that instead.

7.  **Confirmation**: Inform the user that the User Story has been created and provide the path.
