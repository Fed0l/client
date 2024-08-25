import axios from "axios"; // Import Axios for making HTTP requests  
import React, { useState } from "react"; // Import React and useState hook  
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation  

export const Login = () => {  
  const [username, setUsername] = useState(""); // State for storing username  
  const [password, setPassword] = useState(""); // State for storing password  
  const navigate = useNavigate(); // Hook for navigation  

  // Handler for form submission  
  const submitHandler = async (event) => {  
    event.preventDefault(); // Prevent default form submission  
    try {  
      // Send POST request to the API  
      const response = await axios.post("http://localhost:3001/api/", {  
        username,  
        password,  
      });  
      console.log(response.data); // Log the response from the server  
      const token = response.data.jwt; // Retrieve the JWT token from response  
      localStorage.setItem("token", token); // Store token in local storage  
      navigate("/dashboard"); // Navigate to the dashboard  
    } catch (error) {  
      console.log(error.response.data.message); // Log any error messages  
      alert(error.response.data.message); // Alert the user with error message  
    }  
  };  

  return (  
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-fixed bg-sky-100">  
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">  
        <h2 className="mt-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">  
          Sign in to your account  
        </h2>  
      </div>  

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">  
        <form className="space-y-6" onSubmit={submitHandler}>  
          <div>  
            <label  
              htmlFor="username"  
              className="block text-sm font-medium leading-6 text-gray-900"  
            >  
              Username  
            </label>  
            <div className="mt-2">  
              <input  
                value={username} // Bind input to username state  
                onChange={(e) => setUsername(e.target.value)} // Update state on change  
                id="username" // Input ID  
                name="username" // Input name  
                required // Make this field required  
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  
              />  
            </div>  
          </div>  

          <div>  
            <div className="flex items-center justify-between">  
              <label  
                htmlFor="password"  
                className="block text-sm font-medium leading-6 text-gray-900"  
              >  
                Password  
              </label>  
            </div>  
            <div className="mt-2">  
              <input  
                value={password} // Bind input to password state  
                onChange={(e) => setPassword(e.target.value)} // Update state on change  
                id="password" // Input ID  
                name="password" // Input name  
                type="password" // Set type to password  
                required // Make this field required  
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  
              />  
            </div>  
          </div>  

          <div>  
            <button  
              type="submit" // Submit button for the form  
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  
            >  
              Sign in  
            </button>  
          </div>  
        </form>  

        <p className="mt-10 text-center text-sm text-gray-500">  
          Not a member?  
          <a  
            href="http://localhost:3000/signup" // Link to the signup page  
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"  
          >  
            Sign Up for free Now  
          </a>  
        </p>  
      </div>  
    </div>  
  );  
};