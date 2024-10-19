export const $fontfamily =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'";
export const $socketsize = 20;


export const $cssInputControlHeight = 180;


export const $cssNodeMain = `
    background: #22222299;
border: none;
  outline: none;
border-radius: 20px;
border-color: #FF7400;
 box-shadow: 0 0 25px #FF740099;
 
 border: none;
    outline: none;
z-index: 0;

:before {
content: "";
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;


 }

:after {
z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
}



  .title {
    color: black;
    text-align: center;
    height: 54%;
    vertical-align: middle;
    font-family: ${$fontfamily};
    font: italic bold 5px cursive;
    font-weight: 2;
    font-size: 1.0em;
      justify-content: center;
 align-items: center;
    word-break: break-all;

    
  }
  &:hover {
    background: #00000059;
  }
  .input-title,
  .output-title {
    font-weight: 100;
    font-family: ${$fontfamily};
     display : none;
  }
`;
