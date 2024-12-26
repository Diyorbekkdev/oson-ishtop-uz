import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
  ADD_MANAGEMENT,
  ADD_MANAGEMENT_FORM,
  ADD_MANAGEMENT_REMOVE_MODAL,
} from "@/modules/add-management/model";
import {
  ADD_SUCCESS_CODES,
  ADD_SUCCESS_MESSAGES,
} from "@/modules/add-management/model/notifications";
import { useAddManagementModals } from "@/modules/add-management/store";
import { MutationResult } from "@/types";
import { formatNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveAddFeatures = {
  onRemove: MutationResult<ADD_MANAGEMENT_FORM>;
  onRequestClose: () => void;
};

export const useRemoveAddFeatures = (): RemoveAddFeatures => {
  const queryClient = useQueryClient();
  const { functionInvoke } = useHttpRequest();
  const { remove, setModal } = useAddManagementModals();

  const { getParams } = useSearchParams();

  const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
  const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

  const onRemove = useMutation<void, Error, ADD_MANAGEMENT_FORM>({
    mutationFn: async (value) => {
      const { error, data } = await functionInvoke<ADD_MANAGEMENT_FORM>({
        functionName: `${ADD_MANAGEMENT_REMOVE_MODAL.PARAM}/${remove?.props?.id}`,
        method: "DELETE",
      });

      if (error) return error;

      if (data?.success) {
        toast.success(
          formatNotification(ADD_SUCCESS_MESSAGES[ADD_SUCCESS_CODES.REMOVED], {
            name: value?.nameUz,
          }).title
        );
      } else {
        toast.error(data?.message);
      }

      onRequestClose();
      queryClient.refetchQueries({
        queryKey: [`${ADD_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
      });
    },
  });

  const onRequestClose = () => {
    setModal({
      remove: { open: false, props: null },
    });
  };
  return { onRemove, onRequestClose };
};
