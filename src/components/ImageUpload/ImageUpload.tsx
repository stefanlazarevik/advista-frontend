import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
type Props = {
  imageLink?: string;
  onChange?: (e: any) => void;
};
const ImageUpload = ({ imageLink, onChange }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageLink);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
      if (onChange) {
        onChange(acceptedFiles[0]);
      }
    },
  });
  //
  // const files = acceptedFiles.map((file: any) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {previewUrl ? (
          <div className="space-y-1 text-center">
            <img className="inline-block h-32 w-32" src={previewUrl} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            {' '}
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Upload or drag and drop PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </section>
  );
};
export default ImageUpload;
