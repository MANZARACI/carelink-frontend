import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DailyPage = () => {
  const { date } = useParams();

  return (
    <>
      <Navbar />
      <div>{date}</div>
    </>
  );
};

export default DailyPage;
