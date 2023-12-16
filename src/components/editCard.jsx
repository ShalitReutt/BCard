import Input from "./common/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../utilities/toast";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";
import cardsService from "../services/cardService";
import { useCard } from "../hooks/useCard";

const EditCard = () => {
  const { user } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { card } = useCard(id);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Title must be at least 2 characters long")
      .max(256, "Title must be at most 256 characters long")
      .required("Title is required"),
    subtitle: Yup.string()
      .min(2, "Subtitle must be at least 2 characters long")
      .max(256, "Subtitle must be at most 256 characters long")
      .required("Subtitle is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters long")
      .max(1024, "Description must be at most 1024 characters long")
      .required("Description is required"),
    phone: Yup.string()
      .matches(/^0[2-9]/, "Invalid Israeli phone number")
      .required("Phone is required")
      .min(9, "Phone Number must be at least 9 numbers")
      .max(11, "Phone Number must be at most 11 numbers"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .min(5),
    web: Yup.string()
      .url("Invalid URL")
      .min(14, "URL must be at least 14 characters"),
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
        .min(1)
        .max(256)
        .required("House Number is required"),
      zip: Yup.number().required("Zip Code is required"),
    }),
  });

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
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
        await cardsService.updateCard(card._id, body);
        navigate(-1);
        showSuccessToast("Card Edited Successfuly");
      } catch (error) {
        if (error.response?.status === 400) {
          setServerError(error.response.data);
          showErrorToast("Failed to Edit card");
        }
      }
    },
  });

  useEffect(() => {
    if (!card) {
      return;
    }

    const { title, subtitle, description, phone, email, web, image, address } =
      card;

    form.setValues({
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image: {
        url: image.url,
        alt: image.alt,
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
  }, [card]);

  if (!(user?.isBusiness || user?.isAdmin)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="display-2 text-center">Edit Card</h1>
      <p style={{ fontSize: "3vmin" }} className="text-center">
        Edit a buisness card
      </p>
      <hr />
      <form onSubmit={form.handleSubmit}>
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="d-flex justify-content-evenly flex-wrap">
          <Input
            {...form.getFieldProps("title")}
            label={"Title"}
            type={"text"}
            required
            error={form.touched.title && form.errors.title}
          />
          <Input
            {...form.getFieldProps("subtitle")}
            label={"Subtitle"}
            type={"text"}
            required
            error={form.touched.subtitle && form.errors.subtitle}
          />
          <Input
            {...form.getFieldProps("description")}
            label={"Description"}
            type={"text"}
            required
            error={form.touched.description && form.errors.description}
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
            Edit Card
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCard;
