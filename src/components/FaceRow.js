import React from "react";

const FaceRow = (props) => {
  const { face, deleteHandler } = props;

  return (
    <div className="flex rounded-md my-4 space-x-2">
      <span className="inline-flex items-center w-full rounded-md border border-gray-300 bg-gray-50 px-3">
        {face.label}
      </span>
      <button
        onClick={() => deleteHandler(face.id)}
        className="rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete
      </button>
    </div>
  );
};

export default FaceRow;
