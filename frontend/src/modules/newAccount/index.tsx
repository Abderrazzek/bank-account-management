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

import { CurrencyInfo, currencies } from "shared/models";
import { Account, initialValues, validationSchema } from "shared/constants";
import Spinner from "shared/components/Spinner";
import { useAddAccount } from "./hooks";

import { useNavigate } from "react-router-dom";

const NewAccount: React.FC = () => {
  const { addAccount, isAddAccountPending } = useAddAccount();
  const navigate = useNavigate();

  const formikProps = {
    initialValues,
    onSubmit: async (values: Account) => {
      await addAccount(values);
      navigate("/accounts");
    },
    validationSchema,
  };

  return isAddAccountPending ? (
    <Spinner />
  ) : (
    <>
      <Formik {...formikProps}>
        {({ handleSubmit, isValid, dirty }) => (
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            width="100%"
            p={6}
            m="10px auto"
            as="form"
            onSubmit={handleSubmit}
          >
            <NumberInputControl name="ownerId" label="Owner Id" />
            <InputControl name="firstName" label="First Name" />
            <InputControl name="lastName" label="Last Name" />
            <SelectControl
              name="currency"
              label="Default currency"
              selectProps={{ placeholder: "Select option" }}
            >
              {currencies.map((currency: CurrencyInfo) => (
                <option key={currency.code} value={currency.code}>
                  {`${currency.code} - ${currency.country}`}
                </option>
              ))}
            </SelectControl>
            <NumberInputControl name="balance" label="Balance" />
            <ButtonGroup mt={5}>
              <SubmitButton
                isDisabled={!isValid || !dirty}
                isLoading={isAddAccountPending}
              >
                Submit
              </SubmitButton>
              <ResetButton mr={16}>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default NewAccount;
