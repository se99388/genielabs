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
    <div className="mt-8 flex gap-4 justify-center items-center relative min-h-[500px] shadow-md rounded-lg">
      {Object.values(creationMap).map((c) => (
        <Image
          width={300}
          height={200}
          key={c.result_image_url}
          src={c.result_image_url}
          alt={`Generated ${c.result_image_url}`}
          className="rounded-lg"
          style={{
            zIndex: c.artifact_type === "character" ? 1 : 0,
            position: c.artifact_type === "character" ? "absolute" : "initial",
          }}
        />
      ))}
    </div>
  );
};

export default ImagesContainer;
