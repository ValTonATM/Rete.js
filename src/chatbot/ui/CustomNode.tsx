import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { css } from "styled-components";
import { $fontfamily,$cssNodeMain } from "./consts";


export const styles = css<{ selected?: boolean}>`
${$cssNodeMain}
  
.output{
margin: 10px 0px -1px;
}

.control {
 
margin: -160px 0px 151px;
 margin-right: 30px;
}

  .output-socket {
    margin-right: 0px;
  }
  .input-socket {
    margin-left: 0px;
    position: absolute;
    top: 50%; left: 0px;
  }
  ${(props) =>
    props.selected &&
    css`
      border-color: #ffffff;
      .title {
        border-color: #ffffff;
      
      }
    `}
`;

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  styles?: () => any;
  emit: RenderEmit<S>;
};




export function CustomNodeComponent<S extends ClassicScheme>(props: Props<S>) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
