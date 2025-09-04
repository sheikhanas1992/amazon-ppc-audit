# Deploying to Render — Step-by-step (non-programmer)

1. Create a GitHub repository and push these files (use the provided `git-init-and-push.sh` or upload files manually):
   - Create a new repo at https://github.com/new
   - Name it `amazon-ppc-audit` (or your preferred name)
   - Upload the repository files via the GitHub web UI if you don't use git locally:
     - In the new repo, click 'Add file' → 'Upload files' and drag the contents of this ZIP.
     - Commit the upload.

2. Create a Render account at https://render.com and log in.

3. Create Backend service (Web Service)
   - Click 'New' → 'Web Service' → connect your GitHub repo.
   - Choose the repository and the root directory `backend` for the service.
   - Set Environment to `Docker` (the repo contains a backend Dockerfile).
   - Give it a name like `ppc-audit-backend`.
   - Add environment variables (if any). For the prototype, none are required.
   - Create the service and wait for deployment.

4. Create Frontend service (Static or Docker)
   - Option A (Static Site): If you build frontend as static, choose 'Static Site' and point to `frontend/dist` as the published directory and set the Build Command: `npm ci && npm run build`.
   - Option B (Docker): Create another 'Web Service' and set the root to `frontend`, Render will use the Dockerfile provided.
   - Name it `ppc-audit-frontend`.

5. After both services are created, open the frontend URL and test uploading a CSV. The frontend talks to the backend using relative paths (same domain) when proxied by Render. If cross-origin issues occur, update the backend CORS settings or set `API_BASE_URL` in frontend.

6. (Optional) In GitHub, go to Settings → Secrets and add `RENDER_API_KEY`, `RENDER_SERVICE_ID_FRONTEND`, and `RENDER_SERVICE_ID_BACKEND` if you plan to use the included GitHub Actions workflow to trigger Render deploys automatically.

That's it — Render will build and host your app. For any issues, follow Render logs for build/deploy errors.
