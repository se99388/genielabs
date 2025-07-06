import * as R from "ramda";
import { CreationData, CreationMap, CreationsResponse } from "../types";

export const getCreationKey = ({
  creation_id,
  creation_sub_id,
}: {
  creation_id: string;
  creation_sub_id: string;
}) => {
  return `${creation_id}_${creation_sub_id}`;
};

export const toCreationData = (
  creationsResponse: CreationsResponse
): CreationData => {
  //based on 1 image to for each creation
  const {
    artifact_id,
    creation_id,
    creation_sub_id,
    result_image_url,
    status,
    creation_type,
  } = creationsResponse.data[0];

  return {
    artifact_id,
    creation_id,
    creation_sub_id,
    result_image_url: result_image_url[0],
    status,
    artifact_type: creation_type,
  };
};

export const isCompleted = (creationMap: CreationMap) => {
  return (
    R.isNotEmpty(creationMap) &&
    Object.values(creationMap).every((c) => c.status === "completed")
  );
};
