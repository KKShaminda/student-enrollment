// src/services/studentService.js
// Service for student API calls
import axios from "axios";

const API_URL = "http://localhost:5000/students";

export const fetchStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
