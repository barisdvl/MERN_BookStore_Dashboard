const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);

router.route("/").get(userController.getUsers);
router.route("/:id").get(userController.getUser);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;
