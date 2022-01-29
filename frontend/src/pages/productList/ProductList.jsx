import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, ManageSearch, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import "./productList.css";

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [delItem, setDelItem] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    let getBooks = [];
    let idCounter = 0;
    const res = await axios.get("/books");

    //Fixed => Uncaught Error: MUI: The data grid component requires all rows to have a unique id property.
    res.data.books.map((book) => {
      idCounter += 1;
      return getBooks.push({
        id: idCounter,
        _id: book._id,
        name: book.name,
        author: book.author,
        category: book.category,
        publisher: book.publisher,
        description: book.description,
        pageCount: book.pageCount,
        isbn: book.isbn,
        price: book.price,
        quantity: book.quantity,
      });
    });
    setBooks(getBooks);
  };

  const handleClickOpen = (itemId) => {
    setOpen(true);
    setDelItem(itemId);
  };

  const handleClose = () => {
    setOpen(false);
    setDelItem("");
  };

  const handleDelete = async () => {
    await axios.delete("/books/" + delItem).then(() => {
      fetchBooks();
    });
    setOpen(false);
    setDelItem("");
  };

  const alertDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you wish to delete this book?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );

  const columns = [
    { field: "isbn", headerName: "ISBN", width: 120 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    { field: "author", headerName: "Author", width: 170 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "sales",
      headerName: "Sales",
      width: 100,
    },

    {
      field: "price",
      headerName: "Price",
      width: 100,
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="actionContainer">
            <Link to={"/product/" + params.row._id}>
              <ManageSearch className="productListEditBtn" />
            </Link>

            <DeleteOutline
              className="productListDeleteBtn"
              onClick={() => handleClickOpen(params.row._id)} //handleDelete(params.row._id)
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Products</h1>

        <FormControl className="searchBox" fullWidth>
          <div className="searchBoxContainer">
            <TextField
              id="input-with-sx"
              label="Search Something..."
              variant="standard"
            />
            <Search />
          </div>
        </FormControl>

        <Link to="/createProduct">
          <button className="productAddButton">Create Product</button>
        </Link>
      </div>
      <div className="productListTable">
        {alertDialog}
        <DataGrid
          rows={books}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
