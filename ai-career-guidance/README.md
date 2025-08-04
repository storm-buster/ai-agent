# AI Career Guidance Platform

A full-stack project for personalized AI-powered career guidance.

## Structure

- `backend/` — Flask API using Google Gemini for career advice.
- `frontend/` — React (Vite + TypeScript + shadcn/ui) user interface.

## Getting Started

### Backend

See [backend/README.md](backend/README.md)

### Frontend

See [frontend/README.md](frontend/README.md)

## Running Both

1. Start the backend:
   ```
   cd backend
   python -m venv venv
   venv\Scripts\activate  # or `source venv/bin/activate` on macOS/Linux
   pip install -r requirements.txt
   python app.py
   ```

2. Start the frontend in a new terminal:
   ```
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

- Backend: Set `GEMINI_API_KEY` in `backend/.env` (see backend README).

---

**Stop servers:**  
Press `Ctrl + C` in each terminal running the frontend or backend.

---

##