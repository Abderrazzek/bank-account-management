import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FormValues, TransactionResult } from "../models";
import axios from "axios";
import { Account } from "shared/constants";
import {
  convertCurrency,
  fetchConversionRates,
  updateHistoryBalance,
} from "../utils";

const useTransaction = (
  options?: UseMutationOptions<TransactionResult, Error, FormValues>
): UseMutationResult<TransactionResult, Error, FormValues> => {
  const queryClient = useQueryClient();

  const mutationFn = async (
    formValues: FormValues
  ): Promise<TransactionResult> => {
    const { sender, receiver, amount, currency } = formValues;

    // Fetch sender and receiver accounts
    const senderResponse = await axios.get<Account>(`/accounts/${sender}`);
    const receiverResponse = await axios.get<Account>(`/accounts/${receiver}`);

    const senderAccount = senderResponse.data;
    const receiverAccount = receiverResponse.data;

    if (!senderAccount || !receiverAccount) {
      throw new Error("Sender or receiver account not found");
    }

    const conversionRates = await fetchConversionRates();

    // Convert amount to sender's currency
    let amountInSenderCurrency = amount;
    if (currency !== senderAccount.currency) {
      amountInSenderCurrency = convertCurrency(
        conversionRates,
        currency,
        senderAccount.currency,
        amount
      );
    }

    // Check for sufficient funds
    if (senderAccount.balance < amountInSenderCurrency) {
      throw new Error("Insufficient funds");
    }

    // Convert amount to receiver's currency
    let amountInReceiverCurrency = amount;
    if (currency !== receiverAccount.currency) {
      amountInReceiverCurrency = convertCurrency(
        conversionRates,
        currency,
        receiverAccount.currency,
        amount
      );
    }

    // Update balances
    const updatedSenderBalance = senderAccount.balance - amountInSenderCurrency;
    const updatedReceiverBalance =
      receiverAccount.balance + amountInReceiverCurrency;

    // Update history balances
    const updatedSenderHistory = updateHistoryBalance(
      senderAccount,
      updatedSenderBalance
    );
    const updatedReceiverHistory = updateHistoryBalance(
      receiverAccount,
      updatedReceiverBalance
    );

    // Perform the transaction
    await axios.put(`/accounts/${sender}`, {
      ...senderAccount,
      balance: updatedSenderBalance,
      historyBalance: updatedSenderHistory,
    });

    await axios.put(`/accounts/${receiver}`, {
      ...receiverAccount,
      balance: updatedReceiverBalance,
      historyBalance: updatedReceiverHistory,
    });

    return {
      updatedSenderBalance,
      updatedReceiverBalance,
    };
  };

  return useMutation<TransactionResult, Error, FormValues>(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    ...options,
  });
};

export default useTransaction;
