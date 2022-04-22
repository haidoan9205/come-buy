import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>Update Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={props.title}
            onChange={props.handleChangeTitle}
            fullWidth
            variant="standard"
            label="title"
          />
          <TextField
            label="price"
            autoFocus
            margin="dense"
            id="name"
            onChange={props.handleChangePrice}
            defaultValue={props.price}
            fullWidth
            variant="standard"
          />
          <TextField
          label="description"
            autoFocus
            margin="dense"
            onChange={props.handleChangeDescription}
            id="name"
            defaultValue={props.description}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            label="image"
            margin="dense"
            id="name"
            onChange={props.handleChangeImage}
            defaultValue={props.image}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            label="category"
            margin="dense"
            id="name"
            onChange={props.handleChangeCategory}
            defaultValue={props.category}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.confirm} variant="outlined" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default UpdateDialog;
