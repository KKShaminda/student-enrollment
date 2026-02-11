import React, { useState } from "react";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <main className="flex-grow-1 d-flex flex-column bg-light">
        <Header />
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
          <StudentTable setStudentCount={setStudentCount} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
