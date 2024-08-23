import * as React from "react"; // Import React  
import { useState, useEffect } from "react"; // Import hooks  
import axios from "axios"; // Import Axios for API requests  
import Button from "@mui/material/Button"; // Import MUI Button component  
import TextField from "@mui/material/TextField"; // Import MUI TextField for input  
import Dialog from "@mui/material/Dialog"; // Import MUI Dialog component  
import DialogActions from "@mui/material/DialogActions"; // Import to render actions in Dialog  
import DialogContent from "@mui/material/DialogContent"; // Content area of the Dialog  
import DialogTitle from "@mui/material/DialogTitle"; // Title component of the Dialog  
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"; // Date calendar component  
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Provider for date localization  
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter to work with Day.js  
import dayjs from 'dayjs'; // Import Day.js for date manipulation  

// Main functional component for the form dialog  
export default function FormDialog({ open, handleClose, axiosHandler, taskid, initialTitle, initialDescription, onUpdate }) {  
  // State management for input fields  
  const [taskTitle, setTaskTitle] = useState(initialTitle || ""); // Title state  
  const [description, setDescription] = useState(initialDescription || ""); // Description state  
  const [duedate, setDuedate] = useState(null); // Due date state  

  // Effect to reset form fields when dialog opens  
  useEffect(() => {  
    if (open) {  
      setTaskTitle(initialTitle || ""); // Reset title  
      setDescription(initialDescription || ""); // Reset description  
      setDuedate(null); // Reset due date  
    }  
  }, [open, initialTitle, initialDescription]);  

  // Handle form submission  
  const handleSubmit = async (event) => {  
    event.preventDefault(); // Prevent default form submission behavior  
    try {  
      const token = localStorage.getItem('token'); // Retrieve token from local storage  
      await axios.post(axiosHandler, {  
        id: taskid, // Task ID for update  
        title: taskTitle, // Updated title  
        description: description, // Updated description  
        duedate: duedate ? duedate.format("YYYY-MM-DD") : null, // Format due date  
        is_completed: false // Mark task as not completed  
      }, {  
        headers: { Authorization: `Bearer ${token}` }, // Include authorization token in header  
      });   
      handleClose(); // Close the dialog  
      window.location.reload(); // Reload the page to reflect changes  
    } catch (error) {  
      console.log('error', error); // Log errors  
      alert('Failed to update task. Please try again.'); // Show error message  
    }  
  };  

  // Function to disable past dates in the calendar  
  const shouldDisableDate = (date) => {  
    const today = dayjs(); // Get today’s date  
    return date.isBefore(today, 'day'); // Disable dates before today  
  };  

  return (  
    <Dialog  
      open={open} // Control dialog open state  
      onClose={handleClose} // Close dialog on request  
      PaperProps={{  
        component: "form", // Make Dialog act as a form  
        onSubmit: handleSubmit,  
        className: "w-[600px] max-w-[90%] p-4 rounded-lg", // Styling for dialog  
      }}  
    >  
      <DialogTitle className="text-center text-xl font-bold">  
        {taskid ? "Edit Task" : "Create New Task"}
      </DialogTitle>  
      <DialogContent>  
        <h1 className="my-3 font-bold text-center">Title</h1>  
        <TextField  
          value={taskTitle} // Bind title state  
          onChange={(e) => setTaskTitle(e.target.value)} // Update title state  
          id="outlined-basic"  
          label="Task Title" // Label for TextField  
          variant="outlined"  
          required // Make field required  
          className="w-full max-w-[580px]" // Width styling  
        />  
        <h1 className="my-3 font-bold text-center">Description</h1>  
        <TextField  
          value={description} // Bind description state  
          onChange={(e) => setDescription(e.target.value)} // Update description state  
          id="outlined-textarea"  
          label="Task Description"  
          multiline // Allow multiple lines  
          required // Make field required  
          className="w-full max-w-[580px]" // Width styling  
        />  

        <h1 className="my-3 font-bold text-center">Due Date</h1>  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar   
            onChange={(newValue) => setDuedate(newValue)} // Update due date state  
            shouldDisableDate={shouldDisableDate} // Disable past dates  
          />  
        </LocalizationProvider>  
      </DialogContent>  
      <DialogActions>  
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Apply</Button>   
      </DialogActions>  
    </Dialog>  
  );  
}