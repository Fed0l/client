import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Variants from "../components/Cards";
import FormDialog from "../components/Dialog";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BackgroundLetterAvatars from "../components/Avatar";
import BasicSelect from "../components/Sort";
import { useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";


//export firstname and lastname from jwt Token
function getJWTToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return {
      token: token,
      firstName: decodedToken.name,
      lastName: decodedToken.lastName,
    };
  }
  return null;
}

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const { token } = getJWTToken();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/todo/user_id/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const formattedTasks = response.data.map(task => ({
        ...task,
        duedate: new Date(task.duedate).toLocaleDateString("ko-KR")
      }));
      setTasks(formattedTasks);
      setSortedTasks(formattedTasks);
    } catch (err) {
      alert("Error fetching tasks: " + err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todo/deletetask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setSortedTasks(updatedTasks);
    } catch (err) {
      alert("Error deleting task" + err.message);
    }
  };

  const handleSort = (sortedTasks) => {
    setSortedTasks(sortedTasks);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2, width: "100%", height:'100vh' }}>
      
      <h1 className=" text-center text-6xl font-Amsterdam">Task List</h1>
      <BasicSelect className=" my-2" tasks={sortedTasks} onSort={handleSort} />
      <Typography
        component="div"
        sx={{
          width: "100%",
        }}
      >
        {sortedTasks.length === 0 ? (
          <h1 className=" flex justify-center text-2xl text-slate-500">No task added yet</h1>
        ) : (
          sortedTasks.map((task) => (
            <Variants
              key={task.id}
              userid={task.userid}
              id={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.duedate}
              is_completed={task.is_completed}
              onDelete={handleDelete}
              onUpdate={fetchTasks}
            />
          ))
        )}
      </Typography>
    </Box>
  );
};

export default function ClippedDrawer() {
  const navigate = useNavigate();
  const drawerWidth = 240;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { firstName, lastName } = getJWTToken();
  const fullname = `${firstName} ${lastName}`;
  const createNewTaskUrl = "http://localhost:3001/api/todo/create/newtask/";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height:"100vh", backgroundColor:blue[0] }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,background: blue[50] }}
      >
        <Toolbar className=" flex justify-between">
          <Typography
            variant="h9"
            className=" flex flex-row  gap-2 place-items-center text-blue-900"
            noWrap
            component="div"
          >
            <BackgroundLetterAvatars
              name={fullname.toUpperCase()}
              className=" flex flex-col text-center"
            />
            Welcome <br /> {firstName[0].toUpperCase() + firstName.slice(1)}
          </Typography>
          <button className=" text-blue-900" onClick={handleLogout}>Log out</button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: grey[50]
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", backgroundColor:blue[900], color:'white'}}>
          <List>
            <ListItemButton onClick={handleDialogOpen}>
              <ListItemIcon>
                <AddTaskIcon/>
              </ListItemIcon>
              Create New Task
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <FormDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        axiosHandler={createNewTaskUrl}
      />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: '64px', width: "100%" }}>
        <TaskList />
      </Box>
    </Box>
  );
}
