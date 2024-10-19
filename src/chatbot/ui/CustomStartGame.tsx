import { Presets, ClassicScheme, RenderEmit } from "rete-react-plugin";
import { CustomNodeComponent } from "./CustomNode";
import { css } from "styled-components";
import { $fontfamily,$cssNodeMain } from "./consts";


export const styles = css<{ selected?: boolean }>`
${$cssNodeMain}

  border-radius: 50px;
    border-color: #1B1BB3;
  box-shadow: 0 0 25px #1B1BB3;



.title {
    color: black;
    text-align: center;
    height: 58%;
    vertical-align: middle;
    font-family: Arial, Helvetica, sans-serif;
color: #eee;
    font-weight: 1;
    font-size: 1.3em;
word-break: unset;
    margin: 10px -5px;
  }


  .output-socket {
    margin-right: 0px;
    position: absolute;
    top: 45px; right: 25px;
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

export function CustomNodeStartGameComponent<S extends ClassicScheme>(props: Props<S>) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}