const express = require("express"); //Importing express

const { userRoutes } = require("./Routes/userRoutes"); //Importing userRoutes middleware

const cookieParser = require("cookie-parser"); //Importing cookieParser middleware

const mongoose = require("mongoose"); //Importing mongoose ODM from "mongoose"

const app = express(); //Initiating express

app.use(express.json()); //To get the data from client side in a json format

const PORT = 7500;

app.use(userRoutes); //Initiating the userRoutes middleware by using app.use()

app.use(cookieParser("Secret")); //Initiating the cookieParser middleware by using app.use(), this cookieParser middleware always accepts a secret message.

//How to connect the Application to MongoDB
mongoose
  .connect("mongodb://localhost:27017/code-snippets")
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.error(err);
  });

//Example to see how cookieParser works
app.get("/api/message", (request, response) => {
  console.log(request.cookies); //To see the cookies coming from client side in the terminal

  console.log(request.headers.cookie); //To see the cookie header coming from client side in the terminal

  response.cookie("hello", "world", { maxAge: 60000, signed: true });

  if (response.cookie.hello && response.cookie.hello === "world") {
    return response.status(200).send({ msg: "Hello" });
  } else {
    return response.status(400).send("Bad Request!");
  }
});

//To start a Server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Please reload the page!");
  } else {
    console.log(`App is successfully running on Port : ${PORT}`);
  }
}); //This will start the Server and the application listens to the mentioned port
