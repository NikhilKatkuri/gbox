import Link from "next/link";
import ClientAuthComponent from "./client";

export const metadata = {
  title: "Gbox - Auth",
  description:
    "Gbox unifies your Google and Outlook emails into a single, clutter-free space. Fast, secure, and built with simplicity at its core.",
};

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
          <ClientAuthComponent/>
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
