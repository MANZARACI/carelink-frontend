import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const DeviceIdController = () => {
  const [deviceId, setDeviceId] = useState();
  const [error, setError] = useState();

  const newDeviceIdRef = useRef();

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchDeviceId = onValue(
      ref(db, "users/" + currentUser.uid + "/deviceId"),
      (snapshot) => {
        if (snapshot.exists()) {
          setDeviceId(snapshot.val());
        }
      }
    );

    return fetchDeviceId;
  }, [currentUser.uid]);

  const updateDeviceIdHandler = async () => {
    const newDeviceId = newDeviceIdRef.current.value.trim();
    setError("");

    // new device id validation
    if (!newDeviceId) {
      return;
    }

    if (newDeviceId.length !== 6) {
      setError("Device id must be 6 characters long!");
      return;
    }

    if (newDeviceId === deviceId) {
      setError("This is your current device id!");
      return;
    }

    const toastId = toast.loading("Changing device id...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/device/deviceId",
        {
          newDeviceId,
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
  };

  return (
    <>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="flex flex-col sm:flex-row sm:space-x-2 m-sm:space-y-2">
        <div className="flex rounded-md shadow-lg">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm">
            Device ID
          </span>
          <input
            ref={newDeviceIdRef}
            defaultValue={deviceId ? deviceId : null}
            maxLength="6"
            type="text"
            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="New Device ID"
          />
        </div>
        <button
          onClick={updateDeviceIdHandler}
          className="rounded-md flex-1 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default DeviceIdController;
