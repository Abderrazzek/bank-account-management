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

type UsePermanentDeleteAccountResult = UseMutationResult<
  AxiosResponse,
  unknown,
  string
> & {
  permanentDeleteAccount: (id: string) => void;
  isPermanentDeleteAccountPending: boolean;
};

export const usePermanentDeleteAccount = (
  options?: UseMutationOptions<AxiosResponse, unknown, string>
): UsePermanentDeleteAccountResult => {
  const queryClient = useQueryClient();

  const {
    mutate: permanentDeleteAccount,
    isPending: isPermanentDeleteAccountPending,
    ...rest
  } = useMutation<AxiosResponse, unknown, string>({
    mutationFn: (id: string) => axios.delete(`/accounts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });

  return {
    permanentDeleteAccount,
    isPermanentDeleteAccountPending,
    ...rest,
  } as UsePermanentDeleteAccountResult;
};
