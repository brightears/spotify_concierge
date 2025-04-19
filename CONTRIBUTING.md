# Contributing to Spotify Concierge for Businesses

Thank you for your interest in contributing to the Spotify Concierge for Businesses project! This document outlines our coding conventions, best practices, and contribution processes to ensure that all team members and our AI assistant (Windsurf) are fed consistent context and can generate high-quality code.

## Table of Contents
1. [Code Style and Conventions](#code-style-and-conventions)
2. [Updating Windsurf Rules](#updating-windsurf-rules)
3. [Workflow Guidelines](#workflow-guidelines)
4. [Documentation and Testing](#documentation-and-testing)
5. [Reporting Issues and Feature Requests](#reporting-issues-and-feature-requests)
6. [Additional Notes](#additional-notes)

## Code Style and Conventions

- **Consistency Is Key:**  
  All code must align with the project blueprint defined in the README.md and follow our custom Windsurf rules. Use clear, descriptive naming conventions for variables, functions, components, and files (e.g., `ChatPlaylistBuilder`, `RedesignRequestForm`, `getSpotifyPlaylistPreview`).

- **Modular Architecture:**  
  - **New Playlist Request Flow:** Code related to the chat-based playlist generator should be isolated in its own module/folder.  
  - **Redesign/Seasonal Update Flow:** Code for the client portal and redesign requests should be maintained separately, ensuring clear separation of concerns.

- **Commenting and Documentation:**  
  - Write inline comments to explain complex logic or integration points, especially for API calls and error handling.
  - Ensure all new functions or components include basic documentation (JSDoc/TypeScript comments).

- **Formatting:**  
  Use a consistent code formatter (e.g., Prettier) and linter (e.g., ESLint) to maintain readability and reduce code review friction.

## Updating Windsurf Rules

Our Windsurf custom rules file (`.windsurfrules`) is the single source of truth for how the AI should behave when generating and updating code. When making changes or additions:

- **When to Update:**  
  - If you introduce new coding patterns or architectural changes.
  - If external integrations (e.g., Spotify API, Stripe) are updated.
  - If new conventions for component naming or file structuring are adopted.

- **How to Update:**  
  1. Open the `.windsurfrules` file in the project root.
  2. Add or modify rules following the established format (see the existing sections for guidance).
  3. Clearly document any new instructions or changes in a comment block at the top of the rule section.
  4. Commit changes and reference the update in the `CHANGELOG.md`.

- **Best Practice:**  
  Update the rules incrementally and test the new instructions with Windsurf to ensure consistency. If you encounter any unexpected behavior from the AI, review and refine the relevant section of the rules.

## Workflow Guidelines

- **Branching:**  
  - Always create a new branch for your changes (e.g., `feature/add-bookmark-dialog` or `fix/playlist-api-error`).
  - Use descriptive branch names that indicate the purpose of your contribution.

- **Commit Messages:**  
  - Write clear and concise commit messages.
  - Follow the commit message guidelines (e.g., format: `[Feature] Add new component for ...`).

- **Pull Requests:**  
  - Submit pull requests against the `develop` branch.
  - Include a summary of what your PR does, related issue numbers (if any), and any special instructions for reviewers.
  - Request review from team members or Windsurf if using the AI integration for code suggestions.

## Documentation and Testing

- **Documentation:**  
  - Update relevant documentation files (such as README.md, prompt.md, ROADMAP.md) to reflect new features or changes.
  - Maintain thorough internal documentation for how different parts of the project interact.

- **Testing:**  
  - Write unit tests for new functions and components.
  - Ensure integration tests are updated accordingly.
  - Document the testing approach in the `TESTING.md` file (if available) or within the code as inline comments.

- **Maintaining the Prompt Log:**  
  - Keep a running log of significant prompts used to build or modify key functionality in `prompt.md` or `development-prompts.md`.

## Reporting Issues and Feature Requests

- **Issues:**  
  If you encounter bugs or have suggestions for improvements, please open an issue in the repository. Provide a clear description, steps to reproduce, and any relevant screenshots or logs.

- **Feature Requests:**  
  - For new ideas or enhancements, create a feature request issue.
  - Include a detailed description of the feature, how it should work, and any design considerations.
  - Reference related documentation or custom rules if applicable.

## Additional Notes

- **Collaboration:**  
  Communication is key. If you’re unclear about any of the guidelines or how to implement a change, please discuss it with the team before proceeding.

- **Continuous Improvement:**  
  Our workflows and Windsurf rules are living documents. They will evolve as the project grows. Regularly review and update them to ensure everyone (and the AI) stays aligned.

- **Context Preservation:**  
  Always reference the project’s main documentation (README.md, .windsurfrules, etc.) when making changes to ensure consistency.

By following these guidelines, we ensure that our contributions are consistent, maintainable, and aligned with the overall vision of Spotify Concierge for Businesses. Thank you for contributing and helping make this project a success!

---

*This document is subject to updates as new contributions and insights are added. For any clarification, please contact the project maintainer or refer to our internal communications channel.*
