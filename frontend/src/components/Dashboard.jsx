import React, { useState, useEffect } from "react";
import {
  getAdminData,
  getTeacherData,
  getStudentData,
} from "../api/axios.js";

const Dashboard = ({ user }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (user.role === "Admin") {
          response = await getAdminData();
        } else if (user.role === "Teacher") {
          response = await getTeacherData();
        } else {
          response = await getStudentData();
        }
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setMessage("Failed to load data. Check if you're logged in.");
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
