import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterUser, SignInUser } from "../services/Auth";

const Register = ({ setUser, toggleAuthenticated }) => {
  // Variables
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isShowPassword, toggleIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  // Functions
  const handlePasswordToggle = (e) => {
    if (e.target.checked) {
      toggleIsShowPassword(true);
    } else {
      toggleIsShowPassword(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    setErrorMessage("");
    try {
      const registerUser = await RegisterUser({
        name: formValues.name,
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
        name: "",
        email: "",
        password: ""
      });
      navigate("/");
    } catch (error) {
      console.log(error);
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
  if (formValues.name && formValues.email && formValues.password) {
    registerButtonRender = (
      <button className="register-button">Register</button>
    );
  }

  let errorMessageRender = <div></div>;
  if (errorMessage) {
    errorMessageRender = <div>{errorMessage}</div>;
  }

  let registerFormRender = (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="register-label">
          <label>Name </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.name}
            name="name"
            type="text"
            placeholder="John Doe"
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
      <div className="register-header">New account</div>
      {registerFormRender}
    </div>
  );
  return toRender;
};
export default Register;
