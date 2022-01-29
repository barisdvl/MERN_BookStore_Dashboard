import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createProduct.css";

export default function CreateProduct() {
  const navigate = useNavigate();

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

    await axios.post("/books", formData, {}).then(() => {
      navigate("/products")
    });
  };

  return (
    <div className="createProduct">
      <h1 className="createProductTitle">Create Product</h1>
      <form id="createForm" className="createProductForm" onSubmit={handleSubmit}>
        <div className="createProductTop">
          <div className="createProductItem">
            <label>ISBN</label>
            <input type="text" placeholder="ISBN" name="isbn" />
          </div>
          <div className="createProductItem">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className="createProductItem">
            <label>Author</label>
            <input type="text" name="author" placeholder="Author" />
          </div>
          <div className="createProductItem">
            <label>Publisher</label>
            <input type="text" name="publisher" placeholder="Publisher" />
          </div>
          <div className="createProductItem">
            <label>Category</label>
            <input type="text" name="category" placeholder="Category" />
          </div>
          <div className="createProductItem">
            <label>Price</label>
            <input type="text" name="price" placeholder="Price" />
          </div>
          <div className="createProductItem">
            <label>Stocks</label>
            <input type="text" name="stocks" placeholder="Stocks" />
          </div>
          <div className="createProductItem">
            <label>Sales</label>
            <input type="text" name="sales" placeholder="Sales" />
          </div>
          <div className="createProductItem">
            <label>Total Quantity</label>
            <input
              type="text"
              name="totalQuantity"
              placeholder="Total Quantity"
            />
          </div>
          <div className="createProductItem">
            <label>Image</label>
            <input type="file" name="img" id="file" />
          </div>
        </div>
        <div className="createProductBottom">
          <div className="createProductTextArea">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              rows={8}
              cols={30}
            ></textarea>
          </div>
          <div className="createProductSubmit">
            <input
              type="submit"
              defaultValue="Update"
              className="createProductSumbitBtn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
