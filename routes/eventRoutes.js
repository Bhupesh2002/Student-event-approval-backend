const express = require("express");
const router = express.Router();
const {
  createEvent,
  getMyEvents,
  getAllEvents,
  updateEventStatus,
} = require("../controller/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Students create event
router.post("/", protect, createEvent);

// Students get their own events
router.get("/my", protect, getMyEvents);

// Admin gets all events
router.get("/", protect, adminOnly, getAllEvents);

// Admin approves/rejects event with optional remarks
router.put("/:id", protect, adminOnly, updateEventStatus);

module.exports = router;
