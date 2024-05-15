import * as React from "react";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
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
import ConfirmationModal from "components/confirmationModal";

type FormProps = {
  isReadOnly?: boolean;
  data?: Account;
  onSubmit?: (values: Account) => void;
  onDelete?: () => void;
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

const getCountryByCurrencyCode = (code: string): string => {
  const currency = currencies.find((currency) => currency.code === code);
  return currency ? currency.country : "";
};

const Form: React.FC<FormProps> = ({
  isReadOnly = true,
  data,
  onSubmit = () => {},
  onDelete = () => {},
}) => {
  const [isModalEditOpen, setIsModalEditOpen] = React.useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] =
    React.useState<boolean>(false);
  const [editedValues, setEditedValues] = React.useState<Account | null>(null); // Track edited values

  const formikProps = {
    initialValues: data || initialValues,
    onSubmit: (values: Account) => {
      // Open the Edit modal and set edited values
      setEditedValues(values);
      setIsModalEditOpen(true);
    },
    validationSchema,
    enableReinitialize: true,
  };

  return (
    <>
      <Formik {...formikProps}>
        {({ handleSubmit, isValid, dirty }) => (
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
            <Flex justify="flex-end">
              {!isReadOnly && (
                <Button
                  colorScheme="red"
                  mr={2}
                  type="button"
                  onClick={() => setIsModalDeleteOpen(true)}
                >
                  Delete
                </Button>
              )}
            </Flex>
            <NumberInputControl
              name="ownerId"
              label="Id"
              isReadOnly={isReadOnly}
            />
            <InputControl
              name="firstName"
              label="First Name"
              isReadOnly={isReadOnly}
            />
            <InputControl
              name="lastName"
              label="Last Name"
              isReadOnly={isReadOnly}
            />
            {!isReadOnly ? (
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
            ) : (
              <InputControl
                name="currency"
                label="Default currency"
                defaultValue={`${
                  formikProps.initialValues.currency
                } - ${getCountryByCurrencyCode(
                  formikProps.initialValues.currency
                )}`}
                isReadOnly
              />
            )}
            <NumberInputControl
              name="balance"
              label="Balance"
              isReadOnly={isReadOnly}
            />

            {!isReadOnly && (
              <ButtonGroup>
                <SubmitButton
                  isDisabled={!isValid || !dirty}
                  isLoading={isModalEditOpen}
                >
                  Submit
                </SubmitButton>
                <ResetButton>Reset</ResetButton>
              </ButtonGroup>
            )}
          </Box>
        )}
      </Formik>
      {editedValues && ( // Render Edit modal if editedValues exist
        <ConfirmationModal
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          text="Are you sure you want to submit changes?"
          onConfirm={() => {
            onSubmit(editedValues); // Call onSubmit with editedValues
            setIsModalEditOpen(false); // Close Edit modal after submitting
          }}
        />
      )}
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={() => {
          onDelete();
          setIsModalDeleteOpen(false);
          //TODO REDIRECTION TO ACCOUNTS
        }}
      />
    </>
  );
};

export default Form;
