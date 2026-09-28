# MWC Frontend

React + Vite frontend for Mental Wellness Companion (MWC). Authentication is
handled by Clerk (`@clerk/react`). The API is FastAPI, run from the sibling
`backend` folder.

## Running

```
npm install
npm run dev
```

The dev server runs on **port 5180** (pinned with `strictPort` in
`vite.config.js`, so it fails loudly instead of silently moving to another port).
Open http://localhost:5180/.

## Configuration

Create `frontend/.env.local` (git-ignored) with these two variables. See
`frontend/.env.example` for the template.

- `VITE_CLERK_PUBLISHABLE_KEY` — your Clerk publishable key. Must be a real key
  starting with `pk_`. The app throws on startup if this is missing or still
  contains placeholder text, so paste the actual value from the Clerk dashboard.
- `VITE_API_URL` — base URL of the FastAPI backend, e.g. `http://localhost:8001`.
  If unset, the code falls back to `http://localhost:8000`.

## Never put secret keys in the frontend

Only `VITE_`-prefixed variables are exposed to the browser bundle, and those
must be public values. A Clerk **publishable** key (`pk_...`) is designed to be
public. Never add any of the following to this folder, to `frontend/.env.local`,
or to any file under `src/`:

- Clerk **secret** key (`sk_...`)
- Clerk webhook signing secret
- Supabase service-role or secret key
- Any other server-side secret

Those belong in `backend/.env`, which is git-ignored. If a secret ever reaches
the frontend, treat it as compromised and rotate it.

## Other scripts

```
npm run build     # production build to dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```
