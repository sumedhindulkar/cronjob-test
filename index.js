const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const { Time } = require("./models/time");
const PORT = process.env.PORT || 8000;
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("DatabaseConnection error: " + err));

const xam = async () => {
  const x = new Date();
  let minutes = x.getMinutes();
  let seconds = x.getSeconds();
  let hour = x.getHours();
  const currentTime = hour + ":" + minutes + ":" + seconds;
  const newTime = Time({
    currentTime,
  });
  newTime.save().then((data) => {
    console.log("Yoooooooo: " + data);
  });
};
// xam();

app.get("/fetchTime", async (req, res) => {
  const data = await Time.find({ by: "sumedh" });
  res.json(data);
});

app.get("/", async (req, res) => {
  const x = new Date();
  let minutes = x.getMinutes();
  let seconds = x.getSeconds();
  let hour = x.getHours();
  const time = hour + ":" + minutes + ":" + seconds;
  await Time.findOneAndUpdate(
    {
      by: "sumedh",
    },
    {
      currentTime: time,
    },
    {
      new: true,
    }
  );

  res.redirect("/fetchTime");
});

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
