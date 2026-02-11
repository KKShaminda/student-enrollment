import React from "react";


const Header = () => (
  <header className="d-flex align-items-center justify-content-between px-4 border-bottom bg-white" style={{ height: 80 }}>
    <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: 600, gap: 16 }}>
      <div className="position-relative w-100">
        <span className="material-icons position-absolute top-50 start-0 translate-middle-y text-secondary" style={{ left: 16 }}>
          search
        </span>
        <input
          className="form-control ps-5 pe-3 py-2"
          placeholder="Search students by name, email, or ID..."
          type="text"
          style={{ minWidth: 0 }}
        />
      </div>
      <select className="form-select ms-3" style={{ minWidth: 160 }}>
        <option>All Courses</option>
        <option>Web Development</option>
        <option>Data Science</option>
        <option>UI/UX Design</option>
        <option>Mobile App Dev</option>
      </select>
    </div>
    <div className="d-flex align-items-center" style={{ gap: 16 }}>
      <button className="btn btn-primary d-flex align-items-center gap-2 fw-semibold">
        Add Student
      </button>
    </div>
  </header>
);

export default Header;
