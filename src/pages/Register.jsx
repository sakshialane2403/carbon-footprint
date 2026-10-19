import { useState } from "react";
import "../css/Register.css";
import registerImg from "../assets/register.png";
import { Link } from "react-router-dom";

function Register() {
  const [step, setStep] = useState(1);

  return (
    <section className="register">

      {/* Left Side */}
      <div className="register-left">
        <img src={registerImg} alt="Register" />
      </div>

      {/* Right Side */}
      <div className="register-right">

        <h2>Create Your Account 🌱</h2>

        <p>
          Join CarbonTrack and start your sustainability journey today.
        </p>

        {/* Stepper */}
        <div className="stepper">

          <div className={step >= 1 ? "step active" : "step"}>
            <span>1</span>
            <p>Personal</p>
          </div>

          <div className={step >= 2 ? "step active" : "step"}>
            <span>2</span>
            <p>Address</p>
          </div>

          <div className={step >= 3 ? "step active" : "step"}>
            <span>3</span>
            <p>ID Proof</p>
          </div>

          <div className={step >= 4 ? "step active" : "step"}>
            <span>4</span>
            <p>Carbon</p>
          </div>

        </div>

       
        <form>

{step === 1 && (

<>

<h3>Personal Information</h3>

<div className="form-grid">

  <div className="form-group">
    <label>Full Name</label>
    <input
      type="text"
      placeholder="Enter your full name"
    />
  </div>

  <div className="form-group">
    <label>Date of Birth</label>
    <input type="date" />
  </div>

  <div className="form-group">
    <label>Age</label>
    <input
      type="number"
      placeholder="Enter your age"
    />
  </div>

  <div className="form-group">
    <label>Gender</label>
    <select>
      <option>Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>

  <div className="form-group">
    <label>Email Address</label>
    <input
      type="email"
      placeholder="Enter your email"
    />
  </div>

  <div className="form-group">
    <label>Phone Number</label>
    <input
      type="tel"
      placeholder="Enter your phone number"
    />
  </div>

  <div className="form-group full-width">
    <label>Alternate Phone Number</label>
    <input
      type="tel"
      placeholder="Enter alternate phone number"
    />
  </div>

</div>

<div className="step-buttons">

<button
type="button"
className="next-btn"
onClick={() => setStep(2)}
>
Next →
</button>

</div>

</>

)}

{step === 2 && (

<>

<h3>Address Details</h3>

<div className="form-grid">

  <div className="form-group">
    <label>House / Flat Number</label>
    <input
      type="text"
      placeholder="House / Flat Number"
    />
  </div>

  <div className="form-group">
    <label>Street</label>
    <input
      type="text"
      placeholder="Street"
    />
  </div>

  <div className="form-group">
    <label>Area</label>
    <input
      type="text"
      placeholder="Area"
    />
  </div>

  <div className="form-group">
    <label>Landmark</label>
    <input
      type="text"
      placeholder="Landmark"
    />
  </div>

  <div className="form-group">
    <label>City</label>
    <input
      type="text"
      placeholder="City"
    />
  </div>

  <div className="form-group">
    <label>State</label>
    <input
      type="text"
      placeholder="State"
    />
  </div>

  <div className="form-group">
    <label>Country</label>
    <input
      type="text"
      placeholder="Country"
    />
  </div>

  <div className="form-group">
    <label>PIN Code</label>
    <input
      type="text"
      placeholder="PIN Code"
    />
  </div>

</div>

<div className="step-buttons">

  <button
    type="button"
    className="prev-btn"
    onClick={() => setStep(1)}
  >
    ← Previous
  </button>

  <button
    type="button"
    className="next-btn"
    onClick={() => setStep(3)}
  >
    Next →
  </button>

</div>

</>

)}
{step === 3 && (

<>

<h3>Government ID & Profile</h3>

<div className="form-grid">

  <div className="form-group">
    <label>Government ID Type</label>
    <select>
      <option>Select ID</option>
      <option>Aadhaar Card</option>
      <option>PAN Card</option>
      <option>Passport</option>
      <option>Driving License</option>
      <option>Voter ID</option>
    </select>
  </div>

  <div className="form-group">
    <label>Government ID Number</label>
    <input
      type="text"
      placeholder="Enter Government ID Number"
    />
  </div>

  <div className="form-group">
    <label>Upload Government ID</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
    />
  </div>

  <div className="form-group">
    <label>Upload Passport Size Photo</label>
    <input
      type="file"
      accept="image/*"
    />
  </div>

</div>

<div className="step-buttons">

  <button
    type="button"
    className="prev-btn"
    onClick={() => setStep(2)}
  >
    ← Previous
  </button>

  <button
    type="button"
    className="next-btn"
    onClick={() => setStep(4)}
  >
    Next →
  </button>

</div>

</>

)}
{step === 4 && (

<>

<h3>Carbon Information</h3>

<div className="form-grid">

  <div className="form-group">
    <label>Occupation</label>
    <input
      type="text"
      placeholder="Enter your occupation"
    />
  </div>

  <div className="form-group">
    <label>Vehicle Type</label>
    <select>
      <option>None</option>
      <option>Bike</option>
      <option>Car</option>
      <option>Electric Vehicle</option>
      <option>Public Transport</option>
    </select>
  </div>

  <div className="form-group">
    <label>Average Daily Travel (KM)</label>
    <input
      type="number"
      placeholder="Enter average travel"
    />
  </div>

  <div className="form-group">
    <label>Password</label>
    <input
      type="password"
      placeholder="Create Password"
    />
  </div>

  <div className="form-group full-width">
    <label>Confirm Password</label>
    <input
      type="password"
      placeholder="Confirm Password"
    />
  </div>

</div>

<div className="checkbox-group">

  <label>
    <input type="checkbox" />
    I hereby declare that all the information provided is true and correct.
  </label>

  <label>
    <input type="checkbox" />
    I agree to the Terms & Conditions.
  </label>

</div>

<div className="step-buttons">

  <button
    type="button"
    className="prev-btn"
    onClick={() => setStep(3)}
  >
    ← Previous
  </button>

  <div>

    <button
      type="reset"
      className="reset-btn"
    >
      Reset
    </button>

    <button
      type="submit"
      className="register-btn"
    >
      Register
    </button>

  </div>

</div>

</>

)}

</form>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </section>
  );
}

export default Register;