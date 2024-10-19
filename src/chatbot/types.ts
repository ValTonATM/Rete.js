import { GetSchemes } from "rete";
import { Connection } from "./connection";
import {
  Minigame,
  Switch,
  Intermediate,
  StartGame,
  EndGame
} from "./nodes";

export type NodeProps =
  | Minigame
  | Switch
  | Intermediate
  |StartGame
  |EndGame;
export type ConnProps =
  | Connection<Minigame, Switch>
  | Connection<Switch, Switch>
  | Connection<Intermediate, Minigame>
  |Connection<StartGame, Minigame>
  |Connection<EndGame, Minigame>;


export type Schemes = GetSchemes<NodeProps, ConnProps>;
