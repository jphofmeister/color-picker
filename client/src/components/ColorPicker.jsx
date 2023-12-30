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
    top: calc(${props => props.$dragHandlePosition.y}px - 10px);
    left: calc(${props => props.$dragHandlePosition.x}px - 10px);
    background-color: transparent;
    border: 3px solid #fff;
    display: ${props => props.$isDragging === true ? "none" : "block"};
    height: 20px;
    width: 20px;
    border-radius: 20px;
    cursor: grab;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
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

  const [colorPickerClientRect, setColorPickerClientRect] = useState({});
  const [colorPickerOffset, setColorPickerOffset] = useState({ x: 0, y: 0 });
  const [dragHandlePosition, setDragHandlePosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);


  // * get offsets and boundingClientRect for the color picker -- 12/30/2023 JH
  useEffect(() => {

    if (isEmpty(colorPickerRef.current) === false) {

      let boundingClientRect = colorPickerRef.current.getBoundingClientRect();

      setColorPickerClientRect(boundingClientRect);

      let newOffset = {
        x: boundingClientRect.x,
        y: boundingClientRect.y
      };

      setColorPickerOffset(newOffset);

    };

  }, [colorPickerRef]);


  // * if color picker handle goes outside the color picker box, reset to the edge of the box -- 
  useEffect(() => {

    // console.log("dragHandlePosition", dragHandlePosition);
    // console.log("colorPickerClientRect", colorPickerClientRect);

    let dragTop = dragHandlePosition.y;
    let dragLeft = dragHandlePosition.x;

    let colorPickerTop = colorPickerClientRect.top - colorPickerOffset.y;
    let colorPickerBottom = colorPickerClientRect.bottom - colorPickerOffset.y;
    let colorPickerLeft = colorPickerClientRect.left - colorPickerOffset.x;
    let colorPickerRight = colorPickerClientRect.right - colorPickerOffset.x;

    if (dragTop - 10 < colorPickerTop) {
      dragTop = colorPickerTop;
    };

    if (dragTop - 10 > colorPickerBottom) {
      dragTop = colorPickerBottom;
    };

    if (dragLeft - 10 < colorPickerLeft) {
      dragLeft = colorPickerLeft;
    };

    if (dragLeft - 10 > colorPickerRight) {
      dragLeft = colorPickerRight;
    };

    if (dragHandlePosition.y !== dragTop || dragHandlePosition.x !== dragLeft) {
      setDragHandlePosition({
        x: dragLeft,
        y: dragTop
      });
    };

  }, [dragHandlePosition, colorPickerOffset, colorPickerClientRect]);


  const handleDragStart = (event) => {

    event.dataTransfer.setDragImage(dragItemRef.current, event.target.getBoundingClientRect().width / 2, event.target.getBoundingClientRect().height / 2);

    setIsDragging(true);

  };


  const handleDrop = (event) => {

    event.dataTransfer.setDragImage(dragItemRef.current, dragItemRef.current.getBoundingClientRect().width / 2, dragItemRef.current.getBoundingClientRect().height / 2);

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

    console.log("newPosition", newPosition);

    setDragHandlePosition(newPosition);

    setIsDragging(false);

    // dragged.parentNode.removeChild(dragged);
    // event.target.appendChild(dragged);

  };


  const handleClick = (event) => {

    if (isDragging === false) {

      // setIsDragging(true);

      let newPosition = {
        x: event.pageX - colorPickerOffset.x,
        y: event.pageY - colorPickerOffset.y
      };

      console.log("newPosition", newPosition);

      setDragHandlePosition(newPosition);

      // setIsDragging(true);

    };

  };


  return (
    <StyledColorPicker $hue={hue} $dragHandlePosition={dragHandlePosition} $isDragging={isDragging} ref={colorPickerRef} onDragOver={(event) => { event.preventDefault(); }} onDrop={(event) => { handleDrop(event); }} onDragLeave={(event) => { handleDrop(event); }} onClick={(event) => { handleClick(event); }}>
      <div
        className="color-picker-cursor"
        draggable="true"
        style={{
          // ? use dragItemRef so that 10px isn't hard coded? -- 12/30/2023 JH
          top: `calc(${dragHandlePosition.y}px - 10px)`,
          left: `calc(${dragHandlePosition.x}px - 10px)`
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