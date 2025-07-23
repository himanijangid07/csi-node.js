import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript'; // or any other language

export default function EditorOnlyPage() {
  const [code, setCode] = useState('// Start coding...');

  return (
    <div style={{ padding: '1rem' }}>
      <h2 className="text-xl font-bold mb-2">Code Editor</h2>
      <CodeMirror
        value={code}
        height="400px"
        theme="dark"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
