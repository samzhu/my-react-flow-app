<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Fsamzhu%2Fmy-react-flow-app">
  <img
    height="32"
    alt="Open in IDX"
    src="https://cdn.idx.dev/btn/open_light_32.svg">
</a>

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


``` bash
nvm install 20
nvm use 20

npm create vite@latest my-react-flow-app -- --template react
npm install @xyflow/react

npm run dev
```


清除 src/App.jsx 換成以下內容

``` js
import React from 'react';
import { ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
```