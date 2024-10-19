// @ts-nocheck
import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ClassicFlow,
  ConnectionPlugin,
  getSourceTarget,
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import {
  AutoArrangePlugin,
  Presets as ArrangePresets,
} from "rete-auto-arrange-plugin";
import { DataflowEngine, ControlFlowEngine } from "rete-engine";
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";
import {
  Switch,
  Intermediate,
  Minigame
} from "./chatbot/nodes";
import { ActionSocket, TextSocket } from "./chatbot/sockets";
import { ControlInput } from "./chatbot/controls";
import { Schemes } from "./chatbot/types";
import { Connection } from "./chatbot/connection";
import { ActionSocketComponent } from "./chatbot/ui/ActionSocket";
import { ActionConnectionComponent } from "./chatbot/ui/ActionConnection";
import { ControlInputComponent } from "./chatbot/ui/ControlInput";
import { ControlInputDefaultComponent } from "./chatbot/ui/ControlInputDefault";
import { CustomNodeComponent } from "./chatbot/ui/CustomNode";
import { clearEditor } from "./utils";
import { CustomNodeIntermediateComponent } from "./chatbot/ui/CustomIntermediate";
import { CustomNodeStartGameComponent } from "./chatbot/ui/CustomStartGame";
import { CustomNodeEndGameComponent } from "./chatbot/ui/CustomEndGame";

import { CustomNodeMinigameComponent } from "./chatbot/ui/CustomMinigame";
import { getConnectionSockets } from "./chatbot/utils";
import { addCustomBackground } from "./chatbot/ui/background";
import * as ContextMenuComponents from "./chatbot/ui/context-menu";
import { StartGame } from "./chatbot/nodes/startGame";
import { EndGame } from "./chatbot/nodes/endGame";
import {exportEditor,importEditor } from "./imports";

type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export type Context = {
  editor: NodeEditor<Schemes>;
  area: AreaPlugin<Schemes, any>;
  dataflow: DataflowEngine<Schemes>;
};

/////
//Начало
////
export async function createEditor(
  container: HTMLElement,
  log: (text: string, type: "info" | "error") => void
) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();
  const dataflow = new DataflowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof ActionSocket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof ActionSocket)
          .map(([name]) => name),
    };
  });
  const engine = new ControlFlowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof ActionSocket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof ActionSocket)
          .map(([name]) => name),
    };
  });

  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ["Старт игры", () => new StartGame()],
      ["Окно с выбором", () => new Switch()],
      ["Промежуточное", () => new Intermediate()],
      ["Мини-игра", () => new Minigame()],
      ["Конец игры", () => new EndGame()]
    ]),
  });
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(
    Presets.contextMenu.setup({
      customize: {
        main: () => ContextMenuComponents.Menu,
        item: () => ContextMenuComponents.Item,
        common: () => ContextMenuComponents.Common,
        search: () => ContextMenuComponents.Search,
        subitems: () => ContextMenuComponents.Subitems,
      },
    })
  );
  render.addPreset(
    Presets.classic.setup({
      customize: {
        connection(data) {
          const { source, target } = getConnectionSockets(editor, data.payload);

          if (
            source instanceof ActionSocket ||
            target instanceof ActionSocket
          ) {
            return ActionConnectionComponent;
          }
        },
        socket(data) {
          if (data.payload instanceof ActionSocket) {
            return ActionSocketComponent;
          }
          return Presets.classic.Socket;
        },
        node(data) {
          if (data.payload instanceof Intermediate) {
            return CustomNodeIntermediateComponent;
          }
          if (data.payload instanceof Minigame) {
            return CustomNodeMinigameComponent;
          }
          
          if (data.payload instanceof StartGame) {
            return CustomNodeStartGameComponent;
          }

          if (data.payload instanceof EndGame) {
            return CustomNodeEndGameComponent;
          }


          return CustomNodeComponent;
        },
        control(data) {
          if (data.payload instanceof ControlInput) {
            return ControlInputComponent;
          }
          return ControlInputDefaultComponent;
         return Presets.classic.InputControl;
        }
      },
    })
  );

 arrange.addPreset(ArrangePresets.classic.setup());

  connection.addPreset(
    () =>
      new ClassicFlow({
        canMakeConnection(from, to) {
          const [source, target] = getSourceTarget(from, to) || [null, null];

          if (!source || !target || from === to) return false;

          const sockets = getConnectionSockets(
            editor,
            new Connection(
              editor.getNode(source.nodeId),
              source.key as never,
              editor.getNode(target.nodeId),
              target.key as never
            )
          );
          if (!sockets.source.isCompatibleWith(sockets.target)) {
            log("Sockets are not compatible", "error");
            connection.drop();
            return false;
          }

          return Boolean(source && target);
        },
        makeConnection(from, to, context) {
          const [source, target] = getSourceTarget(from, to) || [null, null];
          const { editor } = context;

          if (source && target) {
            editor.addConnection(
              new Connection(
                editor.getNode(source.nodeId),
                source.key as never,
                editor.getNode(target.nodeId),
                target.key as never
              )
            );
            return true;
          }
        },
      })
  );

  editor.use(engine);
  editor.use(dataflow);
  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(arrange);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  const context: Context = {
    editor,
    area,
    dataflow
  };

  editor.addPipe((context) => {
    if (context.type === "connectioncreate") {
      const { data } = context;
      const { source, target } = getConnectionSockets(editor, data);

      if (!source.isCompatibleWith(target)) {
        log("Sockets are not compatible", "error");
        return;
      }
    }
    return context;
  });

  addCustomBackground(area);
  await arrange.layout();
  AreaExtensions.zoomAt(area, editor.getNodes());



  async function openModule(text:string | ArrayBuffer | undefined | null) {


    if (text == null || text == undefined) return;


    const obj = JSON.parse(text?.toString());
    if (obj !=null)
    {
    await clearEditor(editor);
    await importEditor(
      {
        ...context,
        editor
      },
      obj
    );
    // const module = modules.findModule(path);
    


    }
    // if (module) {
    //   currentModulePath = path;
    //   await module.apply(editor);
    // }

    // await arrange.layout();
    // AreaExtensions.zoomAt(area, editor.getNodes());
  }


  return {

    saveModule: () => {
      
        const data = exportEditor(context);
        console.log(data);

        console.log("SAVED!");



        // { myData } = data; // I am assuming that "this.state.myData"
        // is an object and I wrote it to file as
        // json

// create file in browser
const fileName = "JonnyQuest";
const json = JSON.stringify(data, null, 2);
const blob = new Blob([json], { type: "application/json" });
const href = URL.createObjectURL(blob);

// create "a" HTLM element with href to file
const link = document.createElement("a");
link.href = href;
link.download = fileName + ".json";
document.body.appendChild(link);
link.click();

// clean up "a" element & remove ObjectURL
document.body.removeChild(link);
URL.revokeObjectURL(href);



    //  return data;
   


    },
    loadModule: (e:any) => {

      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text = (e.target?.result)
        console.log(text);
        openModule(text);
        
      };
      reader.readAsText(e.target.files[0])
    
      




    },
    
   


    destroy: () => area.destroy(),
  };
}
