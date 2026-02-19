---
name: create_task
description: Creates a new Task file using the defined template, prompting for details and linking it to a User Story.
---

# Create Task Skill

This skill helps you create a new Task file in the project documentation.

## Instructions

1.  **Prompt for Details**: Ask the user for the following information:
    -   **Title**: The title of the Task.
    -   **Description**: A detailed technical description of the task.
    -   **Assignee**: Who is assigned to this task?

2.  **Ask for User Story ID**: Ask the user for the ID of the User Story this task belongs to (e.g., `US-001`). If they don't know, suggest checking `docs/spec/stories/` first.

3.  **Read Template**: Read the content of `.agent/templates/TASK.md`.

4.  **Populate Template**: Replace the placeholders in the template with the provided information.
    -   `[Task Title]` -> Title
    -   `[Detailed description...]` -> Description
    -   `[Assignee Name]` -> Assignee
    -   `[US-[ID]]` -> User Story ID provided by the user.

5.  **Generate Filename**: Create a filename based on the title (e.g., `TASK-001-Title-Of-Task.md`). Ask the user for a preferred ID.

6.  **Create File**: Write the populated content to a new file in `docs/spec/tasks/` (create directory if it doesn't exist).
    -   **IMPORTANT**: If the user specifies a different location, use that instead.

7.  **Confirmation**: Inform the user that the Task has been created and provide the path.
