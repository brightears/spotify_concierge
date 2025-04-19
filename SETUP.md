# Setup Guide for Spotify Concierge for Businesses

This guide outlines the steps necessary to install, configure, and run the Spotify Concierge for Businesses project. Please follow these instructions to get the project up and running on your local development environment.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) and **npm**  
  Check your installation by running:
  ```bash
  node -v
  npm -v
  ```
- A code editor (e.g., VS Code)
- Git installed to clone the repository

---

## Installation

1. **Clone the Repository:**
   Open your terminal and run:
   ```bash
   git clone https://github.com/yourusername/spotify_concierge.git
   cd spotify_concierge
   ```
2. **Install Dependencies:**
   Install the project dependencies using npm:
   ```bash
   npm install
   ```

---

## Configuration

1. **Environment Variables:**
   - Copy the sample environment file to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and update the following placeholders with your actual keys and configuration values:
     - SPOTIFY_API_KEY
     - SPOTIFY_CLIENT_ID
     - SPOTIFY_CLIENT_SECRET
     - STRIPE_SECRET_KEY
     - STRIPE_PUBLISHABLE_KEY
     - (Other variables as required, such as BMASIA_INTERNAL_API_KEY, SYB_API_KEY, etc.)

2. **Windsurf Custom Rules:**
   Ensure your `.windsurfrules` file is up to date with the project-specific instructions so that Windsurf’s AI adheres to our coding standards and integration patterns.

---

## Running the Project

1. **Start the Development Server:**
   Run the following command in the project root:
   ```bash
   npm start
   ```
   This will launch the application on the port defined in your `.env` file (default is 3000).

2. **Access the Application:**
   Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```
3. **Development Workflow:**
   - **Coding:**
     Use Windsurf to interactively build and refine project features through our chat-based interface.
   - **Testing:**
     Run tests (if configured) with:
     ```bash
     npm test
     ```
   - **Logs:**
     Check the terminal for any error messages or console logs for troubleshooting.

---

## Additional Notes

- **Documentation:**
  For a high-level overview of the project and its internal workflows, please refer to the `README.md`.
- **Continuous Updates:**
  Keep the `.windsurfrules`, `prompt.md`, and `CHANGELOG.md` files updated as the project evolves.
- **Team Communication:**
  Please refer to `CONTRIBUTING.md` for guidelines on code style, branching, and pull request procedures.

This setup guide is intended to provide a reliable starting point and minimize context-switching. Should you encounter any issues, refer to the project documentation or contact the project maintainer.

Happy coding!
