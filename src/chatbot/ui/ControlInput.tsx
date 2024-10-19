import * as React from "react";
import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { ClassicPreset } from "rete";
import styled from "styled-components";
import { $socketsize } from "./consts";
import { css } from "styled-components";
import { useState } from 'react';
export const Styles = styled.textarea`
     width: 95%;
     height: 180px;
    border-radius: 15px;
    background-color: white;
    padding: 2px 6px;
    border: 1px solid #999;
    font-size: 110%;
    box-sizing: border-box;

    position: absolute;
    top: 10px; left: 10px;
    color: #eee;
    background-color : #222; 

    font-size: 16px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
    resize :none;
    overflow:hidden;

    border-color: #719ECE;
    box-shadow: 0 0 5px #719ECE;
`;

export function ControlInputComponent<T extends "text">(props : 
  {data : ClassicPreset.InputControl<T>
    styles?: () => any;
  }) {
 
  const [value, setValue ] = useState(''); // Declare a state variable...

  const handleValueChange = (event:any) => {
    // 👇️ update textarea value
    setValue(event.target.value);
    props.data.value = event.target.value;
  };
  React.useEffect(() => {
    setValue(props.data.value?props.data.value:"");
}, [props]); 
  //setValue(props.data.value);
 // return <Styles onChange={e=> props.data.setValue(e.target.value)} />;
 return <Styles  onChange={handleValueChange}  value={value}/>;
}

