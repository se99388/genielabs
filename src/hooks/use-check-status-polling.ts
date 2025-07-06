import * as R from "ramda";
import { getCreationKey, isCompleted } from "@/app/utils";
import { checkStatus } from "@/services/api";
import { CreationMap } from "@/types";
import { useEffect } from "react";

const useCheckStatusPolling = (
  creationMap: CreationMap,
  onAllCreationsCompleted: (completedCreationMap: CreationMap) => void
) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkStatusFn = async (creationMap: CreationMap) => {
      if (isCompleted(creationMap)) {
        onAllCreationsCompleted({ ...creationMap });

        return;
      }

      const creationPollingData = Object.values(creationMap).filter(
        (c) => c.status === "pending"
      );

      const creationIdsPending = creationPollingData.map((c) => ({
        creation_id: c.creation_id,
        creation_sub_id: c.creation_sub_id,
      }));

      const { results } = await checkStatus(creationIdsPending);
      results.forEach((result) => {
        if (result.status === "completed") {
          const key = getCreationKey(result);
          creationMap[key].status = "completed";
          creationMap[key].result_image_url = result.data.result_image_url[0];
        }
      });

      timeoutId = setTimeout(() => checkStatusFn(creationMap), 5000); // Poll again after 5 seconds
    };

    (async () => {
      if (R.isEmpty(creationMap) || isCompleted(creationMap)) return;
      await checkStatusFn({ ...creationMap });
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [creationMap, onAllCreationsCompleted]);
};

export default useCheckStatusPolling;
