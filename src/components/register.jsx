import Input from "./common/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../utilities/toast";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

const Register = ({ redirect }) => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { register, user, login } = useAuth();
  const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
      first: Yup.string()
        .min(2, "First Name must be at least 2 characters")
        .max(256, "First name must be at most 256 characters")
        .required("First Name is required"),
      middle: Yup.string()
        .min(2, "Middle Name must be at least 2 characters")
        .max(256, "Middle name must be at most 256 characters"),
      last: Yup.string()
        .min(2, "Last Name must be at least 2 characters")
        .max(256, "Last name must be at most 256 characters")
        .required("Last Name is required"),
    }),
    phone: Yup.string()
      .matches(/^0[2-9]/, "Invalid Israeli phone number")
      .required("Phone is required")
      .min(9, "Phone Number must be at least 9 numbers")
      .max(11, "Phone Number must be at most 11 numbers"),
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
    image: Yup.object().shape({
      url: Yup.string()
        .url("Invalid URL")
        .min(14, "URL must be at least 14 characters"),
      alt: Yup.string().min(2).max(256),
    }),
    address: Yup.object().shape({
      state: Yup.string().min(2).max(256),
      country: Yup.string().min(2).max(256).required("Country is required"),
      city: Yup.string().min(2).max(256).required("City is required"),
      street: Yup.string().min(2).max(256).required("Street is required"),
      houseNumber: Yup.number()
        .min(2)
        .max(256)
        .required("House Number is required"),
      zip: Yup.number()
        .integer("Zip Code must be an integer")
        .min(2, "Zip Code must be at least 2 numbers")
        .max(256, "Zip Code must be at most 256 numbers")
        .required("Zip Code is required"),
    }),
    isBusiness: Yup.boolean().required(),
  });

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: null,
        zip: null,
      },
      isBusiness: false,
    },
    validationSchema: validationSchema,
    async onSubmit(values) {
      try {
        await register(values);
        login({ email: values.email, password: values.password });

        if (redirect) {
          navigate(redirect);
          showSuccessToast("Registrated Successfuly");
        }
      } catch (error) {
        setServerError(error.response.data);
        showErrorToast("Registration Failed");
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="display-2 text-center">Sign Up</h1>
      <p style={{ fontSize: "3vmin" }} className="text-center">
        Sign up a new account
      </p>
      <hr />
      <form onSubmit={form.handleSubmit}>
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="d-flex justify-content-evenly flex-wrap">
          <Input
            {...form.getFieldProps("name.first")}
            label={"First Name"}
            type={"text"}
            required
            error={form.touched.name?.first && form.errors.name?.first}
          />
          <Input
            {...form.getFieldProps("name.middle")}
            label={"Middle Name"}
            type={"text"}
            error={form.touched.name?.middle && form.errors.name?.middle}
          />
          <Input
            {...form.getFieldProps("name.last")}
            label={"Last Name"}
            type={"text"}
            required
            error={form.touched.name?.last && form.errors.name?.last}
          />
          <Input
            {...form.getFieldProps("phone")}
            label={"Phone"}
            type={"phone"}
            required
            error={form.touched.phone && form.errors.phone}
          />
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
          <Input
            {...form.getFieldProps("image.url")}
            label={"Image Url"}
            type={"text"}
            error={form.touched.image?.url && form.errors.image?.url}
          />
          <Input
            {...form.getFieldProps("image.alt")}
            label={"Image Alt"}
            type={"text"}
            error={form.touched.image?.alt && form.errors.image?.alt}
          />
          <Input
            {...form.getFieldProps("address.state")}
            label={"State"}
            type={"text"}
            error={form.touched.address?.state && form.errors.address?.state}
          />
          <Input
            {...form.getFieldProps("address.country")}
            label={"Country"}
            type={"text"}
            required
            error={
              form.touched.address?.country && form.errors.address?.country
            }
          />
          <Input
            {...form.getFieldProps("address.city")}
            label={"City"}
            type={"text"}
            required
            error={form.touched.address?.city && form.errors.address?.city}
          />
          <Input
            {...form.getFieldProps("address.street")}
            label={"Street"}
            type={"text"}
            required
            error={form.touched.address?.street && form.errors.address?.street}
          />
          <Input
            {...form.getFieldProps("address.houseNumber")}
            label={"House Number"}
            type={"number"}
            required
            error={
              form.touched.address?.houseNumber &&
              form.errors.address?.houseNumber
            }
          />
          <Input
            {...form.getFieldProps("address.zip")}
            label={"Zip"}
            type={"number"}
            required
            error={form.touched.address?.zip && form.errors.address?.zip}
          />

          <label
            style={{
              width: "35vmin",
              marginTop: "3.5vmin",
              paddingLeft: "3vmin",
              fontSize: "larger",
            }}
          >
            <input
              {...form.getFieldProps("isBusiness")}
              label=""
              type="checkbox"
              style={{ marginRight: "1vmin" }}
              name="isBusiness"
            />
            Sign-up as Buisness Account
          </label>
        </div>

        <div className="d-flex justify-content-evenly flex-wrap">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-success"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
