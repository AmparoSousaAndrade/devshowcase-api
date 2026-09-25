const express = require("express");

const {
  createProject,
  getAllProjects,
  createFeedback,
  upvote
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.post("/:id/feedbacks", createFeedback);
router.put("/:id/upvote", upvote);

module.exports = router;