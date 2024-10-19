import { ClassicPreset } from "rete";
import { ActionSocket} from "../sockets";

export class StartGame extends ClassicPreset.Node<
{},
{ output1: ClassicPreset.Socket;},
{}
> {
  width = 100;
  height = 100;
 
  constructor() {
    super("СТАРТ");
    this.addOutput("output1",new ClassicPreset.Output(new ActionSocket(), ""));
  }

  async execute(
  ){}
  
  data() {
    return {};
  }
  serialize() {
    return {};
  }

}
