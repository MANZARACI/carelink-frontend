import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const TrackerRow = (props) => {
  const { tracker, date, onUpdate } = props;

  const valueRef = useRef();

  const { currentUser } = useAuth();

  const saveValue = async () => {
    const newValue = valueRef.current.value.trim();

    const toastId = toast.loading("Saving value...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/tracker/add-value",
        {
          date,
          name: tracker.name,
          value: newValue,
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
    <div className="flex rounded-md my-4">
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm">
        {tracker.name}
      </span>
      <input
        ref={valueRef}
        defaultValue={tracker.value ? tracker.value : null}
        type="number"
        step="any"
        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <button
        onClick={saveValue}
        className="rounded-md border border-transparent bg-indigo-600 ml-2 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  );
};

export default TrackerRow;
