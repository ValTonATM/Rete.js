import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";
import { Schemes } from "./types";

type AreaExtra = ReactArea2D<any> | ContextMenuExtra;
const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

const { Menu, Common, Search, Item, Subitems } = Presets.contextMenu;
const CustomMenu = styled(Menu)`
  width: 520px;
`;
const CustomItem = styled(Item)`
  background: #000000;
`;


render.addPreset(
  Presets.contextMenu.setup({
    customize: {
      main: () => CustomMenu,
      item: () => CustomItem,
      common: () => Common,
      search: () => Search,
      subitems: () => Subitems
    }
  })
);
