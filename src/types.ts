export type CreationsResponse = {
  data: Array<{
    creation_type: string;
    artifact_id: string;
    status: "pending" | "completed" | "failed";
    creation_id: string;
    result_image_url: Array<string>;
    creation_sub_id: string;
  }>;
};

export type CheckStatusType = {
  artifact_type: string;
  creation_id: string;
  creation_sub_id: string;
  data: {
    artifact_id: string;
    result_image_url: Array<string>;
    status: "pending" | "completed" | "failed";
  };

  message: "Creation status retrieved successfully";
  status: "pending" | "completed" | "failed";
};

export type StatusResponse = {
  results: Array<CheckStatusType>;
};

export type CreationMap = Record<string, CreationData>;

export type CreationData = {
  artifact_type: string;
  artifact_id: string;
  creation_id: string;
  creation_sub_id: string;
  result_image_url: string;
  status: "pending" | "completed" | "failed";
};
