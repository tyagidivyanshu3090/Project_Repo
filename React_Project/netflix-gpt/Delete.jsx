import React, { useRef, useEffect } from "react";

function MyInput() {
  // 1. Create the ref object. Its .current will start as `undefined`.
  const inputRef = useRef(null);

  useEffect(() => {
    // 3. Now, inputRef.current points to the actual <input> DOM node.
    // We can call DOM methods on it, like .focus().
    inputRef.current.focus();
  }, []); // Empty array means this runs once after the component mounts

  return (
    // 2. Attach the ref to the DOM element.
    <input ref={inputRef} type="text" />
  );
}

export default MyInput;


