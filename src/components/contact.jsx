import { useState } from "react";
import React from "react";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  subject: "",
  message: "",
  helpOptions: {
    design: false,
    development: false,
    consulting: false,
    other: false,
  },
};

export const Contact = (props) => {
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);  // New loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setState((prevState) => ({
        ...prevState,
        helpOptions: { ...prevState.helpOptions, [name]: checked },
      }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    const helpOptionsArray = Object.entries(state.helpOptions)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    try {
      const response = await axios.post('https://usermanagement-omega.vercel.app/mailer/send', {
          ...state,
          helpOptions: helpOptionsArray,
      });

      if (response.data.status === 'success') {
        setStatus("Email sent successfully");
        clearState();
      } else {
        setStatus("Failed to send email");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-control"
                    placeholder="Country"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>How can we help?</label>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="design"
                        checked={state.helpOptions.design}
                        onChange={handleChange}
                      />
                      Website Design
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="development"
                        checked={state.helpOptions.development}
                        onChange={handleChange}
                      />
                      Website Development
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="consulting"
                        checked={state.helpOptions.consulting}
                        onChange={handleChange}
                      />
                      Consulting
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="other"
                        checked={state.helpOptions.other}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                </div>
                {loading ? (
                  <button type="button" className="btn btn-custom btn-lg" disabled>
                    Sending...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                )}
                {status && <p>{status}</p>}
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Issaaf Kattan React Land Page Template. Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
