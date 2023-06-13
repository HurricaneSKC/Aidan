"use client";

import { SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";
import Modal from "../shared/modal";
import { useDemoModal } from "./demo-modal";


export default function SearchGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const { DemoModal, setShowDemoModal } = useDemoModal(searchQuery, setSearchQuery);
  
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <DemoModal />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="col-span-2 flex w-96 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
      />
      <button
        onClick={() => setShowDemoModal(true)}
        className="col-span-1 flex w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none bg-[#005eb8] active:bg-gray-100"
      >
        <p className="text-white">Search</p>
      </button>
    </div>
  );
}





