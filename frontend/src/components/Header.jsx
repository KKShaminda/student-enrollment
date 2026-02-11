import React from "react";


const Header = ({ search, setSearch, course, setCourse, courses }) => {
  return (
    <header className="d-flex align-items-center justify-content-between px-4 border-bottom bg-white" style={{ height: 80 }}>
      <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: 600, gap: 16 }}>
        <div className="position-relative w-100">
          <input
            className="form-control pe-3 py-2"
            placeholder="Search students by name, email, or ID..."
            type="text"
            style={{ minWidth: 350, width: '100%', paddingLeft: 35 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-select ms-3"
          style={{ minWidth: 160 }}
          value={course}
          onChange={e => setCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="d-flex align-items-center" style={{ gap: 16 }}>
        <button className="btn btn-primary d-flex align-items-center gap-2 fw-semibold">
          Add Student
        </button>
      </div>
    </header>
  );
};

export default Header;

