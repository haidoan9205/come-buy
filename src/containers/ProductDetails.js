import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectedProduct,
  removeSelected,
  removeProduct,
  updateAProduct,
} from "../redux/actions/productsActions";
import { Button } from "@material-ui/core";
import UpdateDialog from "./UpdateDialog";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { ActionTypes } from "../redux/constants/action-types";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const ProductDetails = () => {
  const [user, loading, error] = useAuthState(auth);

  const code = useSelector((state) => state.allProducts.code);
  const removeCode = useSelector((state) => state.allProducts.removeCode);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://6257f7380c918296a48eaa4a.mockapi.io/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };
  const [titleForm, setTitle] = useState(title);
  const [priceForm, setPrice] = useState(price);
  const [descriptionForm, setDescription] = useState(description);
  const [imageForm, setImage] = useState(image);
  const [categoryForm, setCategory] = useState(category);
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
  const handleDelete = () => {
    dispatch(removeProduct(productId));
  };
  useEffect(() => {
    setTitle(title);
    setCategory(category);
    setDescription(description);
    setImage(image);
    setPrice(price);
  }, [title, description, category, image, price, product]);

  const handleUpdate = () => {
    dispatch(
      updateAProduct(
        productId,
        titleForm,
        priceForm,
        descriptionForm,
        imageForm,
        categoryForm
      )
    );
  };

  const [updateCode, setUpdateCode] = useState(code);

  useEffect(() => {
    if (loading) return;
    fetchUserName();
  }, [user, loading]);
  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    if (code === 200) {
      history.push("/");
      dispatch({
        type: ActionTypes.CREATE_CODE,
        payload: null,
      });
      dispatch({
        type: ActionTypes.UPDATE_PRODUCT,
        payload: null,
      });
    }
    return () => {
      dispatch(removeSelected());
    };
  }, [productId, code, removeCode]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div
                  className="ui vertical"
                  style={{ display: "inline" }}
                  tabIndex="0"
                >
                  {!name ? (
                    <div>

                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: "15px" }}
                        onClick={handleClickOpen}
                      >
                        Update Information
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleDelete}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </div>
                  )}

                  <UpdateDialog
                    open={open}
                    close={handleClose}
                    title={title}
                    price={price}
                    description={description}
                    image={image}
                    category={category}
                    confirm={handleUpdate}
                    handleChangeTitle={handleChangeTitle}
                    handleChangePrice={handleChangePrice}
                    handleChangeDescription={handleChangeDescription}
                    handleChangeImage={handleChangeImage}
                    handleChangeCategory={handleChangeCategory}
                  ></UpdateDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
