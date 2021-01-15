import React, { useRef } from "react";

import "./index.css";

const ImageClip = (props) => {
  const { onChange } = props;
  const inputFileRef = useRef();
  const canvasRef = useRef();

  const handleUpload = () => {
    inputFileRef.current.click();
  };
  const handleChange = () => {
    const file = inputFileRef.current.files[0];
    if (!file) return;
    let fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.onload = (e) => {
      let image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        // 绘制图片
        drawImage(image);
      };
    };
  };
  const drawImage = (image) => {
    // 绘制图片
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(image, 0, 0, 500, 500);
  };
  const save = () => {
    const ctx = canvasRef.current.getContext("2d");
    let imageData = ctx.getImageData(150, 150, 200, 200),
      canvas2 = document.createElement("canvas"),
      ctx2 = canvas2.getContext("2d");
    canvas2.width = 200;
    canvas2.height = 200;
    ctx2.putImageData(imageData, 0, 0, 0, 0, 200, 200);
    const imageUrl = canvas2.toDataURL("image/png");
    onChange(imageUrl);
  };
  return (
    <div className="clipImageBoxWrap">
      <div
        className="clipImageBox"
        onMouseDown={(e) => {
          console.log(e);
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="canvasBox"
        ></canvas>
        <div className="mark"></div>
      </div>
      <div className="buttonBox">
        <input
          onChange={handleChange}
          type="file"
          ref={inputFileRef}
          accept="image/*"
          className="file"
        />
        <button className="choose" onClick={handleUpload}>
          选择图片
        </button>
        <button className="saveImg" onClick={save}>
          保存
        </button>
      </div>
    </div>
  );
};

export default ImageClip;
