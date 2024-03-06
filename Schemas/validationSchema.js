const inputValidationSchema = {
  name: {
    isString: {
      errorMessage: "Name must be a String!",
    },
    notEmpty: {
      errorMessage: "Name field must not left empty!",
    },
    isLength: {
      options: {
        min: 5,
        max: 10,
      },
      errorMessage: "Name must be minimum 5 characters long!",
    },
  },
  place: {
    isString: {
      errorMessage: "Place must be a String!",
    },
    notEmpty: {
      errorMessage: "Place field must not left empty!",
    },
  },
};

module.exports = {inputValidationSchema} //Exporting the inputValidationSchema object, so that we can import this schema in any file


//The above mentioned is a schema format for input validation