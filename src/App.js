import ClippedDrawer from "./pages/Navbar.jsx"; // Import the dashboard component  
import { Login } from "./pages/Login.jsx"; // Import the login component  
import Singup from "./pages/Signup.jsx"; // Import the signup component (note: should be renamed to "Signup" for consistency)  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom  

function App() {  
  return (  
    <Router>  
      <Routes>  
        {/* Default route which renders the Login component */}  
        <Route path="" element={<Login />} />  
        {/* Route for the Signup component */}  
        <Route path="/signup" element={<Singup />} />  
        {/* Route for the Dashboard, which uses ClippedDrawer as the main component */}  
        <Route path="/dashboard" element={<ClippedDrawer />} />  
      </Routes>  
    </Router>  
  );  
}  

export default App; // Export the App component