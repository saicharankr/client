import React from "react";
const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const ListOfDays = ({
  daySelected,
  setDaySelected,
  setDoctorSelected,
}) => {
  return (
    <div className="grid lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 s:grid-cols-1">
      {Days.map((ele, index) => {
        return (
          <div
            key={index}
            className={`days_of_week select-none ${
              ele === daySelected && "day_active"
            }`}
            onClick={() => {
              setDaySelected(ele);
              setDoctorSelected("");
            }}
          >
            {ele}
          </div>
        );
      })}
    </div>
  );
};
