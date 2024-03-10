import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  const onClick = (value) => {
    setDate(value);
    const dd = value.getDate();
    const mm = value.getMonth() + 1;
    const yyyy = value.getFullYear();
    const formattedDate = dd + "-" + mm + "-" + yyyy;
    navigate("/calendar/" + formattedDate);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Calendar
        className="m-auto md:w-1/2 xl:w-2/5 2xl:w-1/3 md:leading-10"
        value={date}
        onClickDay={onClick}
      />
    </div>
  );
};

export default CalendarPage;
