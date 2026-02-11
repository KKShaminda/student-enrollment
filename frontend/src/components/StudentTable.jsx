import React, { useEffect, useState } from "react";
import { fetchStudents } from "../services/studentService";
import { ChevronLeft, ChevronRight } from "lucide-react";


const getInitials = (name = "") => {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

const statusColorMap = {
  Active: "success",
  Pending: "warning",
  Completed: "primary",
  Complete: "primary", 
};


const StudentTable = ({ setStudentCount, search = "", course = "" }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtering logic
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(search.toLowerCase()) ||
      s._id?.toLowerCase().includes(search.toLowerCase()) ||
      s.id?.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = !course || s.course === course;
    return matchesSearch && matchesCourse;
  });

  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        if (setStudentCount) setStudentCount(data.length);
      } catch {
        setError("Failed to load students");
        if (setStudentCount) setStudentCount(0);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, course]);

  return (
    <div className="bg-white rounded border shadow-sm">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              <th>Contact Info</th>
              <th>Course</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={5} className="text-danger text-center">{error}</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan={5} className="text-center">No students found.</td></tr>
            ) : (
              paginatedStudents.map((s) => (
                <tr key={s._id || s.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center fw-bold text-primary" style={{ width: 36, height: 36, fontSize: 14 }}>
                        {getInitials(s.name)}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">{s.name}</span>
                        <span className="text-muted small">ID: {s.studentId || s._id || s.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>{s.email}</span>
                      <span className="text-muted small">{s.phone}</span>
                    </div>
                  </td>
                  <td className="fw-medium">{s.course}</td>
                  <td className="text-center">
                    <span className={`badge rounded-pill bg-${statusColorMap[s.status] || "secondary"} px-3 py-2 fw-bold`}>
                      {s.status || "-"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination (static for now) */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-top bg-light">
          <span className="text-muted small">
            Showing {filteredStudents.length > 0 ? `${(currentPage - 1) * pageSize + 1} to ${Math.min(currentPage * pageSize, filteredStudents.length)}` : 0} of {filteredStudents.length} students
          </span>
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary fw-bold" : "btn-outline-secondary"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
    </div>
  );
};

export default StudentTable;
