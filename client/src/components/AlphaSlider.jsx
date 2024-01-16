import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const AlphaSliderContainer = styled.div`
  width: 360px;
  padding: 0;
  margin-bottom: 1rem;
  border: none;

  input {
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

const AlphaSlider = (props) => {

  // * Available props:
  // * Properties: rngAlpha, rngHue, saturation, lightness
  // * Functions: setRngAlpha

  // let componentName = "AlphaSlider";

  let rngAlpha = isEmpty(props) === false && isEmpty(props.rngAlpha) === false ? props.rngAlpha : 1;
  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : 0;
  let pickerSaturation = isEmpty(props) === false && isEmpty(props.pickerSaturation) === false ? props.pickerSaturation : 100;
  let pickerLightness = isEmpty(props) === false && isEmpty(props.pickerLightness) === false ? props.pickerLightness : 50;

  let setRngAlpha = isEmpty(props.setRngAlpha) === false ? props.setRngAlpha : noFunctionAvailable;
  let updateTextFields = isEmpty(props.updateTextFields) === false ? props.updateTextFields : noFunctionAvailable;


  const handleChange = (value) => {

    setRngAlpha(value);

    updateTextFields(null, null, null, value);

  };


  return (
    <AlphaSliderContainer className="slider-input-container" $hue={rngHue} $saturation={pickerSaturation} $lightness={pickerLightness} $alpha={rngAlpha}>
      <FormInput
        formInputID="rngAlpha"
        labelText="Alpha"
        srOnly={true}
        inputType="range"
        inputValue={rngAlpha}
        updateValue={handleChange}
        inputMin={0}
        inputMax={1}
        inputStep={0.01}
      />
    </AlphaSliderContainer>
  );
};

export default AlphaSlider;