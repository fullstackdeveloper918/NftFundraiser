import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../pintura/pintura.css";
import { openDefaultEditor } from "../pintura/pintura";
import { Button } from "react-bootstrap";

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
  width: "100%",
  maxHeight: "400px",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 2,
  border: "1px solid #373737cc",
  alignItems: "center" /* Vertically center the image within the container */,
  justifyContent:
    "center" /* Horizontally center the image within the container */,
    marginTop: "20px",
};
const img = {
  display: "block",
  maxHeight:
    "100%" /* Make the image take up the full height of the container */,
  maxWidth: "100%" /* Ensure the image maintains its aspect ratio */,
  objectFit:
    "contain" /* Fit the image within the container while maintaining aspect ratio */,
  width: "auto",
  height: "100%",
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
  const [previewObj, setPreviewObj] = useState();

 
  const handleDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => {
      setPreviewObj({
        name: file.name,
        size: file.size,
        type: file.type,
        path: file.path,
        lastModifiedDate: file.lastModifiedDate,
        preview: URL.createObjectURL(file),
      });
      return file;
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
      const updatedFiles = { ...previewObj };
      Object.assign(dest, {
        pintura: { file: imageFile, data: imageState },
      });

      // Create a new URL for the edited image
      const editedImageURL = URL.createObjectURL(dest);

      // Update the preview URL of the edited file
      updatedFiles.preview = editedImageURL;
      setPreviewObj(updatedFiles);
      setImageSrc(dest);
    });
  };

  return (
    <div>
      {!!previewObj === false ? (
        <Dropzone onDrop={handleDrop} />
      ) : (
        <div style={thumb}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <button style={thumbButton} onClick={() => editImage(previewObj)}>
              Edit
            </button> */}
            <Button
              // variant="primary"
              className="edit_btn"
              onClick={() => editImage(previewObj)}
            >
              Edit
            </Button>
            <Button
              // variant="primary"
              className="delete_btn"
              onClick={() => setPreviewObj("")}
            >
              Delete
            </Button>
            {/* <button style={thumbButton} >
              Delete
            </button> */}
          </div>

          <div style={thumbInner}>
            <img src={previewObj?.preview} style={img} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
export default UploadComponent;
