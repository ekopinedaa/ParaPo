import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
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
import axios from "axios"; // Import Axios
import { SERVER_IP } from '../../config';

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userid, setUserid] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contactno, setContactno] = useState("")
  const [accountno, setAccountno] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [usernamedisplay, setUsernamdisplay] = useState("");


  useEffect(() => {
    const storedUserid = localStorage.getItem("userid");
    const storedUsername = localStorage.getItem("username");
    setUsernamdisplay(storedUsername);
    setUserid(storedUserid);

    fetchUserDetails(storedUserid);
  }, []);

  const fetchUserDetails = async (userid) => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/getUserById/${userid}`);
      const userData = response.data;
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setContactno(userData.contactno);
      setAccountno(userData.accountno);
      setUsername(userData.username);
      setUsertype(userData.usertype);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://${SERVER_IP}:3004/api/UpdateUser/${userid}`, {
        firstname,
        lastname,
        contactno,
        accountno,
        username,
        password,
      });
      // Handle response and show success message or redirect
      console.log("Profile updated successfully:", response.data);

      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("contactno", contactno);
      localStorage.setItem("accountno", accountno);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password)


      if (usertype == "pasahero") {
        navigate("/pasahero")
      }
      else if (usertype == "rider") {
        navigate("/rider");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
        <ListItem button onClick={() => navigate(-1)}>
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
    <div className="w-screen h-screen">
      <div className="bg-customBlue top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome {usernamedisplay}! Care to Book a Ride?
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
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="filled"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
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
                    value={contactno}
                    onChange={(e) => setContactNo(e.target.value)}
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
                    value={accountno}
                    onChange={(e) => setAccountNo(e.target.value)}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  onClick={handleUpdate}
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
