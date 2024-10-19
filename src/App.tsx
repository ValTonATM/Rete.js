import { useCallback } from "react";
import { message ,Button, Space,Tabs} from "antd";
import { useRete } from "rete-react-plugin";
import { createEditor } from "./editor";

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const create = useCallback(
    (el: HTMLElement) => {
      return createEditor(el, (text, type) => messageApi[type](text));
    },
    [messageApi]
  );
  const [ref,editor] = useRete(create);

  return (
    <div className="App">
      {contextHolder}

      <Space className="header">

      <Tabs

        items={[{
          key: "JonnyQuest",
          label: "Jonny Quest"
        }]}

      />
      <Button size="small" 
      onClick={() =>editor?.saveModule()}
      >
            Сохранить
          </Button>


          <input type="file" onChange={(e) => editor?.loadModule(e)} />

          {/* <Button size="small" 
      onClick={() =>editor?.loadModule()}
      >
            Загрузить
          </Button> */}

      </Space>
      <div ref={ref} style={{ height: "100vh", width: "100vw" }}></div>
    </div>
  );
}
