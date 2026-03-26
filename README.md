# Contact Management Web App (MERN Stack)

This is a full-stack Contact Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Advanced Search & Filtering**: Instantly search contacts by name or email, and combine queries with category filters.
- **Categorization**: Group contacts into 'Work', 'Personal', and 'Family' with colored visual badges.
- **Favorites**: "Star" important contacts to keep them prioritized at the top of your list.
- **Notes & Timestamps**: Store additional details for each contact and track when they were last updated.
- **Notifications**: Toast notifications for success and error interactions.
- **Responsive UI**: Built with Tailwind CSS.
- **API Validation**: Backend safeguards for required fields and unique emails.

## Prerequisites
- Node.js installed
- A MongoDB URI (MongoDB Atlas or local)

## Local Development Setup

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory based on `.env.example`:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_cluster_connection_uri_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will be running at `http://localhost:5173`.

## Deployment Guide

### Deploying the Backend (Render/Railway)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com/) or Railway and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. In the environment variables section, add the `MONGO_URI` with your Database cluster URI.
8. Deploy, and note the live URL of your backend.

### Deploying the Frontend (Vercel/Netlify)
1. Go to [Vercel](https://vercel.com) and create a new Project.
2. Import this GitHub repository.
3. Edit the **Root Directory** to point to `frontend`.
4. Add an Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-live-url.onrender.com/api` (the URL from the previous step)
5. Deploy. The framework will be automatically detected as Vite.

Once both are deployed, your Full-Stack Contact Manager is live and fully functional on the internet!
