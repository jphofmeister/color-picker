import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormInput from './common/FormInput';
import { jwtDecode } from "../utilities/jwtDecode";
import { isEmpty } from "../utilities/sharedFunctions";

const StyledLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
  }
`;

const Login = () => {

  let componentName = "Login";

  const [txtUsername, setTxtUsername] = useState("");
  const [txtPassword, setTxtPassword] = useState("");

  let accessToken = '';
  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const handleLogin = (event) => {

    event.preventDefault();

    let url = `${baseUrl}/auth/login`;

    let recordObject = {
      userName: txtUsername,
      userPassword: txtPassword
    };

    fetch(url, {
      method: "POST",
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...recordObject })
    })
      .then(results => {
        if (typeof results === "object") {
          return results.json();
        } else {

        };
      })
      .then(results => {
        if (isEmpty(results) === false) {
          console.log("results", results);

          accessToken = results.accessToken;
          let jwtDecoded = jwtDecode(accessToken);

          console.log("jwtDecoded", jwtDecoded);

        };
      });

  };

  return (
    <StyledLogin>
      <h2>Login</h2>

      <FormInput
        formInputID="txtUsername"
        labelText="Username"
        inputValue={txtUsername}
        updateValue={setTxtUsername}
      />

      <FormInput
        formInputID="txtPassword"
        labelText="Password"
        inputType="password"
        inputValue={txtPassword}
        updateValue={setTxtPassword}
      />

      <div>
        <button type="submit" onClick={(event) => { handleLogin(event); }}>Submit</button>
        <button type="button">Cancel</button>
      </div>

    </StyledLogin>
  );
};

export default Login;