import { ClassicPreset } from "rete";
import { ActionSocket } from "../sockets";
import { ControlInput,ControlInputDefault} from "../controls";

export class Minigame extends ClassicPreset.Node<
  {input1: ClassicPreset.Socket},
  {output1: ClassicPreset.Socket, output2: ClassicPreset.Socket ,output3: ClassicPreset.Socket },
  {control0: ClassicPreset.InputControl<"text">,control1: ClassicPreset.InputControl<"text">,control2: ClassicPreset.InputControl<"text">,control3: ClassicPreset.InputControl<"text">}
> {
  width = 400;
  height = 350;
 
  constructor(data?:any) {
    super("MINIGAME");
    this.addControl("control0",new ControlInput("text", {initial : data!=null? data.control0 : ""}));
    this.addInput("input1", new ClassicPreset.Input(new ActionSocket(), "",true));


    this.addControl("control1",new ControlInputDefault("text",  {initial : data!=null? data.control1 : "Критическая удача"}));
    this.addControl("control2",new ControlInputDefault("text", {initial : data!=null? data.control2 : "Средний результат"}));
    this.addControl("control3",new ControlInputDefault("text", {initial : data!=null? data.control3 : "Полный провал"}));

    this.addOutput("output1",new ClassicPreset.Output(new ActionSocket(), "Игрок справился"));
    this.addOutput("output2", new ClassicPreset.Output(new ActionSocket(), "50% на 50%"));
    this.addOutput("output3", new ClassicPreset.Output(new ActionSocket(), "Игрок не справился"));
  }

  data() {
    return {};
  }

  async execute(
  ){}
  serialize() {
    return {
      control0 : this.controls.control0.value,
      control1 : this.controls.control1.value,
      control2 : this.controls.control2.value,
      control3 : this.controls.control3.value
    };
  }
}
