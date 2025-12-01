# Deployment Guide

This application is split into two parts:
1.  **Backend**: Node.js/Express app (deployed to GCP Cloud Run).
2.  **Frontend**: React/Vite app (deployed to Vercel).

## 1. Backend Deployment (GCP Cloud Run)

### Prerequisites
-   Google Cloud Platform account.
-   `gcloud` CLI installed and authenticated.

### Steps
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Build and submit the container image:
    ```bash
    gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/jobtrack-backend
    ```
3.  Deploy to Cloud Run:
    ```bash
    gcloud run deploy jobtrack-backend \
      --image gcr.io/[YOUR_PROJECT_ID]/jobtrack-backend \
      --platform managed \
      --region [YOUR_REGION] \
      --allow-unauthenticated \
      --set-env-vars API_KEY=[YOUR_GEMINI_API_KEY],ALLOWED_ORIGINS=https://[YOUR_VERCEL_APP_URL]
    ```
4.  **Copy the URL** provided by Cloud Run (e.g., `https://jobtrack-backend-xyz.a.run.app`).

## 2. Frontend Deployment (Vercel)

### Steps
1.  Push your code to a Git repository (GitHub/GitLab/Bitbucket).
2.  Import the project into Vercel.
3.  **Environment Variables**:
    -   Add a new environment variable in the Vercel project settings:
        -   Name: `VITE_API_URL`
        -   Value: `https://jobtrack-backend-xyz.a.run.app/api` (The URL from step 1, plus `/api`).
4.  Deploy.

## Local Development
1.  **Backend**:
    ```bash
    cd server
    npm install
    # Create .env with API_KEY=...
    npm start
    ```
2.  **Frontend**:
    ```bash
    # In root directory
    npm install
    npm run dev
    ```
