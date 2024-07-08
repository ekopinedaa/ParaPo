import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {

  return (
    <div className="flex">
      <AdminSidebar />
      <div className= "items-center justify-center w-[105rem] p-8">
        <h2 className="text-2xl font-bold mb-4 w-[20rem]">Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
