import { useEffect, useState } from "react";
import { ExchangeRates, FormValues } from "../models";
import {
  useAccountDetails,
  useEditAccount,
} from "modules/accountDetails/hooks";
import {
  convertCurrency,
  fetchConversionRates,
  updateHistoryBalance,
} from "../utils";
import { Account } from "shared/constants";

const useFundTransfer = (formValues: FormValues) => {
  const { senderId, receiverId, currency, amount } = formValues;
  const { account: sender } = useAccountDetails(senderId);
  const { account: receiver } = useAccountDetails(receiverId);
  const { editAccount, isEditAccountPending } = useEditAccount();

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await fetchConversionRates();
        setExchangeRates(rates);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchRates();
  }, []);

  const transferMoney = async () => {
    if (!sender || !receiver || !exchangeRates) {
      setError("Account details or exchange rates are not available");
      return;
    }

    try {
      let convertedAmountFromSenderCurrency = amount;
      if (currency !== sender.currency) {
        convertedAmountFromSenderCurrency = convertCurrency(
          exchangeRates,
          currency,
          sender.currency,
          amount
        );
      }

      if (sender.balance < convertedAmountFromSenderCurrency) {
        setError("Insufficient funds in sender's account");
        return;
      }

      const newSenderBalance =
        sender.balance - convertedAmountFromSenderCurrency;

      let convertedAmountToReceiverCurrency = amount;
      if (currency !== receiver.currency) {
        convertedAmountToReceiverCurrency = convertCurrency(
          exchangeRates,
          currency,
          receiver.currency,
          amount
        );
      }

      const newReceiverBalance =
        receiver.balance + convertedAmountToReceiverCurrency;

      const updatedSender: Account = {
        ...sender,
        balance: newSenderBalance,
        historyBalance: updateHistoryBalance(sender, newSenderBalance),
      };

      const updatedReceiver: Account = {
        ...receiver,
        balance: newReceiverBalance,
        historyBalance: updateHistoryBalance(receiver, newReceiverBalance),
      };

      await editAccount(updatedSender);
      await editAccount(updatedReceiver);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { transferMoney, isEditAccountPending, error };
};

export default useFundTransfer;
