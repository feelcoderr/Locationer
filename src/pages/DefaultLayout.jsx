import React from "react";
import MapView from "../components/MapView";

function DefaultLayout() {
  return (
    <div className="relative">
      <div className="relative z-0">
        <MapView />
      </div>
      <header className="absolute z-10 top-5 right-2 rounded">
        <h1 className="p-2 font-sans font-bold text-xl rounded inline  bg-cyan-500 text-white ">
          Locationizer
        </h1>
      </header>
    </div>
  );
}

export default DefaultLayout;
