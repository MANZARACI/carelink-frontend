import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TrackerController from "../components/TrackerController";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import TrackerRow from "../components/TrackerRow";

const DailyPage = () => {
  const { date } = useParams();

  const [trackerList, setTrackerList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { currentUser } = useAuth();

  const fetchTrackers = useCallback(async () => {
    setLoading(true);
    setError("");

    const idToken = await currentUser.getIdToken();

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/tracker/by-day?date=" + date,
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      setTrackerList(response.data.valuesByDate);
    } catch (error) {
      setError(error.response.data.errorMessage);
    }
    setLoading(false);
  }, [currentUser, date]);

  useEffect(() => {
    fetchTrackers();
  }, [fetchTrackers]);

  return (
    <>
      <Navbar />
      <main className="bg-white sm:max-w-md mt-6 mx-2 sm:mx-auto rounded-md border border-gray-300 shadow-lg p-4">
        <TrackerController onUpdate={fetchTrackers} />
        <h2 className="text-center text-2xl font-bold mt-4">Trackers</h2>
        {trackerList ? (
          trackerList.map((tracker, i) => {
            return (
              <TrackerRow
                key={i}
                onUpdate={fetchTrackers}
                tracker={tracker}
                date={date}
              />
            );
          })
        ) : loading ? (
          <div className="text-center text-3xl font-bold">Loading</div>
        ) : (
          <div className="text-center text-3xl font-bold">No Tracker Found</div>
        )}
        <div className="text-end">Date: {date.replaceAll("-", "/")}</div>
      </main>
    </>
  );
};

export default DailyPage;
