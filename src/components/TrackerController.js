import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const TrackerController = (props) => {
  const [error, setError] = useState();

  const trackerRef = useRef();

  const { onUpdate } = props;

  const { currentUser } = useAuth();

  const addTrackerHandler = async () => {
    const newTrackerName = trackerRef.current.value.trim();
    setError("");

    if (!newTrackerName) {
      return;
    }

    const toastId = toast.loading("Adding tracker...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/tracker",
        {
          name: newTrackerName,
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

    onUpdate();
  };

  const deleteTrackerHandler = async () => {
    const trackerName = trackerRef.current.value.trim();
    setError("");

    if (!trackerName) {
      return;
    }

    const toastId = toast.loading("Deleting tracker...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          "/tracker?trackerName=" +
          trackerName,
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

    onUpdate();
  };

  return (
    <>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="flex flex-col sm:flex-row sm:space-x-2 m-sm:space-y-2">
        <div className="flex rounded-md shadow-lg">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm">
            Tracker
          </span>
          <input
            ref={trackerRef}
            maxLength="20"
            type="text"
            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Tracker Name"
          />
        </div>
        <button
          onClick={addTrackerHandler}
          className="rounded-md flex-1 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add
        </button>
        <button
          onClick={deleteTrackerHandler}
          className="rounded-md flex-1 border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TrackerController;
