import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime } from "../../utilities/sharedFunctions";
import { parse } from "../../utilities/applicationFunctions";

const FormInput = (props) => {

  // * Available props: -- 06/21/2023 MF
  // * Properties: formInputID, labelText, srOnly, isRequired, inputType, placeholderText, inputValue, inputDisabled, inputHint, textareaRows, inputMin, inputMax, inputStep -- 06/21/2023 MF
  // * Functions: onChange -- 06/21/2023 MF

  let componentName = "FormInput";

  let formInputID = isEmpty(props) === false && isEmpty(props.formInputID) === false ? props.formInputID : "";
  let labelText = isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  let srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  let isRequired = isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  let inputType = isEmpty(props) === false && isEmpty(props.inputType) === false ? props.inputType : "text";
  let placeholderText = isEmpty(props) === false && isEmpty(props.placeholderText) === false ? props.placeholderText : "";
  let inputValue = isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  let inputDisabled = isEmpty(props) === false && isEmpty(props.inputDisabled) === false ? props.inputDisabled : false;
  let inputHint = isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";
  let textareaRows = isEmpty(props) === false && isEmpty(props.textareaRows) === false ? props.textareaRows : 10;
  // let textareaCols = isEmpty(props) === false && isEmpty(props.textareaCols) === false ? props.textareaCols : "";
  let useInputAddon = isEmpty(props) === false && isEmpty(props.useInputAddon) === false ? props.useInputAddon : false;

  // * For number, range, date, datetime-local, month, time and week -- 07/25/2023 JH
  // * Default value is null to prevent other input types from having the attribute -- 07/25/2023 JH
  let inputMin = isEmpty(props) === false && isEmpty(props.inputMin) === false ? props.inputMin : null;
  let inputMax = isEmpty(props) === false && isEmpty(props.inputMax) === false ? props.inputMax : null;
  let inputStep = isEmpty(props) === false && isEmpty(props.inputStep) === false ? props.inputStep : null;

  let updateValue = isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  let labelClasses = classnames("", {
    "sr-only": srOnly === true,
    "input-addon": useInputAddon === true
  });

  let formGroupClasses = classnames("form-group", {
    "with-addon": useInputAddon === true
  });


  const handleOnChange = (event) => {

    if (inputType === "number") {

      if (isEmpty(event.target.value) === false && isNaN(event.target.value) === false) {

        updateValue(Number.parseFloat(event.target.value));

      } else {

        updateValue(event.target.value);

      };

    } else {

      updateValue(event.target.value);

    };

  };


  return (
    <div className={formGroupClasses}>

      <label htmlFor={formInputID} className={labelClasses}>

        {labelText}

        {isRequired === true ? <span className="required"> * <span className="sr-only">required</span></span> : null}

      </label>

      {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

      {inputType === "textarea" ?

        <textarea id={formInputID} name={formInputID} placeholder={placeholderText} rows={textareaRows} /* cols={textareaCols} */ value={inputValue} disabled={inputDisabled} onChange={(event) => handleOnChange(event)} />

        : null}

      {/* // TODO add other input types -- 08/07/2023 JH */}
      {inputType !== "textarea" && inputType !== "toggle" ?

        <input type={inputType} id={formInputID} placeholder={placeholderText} value={inputValue} disabled={inputDisabled} onChange={(event) => handleOnChange(event)} min={inputMin} max={inputMax} step={inputStep} />

        : null}

    </div>
  );
};

export default FormInput;
