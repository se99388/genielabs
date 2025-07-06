import PromptInput from "./PromptInput";
import GenerateButton from "./GenerateButton";
import { getCreationsByArtifactId, startGeneration } from "@/services/api";
import { CreationMap } from "@/types";
import { getCreationKey, toCreationData } from "@/app/utils";

const artifacts = [
  {
    artifact_id: "73161bff-4677-4514-8f7d-1d8e5715cb96",
    artifact_type: "background",
  },
  {
    artifact_id: "b8fd4cf4-ed45-46e3-9592-a30d6457b25b",
    artifact_type: "character",
  },
];

type Props = {
  setCreationMap: React.Dispatch<React.SetStateAction<CreationMap>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  cacheRef: React.RefObject<Record<string, string>>;
};
function Prompt({
  setCreationMap,
  loading,
  setLoading,
  prompt,
  setPrompt,
  cacheRef,
}: Props) {
  return (
    <div>
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <GenerateButton
        disabled={loading}
        onClick={async () => {
          const value = prompt.trim();
          if (!value) {
            alert("Please enter a prompt");
            return;
          }

          setCreationMap({});

          if (cacheRef.current[value]) {
            setCreationMap(JSON.parse(cacheRef.current[value]));
            return;
          }

          // Start generation with the provided prompt and artifact IDs
          // Assuming startGeneration is a function that takes a prompt and returns a function to start generation with artifact IDs
          const startGenerationByArtifact = startGeneration(value);

          try {
            setLoading(true);

            // Start generation for each artifact
            await Promise.all(
              artifacts.map((artifact) =>
                startGenerationByArtifact(
                  artifact.artifact_id,
                  artifact.artifact_type
                )
              )
            );

            // Fetch creations based on artifact IDs
            const results = await Promise.all(
              artifacts.map((artifact) =>
                getCreationsByArtifactId(artifact.artifact_id)
              )
            );

            const creationMap: CreationMap = results.reduce<CreationMap>(
              (acc, curr) => {
                const creationKey = getCreationKey(curr.data[0]);
                acc[creationKey] = toCreationData(curr);
                return acc;
              },
              {}
            );

            setCreationMap(creationMap);
          } catch (error) {
            console.error("Error", error);
            alert("Failed to create by artifact. Please try again.");
            setLoading(false);
          }
        }}
      />
    </div>
  );
}

export default Prompt;
