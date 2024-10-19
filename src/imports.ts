import {Context } from "./editor";
import {Connection } from "./chatbot/connection";
import {
    Minigame,
    Switch,
    Intermediate,
    StartGame,
    EndGame
  } from "./chatbot/nodes";
import { removeConnections } from "./utils";

export async function createNode(
  { editor, area}: Context,
  name: string,
  data: any
) {

    

  if (name === "СТАРТ") return new StartGame();
  if (name === "SWITCH") return new Switch(data);
  if (name === "INTERMEDIATE") return new Intermediate(data);
  if (name === "MINIGAME") return new Minigame(data);
  if (name === "КОНЕЦ") return new EndGame();
//   if (name === "КОНЕЦ") {
//     const node = new ModuleNode(
//       data.name,
//       modules.findModule,
//       (id) => removeConnections(editor, id),
//       (id) => {
//         area.update("node", id);
//         process();
//       }
//     );
//     await node.update();

//     return node;
//   }
  throw new Error("Unsupported node");
}

export async function importEditor(context: Context, data: any) {
  const { nodes, connections } = data;

  console.log(nodes);

  for (const n of nodes) {
    const node = await createNode(context, n.name, n.data);
    node.id = n.id;
    await context.editor.addNode(node);

    if (n.position !=null)
    context.area.translate(node.id,{x : n.position.x, y: n.position.y});
  }
  for (const c of connections) {
    const source = context.editor.getNode(c.source);
    const target = context.editor.getNode(c.target);

    if (
      source &&
      target &&
      (source.outputs as any)[c.sourceOutput] &&
      (target.inputs as any)[c.targetInput]
    ) {
      const conn = new Connection(
        source,
        c.sourceOutput as never,
        target,
        c.targetInput as never
      );

      await context.editor.addConnection(conn);
    }
  }
}

export function exportEditor(context: Context) {
  const nodes = [];
  const connections = [];

  for (const n of context.editor.getNodes()) {
    nodes.push({
      id: n.id,
      name: n.label,
      data: n.serialize(),
      position : context.area.nodeViews.get(n.id)?.position
    });
  }
  for (const c of context.editor.getConnections()) {
    connections.push({
      source: c.source,
      sourceOutput: c.sourceOutput,
      target: c.target,
      targetInput: c.targetInput
    });
  }

  return {
    nodes,
    connections
  };
}
