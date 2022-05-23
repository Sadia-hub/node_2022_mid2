const express= require("express");
const {login_page, signup_page, insert_user, getUser,users_page, getUserById, updateUserById, deleteUserById} = require("../controllers/user");
const router = express.Router();

router.route("/").get(login_page).post(getUser)
router.route("/signup").get(signup_page)
router.route("/users").get(users_page)

router.route("/login").post(getUser)
router.route("/create").post(insert_user)

router.route("/user/view/:id").get(getUserById)
router.route("/user/delete/:id").get(deleteUserById)
router.route("/user/update/:id").post(updateUserById);
module.exports = router;