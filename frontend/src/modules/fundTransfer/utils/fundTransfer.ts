import { Account } from "shared/constants";
import { FormValues } from "../models";
import { convertCurrency, fetchConversionRates } from "shared/utils";
import axios from "services/axios";

export const getAccountIds = (accounts: Account[]): string[] => {
  return accounts
    .filter((account) => account.isDeleted === "false")
    .map((account) => account.id);
};

const getAccountById = (id: string): Promise<Account> =>
  axios.get(`/accounts/${id}`);

export const fundTransfer = async (
  formValues: FormValues,
  editAccount: (updatedAccount: Account) => void
) => {
  const { receiverId, senderId, currency, amount } = formValues;
  const [receiver, sender] = await Promise.all([
    getAccountById(receiverId),
    getAccountById(senderId),
  ]);
  if (sender) {
    let amountInSenderCurrency = parseFloat(amount as any);

    const exchangeRates = await fetchConversionRates();

    if (sender.currency !== currency) {
      amountInSenderCurrency = convertCurrency(
        exchangeRates,
        currency,
        sender.currency,
        amountInSenderCurrency
      );
    }
    const floatSenderBalance = parseFloat(sender.balance as any);
    if (amountInSenderCurrency > floatSenderBalance) {
      alert("Error: Insufficient funds in the sender's account.");
      return;
    }
    if (receiver) {
      let amountInReceiverCurrency = parseFloat(amount as any);

      if (receiver?.currency !== currency) {
        amountInReceiverCurrency = convertCurrency(
          exchangeRates,
          currency,
          receiver.currency,
          amountInReceiverCurrency
        );
      }
      const newSenderValues = {
        ...sender,
        balance: parseFloat(
          (
            floatSenderBalance - parseFloat(amountInSenderCurrency as any)
          ).toFixed(2)
        ),
      };
      const newReceiverValues = {
        ...receiver,
        balance: parseFloat(
          (
            parseFloat(receiver.balance as any) +
            parseFloat(amountInReceiverCurrency as any)
          ).toFixed(2)
        ),
      };
      editAccount(newSenderValues);
      editAccount(newReceiverValues);
      alert("Fund transfer completed successfully.");
    }
  } else {
    alert("Error: An unexpected error occurred. Please try again.");
  }
};
