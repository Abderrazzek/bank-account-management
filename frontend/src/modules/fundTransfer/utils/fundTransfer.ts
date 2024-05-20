import { Account } from "shared/constants";
import { FormValues } from "../models";
import { convertCurrency, fetchConversionRates } from "shared/utils";
import axios from "services/axios";

export const getAccountIds = (accounts: Account[]): string[] => {
  return accounts
    .filter((account) => account.isDeleted === "false")
    .map((account) => account.id);
};

export const fundTransfer = async (
  data: FormValues,
  editAccount: (updatedAccount: Account) => void
) => {
  const { receiverId, senderId, currency, amount } = data;
  const receiver: Account = await axios.get(`/accounts/${receiverId}`);
  const sender: Account = await axios.get(`/accounts/${senderId}`);
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
      alert(
        "Error, Sender Account don't have enough money to make this transaction!"
      );
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
        balance: floatSenderBalance - parseFloat(amountInSenderCurrency as any),
      };
      const newReceiverValues = {
        ...receiver,
        balance:
          parseFloat(receiver.balance as any) +
          parseFloat(amountInReceiverCurrency as any),
      };
      editAccount(newSenderValues);
      editAccount(newReceiverValues);
      alert("Fund Transfer successfuly! ");
    }
  } else {
    alert("Fatal!, an error occured, Try again please.");
  }
};
