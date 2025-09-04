# Amazon PPC Audit SaaS — Ready-to-Deploy (Prototype)

This repository contains a UX-ready prototype for an Amazon PPC Audit web app.
Drop a bulk Amazon advertising CSV/XLSX file and get an automated PPC audit with KPIs,
keyword suggestions, and recommendations.

## What's included
- Frontend (React + Vite) — user-friendly upload, mapping, and dashboard UI
- Backend (Express) — file upload, parsing, audit computation
- Dockerfiles and docker-compose for local testing
- GitHub Actions workflow for CI and Render deployment
- Helper script `git-init-and-push.sh` to push to GitHub

## Quick local test (Docker)
1. Install Docker and docker-compose.
2. From the project root run:
   ```bash
   docker-compose up --build
   ```
3. Frontend: http://localhost:3000
   Backend: http://localhost:8080

## Deploy to Render (recommended for non-programmers)
1. Create a GitHub repo and push this project (see `git-init-and-push.sh` or upload files via GitHub UI).
2. Create two services on Render: one for the backend (Web Service) and one for the frontend (Static Site or Web Service using Docker).
3. Add the required Render service IDs and API key as GitHub Secrets (see `.github/workflows/deploy-render.yml`).

See the canvas and the included `README_DEPLOY_RENDER.md` for detailed Render steps.
