import * as React from "react";  
import { useState, useCallback } from "react";  
import { styled } from "@mui/material/styles"; // Styled components for MUI  
import { Checkbox, Typography } from "@mui/material"; // MUI components  
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon  
import IconButton from "@mui/material/IconButton"; // Button component  
import EditIcon from "@mui/icons-material/Edit"; // Edit icon  
import FormDialog from "./Dialog"; // Custom dialog component for editing tasks  
import FormControlLabel from '@mui/material/FormControlLabel'; // Label for checkbox  
import Card from '@mui/material/Card'; // Card component  
import CardHeader from '@mui/material/CardHeader'; // Header for the Card  
import CardContent from '@mui/material/CardContent'; // Main content area  
import CardActions from '@mui/material/CardActions'; // Actions area (buttons)  
import Collapse from '@mui/material/Collapse'; // Collapse component for expanding/collapsing  
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Expand icon  
import axios from "axios"; // HTTP client for API requests  

// Styled button for expand/collapse functionality  
const ExpandMore = styled((props) => {  
  const { expand, ...other } = props; // Destructure expand prop  
  return <IconButton {...other} />; // Render IconButton with props  
})(({ theme }) => ({  
  marginLeft: 'auto', // Align to the right  
  transition: theme.transitions.create('transform', {  
    duration: theme.transitions.duration.shortest, // Animation duration  
  }),  
  variants: [ // Handle rotation based on expand state  
    {  
      props: ({ expand }) => !expand,  
      style: {  
        transform: 'rotate(0deg)', // Not expanded  
      },  
    },  
    {  
      props: ({ expand }) => !!expand,  
      style: {  
        transform: 'rotate(180deg)', // Expanded  
      },  
    },  
  ],  
}));  

// Main functional component for a task card  
export default function Variants({  
  id, title, description, dueDate, is_completed, onDelete, onUpdate  
}) {  
  const [expanded, setExpanded] = useState(false); // State for collapse/expand  
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open/close  
  const [isCompleted, setIsCompleted] = useState(is_completed); // Task completion state  
  const UpdateTask = 'http://localhost:3001/api/todo/task/'; // API endpoint for task updates  
  const token = localStorage.getItem('token'); // Authorization token from local storage  

  // Toggle expand/collapse state  
  const handleExpandClick = () => {  
    setExpanded(!expanded);  
  };  

  // Open dialog for editing task  
  const handleDialogOpen = () => {  
    setDialogOpen(true);  
  };  

  // Close dialog  
  const handleDialogClose = () => {  
    setDialogOpen(false);  
  };  

  // Handle checkbox state change and update the task completion status  
  const handleCheckedboxChange = useCallback(async () => {  
    try {  
      const newCompletedStatus = !isCompleted; // Toggle completion  
      await axios.post('http://localhost:3001/api/todo/task/', {  
        id: id,  
        title: title,  
        description: description,  
        duedate: dueDate,  
        is_completed: newCompletedStatus // Updated completion status  
      }, {  
        headers: { Authorization: `Bearer ${token}` } // Include the token  
      });  
      setIsCompleted(newCompletedStatus); // Update local state  
      onUpdate(); // Callback to parent for updates  
    } catch (error) {  
      console.log('error update task:', error); // Log errors  
    }        
  }, [id, title, description, dueDate, isCompleted, token, onUpdate]);  

  return (  
    <div style={{  
      display: 'flex',  
      justifyContent: 'center',  
      width: '100%',  
      marginBottom: '20px' // Margin for spacing  
    }}>  
      <Card sx={{ minWidth: '70%', marginBottom: 2, background: 'linear-gradient(to bottom, #e0f2fe, #ffffff)' }}>  
        <CardHeader title={title} subheader={dueDate} /> 
        <CardActions disableSpacing>
          <IconButton aria-label="done">  
            <FormControlLabel   
              control={  
                <Checkbox  
                  checked={is_completed} // Bind checkbox state  
                  onChange={handleCheckedboxChange} // Change handler  
                />}   
              label="Done"   
            />  
          </IconButton>  
          <IconButton aria-label="Edit" onClick={handleDialogOpen}> 
            <EditIcon />  
          </IconButton>  
          <IconButton aria-label="Delete" onClick={() => onDelete && onDelete(id)}>
            <DeleteIcon />  
          </IconButton>  
          <FormDialog   
            open={dialogOpen}   
            handleClose={handleDialogClose}   
            axiosHandler={UpdateTask}   
            taskid={id}   
            initialTitle={title}   
            initialDescription={description}   
            onUpdate={onUpdate}   
          /> 
          <ExpandMore  
            expand={expanded}  
            onClick={handleExpandClick} // Expand/collapse handler  
            aria-expanded={expanded}  
            aria-label="show more"  
          >  
            <ExpandMoreIcon />
          </ExpandMore>  
        </CardActions>  
        <Collapse in={expanded} timeout="auto" unmountOnExit> 
          <CardContent style={{ backgroundColor: 'linear-gradient(to top, #ffffff, #e0f2fe)' }}>  
            <Typography sx={{ marginBottom: 2 }}>Description:</Typography>  
            <Typography sx={{ marginBottom: 2 }}>  
              {description}   
            </Typography>  
          </CardContent>  
        </Collapse>  
      </Card>  
    </div>  
  );  
}