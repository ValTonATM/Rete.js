import { ClassicPreset } from "rete";
import { ActionSocket} from "../sockets";

export class EndGame extends ClassicPreset.Node<
{input1: ClassicPreset.Socket;},
{},
{}
> {
  width = 100;
  height = 100;
 
  constructor() {
    super("КОНЕЦ");
    this.addInput("input1",new ClassicPreset.Input(new ActionSocket(), "",true));
  }

  data() {
    return {};
  }
  async execute(
  ){}
 
  serialize() {
    return {
     
    };
  }
}
