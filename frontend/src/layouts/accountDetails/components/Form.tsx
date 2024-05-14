import * as React from "react";
import { Box, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
} from "formik-chakra-ui";
import * as Yup from "yup";

import { CurrencyInfo, currencies } from "types/currencyTypes";
import { Account } from "accounts/hooks/useAccounts";

type FormProps = {
  isEditable?: boolean;
  data?: Account;
  onSubmit?: (values: Account) => void;
};

const initialValues: Account = {
  id: 0,
  ownerId: 0,
  firstName: "",
  lastName: "",
  currency: "EUR",
  historyBalance: [],
  balance: 0,
};

const validationSchema = Yup.object({
  ownerId: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  currency: Yup.string().required(),
  balance: Yup.number().required().min(-200),
});

const Form: React.FC<FormProps> = ({
  isEditable = false,
  data,
  onSubmit = () => {},
}) => {
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
          <NumberInputControl name="ownerId" label="Id" />
          <InputControl name="firstName" label="First Name" />
          <InputControl name="lastName" label="Last Name" />
          <SelectControl
            name="currency"
            label="Currency"
            selectProps={{ placeholder: "Select option" }}
          >
            {currencies.map((currency: CurrencyInfo) => (
              <option key={currency.code} value={currency.code}>
                {`${currency.code} - ${currency.country}`}
              </option>
            ))}
          </SelectControl>
          <NumberInputControl name="balance" label="Balance" />

          <ButtonGroup>
            <SubmitButton isDisabled={!isValid}>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  );
};

export default Form;
