import React from "react";
import { ModeToggle } from "@/components/theme-toggle";

const Navigation = () => {
  return (
    <nav>
      <header className="flex h-20 w-full items-center px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Words Revision
            </h1>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navigation;
