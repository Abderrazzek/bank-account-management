import { Box, ButtonGroup, Spinner } from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import {
  NumberInputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
} from "formik-chakra-ui";
import * as React from "react";
import ConfirmationModal from "shared/components/Modal";
import { CurrencyInfo, currencies } from "shared/models";
import { initialValues, validationSchema } from "./constants";
import { FormValues } from "./models";
import useFundTransfer from "./hooks/useFundTransfer";
import { useAccounts } from "modules/accounts/hooks";
import { getAccountIds } from "./utils";
import { useModal } from "shared/hooks/useModal";

const FundTransfer: React.FC = () => {
  const { isOpen, toggle } = useModal();
  const [formValues, setFormValues] = React.useState<FormValues | null>(null);
  const { accounts, isLoading } = useAccounts();
  const accoutsId = getAccountIds(accounts);

  const {
    mutate: makeTransaction,
    isPending,
    error,
  } = useFundTransfer({
    onSuccess: () => {
      toggle();
      window.alert("Transaction successful");
    },
    onError: (error) => {
      window.alert(`Transaction failed: ${error.message}`);
    },
  });

  const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    setFormValues(values);
    toggle();
    helpers.setSubmitting(false);
  };

  const handleConfirmation = () => {
    if (formValues) {
      makeTransaction(formValues);
    }
  };

  return isPending ? (
    <Spinner />
  ) : (
    <>
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
              {accoutsId.map((id) => (
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
              {accoutsId.map((id) => (
                <option key={id} value={id}>
                  Account {id}
                </option>
              ))}
            </SelectControl>
            <SelectControl
              name="currency"
              label="Currency"
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
              <SubmitButton isDisabled={!isValid || isPending}>
                Submit
              </SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
      <ConfirmationModal
        text="Are you sure you want to proceed with this fund transfer?"
        onClose={toggle}
        isOpen={isOpen}
        onConfirm={handleConfirmation}
      />
    </>
  );
};

export default FundTransfer;
