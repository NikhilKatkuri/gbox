import Image from "next/image";
import Link from "next/link";

export default function AuthScreeb() {
  return (
    <div className="h-screen w-full bg-gray-50 *:font-sans">
      <nav className="flex h-10 w-full"></nav>
      <div className="h-[calc(100%-80px)] flex-1 flex items-center justify-center">
        <div className="h-auto">
          <div className="max-w-lg text-center">
            <p className="text-3xl md:text-4xl text-black font-medium text-center mb-2 ">
              Welcome Back!
            </p> 
            <p className="text-sm text-neutral-500 px-4 sm:px-2">
              <span className="text-black font-medium">Gbox</span> unifies your{" "}
              <span className="text-black font-medium">Google</span> and{" "}
              <span className="text-black font-medium">Outlook emails</span>{" "}
              into a single, clutter-free space. Fast, secure, and built with
              simplicity at its core. so you can focus on conversations, not
              chaos.
            </p>
          </div>
          <div className="mt-12 max-w-80  mx-auto  w-full grid grid-cols-1 gap-4 font-medium text-black/90">
            <button className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer">
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
            <button className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer">
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
            <button className="py-3.5 px-6 w-full flex items-center gap-4 rounded-full border border-neutral-300 transition-all ease-in-out duration-200 bg-transparent hover:bg-black/4 cursor-pointer">
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
        </div>
      </div>
      <footer className="flex items-center justify-center h-10">
        <div className="flex items-center gap-3 text-xs font-medium text-neutral-500">
          <Link href={"/"} className="underline">
            Terms of Use
          </Link>
          <div className="h-1 rounded-full w-1 bg-neutral-600" />
          <Link href={"/"} className="underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
