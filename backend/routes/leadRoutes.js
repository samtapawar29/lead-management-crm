const express = require("express");

const router = express.Router();

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  searchLeads,
  getStats,
} = require("../controllers/leadController");

// CREATE
router.post("/", createLead);

// GET ALL
router.get("/", getLeads);

// SEARCH
router.get("/search", searchLeads);

// STATS
router.get("/stats", getStats);

// UPDATE
router.put("/:id", updateLead);

// DELETE
router.delete("/:id", deleteLead);

module.exports = router;