# React TypeScript Template for Frontend

Here we will create a template with common things we need in the frontend:

- Minimum 3 Pages:
  - Homepage
  - Login / Signup page
  - Dashboard page (protected - only after login)
- User State
- Context: Store data centrally
- Login / Logout
- After Login: 
  - Store token
  - Redirect to Dashboard / protected page
- On Logout:
  - Redirect to Homepage if we are on a protected page
- Protect Routes
  - Protect Dashboard page route - only logged in user can access
- Get Protected Data from backend
  - Fetch: Send token with header "Authorization"
