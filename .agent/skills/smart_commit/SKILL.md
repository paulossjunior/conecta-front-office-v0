---
name: smart_commit
description: Analyzes staged changes and generates a semantic commit message based on Conventional Commits.
---

# Smart Commit Skill

This skill analyzes the current git status and staged changes to generate a concise, meaningful commit message following the Conventional Commits specification.

## Instructions

1.  **Check Status**: Run `git status` to see what files are changed.
2.  **Check Staged Changes**: Run `git diff --staged` to see the actual content of staged changes.
    -   If no changes are staged but there are modified files, ask the user if they want to stage all changes (`git add .`) or specific files.
    -   If there are no changes at all, inform the user.
3.  **Analyze Changes**: Based on the `git diff --staged` output, determine the nature of the changes.
    -   **Type**: Choose one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`.
    -   **Scope**: (Optional) A noun describing the section of the codebase (e.g., `auth`, `api`, `ui`).
    -   **Description**: A short, imperative summary of the change (e.g., "add login button", "fix crash on startup").
    -   **Body**: (Optional) A more detailed explanation of why the change was made, wrapping at 72 characters.
    -   **Footer**: (Optional) References to issues (e.g., "Closes #123") or breaking changes.
4.  **Draft Commit Message**: specificy the commit message in the format:
    ```
    <type>(<scope>): <description>

    [optional body]

    [optional footer]
    ```
5.  **Propose Command**: Use the `run_command` tool to propose the `git commit -m "..."` command.
    -   **IMPORTANT**: Ensure internal quotes in the message are escaped properly if wrapping the whole message in quotes, or use a here-doc or multiple `-m` flags if appropriate, but a single string with properly escaped quotes is usually simplest for the tool.

## Example

**Staged Changes**:
Modified `src/auth.py` to add a new `login` function.

**Generated Command**:
```bash
git commit -m "feat(auth): add login function to handle user authentication"
```
