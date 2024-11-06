import React from "react";
import {useButtonStyles}  from "./style";

interface propType{
    label:string,
    onClickHandler: any,
    disabled?:boolean
}

function MyButton({label , onClickHandler , disabled}:propType) {
    const classes= useButtonStyles()
  return (
    <div>
      <button className={classes.Button} onClick={onClickHandler} disabled = {disabled}>{label ?? "button"}</button>
    </div>
  );
}

export default MyButton;
