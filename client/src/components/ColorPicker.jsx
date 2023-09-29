import React, { useState, useEffect, useRef } from 'react';
import classnames from "classnames";
import styled from 'styled-components';
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { parse } from "../utilities/applicationFunctions";

const StyledColorPicker = styled.div`
  position: relative;
  height: calc(100dvw - 4rem);
  width: calc(100dvw - 4rem);
  background: linear-gradient(to bottom,transparent,black),linear-gradient(to right,white,transparent);
  background-color: hsl(${props => props.hue}, 100%, 50%);

  .color-picker-cursor {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    border: 1px solid #000;
    height: 10px;
    width: 10px;
    border-radius: 10px;
  }
`;

const ColorPicker = (props) => {

  // * Available props:
  // * Properties: hue
  // * Functions: 

  // let componentName = "ColorPicker";

  let hue = isEmpty(props) === false && isEmpty(props.hue) === false ? props.hue : "";

  const colorPickerRef = useRef(null);


  useEffect(() => {

    if (isEmpty(colorPickerRef.current) === false) {

      let boundingClientRect = colorPickerRef.current.getBoundingClientRect();

      console.log("boundingClientRect", boundingClientRect);

    };

  }, [colorPickerRef]);


  const handleDragStart = (event) => {

    console.log("eventX", event.pageX);
    console.log("eventY", event.pageY);

    // pageX = saturation?
    // pageY = lightness?

  };

  return (
    <StyledColorPicker hue={hue} ref={colorPickerRef}>
      <div
        className="color-picker-cursor"
        draggable="true"
        onDragStart={(event) => { handleDragStart(event); }}
      ></div>
    </StyledColorPicker>
  );
};

export default ColorPicker;