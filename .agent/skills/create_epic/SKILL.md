---
name: create_epic
description: Creates a new EPIC file using the defined template, prompting for key details.
---

# Create EPIC Skill

This skill helps you create a new EPIC file in the project documentation.

## Instructions

1.  **Prompt for Details**: Ask the user for the following information:
    -   **Title**: The title of the Epic.
    -   **Description**: A brief description of the Epic.
    -   **Business Value**: Why is this Epic important?
    -   **Owner**: Who is the owner of this Epic?
    -   **Start Date**: Planned start date (YYYY-MM-DD).
    -   **End Date**: Planned end date (YYYY-MM-DD).

2.  **Generate Filename**: Create a filename based on the title (e.g., `EPIC-001-Title-Of-Epic.md` or similar convention, or just `Title-Of-Epic.md` if no numbering system exists). If uncertain, ask the user for a preferred filename or ID.

3.  **Read Template**: Read the content of `.agent/templates/EPIC.md`.

4.  **Populate Template**: Replace the placeholders in the template with the provided information.
    -   `[Epic Title]` -> Title
    -   `[Detailed description...]` -> Description
    -   `[Why are we doing this?...]` -> Business Value
    -   `[Owner Name]` -> Owner
    -   `YYYY-MM-DD` -> Start/End Dates

5.  **Create File**: Write the populated content to a new file in `docs/spec/epics/` (create directory if it doesn't exist).
    -   **IMPORTANT**: If the user specifies a different location, use that instead.

6.  **Confirmation**: Inform the user that the Epic has been created and provide the path.
