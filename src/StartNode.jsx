import { Handle, Position } from '@xyflow/react';
import React, { useState } from 'react';

function StartNode({ data, isConnectable }) {
  const [inputs, setInputs] = useState([
    { name: 'USER_INPUT', type: 'String', description: 'User input for this round of chat', required: true }
  ]);

  const addInput = () => {
    setInputs([...inputs, { name: '', type: 'String', description: '', required: false }]);
  };

  const updateInput = (index, field, value) => {
    if (index === 0) return; // 防止修改 USER_INPUT
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const removeInput = (index) => {
    if (index === 0) return; // 防止移除 USER_INPUT
    setInputs(inputs.filter((_, i) => i !== index));
  };

  return (
    <div className="start-node">
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="a"  // 添加 id="a"
        isConnectable={isConnectable} 
      />
      <div className="node-header">
        <h3>Start</h3>
        <p>The starting node of the workflow, used to set the information needed to initiate the workflow.</p>
      </div>
      <div className="node-content">
        <h4>Input</h4>
        {inputs.map((input, index) => (
          <div key={index} className="input-row">
            <input
              value={input.name}
              onChange={(e) => updateInput(index, 'name', e.target.value)}
              placeholder="Variable name"
              readOnly={index === 0}
            />
            <select
              value={input.type}
              onChange={(e) => updateInput(index, 'type', e.target.value)}
              disabled={index === 0}
            >
              <option value="String">String</option>
              <option value="Number">Number</option>
              <option value="Boolean">Boolean</option>
            </select>
            <input
              value={input.description}
              onChange={(e) => updateInput(index, 'description', e.target.value)}
              placeholder="Description"
              readOnly={index === 0}
            />
            <input
              type="checkbox"
              checked={input.required}
              onChange={(e) => updateInput(index, 'required', e.target.checked)}
              disabled={index === 0}
            />
            {index !== 0 && <button onClick={() => removeInput(index)}>-</button>}
          </div>
        ))}
        <button onClick={addInput}>+ Add</button>
      </div>
    </div>
  );
}

export default StartNode;