import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "services/axios";
import { AxiosResponse } from "axios";

type UseDeleteAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  string
> & {
  deleteAccount: (id: string) => void;
  isDeleteAccountPending: boolean;
};

export const useDeleteAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, string>
): UseDeleteAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAccount,
    isPending: isDeleteAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, string>({
    mutationFn: (id: string) =>
      axios.patch(`/accounts/${id}`, { isDeleted: "true" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return {
    deleteAccount,
    isDeleteAccountPending,
    ...rest,
  } as UseDeleteAccountResult;
};
