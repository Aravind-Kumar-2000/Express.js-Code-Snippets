const express = require("express"); //Importing express

const { userRoutes } = require("./Routes/userRoutes"); //Importing userRoutes middleware

const app = express(); //Initiating express

app.use(express.json()); //To get the data from client side in a json format

const PORT = 7500;

app.use(userRoutes); //Assigning the userRoutes middleware by using app.use()

//To start a Server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Please reload the page!");
  } else {
    console.log(`App is successfully running on Port : ${PORT}`);
  }
}); //This will start the Server and the application listens to the mentioned port
