const express = require("express"); //Importing express

const { body, validationResult, matchedData } = require("express-validator"); //Importing functions from "express-validator"

const app = express(); //Initiating express

app.use(express.json()); //To get the data from client side in a json format

const PORT = 7500;

const users = [
  {
    id: 1,
    name: "Naruto",
    place: "Hidden leaf village",
  },
  {
    id: 2,
    name: "Gaara",
    place: "Hidden sand village",
  },
];
//GET Request
// app.get("/api/users", (request, response)=>{
//     return response.status(200).send(users)
// })

//GET Request using path params or route params
app.get("/api/users/:id", (request, response) => {
  console.log(request.params); //To see the request made from client side in terminal

  const parsedId = parseInt(request.params.id); //To convert the id from the client side into a number

  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request!" });
  } //If the converted id is not a number, this code will execute

  const findUser = users.find((item) => item.id === parsedId); //To find the specific user from the list of users using id

  if (!findUser) {
    return response.status(404).send({ msg: "User not found!" });
  } //If the user is not available from the list of users, this code will execute

  return response.status(200).send(findUser); // If the user is available from the list of users, this code will execute
});

//GET Request using Query params
app.get("/api/users", (request, response) => {
  console.log(request.query); //To see the request made from client side in terminal

  // const{property, value} = request.query;
  //  or/
  const {
    query: { property, value },
  } = request; //In order to write the logic, we have to destructure certain things from request body

  if (!property && !value) {
    return response.status(200).send(users);
  } //If the destructured parts are not in the url path, this code will execute

  const findUser = users.filter((item) => item[property].includes(value)); // To find the specific user, if the destructured parts are in the url path

  if (property && value) {
    return response.status(200).send(findUser);
  } //If the destructured parts are present in the url path, this code will execute
});

//POST Request
app.post(
  "/api/users",
  [
    body("name")
      .isString()
      .withMessage("Name must be always in Alphabets!")
      .notEmpty()
      .withMessage("Name must not left empty!")
      .isLength({ min: 5, max: 10 })
      .withMessage("Name must be minimum 5 characters long!"),
    body("place")
      .isString()
      .withMessage("Place must be always in Alphabets!")
      .notEmpty()
      .withMessage("Place must not left empty!"),
  ],
  (request, response) => {
    console.log(request.body); //client side always sends data in a body format, use this logic to see the request in a terminal

    const result = validationResult(request); //The validationResult() will validate the request with above given conditions

    if (!result.isEmpty()) {
      return response.status(400).send({ error: result.array() });
    } //If the result is not empty, this code will execute

    const data = matchedData(request); //The matchedData() is used to match the validated request
    //Here instead of using the "body" which is destructured from the request, we have to use the "data" variable for the next steps

    // const { body } = request; //In order to post some data, we have to destructure the body from the request

    const newUser = { id: users[users.length - 1].id + 1, ...data }; //Logic to add new data

    users.push(newUser); //This will push the new data into the list

    return response.status(201).send(newUser);
  }
);

//PUT Request
app.put(
  "/api/users/:id",
  [
    body("name")
      .isString()
      .withMessage("Name must be always in Alphabets!")
      .notEmpty()
      .withMessage("Name must not left empty!")
      .isLength({ min: 5, max: 10 })
      .withMessage("Name must be minimum 5 characters long!") ||
      body("place")
        .isString()
        .withMessage("Place must be always in Alphabets!")
        .notEmpty()
        .withMessage("Place must not left empty!"),
  ],
  (request, response) => {
    console.log(request.params); //To see from which "id", the user data will be updated in the terminal
    console.log(request.body); //To see the request made from client side in the terminal

    const result = validationResult(request); //The validationResult() will validate the request with above given conditions

    if (!result.isEmpty()) {
      return response.status(400).send({ error: result.array() });
    } //If the result is not empty, this code will execute

    const data = matchedData(request); //The matchedData() is used to match the validated request
    //Here instead of using the "body" which is destructured from the request, we have to use the "data" variable for the next steps

    const {
      body,
      params: { id },
    } = request; //Destructuring body as well as id from the request

    const parsedId = parseInt(request.params.id); //To convert the id from the client side into a number

    if (isNaN(parsedId)) {
      return response.status(400).send({ msg: "Bad request!" });
    } //If the converted id is not a number, this code will execute

    const findUserIndex = users.findIndex((item) => item.id === parsedId); //To find the index of an user

    if (findUserIndex === -1) {
      return response.status(404).send({ msg: "User not found!" });
    } //If the above logic return -1, this code will execute

    users[findUserIndex] = { id: parsedId, ...data }; //Updation logic
    return response.sendStatus(200);
  }
);

//PATCH Request
app.patch(
  "/api/users/:id",
  [
    body("name")
      .isString()
      .withMessage("Name must be always in Alphabets!")
      .notEmpty()
      .withMessage("Name must not left empty!")
      .isLength({ min: 5, max: 10 })
      .withMessage("Name must be minimum 5 characters long!") ||
      body("place")
        .isString()
        .withMessage("Place must be always in Alphabets!")
        .notEmpty()
        .withMessage("Place must not left empty!"),
  ],
  (request, response) => {
    console.log(request.params); //To see from which "id", the user data will be updated in the terminal
    console.log(request.body); //To see the request made from client side in the terminal

    const result = validationResult(request); //The validationResult() will validate the request with above given conditions

    if (!result.isEmpty()) {
      return response.status(400).send({ error: result.array() });
    } //If the result is not empty, this code will execute

    const data = matchedData(request); //The matchedData() is used to match the validated request
    //Here instead of using the "body" which is destructured from the request, we have to use the "data" variable for the next steps

    const {
      body,
      params: { id },
    } = request; //Destructuring body as well as id from the request

    const parsedId = parseInt(request.params.id); //To convert the id from the client side into a number

    if (isNaN(parsedId)) {
      return response.status(400).send({ msg: "Bad request!" });
    } //If the converted id is not a number, this code will execute

    const findUserIndex = users.findIndex((item) => item.id === parsedId); //To find the index of an user

    if (findUserIndex === -1) {
      return response.status(404).send({ msg: "User not found!" });
    } //If the above logic return -1, this code will execute

    users[findUserIndex] = { ...users[findUserIndex], ...data }; //Updation logic
    return response.sendStatus(200);
  }
);

//DELETE Request
app.delete("/api/users/:id", (request, response) => {
  console.log(request.params); //To see from which "id", the user data will be updated in the terminal

  const { id } = request.params; //Destructuring "id" from request

  const parsedId = parseInt(request.params.id); //To convert the id from the client side into a number

  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad request!" });
  } //If the converted id is not a number, this code will execute

  const findUserIndex = users.findIndex((item) => item.id === parsedId); //To find the index of an user

  if (findUserIndex === -1) {
    return response.status(404).send({ msg: "User not found!" });
  } //If the above logic return -1, this code will execute

  users.splice(findUserIndex, 1); //This will delete the data that matches the "findUserIndex" variable
  return response.sendStatus(200);
});

//To start a Server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Please reload the page!");
  } else {
    console.log(`App is successfully running on Port : ${PORT}`);
  }
}); //This will start the Server and the application listens to the mentioned port
