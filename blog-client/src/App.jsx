import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { Admin } from "./components/admin/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Posts } from "./pages/Posts";
import { PostDetails } from "./pages/PostDetails";
import { NotFound } from "./pages/NotFound";
import "./styles/App.scss";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>&copy; Tralalas Studios Inc.</footer>
    </div>
  );
}

export default App;
