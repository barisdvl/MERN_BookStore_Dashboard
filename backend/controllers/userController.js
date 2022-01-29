const fs = require("fs");

const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const user = await User.findById(req.params.id);

    //if same file name exist, it is overwriting
    //will be fix
    if (req.files != null) {
      let uploadImage = req.files.img;
      let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
      uploadImage.mv(uploadPath);
      user.img = "/uploads/" + uploadImage.name;
    }

    user.username = req.body.username;
    user.full_name = req.body.full_name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.adress = req.body.adress;
    user.save();

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        status: "fail",
        error,
      });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({
            status: "success",
            message: `${user.username} has been remove successfully.`
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}
