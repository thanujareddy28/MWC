from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Mental Wellness Companion API is running 🌿"}

@app.get("/test-db")
def test_db():
    response = supabase.table("profiles").select("*").execute()
    return {"connected": True, "data": response.data}


# ---------- Signup ----------
class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

@app.post("/signup")
def signup(data: SignupRequest):
    # 1. Check if username is already taken
    existing = supabase.table("profiles").select("id").eq("username", data.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username already taken")

    # 2. Create the Supabase Auth account
    auth_response = supabase.auth.sign_up({
        "email": data.email,
        "password": data.password
    })

    if auth_response.user is None:
        raise HTTPException(status_code=400, detail="Could not create account. Email may already be in use.")

    user_id = auth_response.user.id

    # 3. Create the matching profile row
    supabase.table("profiles").insert({
        "id": user_id,
        "username": data.username,
        "email": data.email
    }).execute()

    # 4. Return session info so frontend can log the user in
    return {
        "message": "Signup successful",
        "access_token": auth_response.session.access_token if auth_response.session else None,
        "user_id": user_id,
        "username": data.username
    }


# ---------- Login ----------
class LoginRequest(BaseModel):
    identifier: str  # username or email
    password: str

@app.post("/login")
def login(data: LoginRequest):
    email = data.identifier

    # If it's not an email, look up the username to find the matching email
    if "@" not in data.identifier:
        result = supabase.table("profiles").select("email, username").eq("username", data.identifier).execute()
        if not result.data or not result.data[0].get("email"):
            raise HTTPException(status_code=400, detail="Invalid username or password")
        email = result.data[0]["email"]

    # Attempt sign-in with Supabase Auth
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": data.password
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    if auth_response.user is None:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Fetch username to return to frontend (in case they logged in with email)
    profile = supabase.table("profiles").select("username").eq("id", auth_response.user.id).execute()
    username = profile.data[0]["username"] if profile.data else None

    return {
        "message": "Login successful",
        "access_token": auth_response.session.access_token if auth_response.session else None,
        "user_id": auth_response.user.id,
        "username": username
    }