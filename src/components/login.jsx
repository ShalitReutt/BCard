import Input from "./common/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast } from "../utilities/toast";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

const Login = ({ redirect }) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { user, login } = useAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .min(5),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters long")
      .max(20, "Password must be at most 20 characters long")
      .test(
        "uppercase",
        "Password must contain at least one uppercase letter",
        (value) => /[A-Z]/.test(value || "")
      )
      .test(
        "lowercase",
        "Password must contain at least one lowercase letter",
        (value) => /[a-z]/.test(value || "")
      )
      .test("number", "Password must contain at least one number", (value) =>
        /\d/.test(value || "")
      )
      .test(
        "special",
        "Password must contain at least one special character",
        (value) => /[!@#$%^&*-]/.test(value || "")
      )
      .required("Password is required"),
  });

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    async onSubmit(values) {
      try {
        await login(values);
        if (redirect) {
          navigate(redirect);
        }
      } catch (error) {
        if (error.response?.status === 400) {
          setServerError(error.response.data);
          showErrorToast("Failed to Log In");
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="display-2 text-center">Log In</h1>
      <p className="text-center" style={{ fontSize: "3vmin" }}>
        Sign In to your account
      </p>
      <hr />
      <form onSubmit={form.handleSubmit}>
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="d-flex justify-content-evenly flex-wrap">
          <Input
            {...form.getFieldProps("email")}
            label={"Email"}
            type={"email"}
            required
            error={form.touched.email && form.errors.email}
          />
          <Input
            {...form.getFieldProps("password")}
            label={"password"}
            type={"password"}
            required
            error={form.touched.password && form.errors.password}
          />
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-success"
          >
            Log In
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
