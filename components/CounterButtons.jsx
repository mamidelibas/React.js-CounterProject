import React from "react";
import { useDispatch } from "react-redux";

export default function CounterButtons(props) {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-screen flex flex-col justify-center bg-gray-200 items-center">
      <div className=" shadow-2xl mt-5 bg-gray-950 px-72 py-16 flex flex-col gap-5 items-center justify-center  ">
        <b className="text-white text-2xl">
          <b
            style={{
              borderBottom: "1px solid white",
            }}
          >
            {props.counterValue}
          </b>
        </b>
        <div className="flex gap-10">
          <button
            className="bg-gray-200 px-6 py-2 border-none rounded-lg text-black font-bold"
            onClick={() => {
              dispatch({
                type: "AZALT",
              });
            }}
          >
            AZALT
          </button>
          <button
            className="bg-gray-200 px-6 py-2 border-none rounded-lg text-black font-bold"
            onClick={() => {
              dispatch({
                type: "ARTTIR",
              });
            }}
          >
            ARTIR
          </button>
        </div>
      </div>
    </div>
  );
}
