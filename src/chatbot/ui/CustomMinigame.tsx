import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { CustomNodeComponent } from "./CustomNode";
import { css } from "styled-components";
import { $fontfamily,$cssNodeMain } from "./consts";


export const styles = css<{ selected?: boolean }>`
${$cssNodeMain}



.output{
margin: 40px 0px -25px;
}

.control {
 
margin: -112px 0px 108px;
 margin-right: 30px;
}

  .output-socket {
    margin-right: 0px;
  }
  .input-socket {
    margin-left: 0px;
    position: absolute;
    top: 57%; left: 0px;
  }


  ${(props) =>
    props.selected &&
    css`
      border-color: #ff0000c4;
      .title {
        border-color: #ff0000c4;
        
      }
    `}
`;

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  styles?: () => any;
  emit: RenderEmit<S>;
};

export function CustomNodeMinigameComponent<S extends ClassicScheme>(props: Props<S>) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}