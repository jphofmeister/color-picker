import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { isEmpty } from "./utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "./app/applicationSlice";
import { useNativeClickListener } from "./hooks/useNativeClickListener";
import Login from "./components/Login";
import Messages from "./components/Messages";
import FormInput from "./components/common/FormInput";

// const StyledSelectColor = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 50px;
//   border: 2px solid rgba(15, 15, 15, 0.2);
//   background-color: hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, ${props => props.$alpha});
// `;

const App = () => {

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const [color, setColor] = useColor("#561ecb");

  const [formType, setFormType] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // * dropdown state that should probably be in a different component -- 04/18/2024 JH
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownFormOpen, setIsDropdownFormOpen] = useState(false);
  const controlRef = useRef(null);
  const createListFormRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useNativeClickListener(controlRef, false);
  const [txtListName, setTxtListName] = useState("");
  const [inlineErrors, setInlineErrors] = useState({});

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  useEffect(() => {

    console.log("color", color);

  }, [color]);


  // * dropdown state that should probably be in a different component -- 04/18/2024 JH
  // * When dropdown form is open, scroll the dropdown to make whole form visible. -- 11/20/2023 JH
  useEffect(() => {

    if (isDropdownFormOpen === true && isEmpty(createListFormRef.current) === false) {

      // * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView -- 11/21/2023 JH
      createListFormRef.current.scrollIntoView({ block: "nearest", inline: "nearest" });

    };

  }, [isDropdownFormOpen]);


  const getRefreshToken = (event) => {

    event.preventDefault();

    let url = `${baseUrl}/auth/refresh_token`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      credentials: "include"
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

          };

        };
      });

  };


  const deleteRefreshToken = (event) => {

    event.preventDefault();

    let url = `${baseUrl}/auth/refresh_token`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      credentials: "include"
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

          dispatch(setAccessToken(null));
          dispatch(setCurrentUser({}));

          dispatch(addSuccessMessage("Logged Out"));

        };
      });

  };



  return (
    <main style={{ maxWidth: "500px", margin: "0 auto" }}>

      <Messages />

      {isFormOpen !== true && isEmpty(currentUser) === true ?

        <div className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={() => { setIsFormOpen(true); setFormType("Login"); }}>Login</button>
          <button type="button" className="btn btn-transparent" onClick={() => { setIsFormOpen(true); setFormType("Sign Up"); }}>Sign Up</button>
        </div>

        : null}

      {isEmpty(accessToken) === false && isEmpty(currentUser) === false ?

        <div className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={(event) => { deleteRefreshToken(event); }}>Log Out</button>
        </div>

        : null}

      {isFormOpen === true ?

        <Login formType={formType} setFormType={setFormType} setIsFormOpen={setIsFormOpen} />

        : null}

      <ColorPicker color={color} onChange={setColor} />

      <div className="button-dropdown-container mt-3" ref={controlRef}>

        <button type="button" className="btn btn-primary dropdown-button" disabled={isEmpty(accessToken) === true || isEmpty(currentUser) === true} onClick={(event) => { setIsDropdownOpen(!isDropdownOpen); }}>Save Color</button>

        {isDropdownOpen === true ?

          <div className={`button-dropdown ${isDropdownFormOpen === true ? "input-open" : ""}`}>

            <ul className="button-dropdown__list">

              {/* // TODO color groups mapped out here -- 04/18/2024 JH */}
              <li className="button-dropdown__list-item">
                <button type="button" className="btn btn-transparent button-dropdown__list-item__button" onClick={(event) => { }}>
                  Default List
                </button>
              </li>

            </ul>

            <div className="button-dropdown__sticky-bottom">

              <div className={isDropdownFormOpen === true ? "hide-element" : ""}>
                <button type="button" className="btn btn-transparent button-dropdown__list-item__button" onClick={(event) => { setIsDropdownFormOpen(!isDropdownFormOpen); }}>
                  <i className="fa fa-plus"></i> Add New List
                </button>
              </div>

              <div className={`button-dropdown__list-item-input ${isDropdownFormOpen === false ? "hide-element" : ""}`} ref={createListFormRef}>
                <FormInput
                  formInputID="txtListName"
                  labelText="New List Name"
                  isRequired={true}
                  // inlineError={inlineErrors.txtListName} 
                  // inputValue={txtListName} 
                  // updateValue={setTxtListName} 
                  inputMaxLength={30}
                />

                <div className="flex-row">
                  <button type="button" className="btn btn-primary" onClick={() => { }}>Save</button>
                  <button type="button" className="btn btn-outline" onClick={() => {
                    dispatch(clearMessages());
                    setInlineErrors({});
                    setTxtListName("");
                    setIsDropdownFormOpen(false);
                  }}>Cancel</button>
                </div>
              </div>

            </div>

          </div>

          : null}

      </div>

    </main>
  );
};

export default App;
