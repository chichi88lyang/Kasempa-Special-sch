import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// ✅ Automatically attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 🔹 Auth APIs
export const register = (formData) => API.post("/register", formData);
export const login = (formData) => API.post("/login", formData);

// 🔹 Role-based test APIs
export const getAdminData = () => API.get("/admin-data");
export const getTeacherData = () => API.get("/teacher-data");
export const getStudentData = () => API.get("/student-data");

export default API;
