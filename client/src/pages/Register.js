import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterUser, SignInUser } from "../services/Auth";

const Register = ({ setUser, toggleAuthenticated }) => {
  // Variables
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isShowPassword, toggleIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  // Functions
  const handlePasswordToggle = (e) => {
    if (e.target.checked) {
      toggleIsShowPassword(true);
      setFormValues({ ...formValues, confirmPassword: "" });
    } else {
      toggleIsShowPassword(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const registerUser = await RegisterUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password
      });

      const payload = await SignInUser({
        email: formValues.email,
        password: formValues.password
      });
      setUser(payload);
      toggleAuthenticated(true);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      navigate("/");
    } catch (error) {
      if (error.response.data.msg == "Email already in use.") {
        setErrorMessage(error.response.data.msg);
      } else {
        throw error;
      }
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Renders
  let passwordMatchRender = <div></div>;
  if (formValues.password && formValues.confirmPassword) {
    if (formValues.password !== formValues.confirmPassword) {
      passwordMatchRender = <div>Password did not match!</div>;
    }
  }

  let passwordFieldRender = (
    <div>
      <div className="register-label">
        <label>Password </label>{" "}
        <input
          onChange={handleChange}
          value={formValues.password}
          name="password"
          type="password"
          required
        />
      </div>
      <div>
        <label className="register-showpass">
          <input
            onChange={handlePasswordToggle}
            value={isShowPassword}
            name="isShowPassword"
            type="checkbox"
          />
          Show Password
        </label>
      </div>
      <br />
      <div className="register-label">
        <label>Confirm Password </label>{" "}
        <input
          onChange={handleChange}
          value={formValues.confirmPassword}
          name="confirmPassword"
          type="password"
          required
        />{" "}
        <br />
      </div>
      {passwordMatchRender} <br />
    </div>
  );
  if (isShowPassword) {
    passwordFieldRender = (
      <div>
        <div className="register-label">
          <label>Password </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.password}
            name="password"
            type="text"
            required
          />
        </div>
        <div>
          <label className="register-showpass">
            <input
              className="register-checkbox"
              onChange={handlePasswordToggle}
              value={isShowPassword}
              name="isShowPassword"
              type="checkbox"
            />
            Show Password
          </label>
        </div>
        <br />
      </div>
    );
  }

  let registerButtonRender = (
    <button disabled className="register-button">
      Register
    </button>
  );
  if (
    formValues.firstName &&
    formValues.lastName &&
    formValues.email &&
    formValues.password
  ) {
    if (isShowPassword) {
      registerButtonRender = (
        <button className="register-button">Register</button>
      );
    } else if (formValues.password === formValues.confirmPassword) {
      registerButtonRender = (
        <button className="register-confirm">Register</button>
      );
    }
  }

  let errorMessageRender = <div></div>;
  if (errorMessage) {
    errorMessageRender = <div>{errorMessage}</div>;
  }

  let registerFormRender = (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="register-label">
          <label>First Name </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.firstName}
            name="firstName"
            type="text"
            placeholder="John"
            required
          />{" "}
        </div>
        <br />
        <div className="register-label">
          <label>Last Name </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.lastName}
            name="lastName"
            type="text"
            placeholder="Doe"
            required
          />{" "}
        </div>
        <br />
        <div className="register-label">
          <label>Email </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.email}
            name="email"
            type="email"
            placeholder="john.doe@email.com"
            required
          />
        </div>
        <br />
        {passwordFieldRender}
        {errorMessageRender}
        {registerButtonRender}
      </form>
    </div>
  );
  let toRender = (
    <div className="register-container">
      <div className="register-header">Create your account below</div>
      {registerFormRender}
    </div>
  );
  return toRender;
};
export default Register;
