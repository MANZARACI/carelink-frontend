import React, { useState, useRef } from "react";
import ImageInput from "./ImageInput";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const FaceController = (props) => {
  const [encoded, setEncoded] = useState();
  const [encoded2, setEncoded2] = useState();
  const [encoded3, setEncoded3] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const faceNameRef = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const label = faceNameRef.current.value.trim();

    if (!label) {
      return;
    }
    if (!encoded || !encoded2 || !encoded3) {
      setError("You must select 3 images to save a face!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Saving new face...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/face/add-face-base64",
        {
          encoded,
          encoded2,
          encoded3,
          label,
        },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      toast.update(toastId, {
        type: toast.TYPE.SUCCESS,
        render: response.data.successMessage,
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      setError(error.response.data.errorMessage);
      toast.update(toastId, {
        type: toast.TYPE.ERROR,
        render: error.response.data.errorMessage,
        isLoading: false,
        autoClose: 3000,
      });
    }

    props.afterSave();
    setLoading(false);
  };

  return (
    <div>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <form>
        <ImageInput imageSetter={setEncoded} />
        <ImageInput imageSetter={setEncoded2} className="my-2" />
        <ImageInput imageSetter={setEncoded3} />
        <div className="flex mt-4">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm">
            Name
          </span>
          <input
            ref={faceNameRef}
            type="text"
            className="w-full rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            onClick={clickHandler}
            className="rounded-md border border-transparent bg-indigo-600 ml-2 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaceController;
