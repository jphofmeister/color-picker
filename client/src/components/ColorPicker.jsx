import React, { useState, useEffect, useRef } from 'react';
import classnames from "classnames";
import styled from 'styled-components';
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { parse } from "../utilities/applicationFunctions";

const StyledColorPicker = styled.div`
  position: relative;
  height: calc(100dvw - 4rem);
  width: calc(100dvw - 4rem);
  /* max-height: ${props => props.$colorPickerSize}px; */
  max-height: 200px;
  max-width: ${props => props.$colorPickerSize}px;
  background: linear-gradient(to bottom,transparent,black),linear-gradient(to right,white,transparent);
  background-color: hsl(${props => props.$hue}, 100%, 50%);

  .color-picker-cursor {
    position: absolute;
    top: calc(${props => props.$dragHandlePosition.y}px - 10px);
    left: calc(${props => props.$dragHandlePosition.x}px - 10px);
    background-color: transparent;
    border: 3px solid #fff;
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
  // * Functions: setPickerSaturation, setPickerLightness

  // let componentName = "ColorPicker";

  let colorPickerSize = 360;

  let hue = isEmpty(props) === false && isEmpty(props.hue) === false ? props.hue : "";

  let setPickerSaturation = isEmpty(props.setPickerSaturation) === false ? props.setPickerSaturation : noFunctionAvailable;
  let setPickerLightness = isEmpty(props.setPickerLightness) === false ? props.setPickerLightness : noFunctionAvailable;

  const colorPickerRef = useRef(null);

  const [colorPickerClientRect, setColorPickerClientRect] = useState({});
  const [colorPickerOffset, setColorPickerOffset] = useState({ x: colorPickerSize, y: 0 });
  const [dragHandlePosition, setDragHandlePosition] = useState({ x: colorPickerSize, y: 0 });

  const [isDragging, setIsDragging] = useState(false);

  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });



  // * save page scroll position to state to update the color picker offset -- 12/30/2023 JH
  useEffect(() => {

    const onScroll = () => {

      let newScrollPosition = {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
      };

      setScrollPosition(newScrollPosition);

    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);

  }, []);


  // * get offsets and boundingClientRect for the color picker -- 12/30/2023 JH
  useEffect(() => {

    if (isEmpty(colorPickerRef.current) === false) {

      let boundingClientRect = colorPickerRef.current.getBoundingClientRect();

      // * save boundingClientRect as an object so isEmpty check works -- 01/02/2024 JH
      setColorPickerClientRect({
        width: boundingClientRect.width,
        height: boundingClientRect.height,
        top: boundingClientRect.top,
        right: boundingClientRect.right,
        bottom: boundingClientRect.bottom,
        left: boundingClientRect.left,
      });

      let newOffset = {
        x: boundingClientRect.x + scrollPosition.x,
        y: boundingClientRect.y + scrollPosition.y
      };

      setColorPickerOffset(newOffset);

    };

  }, [colorPickerRef, scrollPosition]);


  // * if color picker handle goes outside the color picker box, reset to the edge of the box -- 
  useEffect(() => {

    if (isEmpty(colorPickerClientRect) === false) {

      let dragTop = dragHandlePosition.y;
      let dragLeft = dragHandlePosition.x;

      let colorPickerTop = colorPickerClientRect.top - colorPickerOffset.y;
      let colorPickerBottom = colorPickerClientRect.bottom - colorPickerOffset.y;
      let colorPickerLeft = colorPickerClientRect.left - colorPickerOffset.x;
      let colorPickerRight = colorPickerClientRect.right - colorPickerOffset.x;

      if (dragTop < colorPickerTop) {
        dragTop = colorPickerTop;
      };

      if (dragTop > colorPickerBottom) {
        dragTop = colorPickerBottom;
      };

      if (dragLeft < colorPickerLeft) {
        dragLeft = colorPickerLeft;
      };

      if (dragLeft > colorPickerRight) {
        dragLeft = colorPickerRight;
      };

      if (dragHandlePosition.y !== dragTop || dragHandlePosition.x !== dragLeft) {

        setDragHandlePosition({
          x: dragLeft,
          y: dragTop
        });

      };

    };

  }, [dragHandlePosition, colorPickerOffset, colorPickerClientRect]);


  // * convert hsv to hsl -- 12/30/2023 JH
  // https://stackoverflow.com/a/31851617
  useEffect(() => {

    if (isEmpty(colorPickerClientRect.width) === false && isEmpty(colorPickerClientRect.height) === false) {

      let s = dragHandlePosition.x / colorPickerClientRect.width;
      let v = 1 - (dragHandlePosition.y / colorPickerClientRect.height);

      if (v > 1) {
        v = 1;
      };

      if (v < 0) {
        v = 0;
      };

      // * both hsv and hsl values are in [0, 1]
      let l = (2 - s) * v / 2;

      if (l != 0) {
        if (l == 1) {
          s = 0;
        } else if (l < 0.5) {
          s = s * v / (l * 2);
        } else {
          s = s * v / (2 - l * 2);
        };
      };

      setPickerSaturation(Math.round(s * 100));
      setPickerLightness(Math.round(l * 100));

    };


  }, [dragHandlePosition, colorPickerClientRect]);


  const handleDragStart = (event) => {

    if (isDragging === false) {

      setIsDragging(true);

      let newPosition = {
        x: event.pageX - colorPickerOffset.x,
        y: event.pageY - colorPickerOffset.y
      };

      setDragHandlePosition(newPosition);

    };

  };


  const handleDrag = (event) => {

    if (isDragging === true) {

      let newPosition = {
        x: event.pageX - colorPickerOffset.x,
        y: event.pageY - colorPickerOffset.y
      };

      setDragHandlePosition(newPosition);

    };

  };


  const handleDragEnd = (event) => {

    if (isDragging === true) {
      setIsDragging(false);
    };

  };


  return (
    <StyledColorPicker
      $hue={hue}
      $dragHandlePosition={dragHandlePosition}
      $colorPickerSize={colorPickerSize}
      ref={colorPickerRef}
      onMouseMove={(event) => { handleDrag(event); }}
      onMouseLeave={(event) => { handleDragEnd(event); }}
      onMouseDown={(event) => { handleDragStart(event); }}
      onMouseUp={(event) => { handleDragEnd(event); }}
    >

      <div className="color-picker-cursor"></div>

    </StyledColorPicker>
  );
};

export default ColorPicker;