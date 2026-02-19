---
name: gitflow
description: Standard Gitflow operations (Feature, Release, Hotfix) integrated with GitHub MCP for PRs.
---

# Gitflow Skill

This skill manages the Gitflow process, streamlining feature, release, and hotfix workflows. It bridges local git operations with GitHub's platform features (Pull Requests) via the `github-mcp-server`.

## Coarse-Grained Tools

### `start_feature`
Starts a new feature branch.
1.  **Inputs**: `feature_name` (e.g., "login-page").
2.  **Base Branch**: Updates `develop` (or `main` if `develop` doesn't exist) and branches off it.
3.  **Command**: `git checkout -b feature/<feature_name>`.

### `finish_feature`
Finishes a feature by creating a Pull Request.
1.  **Inputs**: `feature_name`, `title`, `description`.
2.  **Push**: Pushes the current branch to origin.
3.  **PR Creation**: Uses `github-mcp-server:create_pull_request`.
    -   **Head**: `feature/<feature_name>`
    -   **Base**: `develop` (or `main`)
    -   **Title**: `feat: <title>`
    -   **Body**: Uses the provided description, linking to relevant Issues/Stories.

### `start_hotfix`
Starts a hotfix branch from `main`.
1.  **Inputs**: `hotfix_name` (e.g., "fix-login-crash").
2.  **Base Branch**: Updates `main`.
3.  **Command**: `git checkout -b hotfix/<hotfix_name>`.

### `finish_hotfix`
Finishes a hotfix by creating PRs to both `main` and `develop`.
1.  **Inputs**: `hotfix_name`, `title`, `description`.
2.  **Push**: Pushes the branch.
3.  **PR to Main**: `github-mcp-server:create_pull_request` (Head: `hotfix/...`, Base: `main`).
4.  **PR to Develop**: `github-mcp-server:create_pull_request` (Head: `hotfix/...`, Base: `develop`).

## Usage Examples

### Starting a Feature
```bash
# Agent Action
run_command("git checkout develop && git pull origin develop")
run_command("git checkout -b feature/user-profile")
```

### Finishing a Feature
```python
# Agent Action
run_command("git push -u origin feature/user-profile")
github_mcp_server.create_pull_request(
    owner="paulossjunior",
    repo="conecta-front-office-v0",
    head="feature/user-profile",
    base="develop",
    title="feat: User Profile Implementation",
    body="Closes #123. Implements the user profile page..."
)
```
