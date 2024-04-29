import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Step1({ handleSubmit }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    handleSubmit(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default Step1;
