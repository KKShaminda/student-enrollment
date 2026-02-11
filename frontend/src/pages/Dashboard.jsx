import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { fetchStudents, createStudent } from "../services/studentService";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reloadStudents, setReloadStudents] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const students = await fetchStudents();
        const uniqueCourses = Array.from(new Set(students.map(s => s.course).filter(Boolean)));
        setCourses(uniqueCourses);
      } catch {
        setCourses([]);
      }
    };
    loadCourses();
  }, []);

  const handleAddStudentClick = () => setShowForm(true);
  const handleFormClose = () => setShowForm(false);
  const handleFormSubmit = async (student) => {
    try {
      await createStudent(student);
      // Refresh course list
      const students = await fetchStudents();
      const uniqueCourses = Array.from(new Set(students.map(s => s.course).filter(Boolean)));
      setCourses(uniqueCourses);
      setShowForm(false);
      setReloadStudents((prev) => !prev); // trigger reload in StudentTable
    } catch (err) {
      alert("Failed to add student.");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <main className="flex-grow-1 d-flex flex-column bg-light">
        <Header
          search={search}
          setSearch={setSearch}
          course={course}
          setCourse={setCourse}
          courses={courses}
          onAddStudent={handleAddStudentClick}
        />
        <div className="flex-grow-1 overflow-auto p-4">
          {/* Page Title & Stats */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="fs-3 fw-bold text-primary mb-1">Student Enrollment</h1>
              <p className="text-muted small mb-0">Manage and monitor student enrollments across all active courses.</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-white px-3 py-2 rounded border d-flex align-items-center gap-2">
                <span className="rounded-circle bg-primary d-inline-block" style={{ width: 8, height: 8 }}></span>
                <span className="small text-muted">Total: {studentCount}</span>
              </div>
            </div>
          </div>
          <StudentTable setStudentCount={setStudentCount} search={search} course={course} reload={reloadStudents} />
        </div>
        <StudentForm show={showForm} onClose={handleFormClose} onSubmit={handleFormSubmit} courses={courses} />
      </main>
    </div>
  );
};

export default Dashboard;
