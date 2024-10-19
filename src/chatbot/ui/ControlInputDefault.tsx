import * as React from "react";
import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { ClassicPreset } from "rete";
import styled from "styled-components";
import { $socketsize } from "./consts";
import { css } from "styled-components";
import {ControlInputDefault} from '../controls'


export const styles = css`
     width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: white;
    padding: 5px 6px;
    border: 1px solid #999;
    font-size: 110%;
    box-sizing: border-box;

    color: #eee;
    background-color : #222; 

    font-size: 14px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
   
    border-color: #719ECE;
    box-shadow: 0 0 1px #719ECE;
`;

export function ControlInputDefaultComponent<T extends "text">(props : 
  {data : ClassicPreset.InputControl<T>
    styles?: () => any;
  }) {
  return <Presets.classic.InputControl  styles={() => styles} {...props}/>;
}
