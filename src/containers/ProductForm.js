import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createNewAProduct } from "../redux/actions/productsActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummy = {
  title: "test product",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
};

const ProductForm = () => {
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return (
      <div
        style={{ color: "red", fontStyle: "italic" }}
        className="invalid-feedback"
      >
        {error}
      </div>
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [product, setProduct] = useState(dummy);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    title: title,
    price: price,
    description: description,
    image: image,
    category: category,
  });

  const addCode = useSelector((state) => state.allProducts.code);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeImage = (event) => {
    setImage(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setNewProduct({
      title,
      price,
      description,
      image,
      category,
    });
  }, [title, price, description, image, category]);

  const handleSubmitForm = async (event) => {
    setNewProduct({
      title,
      price,
      description,
      image,
      category,
    });
    setProduct(newProduct);
    dispatch(createNewAProduct(title, price, description, image, category));
  };

  return (
    <Container style={{ marginTop: "100px" }} maxWidth="sm">
      <div className="header" style={{ textAlign: "center" }}>
        <h1>Add a new product</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="Title"
          required
          value={title}
          id="standard-basic"
          label="title"
          {...register("Title", { required: true, maxLength: 20 })}
          onChange={handleChangeTitle}
        />
        {errors.Title &&
          errors.Title.type === "required" &&
          errorMessage(required)}
        {errors.Title &&
          errors.Title.type === "maxLength" &&
          errorMessage(maxLength)}
        <TextField
          required
          name="Price"
          value={price}
          id="standard-basic"
          label="price"
          {...register("Price", { required: true, pattern: /^\d+$/ })}
          onChange={handleChangePrice}
        />
        {errors.Price &&
          errors.Price.type === "required" &&
          errorMessage(required)}
          {errors.Price &&
              errorMessage("Price is an number")}
        <TextField
          required
          name="Description"
          value={description}
          id="standard-basic"
          label="description"
          {...register("Description", { required: true, maxLength: 30 })}
          onChange={handleChangeDescription}
        />
        {errors.Description &&
          errors.Description.type === "required" &&
          errorMessage(required)}
        {errors.Description &&
          errors.Description.type === "maxLength" &&
          errorMessage(maxLength)}
        <TextField
          required
          value={image}
          name="Image"
          id="standard-basic"
          label="image"
          {...register("Image", {
            required: true,
            pattern: /(https?:\/\/[^\s]+)/g,
          })}
          onChange={handleChangeImage}
        />
        {errors.Image &&
          errors.Image.type === "required" &&
          errorMessage(required)}
          {errors.Image &&
              errorMessage("Please put an image link")}
        <TextField
          required
          value={category}
          name="Category"
          id="standard-basic"
          label="category"
          {...register("Category", { required: true, maxLength: 20 })}
          onChange={handleChangeCategory}
        />
        {errors.Category &&
          errors.Category.type === "required" &&
          errorMessage(required)}
        {errors.Category &&
          errors.Category.type === "maxLength" &&
          errorMessage(maxLength)}
        <Button
          type="submit"
          variant="contained"
          style={{
            maxHeight: "80%",
            maxWidth: "30%",
            alignSelf: "center",
            marginTop: "10px",
          }}
          color="primary"
        >
          Add+
        </Button>
      </form>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
};

export default ProductForm;
