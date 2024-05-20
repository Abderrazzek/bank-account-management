import { AxiosResponse } from "axios";

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
    let amountInSenderCurrency = amount;

    const exchangeRates = await fetchConversionRates();

    if (sender.currency !== currency) {
      amountInSenderCurrency = convertCurrency(
        exchangeRates,
        currency,
        sender.currency,
        amount
      );
    }

    if (parseFloat(amountInSenderCurrency as any) > sender.balance) {
      alert(
        "Error, Sender Account don't have enough money to make this transaction!"
      );
      return;
    }
    if (receiver) {
      let amountInReceiverCurrency = amount;

      if (receiver?.currency !== currency) {
        amountInReceiverCurrency = convertCurrency(
          exchangeRates,
          currency,
          receiver.currency,
          amount
        );
      }
      const newSenderValues = {
        ...sender,
        balance:
          parseFloat(sender.balance as any) -
          parseFloat(amountInSenderCurrency as any),
      };
      const newReceiverValues = {
        ...receiver,
        balance: receiver.balance + amountInReceiverCurrency,
      };
      editAccount(newSenderValues);
      editAccount(newReceiverValues);
    }
  }
  alert("Fatal!, an error occured, Try again please.");
};
