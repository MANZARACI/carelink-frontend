import React from "react";
import Navbar from "../components/Navbar";
import DeviceIdController from "../components/DeviceIdController";

const SettingsPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white sm:max-w-md mt-6 mx-2 sm:mx-auto rounded-md border border-gray-300 shadow-lg p-4">
        <DeviceIdController />
      </main>
    </>
  );
};

export default SettingsPage;
