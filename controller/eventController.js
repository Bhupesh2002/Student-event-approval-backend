const Event = require("../models/Event");


const createEvent = async (req, res) => {
  try {
    const { eventName, date, venue, budget, description } = req.body;

    if (!eventName || !date || !venue || !budget || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      eventName,
      date,
      venue,
      budget,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateEventStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    event.status = status;
    if (remarks) event.remarks = remarks;

    await event.save();

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createEvent, getMyEvents, getAllEvents, updateEventStatus };
