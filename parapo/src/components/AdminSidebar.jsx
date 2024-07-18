import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PaidIcon from '@mui/icons-material/Paid';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ComputerIcon from '@mui/icons-material/Computer';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

const LinksTop = [
  {
    id: 1,
    linkto: "/ViewUsers",
    icon: <PersonIcon />,
    name: "View Users",
  },
  { id: 2, linkto: "/ViewRides", icon: <DirectionsCarFilledIcon />, name: "View Rides" },
  { id: 3, linkto: "/ViewTransactions", icon: <PaidIcon />, name: "View Transactions" },
  { id: 4, linkto: "/ViewRideRequests", icon: <FormatListNumberedRtlIcon />, name: "View Ride Requests" },
  { id: 5, linkto: "/pasahero", icon: <ComputerIcon/>, name: "Pasahero Dashboard"},
  { id: 6, linkto: "/rider", icon: <SportsMotorsportsIcon/>, name: "Rider Dashboard"}
];

const LinksBottom = [
  { id: 1, linkto: "/ViewAuditLogs", icon: <AlignHorizontalLeftIcon/>, name: "Audit Logs"},
  { id: 2, linkto: "/", icon: <LogoutIcon />, name: "Logout" },
];



const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <>
      <div className="sidebar w-[17.5%] h-screen border-r border-black p-[1rem] flex flex-col justify-between items-start gap-[1rem]">
        <div className="overflow-auto w-full flex flex-col justify-center items-start gap-[.5rem]">
          <h1 className="text-2xl ml-[1rem] font-bold" onClick={handleAdminClick}>Admin</h1>

          {LinksTop.map((item) => (
            <NavLink
              key={item.id}
              to={item.linkto}
              className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] duration-300 ease hover:bg-customYellow hover:text-customLightBlue`}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-[.5rem]">
          {LinksBottom.map((item) => (
            <div className="flex w-full">
              <NavLink
                key={item.id}
                to={item.linkto}
                className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] duration-300 ease hover:bg-customYellow hover:text-customLightBlue`}
              >
                {item.icon}
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
