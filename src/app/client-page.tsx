"use client";
import React, { useCallback, useRef, useState } from "react";
import { CreationMap } from "@/types";
import Header from "./components/Header";
import ImagesContainer from "./components/ImagesContainer";
import Prompt from "./components/Prompt";
import useCheckStatusPolling from "@/hooks/use-check-status-polling";
import Status from "./components/Status";

const ClientPage = () => {
  const [prompt, setPrompt] = useState("");
  const [creationMap, setCreationMap] = useState<CreationMap>({});
  const [loading, setLoading] = useState(false);

  // Using useRef to cache images based on prompt
  const cacheRef = useRef<Record<string, string>>({});

  const onAllCreationsCompleted = useCallback(
    (completedCreationMap: CreationMap) => {
      setCreationMap({ ...completedCreationMap });
      setLoading(false);

      //cache data
      cacheRef.current[prompt.trim()] = JSON.stringify(completedCreationMap);
    },
    [prompt]
  );

  useCheckStatusPolling(creationMap, onAllCreationsCompleted);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border flex flex-col flex-1">
      <Header />
      <Prompt
        setCreationMap={setCreationMap}
        loading={loading}
        setLoading={setLoading}
        prompt={prompt}
        setPrompt={setPrompt}
        cacheRef={cacheRef}
      />
      <Status creationMap={creationMap} loading={loading} />
      <ImagesContainer creationMap={creationMap} />
    </div>
  );
};

export default ClientPage;
