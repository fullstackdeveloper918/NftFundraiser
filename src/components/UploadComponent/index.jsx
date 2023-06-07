import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../pintura/pintura.css";
import { openDefaultEditor } from "../pintura/pintura";

const thumb = {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
  marginRight: 8,
  padding: 4,
  boxSizing: "border-box",
};
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 2,
  border: "1px solid #fff",
};
const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
const thumbButton = {
  marginRight: "4px",
  marginBottom: "4px",
  padding: "6px 12px",
  background: "#FFFFFF",
  border: "1px solid #EAEAEA",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333333",
  cursor: "pointer",
};
const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  return (
    <div
      style={{
        height: "300px",
        border: "1px solid black",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      className="dropzone"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p style={{ color: "#fff" }}>
        Drag 'n' drop some files here, or click to select files
      </p>
    </div>
  );
};
function UploadComponent({ imageSrc, setImageSrc }) {
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (imageSrc?.preview) {
      setPreview(imageSrc?.preview);
    }
  }, [imageSrc, preview]);

  const handleDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => {
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        path: file.path,
        lastModifiedDate: file.lastModifiedDate,
        preview: URL.createObjectURL(file),
      };
    });
    setImageSrc(...updatedFiles);
  };

  const editImage = (image) => {
    const imageFile = image.pintura ? image.pintura.file : image;
    const imageState = image.pintura ? image.pintura.data : {};

    const editor = openDefaultEditor({
      src: imageFile?.preview,
      imageState,
    });

    editor.on("close", () => {
      // the user cancelled editing the image
    });
    editor.on("process", ({ dest, imageState }) => {
      const updatedFiles = { ...imageSrc };
      Object.assign(dest, {
        pintura: { file: imageFile, data: imageState },
      });

      // Create a new URL for the edited image
      const editedImageURL = URL.createObjectURL(dest);

      // Update the preview URL of the edited file
      updatedFiles.preview = editedImageURL;
      setImageSrc(updatedFiles);
    });
  };

  return (
    <div>
      {!!imageSrc === false ? (
        <Dropzone onDrop={handleDrop} />
      ) : (
        <div style={thumb}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={thumbButton} onClick={() => editImage(imageSrc)}>
              Edit
            </button>
            <button style={thumbButton} onClick={() => setImageSrc("")}>
              Delete
            </button>
          </div>

          <div style={thumbInner}>
            <img src={preview} style={img} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
export default UploadComponent;
