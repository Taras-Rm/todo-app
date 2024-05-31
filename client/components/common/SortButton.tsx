import { SortOptions } from "@/lib/types/task";
import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface SortButtonProps {
  onSortPriorityClick: () => void;
  value?: SortOptions;
}

function SortButton({ onSortPriorityClick, value }: SortButtonProps) {
  return (
    <div className="ml-2 cursor-pointer" onClick={onSortPriorityClick}>
      <TiArrowSortedUp
        className={`${value === "asc" ? "text-blue-600" : ""}`}
        size={18}
      />
      <TiArrowSortedDown
        className={`${value === "desc" ? "text-blue-600" : ""}`}
        size={18}
      />
    </div>
  );
}

export default SortButton;
