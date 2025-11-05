import React, { useState } from "react";

export default function InlineFillQuestion({ template, value = [], onChange, disabled }) {
  const parts = template.split("__");
  const blanks = parts.length - 1;
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (val, idx) => {
    const copy = [...value];
    copy[idx] = val;
    onChange(copy);
  };

  return (
    <p className="font-mono text-lg leading-8">
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          {part}

          {idx < blanks && (
            <>
              {editingIndex === idx && !disabled ? (
                <input
                  autoFocus
                  className="px-2 py-1 mx-1 text-center border-b-2 border-blue-500 focus:outline-none"
                  value={value[idx] || ""}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onBlur={() => setEditingIndex(null)}
                />
              ) : (
                <span
                  className="px-2 mx-1 text-center bg-blue-100 rounded cursor-pointer hover:bg-blue-200"
                  onClick={() => !disabled && setEditingIndex(idx)}
                >
                  {value[idx] && value[idx] !== "" ? value[idx] : "___"}
                </span>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}
