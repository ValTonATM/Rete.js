import { ClassicPreset } from "rete";

export class ControlInput<text extends "text", T> extends ClassicPreset.InputControl<"text", string> {
  constructor(text:"text", d : {}) {
    super(text,d);


    
  }

}


export class ControlInputDefault<text extends "text", T> extends ClassicPreset.InputControl<"text", string> {
  constructor(text:"text", d : {}) {
    super(text,d);

  
  }

}
//constructor InputControl<"text", string>(type: "text", options?: InputControlOptions<string> | undefined): ClassicPreset.InputControl<"text", string>
//constructor InputControl<"text", string>(type: "text", options?: InputControlOptions<string> | undefined): ClassicPreset.InputControl<"text", string>
// xport class Minigame extends ClassicPreset.Node<
//   {input1: ClassicPreset.Socket},
//   {output1: ClassicPreset.Socket, output2: ClassicPreset.Socket ,output3: ClassicPreset.Socket },
//   {}
// > {
//   width = 400;
//   height = 300;