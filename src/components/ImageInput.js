import React from "react";

const ImageInput = (props) => {
  const { imageSetter } = props;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    imageSetter(base64.split(",")[1]);
  };

  return (
    <label className={`block ${props.className}`}>
      <span className="sr-only">Choose face image</span>
      <input
        onChange={(e) => handleChange(e)}
        type="file"
        className="block w-full text-sm text-gray-500 
        file:me-4 file:py-2 file:px-4 file:rounded-lg
        file:border-0 file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none"
      />
    </label>
  );
};

export default ImageInput;
