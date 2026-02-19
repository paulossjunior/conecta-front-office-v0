---
name: smart_commit
description: Analyzes staged changes and generates a semantic commit message based on Conventional Commits, aligned with Gitflow.
---

# Smart Commit Skill

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
