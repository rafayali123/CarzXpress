// import React from 'react'
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar'
// import MainSection from "./components/Mainsection/mainsection";
// import Footer from './components/Footer/footer';
// // import Home from './Pages/Home';
// import About from './Pages/About';
// import Cars from './Pages/cars';
// import Contact from './Pages/Contact';
// import Services from './Pages/Services';



// const App = () => {
//   return (
//     <>
//      <div>
//       <Navbar />

//       <Routes>
//         {/* Show Home + MainSection only on / */}
//         <Route
//           path="/"
//           element={
//             <>
              
//               <MainSection />
//             </>
//           }
//         />

//         {/* Other Routes */}
//         <Route path="/about" element={<About />} />
//         <Route path="/cars" element={<Cars />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/services" element={<Services />} />
//       </Routes>

//       <Footer />
//     </div>
//     </>
//   )
// }

// export default App

// import { Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/footer';
// import MainSection from "./components/Mainsection/mainsection";
// import About from './Pages/About';
// import Cars from './Pages/cars';
// import Contact from './Pages/Contact';
// import Services from './Pages/Services';
// import Dashboard from "./Pages/Dashboard";
// import Login from "./Pages/Login";


// function App() {
//   return (
//     <Routes>
//       <div>
//         <Routes>
//           {/* Login Page */}
//           <Route path="/" element={<Login/>} />

//           {/* Dashboard */}
//           <Route path="/dashboard" element={<Dashboard/>} />

//           {/* Routes with Navbar and Footer */}
//           <Route
//             path="/home"
//             element={
//               <>
//                 <Navbar />
//                 <MainSection />
//                 <Footer />
//               </>
//             }
//           />

//           <Route
//             path="/about"
//             element={
//               <>
//                 <Navbar />
//                 <About />
//                 <Footer />
//               </>
//             }
//           />

//           <Route
//             path="/cars"
//             element={
//               <>
//                 <Navbar />
//                 <Cars />
//                 <Footer />
//               </>
//             }
//           />

//           <Route
//             path="/contact"
//             element={
//               <>
//                 <Navbar />
//                 <Contact />
//                 <Footer />
//               </>
//             }
//           />

//           <Route
//             path="/services"
//             element={
//               <>
//                 <Navbar />
//                 <Services />
//                 <Footer />
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </Routes>
//   );
// }

// export default App;

// // App.jsx (or App.tsx) — Router REMOVED
// import { Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/footer';
// import MainSection from "./components/Mainsection/mainsection";
// import About from './Pages/About';
// import Cars from './Pages/cars';
// import Contact from './Pages/Contact';
// import Services from './Pages/Services';
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Routes>
//       {/* Login Page (now at /login) */}
//       <Route path="/login" element={<Login/>} />

//       {/* Dashboard Page (without Navbar/Footer) */}
//       <Route path="/dashboard" element={<Dashboard/>} />

//       {/* All pages that need Navbar + Footer */}
//       <Route
//         path="/"
//         element={
//           <>
//             <Navbar />
//             <MainSection />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/about"
//         element={
//           <>
//             <Navbar />
//             <About />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/cars"
//         element={
//           <>
//             <Navbar />
//             <Cars />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/contact"
//         element={
//           <>
//             <Navbar />
//             <Contact />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/services"
//         element={
//           <>
//             <Navbar />
//             <Services />
//             <Footer />
//           </>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/footer';
// import MainSection from "./components/Mainsection/mainsection";
// import About from './Pages/About';
// import Cars from './Pages/cars';
// import Contact from './Pages/Contact';
// import Services from './Pages/Services';
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login/>} />
//       <Route path="/dashboard" element={<Dashboard/>} />
//       <Route path="/home" element={<><Navbar /><MainSection /><Footer /></>} />
//       <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
//       <Route path="/cars" element={<><Navbar /><Cars /><Footer /></>} />
//       <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
//       <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/footer';
// import MainSection from "./components/Mainsection/mainsection";
// import About from './Pages/About';
// import Cars from './Pages/cars';
// import Contact from './Pages/Contact';
// import Services from './Pages/Services';
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";

// function App() {
//   return (
//     <Routes>
//       {/* Redirect root to login */}
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* Login Page */}
//       <Route path="/login" element={<Login />} />

//       {/* Dashboard Page */}
//       <Route path="/dashboard" element={<Dashboard />} />

//       {/* Home Page with Navbar/Footer */}
//       <Route
//         path="/home"
//         element={
//           <>
//             <Navbar />
//             <MainSection />
//             <Footer />
//           </>
//         }
//       />

//       {/* Other Pages */}
//       <Route
//         path="/about"
//         element={
//           <>
//             <Navbar />
//             <About />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/cars"
//         element={
//           <>
//             <Navbar />
//             <Cars />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/contact"
//         element={
//           <>
//             <Navbar />
//             <Contact />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/services"
//         element={
//           <>
//             <Navbar />
//             <Services />
//             <Footer />
//           </>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

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

function App() {
  return (
    <AuthProvider>
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


