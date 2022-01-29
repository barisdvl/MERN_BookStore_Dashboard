const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.route("/").get(bookController.getAllBooks);
router.route("/:id").get(bookController.getBook);
router.route("/").post(bookController.createNewBook);
router.route("/:id").delete(bookController.deleteBook);
router.route("/:id").put(bookController.updateBook);

module.exports = router;
