import {
  useAccountDetails,
  useEditAccount,
} from "modules/accountDetails/hooks";
import { FormValues } from "../models";
import { convertCurrency, fetchConversionRates } from "shared/utils";

export const useFundTransfer = async (data: FormValues) => {
  const { receiverId, senderId, currency, amount } = data;
  const { account: receiver } = useAccountDetails(receiverId);
  const { account: sender } = useAccountDetails(senderId);
  const { editAccount } = useEditAccount();
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
    if (amountInSenderCurrency > sender.balance) {
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
        balance: sender.balance - amountInSenderCurrency,
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
