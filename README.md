## Running the Project with Docker

This project includes a ready-to-use Docker setup for running the Node.js address book application.

### Requirements
- Docker (latest version recommended)
- Docker Compose (v2 or later)

### Project-Specific Docker Details
- **Node.js Version:** Uses Node.js `22.13.1-slim` (configurable via `NODE_VERSION` build argument in the Dockerfile)
- **Non-root User:** The container runs as a non-root user for improved security
- **Exposed Port:** The application listens on port **3000** (mapped to `localhost:3000`)
- **Entrypoint:** `node addrbook.js`
- **No external services or volumes required**
- **No required environment variables** (unless you add a `.env` file and uncomment the `env_file` line in `compose.yaml`)

### Build and Run Instructions

1. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This will build the image and start the service as defined in `compose.yaml`.

2. **Access the application:**
   - Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Customization
- To use a different Node.js version, set the `NODE_VERSION` build argument:
  ```sh
  docker compose build --build-arg NODE_VERSION=XX.XX.X
  ```
- If you need to set environment variables, create a `.env` file in the project root and uncomment the `env_file` line in `compose.yaml`.

---

_This section was updated to reflect the current Docker and Docker Compose setup for this project._
"# addressbook-node" 
"# addressbook-node" 
