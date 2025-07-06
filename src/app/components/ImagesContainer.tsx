import { CreationMap } from "@/types";
import Image from "next/image";
import React, { useMemo } from "react";
import { isCompleted } from "../utils";

type Props = {
  creationMap: CreationMap;
};
const ImagesContainer = ({ creationMap }: Props) => {
  const completed = useMemo(() => isCompleted(creationMap), [creationMap]);

  if (!completed) return;

  return (
    <div className="mt-8 flex gap-4 justify-center items-center relative h-[300px]">
      {Object.values(creationMap).map((c, index) => (
        <Image
          width={300}
          height={200}
          key={index}
          src={c.result_image_url}
          alt={`Generated ${index}`}
          className="max-w-xs max-h-52 rounded-lg shadow-md absolute"
          style={{ zIndex: c.artifact_type === "character" ? 1 : 0 }}
        />
      ))}
    </div>
  );
};

export default ImagesContainer;
