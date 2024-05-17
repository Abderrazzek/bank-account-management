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

import { CurrencyInfo, currencies } from "shared/models";
import ConfirmationModal from "shared/components/Modal";
import { Account } from "shared/constants";
import { initialValues, validationSchema } from "../constants";
import { useModal } from "shared/hooks/useModal";

type FormProps = {
  isReadOnly?: boolean;
  data?: Account;
  onSubmit?: (values: Account) => void;
  onDelete?: () => void;
};

const getCountryByCurrencyCode = (code: string): string => {
  const currency = currencies.find((currency) => currency.code === code);
  return currency ? currency.country : "";
};

const Form: React.FC<FormProps> = ({ isReadOnly = true, data }) => {
  const { isOpen: isEditOpen, toggle: toggleEdit } = useModal();
  const { isOpen: isDeleteOpen, toggle: toggleDelete } = useModal();
  const [editedValues, setEditedValues] = React.useState<Account | null>(null); // Track edited values

  const formikProps = {
    initialValues: data || initialValues,
    onSubmit: (values: Account) => {
      // Open the Edit modal and set edited values
      setEditedValues(values);
      toggleEdit();
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
                  onClick={() => toggleDelete()}
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
                  isLoading={isEditOpen}
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
          isOpen={isEditOpen}
          onClose={() => toggleEdit()}
          text="Are you sure you want to submit changes?"
          onConfirm={() => {
            // onSubmit(editedValues); // Call onSubmit with editedValues
            toggleEdit(); // Close Edit modal after submitting
          }}
        />
      )}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => toggleDelete()}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={() => {
          // onDelete();
          toggleDelete();
          //TODO REDIRECTION TO ACCOUNTS
        }}
      />
    </>
  );
};

export default Form;
