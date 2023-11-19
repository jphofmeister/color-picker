import React, { useState, useEffect, useRef } from 'react';
import classnames from "classnames";
import styled from 'styled-components';
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { parse } from "../utilities/applicationFunctions";

const StyledColorPicker = styled.div`
  position: relative;
  height: calc(100dvw - 4rem);
  width: calc(100dvw - 4rem);
  max-height: 500px;
  max-width: 500px;
  background: linear-gradient(to bottom,transparent,black),linear-gradient(to right,white,transparent);
  background-color: hsl(${props => props.$hue}, 100%, 50%);

  .color-picker-cursor {
    position: absolute;
    top: calc(${props => props.$handlePosition.y}px - 10px);
    left: calc(${props => props.$handlePosition.x}px - 10px);
    background-color: transparent;
    border: 3px solid #fff;
    display: ${props => props.$isDragging === true ? "none" : "block"};
    height: 20px;
    width: 20px;
    border-radius: 20px;
    cursor: grab;
  }
`;

const ColorPicker = (props) => {

  // * Available props:
  // * Properties: hue
  // * Functions: 

  // let componentName = "ColorPicker";


  let hue = isEmpty(props) === false && isEmpty(props.hue) === false ? props.hue : "";

  let setSaturation = isEmpty(props.setSaturation) === false ? props.setRsetSaturationgHue : noFunctionAvailable;
  let setLightness = isEmpty(props.setLightness) === false ? props.setLightness : noFunctionAvailable;

  const colorPickerRef = useRef(null);
  const dragItemRef = useRef(null);

  const [colorPickerOffset, setColorPickerOffset] = useState({ x: 0, y: 0 });
  const [handlePosition, setHandlePosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {

    if (isEmpty(colorPickerRef.current) === false) {

      let boundingClientRect = colorPickerRef.current.getBoundingClientRect();

      let newOffset = {
        x: boundingClientRect.x,
        y: boundingClientRect.y
      };

      setColorPickerOffset(newOffset);

    };

  }, [colorPickerRef]);


  const handleDragStart = (event) => {


    event.dataTransfer.setDragImage(dragItemRef.current, event.target.getBoundingClientRect().width / 2, event.target.getBoundingClientRect().height / 2);

    setIsDragging(true);

  };


  const handleDrop = (event) => {

    console.log("event.type", event.type);

    console.log("eventX", event.pageX);
    console.log("eventY", event.pageY);

    // pageX = saturation 0 - 100
    // pageY = brightness (not lightness) 0 - 100

    // https://stackoverflow.com/a/31851617
    // function hsv_to_hsl(h, s, v) {
    //   // both hsv and hsl values are in [0, 1]
    //   var l = (2 - s) * v / 2;

    //   if (l != 0) {
    //     if (l == 1) {
    //       s = 0;
    //     } else if (l < 0.5) {
    //       s = s * v / (l * 2);
    //     } else {
    //       s = s * v / (2 - l * 2);
    //     }
    //   }

    //   return [h, s, l];
    // }

    let newPosition = {
      x: event.pageX - colorPickerOffset.x,
      y: event.pageY - colorPickerOffset.y
    };

    setHandlePosition(newPosition);

    setIsDragging(false);

    // dragged.parentNode.removeChild(dragged);
    // event.target.appendChild(dragged);

  };

  return (
    <StyledColorPicker $hue={hue} $handlePosition={handlePosition} $isDragging={isDragging} ref={colorPickerRef} onDragOver={(event) => { event.preventDefault(); }} onDrop={(event) => { handleDrop(event); }}>
      <div
        className="color-picker-cursor"
        draggable="true"
        style={{
          top: `calc(${handlePosition.y} - 10px)`,
          left: `calc(${handlePosition.x} - 10px)`
        }}
        onDragStart={(event) => { handleDragStart(event); }}
      // onDragEnd={(event) => { handleDragEnd(event); }}
      // onDrag={(event) => { handleDrag(event); }}
      ></div>

      <div ref={dragItemRef} className="drag-item-copy" tabIndex="-1"></div>
    </StyledColorPicker>
  );
};

export default ColorPicker;