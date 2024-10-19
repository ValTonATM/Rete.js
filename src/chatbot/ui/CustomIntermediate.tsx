import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { CustomNodeComponent } from "./CustomNode";
import { css } from "styled-components";
import { $fontfamily,$cssNodeMain } from "./consts";


export const styles = css<{ selected?: boolean }>`
${$cssNodeMain}

// border-color: #009999;
//   box-shadow: 0 0 25px #009999;

  .output-socket {
    margin-right: 0px;
    position: absolute;
    top: 200px; right: 0px;
  }
  .input-socket {
    margin-left: 0px;
    position: absolute;
    top: 200px; left: 0px;
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

export function CustomNodeIntermediateComponent<S extends ClassicScheme>(props: Props<S>) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}