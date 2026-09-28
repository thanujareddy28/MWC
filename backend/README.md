# MWC Backend

FastAPI backend for Mental Wellness Companion.

## Requirements

Python 3.12 (matches the bundled virtual environment).

## Running locally

From this `backend` folder, use the virtual environment's own interpreter:

```
venv\Scripts\python -m uvicorn main:app --reload --port 8001
```

Then open http://localhost:8001/ to confirm the API is running.

## Port notes

- This backend uses port **8001** so it never collides with another project's
  uvicorn already bound to 8000 on this machine.
- The frontend dev server runs on port **5180**. CORS in `main.py` must list
  that origin, otherwise browser requests from the frontend will be blocked.
- Keep these two values in sync with `frontend/vite.config.js`.

## Configuration

Copy `.env.example` to `.env` and fill in the values. `.env` is git-ignored and
must never be committed.

Note that `.env.example` currently lists only the Clerk keys. The code in
`main.py` and `routes/auth.py` also reads `SUPABASE_URL` and `SUPABASE_KEY`, so
those two variables are required for the app to import.
