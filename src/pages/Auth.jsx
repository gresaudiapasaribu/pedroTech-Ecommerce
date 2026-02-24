import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const { signup, user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signup(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (result.succes) {
      navigate("/");
    } else {
      setError(result.error);
    }
    console.log(result);
  }
  return (
    <div>
      <div className="page">
        <div className="container">
          <div className="auth-container">
            {user && <p>User logged in : {user.email}</p>}
            <button onClick={() => logout()}>Logout</button>
            <h1 className="page-title">
              {mode === "signup" ? "Sign Up" : "Login"}
            </h1>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="auth-form"
            >
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "password must be at least 6 character",
                    },
                    maxLength: {
                      value: 12,
                      message: "password must be at most 12 character",
                    },
                  })}
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-large">
                {mode === "signup" ? "Sign Up" : "Login"}
              </button>
            </form>
            <div className="auth-switch">
              {mode === "signup" ? (
                <p>
                  Already have an account?{" "}
                  <span className="auth-link" onClick={() => setMode("login")}>
                    Login
                  </span>{" "}
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <span className="auth-link" onClick={() => setMode("signup")}>
                    Sign Up
                  </span>{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
