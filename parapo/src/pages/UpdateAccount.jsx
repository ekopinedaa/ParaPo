import React, { useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import backgroundImage from "../rsc/Pasaherobgimage.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleUpdate = () => {
    // Handle update logic here (e.g., API call)
    console.log("Updating profile:", {
      username,
      password,
      firstName,
      lastName,
    });
    // Placeholder: Redirect to dashboard or show success message
    navigate("/"); // Redirect to dashboard after update
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate("/Pasahero")}>
          <ListItemText primary="Go Back" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="w-screen">
      <div className="bg-customBlue top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome *User*! Care to Book a Ride?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-customWhite" />
          </IconButton>
        </div>
      </div>
      <div
        className="flex items-center bg-[#FF0CE] w-screen font-roboto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" h-full w-full flex flex-row justify-center">
          <div className="h-[50rem] flex items-center">
            <Box
              sx={{
                height: "35rem",
                width: "30rem",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: "1.5rem",
                mr: ".5rem",
              }}
            >
              <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                Update Profile
              </h1>
              <form className="space-y-4">
                <div className="flex space-x-4 mb-4">
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="filled"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="filled"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Contact Number"
                    variant="filled"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Bank Account Number"
                    variant="filled"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Username"
                    variant="filled"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Password"
                    variant="filled"
                    type="password"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                </div>
              </form>
              <div className="mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Profile
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default UpdateAccount;
