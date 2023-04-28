const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { Sra } = require("./models/sra");
const axios = require("axios");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("DatabaseConnection error: " + err));

const app = async () => {
  try {
    const data = await Sra.find();

    const todayDate = new Date();
    let updatedData = data.filter((item) => {
      let x = new Date(item.updatedAt);
      x = x.getDate();
      if (todayDate.getDate() != x) {
        return item;
      }
    });
    updatedData.splice(3);

    for (let x of updatedData) {
      console.log({
        keywords: x.keywords,
        negativeKeywords: x.negativeKeywords,
        x: x.id,
      });
      const options = {
        method: "GET",
        url: "https://cdoc5hjkfkguk3nyjxadp2i5pi0xqcut.lambda-url.ap-south-1.on.aws/",
        headers: {
          "content-type": "application/json",
        },
        data: { keywords: x.keywords, negativeKeywords: x.negativeKeywords },
      };
      const results = await axios(options);
      console.log("=======================");
      console.log(JSON.stringify(results.data.data));
      console.log("=======================");
      const updatedData = await Sra.findOneAndUpdate(
        { _id: x.id },
        {
          $push: {
            leads: results.data.data,
          },
        },
        {
          new: true,
        }
      );
      console.log(updatedData);
    }

    // res.json({ msg: "successfully Implemented", up });
  } catch (err) {
    console.log(err);
    // res.json({ msg: "UFF ERR", err });
  }
};
app();
