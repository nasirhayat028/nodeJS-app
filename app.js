const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

/** @type {{ id: string; text: string; createdAt: string }[]} */
const messages = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.render("index", {
    title: "DevOps Node App",
    messages: [...messages].reverse(),
  });
});

app.post("/message", (req, res) => {
  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (text) {
    messages.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text: text.slice(0, 2000),
      createdAt: new Date().toISOString(),
    });
  }
  res.redirect(303, "/");
});

app.use((_req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
