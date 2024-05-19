import { Box, ButtonGroup } from "@chakra-ui/react";
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
import { useModal } from "shared/hooks/useModal";
import Spinner from "shared/components/Spinner";
import { useAccountIdsMapper } from "./hooks/useAccountMapper";

const FundTransfer: React.FC = () => {
  const { isOpen, toggle } = useModal();
  const [formValues, setFormValues] = React.useState<FormValues>(initialValues);
  const { accounts } = useAccounts();
  const accountsId = useAccountIdsMapper(accounts);

  const { transferMoney, isEditAccountPending } = useFundTransfer(
    formValues || initialValues
  );

  const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    setFormValues(values);
    toggle();
    helpers.setSubmitting(false);
  };

  const handleConfirmation = () => {
    toggle();
    transferMoney();
  };
  return isEditAccountPending ? (
    <Spinner />
  ) : (
    <>
      <Formik
        initialValues={
          {
            ...initialValues,
            senderId: accountsId?.[0],
            receiverId: accountsId?.[0],
          } as any
        }
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid }) => {
          console.log("==sds=", isValid);
          return (
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
                name="senderId"
                label="Sender"
                selectProps={{ placeholder: "Select account" }}
              >
                {accountsId.map((id) => (
                  <option key={id} value={id}>
                    Account {id}
                  </option>
                ))}
              </SelectControl>
              <SelectControl
                name="receiverId"
                label="Receiver"
                selectProps={{ placeholder: "Select account" }}
              >
                {accountsId.map((id) => (
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
                <SubmitButton isDisabled={isEditAccountPending}>
                  Submit
                </SubmitButton>
                <ResetButton>Reset</ResetButton>
              </ButtonGroup>
            </Box>
          );
        }}
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
