// 從 @xyflow/react 導入所需的組件和函數
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
} from '@xyflow/react';
// 導入 React Flow 的默認樣式
import '@xyflow/react/dist/style.css';
// 從 React 導入所需的鉤子
import { useCallback, useState } from 'react';
// 導入自定義節點組件
import StartNode from './StartNode';
import TextUpdaterNode from './TextUpdaterNode';
// 導入自定義樣式
import './node-styles.css';
import './text-updater-node.css';

// 定義節點類型，將自定義組件映射到特定類型
const nodeTypes = { 
  textUpdater: TextUpdaterNode,
  start: StartNode
};

// 定義初始節點數組
const initialNodes = [
  {
    id: 'node-1',
    type: 'start',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: 'node-2',
    type: 'textUpdater',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
  },
];

// 定義初始邊（連接）數組
const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
];

// 定義 React Flow 的背景樣式
const rfStyle = {
  backgroundColor: '#f0f0f0',
};

function App() {
  // 使用 useState 鉤子管理節點和邊的狀態
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // 處理節點變化的回調函數
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // 處理邊變化的回調函數
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // 處理節點連接的回調函數
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // 添加新節點的函數
  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'textUpdater',
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // 隨機位置
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes]);

  // 刪除最後一個節點的函數
  const removeNode = useCallback(() => {
    if (nodes.length > 0) {
      setNodes((nds) => nds.slice(0, -1));
    }
  }, [nodes]);

  // 清除所有節點和邊的函數
  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  return (
    // 設置容器樣式，使其佔滿整個視窗
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* 渲染 ReactFlow 組件 */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView // 自動調整視圖以顯示所有節點
        style={rfStyle}
      >
        {/* 添加背景組件 */}
        <Background />
        {/* 添加控制組件（縮放、平移等） */}
        <Controls />
        {/* 添加小地圖組件 */}
        <MiniMap />
        {/* 添加控制面板 */}
        <Panel position="top-left">
          <button onClick={addNode} style={{ marginRight: '5px' }}>添加節點</button>
          <button onClick={removeNode} style={{ marginRight: '5px' }}>刪除節點</button>
          <button onClick={clearAll}>清除所有</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;