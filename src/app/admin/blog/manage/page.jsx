"use client";
import React from "react";
import "@/assets/styles/tailwind.css";
import dynamic from "next/dynamic";
const Blog = dynamic(() => import("@/app/admin/blog/Blog"), {
    ssr: false,
});


const AdminDashboard = () => {  
    return ( <><Blog /></> );
};

export default AdminDashboard;