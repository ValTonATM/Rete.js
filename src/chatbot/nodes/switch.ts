import { ClassicPreset } from "rete";
import { ActionSocket} from "../sockets";
import { ControlInput,ControlInputDefault} from "../controls";

export class Switch extends ClassicPreset.Node<
{input1: ClassicPreset.Socket},
{output1: ClassicPreset.Socket, output2: ClassicPreset.Socket ,output3: ClassicPreset.Socket,output4: ClassicPreset.Socket ,output5: ClassicPreset.Socket  },
{ control0: ControlInput<"text",{}>, control1: ClassicPreset.InputControl<"text">,control2: ClassicPreset.InputControl<"text">,control3: ClassicPreset.InputControl<"text">,control4: ClassicPreset.InputControl<"text">,control5: ClassicPreset.InputControl<"text"> }
>
{
  width = 400;
  height = 400;
  inputMessage?: string;

  constructor(data?:any) {
    super("SWITCH");
   

    this.addControl("control0",new ControlInput("text", {initial : data!=null? data.control0 : ""}));

    this.addInput("input1", new ClassicPreset.Input(new ActionSocket(), "",true));

    this.addControl("control1",new ControlInputDefault("text", {initial : data!=null? data.control1 : ""}));
    this.addControl("control2",new ControlInputDefault("text", {initial : data!=null? data.control2 : ""}));
    this.addControl("control3",new ControlInputDefault("text", {initial : data!=null? data.control3 : ""}));
    this.addControl("control4",new ControlInputDefault("text", {initial : data!=null? data.control4 : ""}));
    this.addControl("control5",new ControlInputDefault("text", {initial : data!=null? data.control5 : ""}));

  
    this.addOutput("output1",new ClassicPreset.Output(new ActionSocket(), ""));
    this.addOutput("output2", new ClassicPreset.Output(new ActionSocket(), ""));
    this.addOutput("output3", new ClassicPreset.Output(new ActionSocket(), ""));
    this.addOutput("output4", new ClassicPreset.Output(new ActionSocket(), ""));
    this.addOutput("output5", new ClassicPreset.Output(new ActionSocket(), ""));

  }

  async execute(
  ){}
  data() {
    return {};
  }
  serialize() {
    return {
      control0 : this.controls.control0.value,
      control1 : this.controls.control1.value,
      control2 : this.controls.control2.value,
      control3 : this.controls.control3.value,
      control4 : this.controls.control4.value,
      control5 : this.controls.control5.value
    };

  }


}
