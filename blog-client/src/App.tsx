import "./styles/App.scss"
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Navbar } from "./components/Navbar"
import { Admin } from "./pages/Admin"
import { ProtectedPage } from "./components/ProtectedPage"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>My Webpage (Template)</h2>
        <Navbar />
      </header>
      {/* MAIN CONTENT / PAGE */}
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<ProtectedPage >
              <Dashboard />
            </ProtectedPage>}
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage admin>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route path="*" element={<div>Page does not exist</div>} />
        </Routes>
      </main>
      <footer>&copy; Eliza Studios Inc.</footer>
    </div>
  )
}

export default App
