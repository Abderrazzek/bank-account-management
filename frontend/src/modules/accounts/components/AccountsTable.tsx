import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAccounts, useAddAccount, useDeleteAccount } from "../hooks";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "modules/shared/components/ConfirmationModal";
import { Account } from "../models";
import { usePagination } from "../hooks";
import {
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
} from "../constants";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  // TODO STATES AS GROUPED CUSTOM HOOKS
  const { accounts, isLoading } = useAccounts();
  const { addAccount, isAddAccountPending } = useAddAccount();
  const { deleteAccount, isDeleteAccountPending } = useDeleteAccount();
  const [rowData, setRowData] = useState<Account[]>(accounts);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const { defaultColDef, colDefs } = usePagination();
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    // Redirect to create new account page
    navigate("/accounts/new");
  };

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setIsModalDeleteOpen(true);
  };

  return (
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
      <div
        className="ag-theme-alpine-dark" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={() => {
          setIsModalDeleteOpen(false); // Close Edit modal after submitting
        }}
      />
    </div>
  );
};

export default AccountsTable;
