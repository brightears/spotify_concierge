# Spotify Concierge for Businesses

## Overview
**Spotify Concierge for Businesses** is an AI-powered playlist design tool built using [windsurf.ai](https://windsurf.ai) that enhances the music curation process for hospitality and retail businesses. The platform guides users through a chat-based experience to generate tailored Spotify playlists, which can later be imported into the Soundtrack Your Brand subscription for scheduling. Additionally, the system supports a redesign/seasonal update path for existing BMAsia clients with a dedicated login portal and internal workflow integration.

## Objectives
- **For New Clients/Visitors:**  
  Offer an easy and engaging chat-based playlist creation process that generates a preview of Spotify playlists based on business type, target audience, mood, and time slots.
  
- **For BMAsia Clients:**  
  Provide a client portal where users can view their current playlists, request design updates, and pre-schedule seasonal changes (e.g., Christmas, Chinese New Year, etc.). This flow also notifies the BMAsia team for manual, handcrafted curation when desired.

## Features

### 1. Chat-Based Playlist Builder (New Playlist Request)
- **Conversational Flow:**  
  The system uses an AI chat interface to ask guided questions:
  - Business Type (e.g., café, hotel, spa)
  - Target Audience (demographics and customer vibe)
  - Desired Brand Mood (e.g., chill, energetic, upscale)
  - Time Zones/Slots (morning, afternoon, evening, weekends)
  - Music Genre Preferences and Exclusions
- **Playlist Output:**  
  Generates a set of Spotify playlist previews (labeled by time slot) that users can review.  
  **Upgrade Options:**
  - **Notify BMAsia:** For BMAsia clients – their request is forwarded for handcrafted, full-length playlists.
  - **Paid Upgrade:** For external users – an option to pay for a premium, extended playlist (e.g., additional 200 curated tracks delivered within 24 hours).

### 2. Redesign & Seasonal Updates (BMAsia Client Portal)
- **Client Login:**  
  A secured area for existing BMAsia customers to log in and view their current music setup.
- **Dashboard Functionality:**  
  - Displays current playlists and scheduling details.
  - Allows clients to submit redesign requests for updates (seasonal or otherwise).
  - Enables pre-booking of design changes (e.g., “Activate festive playlist for December”).
- **Internal Workflow:**  
  - Notifies the BMAsia team of new or pending requests.
  - Integrates with an internal task tracker and Kanban board for managing design updates.
  - Includes automated reminders for both clients and internal staff (e.g., upcoming seasonal playlist refresh deadlines, overdue requests).

## User Flows

### A. New Playlist Request Flow
1. **Landing Page:**  
   - Welcome message prompting the user: “How can we help you with your music today?”
   - Options: “Create a New Playlist Design” (chat-based AI) vs. “Redesign/Update My Existing Setup.”
2. **Chat-Based Interaction:**  
   - The AI assistant asks a series of questions (as outlined above) to build a comprehensive music profile.
   - The conversation dynamically adjusts based on user responses.
3. **Playlist Preview Output:**  
   - Presents 6–10 Spotify playlist previews labeled by specific time slots (e.g., “Morning Vibes – Weekdays”, “Weekend Energy – Friday/Saturday”).
   - Offers the option to “Notify BMAsia” or “Upgrade for Full Playlist.”
4. **Post-Interaction:**  
   - For BMAsia clients: Automatic internal notification is sent.
   - For external users: A payment flow (via Stripe/PayPal) triggers full playlist curation, with delivery promised within 24 hours.

### B. Redesign Request Flow (BMAsia Clients)
1. **Login & Dashboard:**  
   - Existing clients log into a secure portal.
   - The dashboard displays current playlists, history, and scheduled updates.
2. **Submit Redesign Request:**  
   - Clients select from common options (e.g., “Festive Refresh”, “Seasonal Update”, “Custom Redesign”).
   - They specify details: what needs changing, desired new vibe, scheduled activation dates.
3. **Internal Processing:**  
   - Requests are visible on an internal Kanban board and task tracker.
   - Automated reminders are sent if requests are pending or nearing scheduled changes.
4. **Final Delivery:**  
   - BMAsia team curates the updated playlist.
   - The new playlist is delivered via Spotify link and can be integrated into Soundtrack Your Brand.

## Architecture & Integration
- **Frontend:**  
  - Built using windsurf.ai for fast development and AI-driven chat interface.
- **Backend:**  
  - Integration with the Spotify API to generate playlists and preview links.
  - Optional integration with Soundtrack Your Brand for scheduling.
- **Internal Tools:**  
  - Notion is used for a centralized dashboard: tracking client requests, managing internal tasks, and automating reminders.
  - Payment processing (e.g., Stripe) for paid upgrades.

## Monetization Strategy
- **For External Users:**  
  - Pay-per-playlist upgrade for extended, handcrafted playlists (e.g., $19–$59 per extended playlist).
  - Bundled seasonal packages (e.g., $79 for three seasonal playlists).
- **For BMAsia Clients:**  
  - Handcrafted playlists offered as a premium service integrated with ongoing subscriptions.
- **Future Revenue Streams:**  
  - Subscription tiers providing regular updates.
  - White-label offerings for partners/resellers.

## Future Enhancements
- **Enhanced Automation:**  
  - Build out full automation for playlist curation after initial testing and feedback.
- **Multi-Zone Support:**  
  - Develop features to handle multiple zones for businesses with diverse ambience needs.
- **Analytics Dashboard:**  
  - Track playlist performance, client satisfaction, and usage patterns.
- **Internal Collaboration Tools:**  
  - Expand client portal capabilities with direct communication, feedback loops, and version control for playlist redesigns.

## Next Steps
1. **Finalize Chatbot Flow:**  
   - Detail the conversational logic for both new requests and redesign requests.
2. **Prototype Development:**  
   - Use windsurf.ai to build a minimal working version and integrate with the Spotify API.
3. **Internal Testing:**  
   - Pilot with select BMAsia clients for feedback and iterate accordingly.
4. **Launch Phase 1:**  
   - Roll out the new service as a pilot to validate demand and refine operational workflows.
5. **Scale & Enhance:**  
   - Add automated internal reminders and expand premium monetization options based on feedback.

---

*This README.md serves as the project blueprint and can be updated as development progresses. It provides a clear vision, detailed user flows, and integration points for the “Spotify Concierge for Businesses” initiative.*
