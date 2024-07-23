import React, { useState, useEffect } from "react";
import {
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
import createAuditLog from "../utils/Auditlogger";
import { SERVER_IP } from "../../config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contactno, setContactno] = useState("");
  const [accountno, setAccountno] = useState("");
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
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getUserById/${userid}`
      );
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
      const response = await axios.put(
        `http://${SERVER_IP}:3004/api/UpdateUser/${userid}`,
        {
          firstname,
          lastname,
          contactno,
          accountno,
          username,
          password,
        }
      );
      // Handle response and show success message or redirect
      console.log("Profile updated successfully:", response.data);

      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("contactno", contactno);
      localStorage.setItem("accountno", accountno);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      await createAuditLog({
        userid: userid,
        username: username,
        userrole: usertype,
        action: "Update account",
      });

      if (usertype == "pasahero") {
        navigate("/pasahero");
      } else if (usertype == "rider") {
        navigate("/rider");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="bg-[#0c356a] top-0 w-full h-[7rem] flex items-center text-[#ffffff]">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome {usernamedisplay}! Care to Book a Ride?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <IconButton>
                <MenuIcon className="text-[#ffffff]" />
              </IconButton>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <List>
                  <ListItem button onClick={() => navigate(-1)}>
                    <ListItemText primary="Go Back" />
                  </ListItem>
                  <ListItem button onClick={() => navigate("/")}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </div>
            </SheetContent>
          </Sheet>
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
    </div>
  );
};

export default UpdateAccount;
