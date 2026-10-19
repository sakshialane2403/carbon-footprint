import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { registerUser } from "../services/authService.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    fullName: "", username: "", dob: "", age: "", gender: "", email: "", phone: "", altPhone: "",
    house: "", street: "", area: "", landmark: "", city: "", state: "", country: "", pincode: "",
    idType: "", idNumber: "", governmentId: null, passportPhoto: null,
    occupation: "", vehicle: "None", travel: "", password: "", confirmPassword: "",
    agree: false, declaration: false, showPassword: false, showConfirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value }));
  };

  const validateStep = () => {
    if (step === 1 && (!formData.fullName || !formData.username || !formData.dob || !formData.age || !formData.gender || !formData.email || !formData.phone)) {
      alert("Please fill all required personal details including username."); return false;
    }
    if (step === 1 && Number(formData.age) < 18) {
      alert("Age must be at least 18."); return false;
    }
    if (step === 2 && (!formData.house || !formData.street || !formData.area || !formData.city || !formData.state || !formData.country || !formData.pincode)) {
      alert("Please complete address details."); return false;
    }
    if (step === 3 && (!formData.idType || !formData.idNumber)) {
      alert("Please complete ID details."); return false;
    }
    if (step === 4) {
      if (!formData.occupation || !formData.travel || !formData.password || !formData.confirmPassword) {
        alert("Please complete Carbon Information."); return false;
      }
      if (formData.password.length < 8 || formData.password !== formData.confirmPassword) {
        alert("Check password (min 8, must match)."); return false;
      }
      if (!formData.agree || !formData.declaration) {
        alert("Please accept all declarations."); return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    const names = (formData.fullName || "").trim().split(/\s+/);
    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("desiredUsername", (formData.username || formData.email || "user").split("@")[0].toLowerCase());
    fd.append("temporaryPassword", formData.password);
    fd.append("firstName", names[0] || formData.fullName);
    fd.append("lastName", names.slice(1).join(" ") || names[0] || "User");
    fd.append("age", formData.age);
    fd.append("gender", formData.gender);
    fd.append("dateOfBirth", formData.dob);
    fd.append("mobileNumber", formData.phone);
    fd.append("phoneNumber", formData.altPhone || formData.phone);
    fd.append("street", formData.street);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("country", formData.country);
    fd.append("pinCode", formData.pincode);
    fd.append("documentType", formData.idType);
    fd.append("documentNumber", formData.idNumber);
    if (formData.governmentId) fd.append("documentFile", formData.governmentId);
    try {
      const data = await registerUser(fd);
      const uname = data.username || formData.username;
      localStorage.setItem("cft_last_username", uname);
      navigate("/register-success", { state: { username: uname, email: formData.email } });
    } catch (err) {
      const d = err.response?.data;
      alert(d?.message || (typeof d === "string" ? d : "Registration failed"));
    }
  };

  return (
    <section className="register">
      <div className="register-right">
        <h2>Create Account</h2>
        <p>After you register, save your username. Admin must approve before you can login.</p>
        {msg && <p className="ok">{msg}</p>}
        <div className="stepper">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={step >= n ? "step active" : "step"}><span>{n}</span></div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-grid">
              <div className="form-group"><label>Full Name</label><input name="fullName" value={formData.fullName} onChange={handleChange} /></div>
              <div className="form-group"><label>Username *</label><input name="username" value={formData.username} onChange={handleChange} placeholder="You will login with this" /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
              <div className="form-group"><label>Age</label><input type="number" name="age" value={formData.age} onChange={handleChange} /></div>
              <div className="form-group"><label>Gender</label><select name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
              <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} /></div>
            </div>
          )}
          {step === 2 && (
            <div className="form-grid">
              {["house", "street", "area", "landmark", "city", "state", "country", "pincode"].map((k) => (
                <div className="form-group" key={k}><label>{k}</label><input name={k} value={formData[k]} onChange={handleChange} /></div>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="form-grid">
              <div className="form-group"><label>ID Type</label><select name="idType" value={formData.idType} onChange={handleChange}><option value="">Select</option><option>Aadhaar Card</option><option>PAN Card</option><option>Passport</option></select></div>
              <div className="form-group"><label>ID Number</label><input name="idNumber" value={formData.idNumber} onChange={handleChange} /></div>
              <div className="form-group"><label>Upload ID</label><input type="file" name="governmentId" onChange={handleChange} /></div>
              <div className="form-group"><label>Photo</label><input type="file" name="passportPhoto" onChange={handleChange} /></div>
            </div>
          )}
          {step === 4 && (
            <>
              <div className="form-grid">
                <div className="form-group"><label>Occupation</label><input name="occupation" value={formData.occupation} onChange={handleChange} /></div>
                <div className="form-group"><label>Vehicle</label><select name="vehicle" value={formData.vehicle} onChange={handleChange}><option>None</option><option>Bike</option><option>Car</option></select></div>
                <div className="form-group"><label>Daily Travel KM</label><input type="number" name="travel" value={formData.travel} onChange={handleChange} /></div>
                <div className="form-group"><label>Password</label>
                  <div className="password-wrap">
                    <input type={formData.showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
                    <button type="button" className="eye-btn" onClick={() => setFormData((p) => ({ ...p, showPassword: !p.showPassword }))} aria-label="Toggle password">{formData.showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                </div>
                <div className="form-group"><label>Confirm Password</label>
                  <div className="password-wrap">
                    <input type={formData.showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    <button type="button" className="eye-btn" onClick={() => setFormData((p) => ({ ...p, showConfirm: !p.showConfirm }))} aria-label="Toggle confirm password">{formData.showConfirm ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                </div>
              </div>
              <div className="checkbox-group">
                <label><input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} /> Information is true</label>
                <label><input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} /> I agree to Terms</label>
              </div>
            </>
          )}
          <div className="step-buttons">
            {step > 1 && <button type="button" className="prev-btn" onClick={() => setStep(step - 1)}>← Previous</button>}
            {step < 4 && <button type="button" className="next-btn" onClick={() => validateStep() && setStep(step + 1)}>Next →</button>}
            {step === 4 && <button type="submit" className="register-btn">Register</button>}
          </div>
        </form>
        <p className="login-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}

export default Register;
