"use client";
import { googleAuth } from "@/lib/firebase"; 
import Image from "next/image";
import React from "react";

function ClientAuthComponent() {
  return (
    <div className="mt-12 max-w-80  mx-auto  w-full grid grid-cols-1 gap-4 font-medium text-black/90">
      <button
        onClick={async () => {
          alert("Google Signing...");
          await googleAuth();
          alert("Google Signing... Done");
        }}
        className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer"
      >
        <span>
          <Image
            priority
            src="/icons/Google.svg"
            alt=""
            width={20}
            height={20}
          />
        </span>
        <span>Continue with Google</span>
      </button>{" "}
      <button disabled className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer">
        <span>
          <Image
            priority
            src="/icons/Microsoft.svg"
            alt=""
            width={20}
            height={20}
          />
        </span>
        <span>Continue with Microsoft</span>
      </button>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <div className="w-full h-[2px] rounded-full bg-neutral-300"></div>
        <span>or</span>
        <div className="w-full h-[2px] rounded-full bg-neutral-300"></div>
      </div>
      <button disabled className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer">
        <span>
          <Image
            priority
            src="/icons/Apple.svg"
            alt=""
            width={20}
            height={20}
          />
        </span>
        <span>Continue with Apple</span>
      </button>
    </div>
  );
}

export default ClientAuthComponent;
