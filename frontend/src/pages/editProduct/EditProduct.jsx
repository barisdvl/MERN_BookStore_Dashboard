import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./editProduct.css";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get("/books/" + path);
      setBook(res.data.book);
    };
    fetchBook();
  }, [path]);

  //İmage file preview function
  const loadFile = (event) => {
    event.preventDefault();
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  //submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const imgFile =
      event.target.img.files[0] != null ? event.target.img.files[0] : null;
    let formData = new FormData();
    formData.append("isbn", event.target.isbn.value);
    formData.append("name", event.target.name.value);
    formData.append("author", event.target.author.value);
    formData.append("publisher", event.target.publisher.value);
    formData.append("category", event.target.category.value);
    formData.append("price", event.target.price.value);
    formData.append("stocks", event.target.stocks.value);
    formData.append("sales", event.target.sales.value);
    formData.append("totalQuantity", event.target.totalQuantity.value);
    formData.append("img", imgFile);
    formData.append("description", event.target.description.value);

    await axios.put("/books/" + book._id, formData, {}).then(() => {
      navigate("/product/" + book._id);
    });
  };

  return (
    <div className="editProduct">
      <h1 className="editProductTitle">Edit Product</h1>
      <form id="editForm" className="editProductForm" onSubmit={handleSubmit}>
        <div className="editProductTop">
          <div className="editProductTopLeft">
            <div className="editProductItem">
              <label>ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                defaultValue={book.isbn}
              />
            </div>
            <div className="editProductItem">
              <label>Name</label>
              <input type="text" name="name" defaultValue={book.name} />
            </div>
            <div className="editProductItem">
              <label>Author</label>
              <input type="text" name="author" defaultValue={book.author} />
            </div>
            <div className="editProductItem">
              <label>Publisher</label>
              <input
                type="text"
                name="publisher"
                defaultValue={book.publisher}
              />
            </div>
            <div className="editProductItem">
              <label>Category</label>
              <input type="text" name="category" defaultValue={book.category} />
            </div>
            <div className="editProductItem">
              <label>Price</label>
              <input type="text" name="price" defaultValue={book.price} />
            </div>
            <div className="editProductItem">
              <label>Stocks</label>
              <input type="text" name="stocks" defaultValue={book.stocks} />
            </div>
            <div className="editProductItem">
              <label>Sales</label>
              <input type="text" name="sales" defaultValue={book.sales} />
            </div>
            <div className="editProductItem">
              <label>Total Quantity</label>
              <input
                type="text"
                name="totalQuantity"
                defaultValue={book.totalQuantity}
              />
            </div>
          </div>
          <div className="editProductTopRight">
            <div className="editImgProductItem">
              <label>Image</label>

              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={loadFile}
              />
              <img
                id="output"
                src={book.img}
                alt=""
                className="editProductImg"
              />
            </div>
          </div>
        </div>
        <div className="editProductBottom">
          <div className="editProductTextArea">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              defaultValue={book.description}
              rows={8}
              cols={30}
            ></textarea>
          </div>
          <div className="editProductSubmit">
            <input
              type="submit"
              defaultValue="Update"
              className="editProductSumbitBtn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
