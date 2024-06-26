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
import { Account, initialValues, validationSchema } from "shared/constants";
import { useDeleteAccount, useEditAccount } from "../hooks";
import { useNavigate } from "react-router-dom";
import Spinner from "shared/components/Spinner";
import { useModal } from "shared/hooks";

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
  const [formEditedValues, setFormEditedValues] =
    React.useState<Account | null>(null); // Track edited values
  const { editAccount, isEditAccountPending } = useEditAccount();
  const { deleteAccount, isDeleteAccountPending } = useDeleteAccount();
  const navigate = useNavigate();

  const formikProps = {
    initialValues: data || initialValues,
    onSubmit: (values: Account) => {
      setFormEditedValues(values);
      toggleEdit();
    },
    validationSchema,
    enableReinitialize: true,
  };

  const handleEditModalConfirm = async () => {
    await editAccount(formEditedValues!);
    toggleEdit();
  };

  const handleDeleteModalConfirm = () => {
    deleteAccount(data!.id);
    toggleDelete();
    navigate("/accounts");
  };

  return isEditAccountPending || isDeleteAccountPending ? (
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
            <NumberInputControl
              name="ownerId"
              label="Owner Id"
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
              <ButtonGroup mt={5}>
                <SubmitButton
                  isDisabled={!isValid || !dirty}
                  isLoading={isEditOpen}
                >
                  Submit
                </SubmitButton>
                <ResetButton mr={16}>Reset</ResetButton>
                <Button
                  colorScheme="red"
                  type="button"
                  onClick={() => toggleDelete()}
                >
                  Delete Account
                </Button>
              </ButtonGroup>
            )}
          </Box>
        )}
      </Formik>
      {formEditedValues && (
        <ConfirmationModal
          isOpen={isEditOpen}
          onClose={toggleEdit}
          text="Are you sure you want to submit changes?"
          onConfirm={handleEditModalConfirm}
        />
      )}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={handleDeleteModalConfirm}
      />
    </>
  );
};

export default Form;
