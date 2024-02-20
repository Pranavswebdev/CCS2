let useExpress = require("express");
let router = useExpress.Router();
const { createUser, loginUser } = require("../controllers/user.ts");
const {
  createProject,
  getProjects,
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/project.ts");
const { isLoggedIn } = require("../middileware/isLoggedIn");

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

router
  .route("/project")
  .post(isLoggedIn, createProject)
  .get(isLoggedIn, getProjects);

router
  .route("/task")
  .post(isLoggedIn, createTask)
  .put(isLoggedIn, updateTask)
  .get(isLoggedIn,getTasks);



export default router;
