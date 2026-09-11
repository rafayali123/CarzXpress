import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import MainSection from "./components/Mainsection/mainsection";
import About from './Pages/About';
import Cars from './Pages/cars';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; // Import the scroll helper

function App() {
  return (
    <AuthProvider>
      <ScrollToTop /> {/* Ensures every page navigation starts at the top */}
      <Routes>
        {/* Default route to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      {/* Home */}
      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <MainSection />
            <Footer />
          </>
        }
      />

      {/* Other pages */}
      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        }
      />
      <Route
        path="/cars"
        element={
          <>
            <Navbar />
            <Cars />
            <Footer />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        }
      />
      <Route
        path="/services"
        element={
          <>
            <Navbar />
            <Services />
            <Footer />
          </>
        }
      />
      </Routes>
    </AuthProvider>
  );
}

export default App;