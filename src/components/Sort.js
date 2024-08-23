import * as React from 'react'; // Import React  
import { useState } from 'react'; // Import useState hook  
import Box from '@mui/material/Box'; // Import Box for layout  
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel for select label  
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem for dropdown options  
import FormControl from '@mui/material/FormControl'; // Import FormControl for controlling form elements  
import Select from '@mui/material/Select'; // Import Select component for dropdown  

// Main functional component for sorting tasks  
export default function BasicSelect({ tasks, onSort }) {  
  const [sort, setSort] = useState(''); // State for tracking selected sort option  

  // Handle changes in the select dropdown  
  const handleChange = (event) => {  
    const selectedValue = event.target.value; // Get the selected value  
    setSort(selectedValue); // Update state with selected sort option  

    // Sort by due date  
    if (selectedValue === 'Sort By DueDate') {  
      const sortedTasks = [...tasks].sort((a, b) => {  
        return new Date(a.duedate) - new Date(b.duedate); // Compare due dates  
      });  
      onSort(sortedTasks); // Pass sorted tasks to onSort callback  
    }  

    // Sort alphabetically A-Z  
    if (selectedValue === 'Sort A-Z') {  
      const sortedTasks = [...tasks].sort((a, b) => {  
        return a.title.localeCompare(b.title); // Compare titles for A-Z sorting  
      });  
      onSort(sortedTasks); // Pass sorted tasks to onSort callback  
    }  
  };  

  return (  
    <Box display={'flex'} justifyContent={'right'} marginRight={'48px'} marginBottom={"2rem"}>  
      <FormControl variant='outlined'> {/* FormControl for dropdown */}  
        <InputLabel id="demo-simple-select-label">Sort</InputLabel> {/* Label for the dropdown */}  
        <Select  
          sx={{ m: 1, minWidth: 120, height: 40, backgroundColor: 'white'}} // Styling for the dropdown  
          labelId="demo-simple-select-label" // ID for the label  
          id="demo-simple-select" // ID for the select  
          value={sort} // Bind selected value  
          label="Sort" // Label for the select  
          onChange={handleChange} // Handle change event  
        >  
          <MenuItem value={'Sort A-Z'}>Sort A-Z</MenuItem> {/* Option for A-Z sorting */}  
          <MenuItem value={'Sort By DueDate'}>Sort By DueDate</MenuItem> {/* Option for due date sorting */}  
        </Select>  
      </FormControl>  
    </Box>  
  );  
}