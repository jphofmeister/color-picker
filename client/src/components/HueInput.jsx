import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const HueInputContainer = styled.div`
  width: 360px;
  padding: 0;
  margin-bottom: 1rem;
  
  input {
    background: hsla(${props => props.hue}, 100%, 50%, 1);

    &::-webkit-slider-thumb {
      background: hsla(${props => props.hue}, 100%, 50%, 1);
    }

    &::-moz-range-thumb {
      background: hsla(${props => props.hue}, 100%, 50%, 1);
    }

    &::-webkit-slider-runnable-track {
      background: linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0));
    }

    &::-moz-range-track {
      background: linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0));
    }
  }
`;

const HueInput = (props) => {

  // * Available props:
  // * Properties: rngHue
  // * Functions: setRngHue

  // let componentName = "HueInput";

  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : "";

  let setRngHue = isEmpty(props.setRngHue) === false ? props.setRngHue : noFunctionAvailable;

  return (
    <HueInputContainer className="slider-input-container" hue={rngHue}>
      <FormInput
        formInputID="rngHue"
        labelText="Hue"
        srOnly={true}
        inputType="range"
        inputValue={rngHue}
        updateValue={setRngHue}
        inputMin={0}
        inputMax={359}
        inputStep={1}
      />
    </HueInputContainer>
  );
};

export default HueInput;