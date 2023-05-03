import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = 80;
import env from "dotenv/config";

//TODO: modles
import User from "./models/userModel.js";
import Money from "./models/moneyModel.js";

const URL = process.env.URL_PASS;

const INRUSD = 77.62;

mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

//authenicating exesting user
app.post("/auth_user", async (req, response) => {
  const user = await User.findOne({
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  });

  const money = await Money.findOne({
    email: req.body.email,
  });

  try {
    if (user === null) {
      await response.send("no user");
    } else {
      var data = [user, money];
      await response.status(200).send(data);
    }
  } catch (error) {
    await response.status(500).send(error);
    console.log("l 56", error.message);
  }
});

//Creating new user
app.post("/add_user", async (request, response) => {
  const user = await new User(request.body);

  try {
    await user.save();
    console.log(request.body.email);
    //TODO: I am implementing money schema in this add user (when user get created the money schema will automatically get creat).
    const money = await new Money();
    money.email = request.body.email;
    await money.save();
    var data = [user, money];
    await response.status(200).send(200, data);
  } catch (error) {
    await response.status(500).send(error);
    console.log("l 74", error.message);
  }
});

//Money
app.post("/money", async (req, res) => {
  var money = await Money.findOne({
    email: req.body.email,
  });

  // console.log(money);
  res.send(money);
});

//Spwaping
app.post("/swap", async (request, response) => {
  var acc = await Money.findOne({
    email: request.body.email,
  });

  // console.log(acc);

  if (acc !== null) {
    if (request.body.from === "USD" && request.body.to === "INR") {
      if (acc.USD <= request.body.amount) {
        response.send("not enough balance");
        return;
      }

      //conversion
      var amount = request.body.amount;
      var result = amount * INRUSD;

      //stroing result in db
      acc.USD = acc.USD - request.body.amount;
      acc.INR = acc.INR + result;
      await acc.save();

      await response.status(200).send(result.toString());
    } else if (request.body.from === "INR" && request.body.to === "USD") {
      if (acc.INR <= request.body.amount) {
        response.send("not enough balance");
        return;
      }

      //conversion
      var amount = request.body.amount;
      var result = amount / INRUSD;

      //stroing result in db
      acc.INR = acc.INR - request.body.amount;
      acc.USD = acc.USD + result;
      await acc.save();

      await response.status(200).send(result.toString());
    }
  } else {
    await response.send("user not found");
  }
});

app.listen(port, () => console.log(`Listning at port ${port}`));
