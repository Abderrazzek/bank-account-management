import { useEffect, useState } from "react";
import { FormValues } from "../models";
import {
  useAccountDetails,
  useEditAccount,
} from "modules/accountDetails/hooks";
import { Account, ExchangeRates } from "shared/constants";
import {
  convertCurrency,
  fetchConversionRates,
  updateHistoryBalance,
} from "shared/utils";

const useFundTransfer = (formValues: FormValues) => {
  console.log("====5ra", formValues);
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
        historyBalance: await updateHistoryBalance(
          sender.historyBalance,
          newSenderBalance,
          currency
        ),
      };

      const updatedReceiver: Account = {
        ...receiver,
        balance: newReceiverBalance,
        historyBalance: await updateHistoryBalance(
          receiver.historyBalance,
          newReceiverBalance,
          currency
        ),
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
