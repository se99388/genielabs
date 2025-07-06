import * as R from "ramda";
import { CreationMap } from "@/types";
import React from "react";

type Props = {
  creationMap: CreationMap;
  loading: boolean;
};
const Status = ({ creationMap, loading }: Props) => {
  if (R.isEmpty(creationMap) && !loading) return null;

  return (
    <div
      className={`bg-gray-100 rounded-md p-2 mb-2 mt-6 flex items-center justify-center`}
    >
      <span className={`flex items-center`}>
        {loading && (
          <div className="animate-spin inline-block w-5 h-5 border-3 border-gray-300 border-t-3 border-t-blue-500 rounded-full mr-2"></div>
        )}
        <span
          className={"ml-2 text-gray-500"}
          style={{ color: loading ? "red" : "green" }}
        >
          {loading ? "Pending creations" : "All creations completed"}
        </span>
      </span>
    </div>
  );
};

export default Status;
