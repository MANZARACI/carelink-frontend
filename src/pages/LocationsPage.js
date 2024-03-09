import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import LocationCard from "../components/LocationCard";

const LocationsPage = () => {
  const [deviceId, setDeviceId] = useState();
  const [locationList, setLocationList] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchLocations = onValue(
      query(ref(db, "devices/" + deviceId), limitToLast(5)),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((location) => {
            data.unshift(location.val());
          });
          setLocationList(data);
        } else {
          setLocationList(null);
        }
        setLoading(false);
      }
    );

    return fetchLocations;
  }, [deviceId]);

  return (
    <>
      <Navbar />
      <main className="mt-6 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-3/7 2xl:w-5/12 mx-2 sm:mx-auto">
        {locationList ? (
          Object.values(locationList).map((location, i) => {
            return <LocationCard key={i} location={location} />;
          })
        ) : loading ? (
          <div className="text-center text-3xl font-bold">Loading</div>
        ) : (
          <div className="text-center text-3xl font-bold">
            No Location Found
          </div>
        )}
      </main>
    </>
  );
};

export default LocationsPage;
