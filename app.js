const fs = require("fs");
const express = require("express");

const events = [];

// Initialize Express application
const app = express();

// Setup a request body parser for JSON
app.use(express.json());

app.get("/ping", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/webhook", (req, res) => {
  /** 
  @desc: This code snippet is used for handling verification handshakes which
  occurs when setting up the webhook URL the first time. 
  */
  if (req.body.type === "url_verification") {
    res.json({ challenge: req.body.challenge });
    return;
  }

  // Returns a '200 OK' response to all requests as soon as possible
  res.status(200).send();

  /**
   * @desc: Here goes your custom logic for each event.
   * For this sample our goal is to store all received events
   * in a JSON file upon closing the server. For consistency,
   * we are using snake_casing to match the case in which the events
   * are created.
   */
  events.push({ payload: req.body, reception_date: new Date() });
  console.log(req.body);
});

const server = app.listen(3000, () => {
  console.log("App listening on port 3000");
  console.log(
    "When closing the server (Ctrl + C) a JSON file with all events will be generated."
  );
});

const handleShutdown = () => {
  const json = {
    event_count: events.length,
    events: events,
  };

  fs.writeFileSync("output.json", JSON.stringify(json, null, 2));
  console.log("\nSuccessfully wrote JSON file.");

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);
