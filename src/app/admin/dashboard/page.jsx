"use client";
import React from "react";
import "@/assets/styles/tailwind.css";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@/app/admin/dashboard/Dashboard"), {
    ssr: false,
});




const Admin = () => {
  return ( <><Dashboard /></> );
};

export default Admin;