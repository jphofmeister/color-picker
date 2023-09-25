const express = require("express");
const router = express.Router();

const dbUsername = require("../../config/keys").dbUsername;
const dbPassword = require("../../config/keys").dbPassword;


const { Pool } = require("pg");
const pool = new Pool({
  user: dbUsername,
  host: "localhost",
  database: "color_picker",
  password: dbPassword,
  port: 5432
});


// * get all users -- 12/09/2022 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM users ORDER BY id ASC")
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.log("error", error);
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * get a user by id -- 12/09/2022 JH
router.get("/:id", (request, response) => {

  pool.query("SELECT * FROM users WHERE user_id = $1", [request.params.userID])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * create a user -- 12/09/2022 JH
router.post("/add", (request, response) => {

  let newTimestamp = new Date();

  pool.query("INSERT INTO users (user_name, user_password, created_on, active) VALUES ($1, $2, $3, $4)", [request.body.userName, request.body.userPassword, newTimestamp, true])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * update a user by id -- 12/09/2022 JH
router.put("/update/:id", (request, response) => {

  let newTimestamp = new Date();

  pool.query("UPDATE users SET user_name = $1, user_password = $2, updated_on = $3 WHERE user_id = $4", [request.body.userName, request.body.userPassword, newTimestamp, request.params.userID])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * soft delete a user by id
router.put("/softDelete/:id", (request, response) => {

  pool.query("UPDATE users SET active = false WHERE user_id = $1", [request.params.userID])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete a user by id -- 12/09/2022 JH
router.delete("/delete/:id", (request, response) => {

  pool.query('DELETE FROM users WHERE user_id = $1', [request.params.userID])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;