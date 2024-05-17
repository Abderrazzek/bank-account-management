import React from "react";
import { Button, Box, Spinner } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAccounts, useDeleteAccount } from "../hooks";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "modules/shared/components/Modal";
import { usePagination } from "../hooks";
import {
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
} from "../constants";
import { useModal } from "modules/shared/hooks/useModal";
import { useSelectedAccount } from "../context";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  // TODO STATES AS GROUPED CUSTOM HOOKS
  const { accounts, isLoading } = useAccounts();
  const { deleteAccount, isDeleteAccountPending } = useDeleteAccount();

  // TODO HANDLE STATES WITH CUSTOM HOOKS
  const { isOpen: isEditOpen, toggle: toggleEdit } = useModal();
  const { isOpen: isDeleteOpen, toggle: toggleDelete } = useModal();
  // TODO CHECK IT
  const { selectedAccountId } = useSelectedAccount();
  const { defaultColDef, colDefs } = usePagination();
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    // Redirect to create new account page
    navigate("/accounts/new");
  };

  return isLoading || isDeleteAccountPending ? (
    <Spinner />
  ) : (
    <div>
      <Box mb={4} display="flex" justifyContent="flex-end">
        {!isDeletedAccounts && (
          <Button
            colorScheme="teal"
            leftIcon={<FiPlus />}
            onClick={handleNewAccountClick}
          >
            Create New Account
          </Button>
        )}
      </Box>
      <div className="ag-theme-alpine-dark" style={{ height: 500 }}>
        <AgGridReact
          rowData={accounts}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
      <ConfirmationModal
        isOpen={isEditOpen}
        onClose={toggleEdit}
        text="Are you sure you want to submit this changes?"
        onConfirm={() => {
          //TODO navigation to account/id
        }}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={() => {
          deleteAccount(selectedAccountId);
          toggleDelete();
        }}
      />
    </div>
  );
};

export default AccountsTable;
