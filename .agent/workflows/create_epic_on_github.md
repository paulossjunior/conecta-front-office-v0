---
description: Workflow to create a new Epic documentation file and push it to GitHub using Gitflow.
---

# Create Epic on GitHub Workflow

This workflow automates the process of creating a new Epic using the `create_epic` skill, managing version control via the `gitflow` skill, and creating a Pull Request.

## Steps

1.  **Preparation**
    -   Ensure you are on the correct branch (usually `develop` or `main`).
    -   Run `git pull` to fetch latest changes.

2.  **Start Feature Branch (Gitflow)**
    -   Determine a feature name (e.g., `docs-epic-<EPIC_ID>`).
    -   Use `gitflow.start_feature("<feature_name>")`.

3.  **Create Epic File**
    -   Use the `create_epic` skill to interactively create the Epic file.
    -   Follow the prompts for Title, Description, etc.

4.  **Review File**
    -   Check the created file content.
    -   Ask the user if they want to make any adjustments.

5.  **Commit Changes**
    -   Stage the new file: `git add docs/spec/epics/EPIC-*.md`
    -   Use `smart_commit` to generate the message and commit (e.g., `docs(epic): add <EPIC_ID>`).

6.  **Finish Feature (Gitflow)**
    -   Use `gitflow.finish_feature("<feature_name>", "<Commit Title>", "Adds the epic file...")`.
    -   This will push the branch and create a Pull Request on GitHub.

7.  **Optional: Create GitHub Issue**
    -   If the user desires, create a corresponding GitHub Issue linking to this file.
    -   Use the `mcp_github-mcp-server_issue_write` tool.
    -   Title: `[EPIC] <Epic Title>`
    -   Body: `See documentation at: <Link to file in repo>`
