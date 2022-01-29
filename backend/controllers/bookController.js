const fs = require("fs");

const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: "success",
      books,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.createNewBook = async (req, res) => {
  try {
    console.log("creating start");
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.img;
    let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
    uploadImage.mv(uploadPath)
      const book = await Book.create({
        isbn: req.body.isbn,
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        publisher: req.body.publisher,
        description: req.body.description,
        stocks: req.body.stocks,
        sales: req.body.sales,
        price: req.body.price,
        totalQuantity: req.body.totalQuantity,
        img: "/uploads/" + uploadImage.name,
      });
      res.status(201).json({
        status: "success",
        
      });
    
  } catch (error) {
    console.log(error)
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: `${book.name} has been removed successfully`,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const book = await Book.findOne({ _id: req.params.id });
    if (req.files != null) {
      let uploadImage = req.files.img;
      let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
      uploadImage.mv(uploadPath);
      book.img = "/uploads/" + uploadImage.name;
    }

    book.isbn = req.body.isbn;
    book.name = req.body.name;
    book.author = req.body.author;
    book.category = req.body.category;
    book.publisher = req.body.publisher;
    book.description = req.body.description;
    book.stocks = req.body.stocks;
    book.sales = req.body.sales;
    book.price = req.body.price;
    book.totalQuantity = req.body.totalQuantity;
    book.save();

    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
  }
};
