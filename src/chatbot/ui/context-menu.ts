import { Presets } from "rete-react-plugin";
import styled from "styled-components";
import { $fontfamily } from "./consts";

export const Menu = styled(Presets.contextMenu.Menu)``;
export const Item = styled(Presets.contextMenu.Item)`
  background: #FFFFFF  ;
  color: black;
  border-color: #000000;
  font-family: ${$fontfamily};
  :hover {
    background: #ffffff99;
  }
`;

export const Common = styled(Presets.contextMenu.Common)`
  background: #000000 ;
  border-color: #6759bc;
  font-family: ${$fontfamily};
  :hover {
    background: #ffffff99;
  }
`;
export const Search = styled(Presets.contextMenu.Search)`
  border-color: #5F6366;
  display:none;
`;
export const Subitems = Presets.contextMenu.Subitems;
