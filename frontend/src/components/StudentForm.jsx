import React, { useState } from "react";
import { fetchStudents } from "../services/studentService";
import { Phone } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  course: "",
  status: "Active",
  sendWelcome: false,
};

const validate = async (values, allStudents) => {
  const errors = {};
  if (!/^([A-Za-z]+\s[A-Za-z]+.*)$/.test(values.name)) {
    errors.name = "Please enter a complete full name";
  }
  // Stricter email validation
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  } else if (allStudents.some(s => s.email === values.email)) {
    errors.email = "This email address already exists";
  }
  if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be exactly 10 digits";
  } else if (allStudents.some(s => s.phone === values.phone)) {
    errors.phone = "This phone number already exists";
  }
  return errors;
};

const StudentForm = ({ show, onClose, onSubmit, courses = [] }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);

  const filteredCourseSuggestions = values.course
    ? courses.filter(c => c.toLowerCase().includes(values.course.toLowerCase()) && c.toLowerCase() !== values.course.toLowerCase())
    : [];

  const handleCourseSuggestionClick = (course) => {
    setValues(prev => ({ ...prev, course }));
    setShowCourseSuggestions(false);
  };

  React.useEffect(() => {
    if (show) {
      fetchStudents().then(setAllStudents);
    }
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = await validate(values, allStudents);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      await onSubmit?.(values);
      setSubmitting(false);
      setValues(initialState);
      onClose?.();
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(30,41,59,0.4)", backdropFilter: "blur(2px)", zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-bottom-0 pb-0">
            <div>
              <h5 className="modal-title fw-bold">Add New Student</h5>
              <div className="text-muted small">Enter information to enroll a new student in the system.</div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} className="modal-body pt-3 pb-0 px-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className={`form-control${errors.name ? " is-invalid" : ""}`}
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={values.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.name && <div className="invalid-feedback d-flex align-items-center gap-1"><span className="material-icons" style={{ fontSize: 16 }}>error_outline</span> {errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className={`form-control${errors.email ? " is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              {errors.email && <div className="invalid-feedback d-flex align-items-center gap-1"> {errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text bg-white text-muted"><Phone size={18} /></span>
                <input
                  type="tel"
                  className={`form-control${errors.phone ? " is-invalid" : ""}`}
                  id="phone"
                  name="phone"
                  placeholder="0700000000"
                  value={values.phone}
                  onChange={handleChange}
                  autoComplete="off"
                />
              {errors.phone && <div className="invalid-feedback d-flex align-items-center gap-1">{errors.phone}</div>}
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-6 position-relative">
                <label htmlFor="course" className="form-label fw-semibold">Assigned Course</label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  name="course"
                  autoComplete="off"
                  value={values.course}
                  onChange={handleChange}
                  onFocus={() => setShowCourseSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 100)}
                  placeholder="Type or select a course..."
                />
                {showCourseSuggestions && values.course && filteredCourseSuggestions.length > 0 && (
                  <div className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 10, top: '100%' }}>
                    {filteredCourseSuggestions.map((c) => (
                      <button
                        type="button"
                        key={c}
                        className="list-group-item list-group-item-action"
                        onMouseDown={() => handleCourseSuggestionClick(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label htmlFor="status" className="form-label fw-semibold">Enrollment Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-0 px-0 pb-3 pt-0 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={submitting}>
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
