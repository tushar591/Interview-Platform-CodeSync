import Link from "next/link";

import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DashBoard";
import { ModeToggle } from "./providers/ModeToggle";
import AIMockInterviewButton from "./AIMockInterviewButton";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-6 container mx-auto">
        {/* LEFT SIDE -LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-emerald-500" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            CodeSync
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <AIMockInterviewButton />
            <DasboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
export default Navbar;