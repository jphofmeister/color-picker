import parseHTML from "html-react-parser";
import { isEmpty, getDateTime } from "./sharedFunctions";

const componentName = "ApplicationFunctions";


// * The parseHTML function from the npm package html-react-parser doesn't provide error handling if the value sent to it isn't a string. -- 03/09/2023 MF
export const parse = (value) => {

  let newValue = value;

  if (isEmpty(value) === false) {

    newValue = parseHTML(value);

  };

  return newValue;

};
