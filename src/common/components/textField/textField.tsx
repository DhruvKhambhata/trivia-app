import { TextField } from "@mui/material";
import React from "react";

interface propTypes {
  label: string;
  name: string;
  onChangeFn?: () => void;
  required?: boolean;
}

function MytextField({ label, name,onChangeFn, required }: propTypes) {
  return (
    <div>
        {/* @ts-ignore */}
      <TextField fullWidth required={required} id={name} label={label} onChange={(e) => onChangeFn && onChangeFn(e)}/>
    </div>
  );
}

export default MytextField;
