import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./product.css";

export default function Product() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get("/books/" + path);
      setBook(res.data.book);
    };
    fetchBook();
  }, [path]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>

        <Link to={"/product/edit/"+book._id}>
          <button className="productEditButton">Edit Product</button>
        </Link>
      </div>
      <div className="productDetailContainer">
        <div className="productDetail">
          <img src={book.img} alt="" className="productInfoImg" />
          <div className="productDetailRight">
            <span className="productName">{book.name}</span>
            <span className="productAuthor">{book.author}</span>
            <br />
            <span className="productDescription">{book.description}</span>
          </div>
        </div>
        <div className="productBottom">
          <div className="productInfo">
            <div className="productInfoItem">
              <span className="productInfoKey">ISBN</span>
              <span className="productInfoValue">{book.isbn}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Publisher</span>
              <span className="productInfoValue">{book.publisher}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Category</span>
              <span className="productInfoValue">{book.category}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price</span>
              <span className="productInfoValue">{book.price} TL</span>
            </div>
          </div>         
        </div>
      </div>
    </div>
  );
}
