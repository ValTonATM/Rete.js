import { ClassicPreset } from "rete";
import { ActionSocket} from "../sockets";
import { ControlInput} from "../controls";

export class Intermediate extends ClassicPreset.Node<
{ input1: ClassicPreset.Socket;},
{ output1: ClassicPreset.Socket;},
{ control0: ClassicPreset.InputControl<"text">}
> {
  width = 400;
  height = 230;
 
  constructor(data?:any) {
    super("INTERMEDIATE");
    this.addControl("control0",new ControlInput("text",  {initial : data!=null? data.control0 : ""}));
    this.addInput("input1", new ClassicPreset.Input(new ActionSocket(), "",true));
    this.addOutput("output1",new ClassicPreset.Output(new ActionSocket(), ""));

  }
  data() {
    return {};
  }
  async execute(
  ){}
  serialize() {
    return {
      control0 : this.controls.control0.value
    };
  }

}
