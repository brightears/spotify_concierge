# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added
- **AI-Powered Chat Interface:** Implemented a chat-based playlist builder that collects user inputs such as business type, target audience, brand mood, and time slots.
- **Playlist Preview Generation:** Integrated Spotify API calls to generate 6–10 Spotify playlist previews labeled by time of day.
- **Upgrade Options:** Added options for BMAsia clients (Notify BMAsia) and external users (Paid Upgrade with Stripe/PayPal integration) to extend initial playlists.
- **Client Portal:** Developed a secure BMAsia client dashboard for redesign requests and seasonal updates.
- **Custom Windsurf Rules:** Added a `.windsurfrules` file with project-specific instructions to guide AI code generation.
- **Sample Environment File:** Created a `.env.example` with placeholders for all required API keys and configuration settings.
- **Documentation:** Added CONTRIBUTING.md outlining coding conventions, workflows, and guidelines for updating Windsurf rules.

### Changed
- **Project Structure Update:** Revised README.md to clearly document the overall project vision, user flows, and integration details.
- **User Flow Enhancements:** Improved the dynamic chat prompts within the playlist builder to better adapt to user responses.
- **API Integration:** Refined error handling for Spotify API calls to ensure robust feedback in success or failure cases.

### Fixed
- **Naming Inconsistencies:** Resolved issues with variable naming (e.g., `ChatPlaylistBuilder`, `RedesignRequestForm`) for better clarity across modules.
- **Context Passing:** Fixed minor bugs in passing context for API integrations and internal notifications.

## [0.1.0] - 2025-04-15
### Added
- **Initial Project Commit:**  
  Set up the basic project structure for Spotify Concierge for Businesses, including core pages for new playlist requests and BMAsia client redesigns.
- **Basic Integration:**  
  Established foundational integration with Spotify API to generate initial playlist previews.
- **Development Documentation:**  
  Created README.md, .env.example, CONTRIBUTING.md, and a preliminary custom Windsurf rules file.

---

*Note: Future updates will document each new enhancement, bug fix, and iteration to help maintain consistency and traceability within the project.*
