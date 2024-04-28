import React from "react";

function MessageErrorComponent(props) {
  return (
    <p className={`text-${props.classErrorMessage} p-1`}>
      {props.messageError}
    </p>
  );
}
export default MessageErrorComponent;
