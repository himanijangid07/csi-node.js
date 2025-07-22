import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

export default function EditorPage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    socket.on('code-change', (newCode) => {
      setCode(newCode);
    });
    return () => socket.off('code-change');
  }, []);

  const handleCodeChange = (value) => {
    setCode(value);
    socket.emit('code-change', value);
  };

  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.stdout || data.stderr || 'No output');
    } catch (err) {
      setOutput('Error executing code');
    }
  };

  return (
    <div className="p-6">
      <CodeMirror
        value={code}
        height="600px"
        theme={oneDark}
        extensions={[javascript()]}
        onChange={handleCodeChange}
      />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Run Code
      </button>
      <div className="mt-4 bg-gray-800 text-white p-4 rounded">
        <h3 className="text-lg font-bold">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}