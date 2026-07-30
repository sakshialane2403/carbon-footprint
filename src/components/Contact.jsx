import "../css/Contact.css";
import contactImage from "../assets/contact.png";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="contact-left">

        <span className="contact-tag">CONTACT US</span>

        <h2>Let's Build a Greener Future Together</h2>

        <p>
          Have questions about CarbonTrack? We'd love to hear from you.
          Fill out the form and our team will get back to you as soon as possible.
        </p>

        <div className="contact-info">

          <div className="info-box">
            <FaEnvelope className="info-icon"/>
            <div>
              <h4>Email</h4>
              <p>support@carbontrack.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="info-icon"/>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt className="info-icon"/>
            <div>
              <h4>Location</h4>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

        </div>

      </div>

      <div className="contact-right">

        <img src={contactImage} alt="Contact"/>

        <form>

          <input type="text" placeholder="Your Name"/>

          <input type="email" placeholder="Email Address"/>

          <input type="text" placeholder="Subject"/>

          <textarea
            rows="5"
            placeholder="Write your message..."
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;