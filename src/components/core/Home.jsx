import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { createBooking, logout } from "../../services/UserService";
import { DoctorsList, TimeSlotSelection } from "./components/DoctorsList";
import { ListOfDays } from "./components/ListOfDays";
import "./style.scss";
import { remove } from "lodash";

export const Home = () => {
  const [daySelected, setDaySelected] = useState("Monday");
  const [doctorSelected, setDoctorSelected] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const { data, loading, error } = useFetchData("/doctors");

  const user = JSON.parse(localStorage.getItem("user"));

  const timeSlotHandler = async (slot) => {
    let data = {
      name: doctorSelected.Name,
      slot,
      day: daySelected,
    };

    let found = timeSlots.some(
      (ele) =>
        ele.name === data.name && ele.slot === data.slot && ele.day === data.day
    );
    if (!found) {
      setTimeSlots((prev) => [...prev, data]);
    } else {
      let temp = remove(timeSlots, (ele) => {
        return !(
          ele.name === data.name &&
          ele.slot === data.slot &&
          ele.day === data.day
        );
      });
      setTimeSlots(temp);
    }
  };

  const submitBooking = async () => {
    let res = await createBooking(timeSlots);
    if (res.error === false) {
      alert("Booking Success");
      window.location.reload();
    }
  };
  const filteredData =
    !loading && data.filter((ele) => ele["Day of Week"] === daySelected);
  return (
    <div>
      {!loading ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-mono text-xl font-bold">
              Hello {user.first_name} {user.last_name} !
            </h1>
            <h2 className="font-mono text-lg font-semibold">
              Book your doctors appoinment
            </h2>
          </div>
          <div className="mt-5">
            <ListOfDays
              daySelected={daySelected}
              setDaySelected={setDaySelected}
              setDoctorSelected={setDoctorSelected}
            />
            <div className="px-2 pt-5">
              <span className="font-mono text-lg font-bold">
                List of doctors avaliable for day
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              <DoctorsList
                data={filteredData}
                doctorSelected={doctorSelected}
                setDoctorSelected={setDoctorSelected}
              />
              {doctorSelected ? (
                <TimeSlotSelection
                  doctorSelected={doctorSelected}
                  daySelected={daySelected}
                  timeSlots={timeSlots}
                  timeSlotHandler={timeSlotHandler}
                />
              ) : (
                <span> No doctor selected</span>
              )}
            </div>
            <div className="flex justify-center mt-24 ">
              <button
                className={`px-20 py-5 font-mono text-lg mb-10 font-bold bg-blue-600 cursor-pointer focus:outline-none ${
                  timeSlots.length === 0 && "opacity-25 cursor-not-allowed"
                } rounded-xl`}
                onClick={() => submitBooking()}
              >
                Book
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Loading .........</div>
      )}
    </div>
  );
};
