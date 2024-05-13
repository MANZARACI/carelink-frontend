import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import FaceRow from "../components/FaceRow";
import FaceController from "../components/FaceController";
import { toast } from "react-toastify";

const FacesPage = () => {
  const [faceList, setFaceList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { currentUser } = useAuth();

  const fetchFaces = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/face?userId=" + currentUser.uid
      );

      if (!!response.data.faceArray.length) {
        setFaceList(response.data.faceArray);
      }
    } catch (error) {
      setError(error.response.data.errorMessage);
    }
    setLoading(false);
  }, [currentUser.uid]);

  const deleteFaceHandler = async (faceId) => {
    setError("");

    const toastId = toast.loading("Deleting face...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/face/delete-face",
        {
          faceId,
        },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      toast.update(toastId, {
        type: toast.TYPE.SUCCESS,
        render: response.data,
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

    fetchFaces();
  };

  useEffect(() => {
    fetchFaces();
  }, [fetchFaces]);

  return (
    <>
      <Navbar />
      <div className="bg-white sm:max-w-md mt-6 mx-2 sm:mx-auto rounded-md border border-gray-300 shadow-lg p-4">
        <FaceController afterSave={fetchFaces} />
        <h2 className="text-center text-2xl font-bold mt-2">Faces</h2>
        {faceList ? (
          faceList.map((face, i) => {
            return (
              <FaceRow key={i} face={face} deleteHandler={deleteFaceHandler} />
            );
          })
        ) : loading ? (
          <div className="text-center text-3xl font-bold">Loading</div>
        ) : (
          <div className="text-center text-3xl font-bold mt-4">
            No Face Found
          </div>
        )}
      </div>
    </>
  );
};

export default FacesPage;
