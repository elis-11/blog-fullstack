# Frontend React Template

- Install basic Packages: 
  - sass
  - react-router-dom

- Setup folder structure
  - styles/ for all scss files
  - pages/ for Page components
  - components/ for reusable components on pages (e.g. Navbar)
  - context/ for storing our data
  - helpers/ for reusable functions (e.g. API calls)

- Setup basic pages & Routes
  - Homepage
  - Login & Signup page
  - Dashboard (protected / only for logged in users)

- Setup Context
  - Provide user state

- Code Login
  - Collect email & password using refs
  - Submit email & password as JSON string to API
  - If error: Show error from API (e.g. wrong password)
  - If success: 
    - Store user in state
    - Clear any errors
    - Redirect to Dashboard

- Dashboard page
  - load user data in useEffect hook
  - fetch data using token (stored in state => user.token)
  - send token in header "Authorization"

- Authentication / Route protection
  - Handle Page Refresh (restore user state on first load)
  - Protect dashboard route
  - Protect admin only routes

TODO: 

