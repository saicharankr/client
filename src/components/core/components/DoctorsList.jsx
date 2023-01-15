import React from "react";
import { ownUnique } from "../helper/helper";
import { useFetchData } from "../../../hooks/useFetchData";

export const DoctorsList = ({ data, setDoctorSelected, doctorSelected }) => {
  let alteredData = ownUnique(data);
  return (
    <div>
      {alteredData.map((ele, index) => {
        return (
          <div
            className={`grid gap-5 text-left items-center justify-center py-3 p-10 cursor-pointer m-2 w-100 border-2 border-red-500 rounded-2xl ${
              doctorSelected &&
              doctorSelected.Name === ele.Name &&
              "bg-yellow-300"
            }`}
            onClick={() => setDoctorSelected(ele)}
            key={index}
          >
            <span
              className={`p-5 font-mono text-base select-none antialiased font-semibold`}
            >
              {ele.Name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const TimeSlotSelection = ({
  doctorSelected,
  timeSlotHandler,
  timeSlots,
}) => {
  const { data, loading, error } = useFetchData(
    `/bookings?name=${doctorSelected.Name}&day=${doctorSelected["Day of Week"]}`
  );
  console.log(data);
  // eslint-disable-next-line array-callback-return
  let filterData =
    !loading &&
    data.map((ele) => {
      if (
        ele.name === doctorSelected.Name &&
        ele.day === doctorSelected["Day of Week"]
      ) {
        return ele.slot;
      }
    });
  let filterSlots = timeSlots.map((ele) => {
    if (
      ele.name === doctorSelected.Name &&
      ele.day === doctorSelected["Day of Week"]
    ) {
      return ele.slot;
    }
  });
  return (
    <div className="grid p-5">
      <div className="font-mono text-lg">
        Doctor{" "}
        <span className="font-mono text-lg font-bold">
          {doctorSelected.Name}
        </span>{" "}
        avaliable at following times
      </div>
      {!loading ? (
        <>
          <div className="flex-wrap items-center justify-center p-2 flex-gap">
            {doctorSelected.timeSlots.map((ele, index) => {
              return (
                <div
                  onClick={() => timeSlotHandler(ele)}
                  className={`px-3 py-1 border-2 select-none border-black-100 cursor-pointer ${
                    filterSlots.includes(ele) && "bg-red-500"
                  } ${
                    filterData.includes(ele) &&
                    "bg-blue-600 cursor-not-allowed pointer-events-none"
                  }`}
                  key={index}
                >
                  <span className="select-none">{ele}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
