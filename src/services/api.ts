import { CreationsResponse, StatusResponse } from "../types";

const accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJ2NDZuUEhtekhjcVlYQ0N3ekhIYiJ9.eyJpc3MiOiJodHRwczovL2Rldi03YXVncmRmNHQyeDZ5dm15LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NzhmYmE5YWY0OTdhNDE3YmY4N2NjNjEiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtN2F1Z3JkZjR0Mng2eXZteS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZGV2LTdhdWdyZGY0dDJ4Nnl2bXkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1MTc4NTAyNCwiZXhwIjoxNzUxODcxNDI0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiUmlURFl1akc1QzA4cGJjR20yQ3k4SlNTbTZ6cWZ4cGQifQ.A2-RL5Fk7BAmLFCSCnFbpNIxo3vDT5bK8K-KZvldPBioA7IaijwguuWZJ7zAPLkVecp1B-E69lfVbONAyqAjOVYXK92o1Oh2PVkhlPAcWjiTv59LRl7mg1hTnYnx7U1yKS_2ODaqBi4oZYcYyfUTUywhY2UBgdMr9ifLezfWJBr6YCqP2ajOZ_Wc-IrmpFR_bvOm1aDzNpOBQ3TNOzQOvAtNp4ASSsQASaH_eUaYoTNhTtbSXmcRZgbo8MV5bSFwKPxjIZLpCLb9cspxzP8Jm4RSGCe13_W9vECS_HncCzdQ1vMqhVDml48bRH9BIoKnr74zb-5zHb7iIgz5FZczIg"; // Replace with your actual access token

type FetchOptions = {
  method?: "get" | "post" | "put" | "fetch" | "delete" | "PATCH";
  data?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const handler = async <T>(
  path: string,
  opts: FetchOptions = {}
): Promise<T> => {
  const options: RequestInit = {
    method: opts.method ?? "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: opts.data ? JSON.stringify(opts.data) : undefined,
  };

  const response = await fetch(`https://dev.genielabs.co${path}`, options);

  if (!response.ok) {
    const jsonError = await response.json();
    const msg = (() => {
      if (typeof jsonError === "object" && "message" in jsonError) {
        return jsonError.message;
      }
      return "Server Error";
    })();

    throw new Error(msg);
  }

  return response.json();
};

export const startGeneration =
  (prompt: string) => (artifact_id: string, artifact_type: string) =>
    handler<{ creation_id: string }>("/start_generation", {
      method: "post",
      data: { prompt, artifact_id, artifact_type, num_images_per_prompt: 1 },
    });

export const getCreationsByArtifactId = (artifact_id: string) => {
  return handler<CreationsResponse>(
    `/get_creations_based_on_artifact_id?artifact_id=${artifact_id}&limit=1`
  );
};

export const checkStatus = (
  creationIdsList: Array<{ creation_id: string; creation_sub_id: string }>
) => {
  return handler<StatusResponse>("/check_status", {
    method: "post",
    data: creationIdsList,
  });
};
