import * as React from "react";
import { ClassicPreset } from "rete";
import styled from "styled-components";
import { $socketsize } from "./consts";

const Styles = styled.div`
  display: inline-block;
  cursor: pointer;
  border: 2px solid #00CC00;
  border-radius: 1em;
  width: ${$socketsize}px;
  height: ${$socketsize}px;
  vertical-align: middle;
  //background: #ffffffff ;
  margin: 0.1em 0.7em;
  z-index: 2;
  box-sizing: border-box;
  //paddind: 3px;
  &:hover {
    border-width: 4px;
  }
  &.multiple {
    border-color: yellow;
  }
 border-color: #719ECE;
    box-shadow: 0 0 5px #719ECE;



`;

export function ActionSocketComponent<T extends ClassicPreset.Socket>(props: {
  data: T;
}) {
  return <Styles title={props.data.name} />;
}
