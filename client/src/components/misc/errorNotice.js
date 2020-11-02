import React from "react";
import "./style.css";
export default 
function ErrorNotice(props) {
  return (
    <div className="error-notice">
        
        <div dangerouslySetInnerHTML={{ __html: props.message }} />
        <img src={process.env.PUBLIC_URL + "./imgs/Zid2.gif"} alt="Attention!"  /> 
      <button onClick={props.clearError}>X</button>
    </div>
  );
}