import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const AlphaInputContainer = styled.div`
  width: 360px;
  padding: 0;
  margin-bottom: 1rem;
  /* background: #fff; */

  input {
    /* background: #fff !important;
    background-color: #fff !important; */

    &::-webkit-slider-thumb {
      background-color: #fff !important;
      background: hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, ${props => props.$alpha});
    }

    &::-moz-range-thumb {
      background: hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, ${props => props.$alpha});
    }

    &::-webkit-slider-runnable-track {
      background: linear-gradient(to right, hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, 0), hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, 1));
    }

    &::-moz-range-track {
      background: linear-gradient(to right, hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, 0), hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, 1));
    }
  }
`;

const AlphaInput = (props) => {

  // * Available props:
  // * Properties: rngAlpha, rngHue, saturation, lightness
  // * Functions: setRngAlpha

  // let componentName = "AlphaInput";

  let rngAlpha = isEmpty(props) === false && isEmpty(props.rngAlpha) === false ? props.rngAlpha : 1;
  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : 0;
  let saturation = isEmpty(props) === false && isEmpty(props.saturation) === false ? props.saturation : 100;
  let lightness = isEmpty(props) === false && isEmpty(props.lightness) === false ? props.lightness : 50;

  let setRngAlpha = isEmpty(props.setRngAlpha) === false ? props.setRngAlpha : noFunctionAvailable;

  return (
    <AlphaInputContainer className="slider-input-container" $hue={rngHue} $saturation={saturation} $lightness={lightness} $alpha={rngAlpha}>
      <FormInput
        formInputID="rngAlpha"
        labelText="Alpha"
        srOnly={true}
        inputType="range"
        inputValue={rngAlpha}
        updateValue={setRngAlpha}
        inputMin={0}
        inputMax={1}
        inputStep={0.01}
      />
    </AlphaInputContainer>
  );
};

export default AlphaInput;