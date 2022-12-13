import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SignInUser } from "../services/Auth";

const SignIn = ({ setUser, toggleAuthenticated }) => {
  // variable
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [isShowPassword, toggleIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  // Function
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
      const payload = await SignInUser(formValues);
      setFormValues({
        email: "",
        password: ""
      });
      setUser(payload);
      toggleAuthenticated(true);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Render
  let passwordFieldRender = (
    <div>
      <label>Password</label>{" "}
      <input
        onChange={handleChange}
        value={formValues.password}
        name="password"
        type="password"
        required
      />
      <input
        className="signin-checkbox"
        onChange={handlePasswordToggle}
        value={isShowPassword}
        name="isShowPassword"
        type="checkbox"
      />
      <label className="signin-showpass">Show Password</label>
      <br />
    </div>
  );
  if (isShowPassword) {
    passwordFieldRender = (
      <div>
        <label>Password</label>{" "}
        <input
          onChange={handleChange}
          value={formValues.password}
          name="password"
          type="text"
          required
        />
        <input
          className="signin-checkbox"
          onChange={handlePasswordToggle}
          value={isShowPassword}
          name="isShowPassword"
          type="checkbox"
        />
        <label className="signin-showpass">Show Password</label>
        <br />
      </div>
    );
  }

  let errorMessageRender = <div></div>;
  if (errorMessage) {
    errorMessageRender = <div>{errorMessage}</div>;
  }

  let signInRender = (
    <div>
      <div className="signin-form">to your account here</div>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="signin-label">
          <label>Email </label>{" "}
          <input
            onChange={handleChange}
            value={formValues.email}
            name="email"
            type="email"
            placeholder="john.doe@email.com"
          />
        </div>
        <br />
        {passwordFieldRender}
        {errorMessageRender}
        <button className="login-button">Login</button>
      </form>
      <div className="signin-form">
        Don't have account?{" "}
        <button onClick={handleRegister} className="create-button">
          Create account
        </button>
      </div>
    </div>
  );
  let toRender = (
    <div className="signin-container">
      <div className="signin-form">Sign in</div>
      {signInRender}
    </div>
  );
  return toRender;
};

export default SignIn;
