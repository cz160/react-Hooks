import React, { useState } from "react";

import ImageClip from "./components/ImageClip";

const App = () => {
  const [src, setSrc] = useState();
  return (
    <>
      <ImageClip
        onChange={(url) => {
          setSrc(url);
        }}
      />
      <img src={src} />
    </>
  );
};

export default App;
