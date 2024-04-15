import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import FormInput from './common/FormInput';
import { jwtDecode } from "../utilities/jwtDecode";

const StyledLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;

  h2 {
    margin: 0;
  }
`;

const Login = (props) => {

  // * Available props: -- 01/29/2024 JH
  // * Properties: accessToken, currentUser, isFormOpen
  // * Functions: setAccessToken, setCurrentUser, setIsFormOpen

  let componentName = "Login";

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  // let accessToken = isEmpty(props) === false && isEmpty(props.accessToken) === false ? props.accessToken : null;
  // let currentUser = isEmpty(props) === false && isEmpty(props.currentUser) === false ? props.currentUser : null;
  let isFormOpen = isEmpty(props) === false && isEmpty(props.isFormOpen) === false ? props.isFormOpen : null;
  let formType = isEmpty(props) === false && isEmpty(props.formType) === false ? props.formType : null;

  // let setAccessToken = isEmpty(props.setAccessToken) === false ? props.setAccessToken : noFunctionAvailable;
  // let setCurrentUser = isEmpty(props.setCurrentUser) === false ? props.setCurrentUser : noFunctionAvailable;
  let setIsFormOpen = isEmpty(props.setIsFormOpen) === false ? props.setIsFormOpen : noFunctionAvailable;
  let setFormType = isEmpty(props.setFormType) === false ? props.setFormType : noFunctionAvailable;

  const [txtUsername, setTxtUsername] = useState("");
  const [txtPassword, setTxtPassword] = useState("");

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const handleSubmit = (event) => {

    event.preventDefault();

    let url = "";
    let operationValue = formType;

    if (formType === "Login") {
      url = `${baseUrl}/auth/login`;
    } else if (formType === "Sign Up") {
      url = `${baseUrl}/users/add`;
    };

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
        if (isEmpty(results) === false && isEmpty(results.accessToken) === false) {

          let newAccessToken = results.accessToken;
          dispatch(setAccessToken(newAccessToken));

          let jwtDecoded = jwtDecode(newAccessToken);

          if (isEmpty(jwtDecoded.user_id) === false && isEmpty(jwtDecoded.user_name) === false) {

            let newCurrentUser = {
              userID: jwtDecoded.user_id,
              userName: jwtDecoded.user_name
            };

            dispatch(setCurrentUser(newCurrentUser));

            closeForm();

            dispatch(addSuccessMessage(`${operationValue}: Success! Logged in as ${newCurrentUser.userName}`));

          };

        };
      });

  };


  const closeForm = () => {

    setIsFormOpen(false);
    setFormType("");

    setTxtUsername("");
    setTxtPassword("");

  };


  return (
    <StyledLogin>
      <h2>{formType}</h2>

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

      <div className="flex-row">
        <button type="submit" className="btn btn-primary" onClick={(event) => { handleSubmit(event); }}>Submit</button>
        <button type="button" className="btn btn-light-gray" onClick={() => { closeForm(); }}>Cancel</button>
      </div>

      {/* <div>
        <button type="button" onClick={(event) => { getRefreshToken(event); }}>Refresh Token</button>
      </div> */}

    </StyledLogin>
  );
};

export default Login;