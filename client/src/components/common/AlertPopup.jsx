import React, { useEffect } from 'react';
import classnames from "classnames";
import { isEmpty, getDateTime, isNonEmptyArray } from "../../utilities/sharedFunctions";

const AlertPopup = (props) => {

  let componentName = "AlertPopup";

  let alertType = isEmpty(props) === false && isEmpty(props.alert) === false && isEmpty(props.alert.alertType) === false ? props.alert.alertType : "";

  let operationValue = isEmpty(props) === false && isEmpty(props.alert) === false && isEmpty(props.alert.operationValue) === false ? props.alert.operationValue : "";

  let message = isEmpty(props) === false && isEmpty(props.alert) === false && isEmpty(props.alert.message) === false ? props.alert.message : "";

  const alertClasses = classnames("alert alert-danger", {
    "alert-success": alertType === "success",
    "alert-warning": alertType === "warning",
    "alert-info": alertType === "info",
    "alert-danger": alertType === "error"
  });


  // * Log the full error, if available -- 08/19/2022 JH
  useEffect(() => {

    if (isEmpty(props) === false && isEmpty(props.alert) === false && isEmpty(props.alert.error) === false) {

      console.error("props.alert.error", props.alert.error);

    };

  }, [props]);


  return (
    <div className="alert-container">

      <div className={alertClasses}>
        {operationValue} - {message}

        <button type="button" className="refresh" onClick={() => window.location.reload()}>
          Refresh
        </button>

        <button type="button" className="close" onClick={() => props.setAlert(null)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

    </div>
  );
};

export default AlertPopup;
