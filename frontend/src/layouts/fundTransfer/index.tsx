import { Box, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import {
  NumberInputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
} from "formik-chakra-ui";
import * as React from "react";
import { CurrencyInfo, currencies } from "types/currencyTypes";
import * as Yup from "yup";

//TODO GET ALL ACCOUNTS
// TODO CREATE ACCOUNTS IDS ARRAY FROM THEM
const accountIds = [1, 2, 3]; // Example account IDs

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = (values: any) => {
  sleep(300).then(() => {
    window.alert(JSON.stringify(values, null, 2));
  });
};

const initialValues = {
  sender: 0,
  receiver: 0,
  currency: "",
  amount: 0,
};

const validationSchema = Yup.object({
  sender: Yup.number()
    .required()
    .test(
      "notSameAsReceiver",
      "Sender and receiver cannot be the same account",
      function (value) {
        const receiver = this.parent.receiver;
        return value !== receiver;
      }
    ),
  receiver: Yup.number()
    .required()
    .test(
      "notSameAsSender",
      "Sender and receiver cannot be the same account",
      function (value) {
        const sender = this.parent.sender;
        return value !== sender;
      }
    ),
  currency: Yup.string().required(),
  amount: Yup.number().required().min(0),
});

const FundTransfer = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit}
        >
          <SelectControl
            name="sender"
            label="Sender"
            selectProps={{ placeholder: "Select account" }}
          >
            {accountIds.map((id) => (
              <option key={id} value={id}>
                Account {id}
              </option>
            ))}
          </SelectControl>
          <SelectControl
            name="receiver"
            label="Receiver"
            selectProps={{ placeholder: "Select account" }}
          >
            {accountIds.map((id) => (
              <option key={id} value={id}>
                Account {id}
              </option>
            ))}
          </SelectControl>
          <SelectControl
            name="currency"
            label="Default currency"
            selectProps={{ placeholder: "Select currency" }}
          >
            {currencies.map((currency: CurrencyInfo) => (
              <option key={currency.code} value={currency.code}>
                {`${currency.code} - ${currency.country}`}
              </option>
            ))}
          </SelectControl>
          <NumberInputControl name="amount" label="Amount" />

          <ButtonGroup>
            <SubmitButton isDisabled={!isValid}>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  );
};

export default FundTransfer;
