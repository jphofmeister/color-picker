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
  // * Functions: setSaturation, setLightness

  // let componentName = "ColorPicker";

  let hue = isEmpty(props) === false && isEmpty(props.hue) === false ? props.hue : "";

  let setSaturation = isEmpty(props.setSaturation) === false ? props.setSaturation : noFunctionAvailable;
  let setLightness = isEmpty(props.setLightness) === false ? props.setLightness : noFunctionAvailable;

  const colorPickerRef = useRef(null);

  const [colorPickerClientRect, setColorPickerClientRect] = useState({});
  const [colorPickerOffset, setColorPickerOffset] = useState({ x: 0, y: 0 });
  const [dragHandlePosition, setDragHandlePosition] = useState({ x: 0, y: 0 });

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

      setColorPickerClientRect(boundingClientRect);

      let newOffset = {
        x: boundingClientRect.x + scrollPosition.x,
        y: boundingClientRect.y + scrollPosition.y
      };

      setColorPickerOffset(newOffset);

    };

  }, [colorPickerRef, scrollPosition]);


  // // * if color picker handle goes outside the color picker box, reset to the edge of the box -- 
  // useEffect(() => {

  //   let dragTop = dragHandlePosition.y;
  //   let dragLeft = dragHandlePosition.x;

  //   let colorPickerTop = colorPickerClientRect.top - colorPickerOffset.y;
  //   let colorPickerBottom = colorPickerClientRect.bottom - colorPickerOffset.y;
  //   let colorPickerLeft = colorPickerClientRect.left - colorPickerOffset.x;
  //   let colorPickerRight = colorPickerClientRect.right - colorPickerOffset.x;

  //   if (dragTop - 10 < colorPickerTop) {
  //     dragTop = colorPickerTop;
  //   };

  //   if (dragTop - 10 > colorPickerBottom) {
  //     dragTop = colorPickerBottom;
  //   };

  //   if (dragLeft - 10 < colorPickerLeft) {
  //     dragLeft = colorPickerLeft;
  //   };

  //   if (dragLeft - 10 > colorPickerRight) {
  //     dragLeft = colorPickerRight;
  //   };

  //   if (dragHandlePosition.y !== dragTop || dragHandlePosition.x !== dragLeft) {
  //     setDragHandlePosition({
  //       x: dragLeft,
  //       y: dragTop
  //     });
  //   };

  // }, [dragHandlePosition, colorPickerOffset, colorPickerClientRect]);


  // * convert hsv to hsl -- 12/30/2023 JH
  // https://stackoverflow.com/a/31851617
  useEffect(() => {

    if (isEmpty(colorPickerClientRect.width) === false && isEmpty(colorPickerClientRect.height) === false) {

      let s_saturation = dragHandlePosition.x / colorPickerClientRect.width;
      let v_brightness = 1 - (dragHandlePosition.y / colorPickerClientRect.height);

      if (v_brightness > 1) {
        v_brightness = 1;
      };

      if (v_brightness < 0) {
        v_brightness = 0;
      };

      // * both hsv and hsl values are in [0, 1]
      let l_lightness = (2 - s_saturation) * v_brightness / 2;

      if (l_lightness != 0) {
        if (l_lightness == 1) {
          s_saturation = 0;
        } else if (l_lightness < 0.5) {
          s_saturation = s_saturation * v_brightness / (l_lightness * 2);
        } else {
          s_saturation = s_saturation * v_brightness / (2 - l_lightness * 2);
        };
      };

      setSaturation(Math.round(s_saturation * 100));
      setLightness(Math.round(l_lightness * 100));

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

      // setIsDragging(true);

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

    console.log("event.type", event.type);

    if (isDragging === true) {
      setIsDragging(false);
    };

  };


  return (
    <StyledColorPicker
      $hue={hue}
      $dragHandlePosition={dragHandlePosition}
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