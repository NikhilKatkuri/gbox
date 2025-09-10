import Image from "next/image";
import React from "react";

function Profile() {
  return (
    <div className="h-screen w-screen p-3 bg-black/3 flex items-center justify-center">
      <div className="p-6 bg-white w-full max-w-[90%] sm:max-w-96 md:gap-3 md:max-w-[48rem] rounded-md h-full flex max-md:flex-col max-h-96">
        <div className="h-full md:h-full md:w-1/2 bg-gradient-to-tr from-indigo-500/10 to-indigo-500/50 rounded-md"></div>
        <div className="h-full md:h-full md:w-1/2 bg-background p-2 flex flex-col gap-3">
          <h1 className="font-bold text-xl">Your Profile</h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">Name</p>
            <input
              type="text"
              className="w-full h-10 outline-none border border-black/10 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">email</p>
            <input
              type="text"
              readOnly
              className="w-full h-10 outline-none border border-indigo-500/50 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">subscription</p>
            <input
              type="text"
              readOnly
              className="w-full h-10 outline-none border border-indigo-500/50 rounded-md px-2"
            />
          </div>
          <button className="w-full h-10 rounded-md bg-black text-white text-center cursor-pointer transition-all ease-in-out duration-300 mt-2 active:scale-95">
            update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
