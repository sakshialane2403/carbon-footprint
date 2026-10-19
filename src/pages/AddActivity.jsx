import Sidebar from "../components/Sidebar";
import "../css/AddActivity.css";

function AddActivity() {
  return (
    <div className="activity-page">

      <Sidebar />

      <div className="activity-content">

        <h1>Add Daily Activity 🌿</h1>

        <p>Record your daily activities to calculate your carbon footprint.</p>

        <form className="activity-form">

          <div className="form-group">
            <label>Activity Type</label>

            <select>
              <option>Select Activity</option>
              <option>Transportation</option>
              <option>Electricity</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Waste</option>
              
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input type="number" placeholder="Enter quantity" />
          </div>

          <div className="form-group">
            <label>Unit</label>

            <select>
              <option>Select Unit</option>
              <option>km</option>
              <option>kWh</option>
              <option>kg</option>
              <option>liters</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>

            <textarea
              rows="5"
              placeholder="Write additional notes..."
            ></textarea>
          </div>

          <button type="submit">
            Save Activity
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddActivity;