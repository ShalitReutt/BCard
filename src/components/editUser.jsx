import Input from "./common/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../utilities/toast";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import usersService from "../services/usersServices";

const EditUser = () => {
  const [serverError, setServerError] = useState("");
  const { user: loggedInUser } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      .matches(/^0/, "Invalid Israeli phone number")
      .required("Phone is required")
      .min(9, "Phone Number must be at least 9 numbers")
      .max(11, "Phone Number must be at most 11 numbers"),
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
        houseNumber: 0,
        zip: 0,
      },
    },
    validationSchema: validationSchema,
    async onSubmit(values) {
      try {
        const { ...body } = values;
        await usersService.updateUser(id, body);
        showSuccessToast("Edited Successfuly");
        navigate(-1);
      } catch (error) {
        setServerError(error.response.data);
        showErrorToast("Failed to Edit");
      }
    },
  });
  useEffect(() => {
    const getUserForEdit = async () => {
      try {
        const { data } = await usersService.getUserById(id);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserForEdit();
  }, [id]);

  useEffect(() => {
    if (!loggedInUser || !user) {
      return;
    }

    const { name, phone, image, address } = user;

    form.setValues({
      name: {
        first: name.first,
        middle: name.middle,
        last: name.last,
      },
      phone,
      image: {
        url: image.url,
        alt: image.url,
      },
      address: {
        state: address.state,
        country: address.country,
        city: address.city,
        street: address.street,
        houseNumber: address.houseNumber,
        zip: address.zip,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!loggedInUser) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="display-2 text-center">User setings</h1>
      <p className="text-center" style={{ fontSize: "3vmin" }}>
        Edit your Account information
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
            defaultValue={user?.name.first}
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
        </div>

        <div className="d-flex justify-content-evenly flex-wrap">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-success"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditUser;
