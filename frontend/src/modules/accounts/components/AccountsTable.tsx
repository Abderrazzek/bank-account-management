import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useAccountDetails from "accounts/details/hooks/useAccountDetails";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "modules/shared/components/ConfirmationModal";
import { Account } from "../models";
import { usePagination } from "../hooks";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  const { accounts, loadAccounts, removeAccount } = useAccountDetails();
  const [rowData, setRowData] = useState<Account[]>(accounts);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const { defaultColDef, colDefs } = usePagination();
  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  useEffect(() => {
    setRowData(accounts);
  }, [accounts]);

  const handleNewAccountClick = () => {
    // Redirect to create new account page
    navigate("/accounts/new");
  };

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setIsModalDeleteOpen(true);
  };

  const onDelete = async () => {
    if (accountToDelete) {
      await removeAccount(accountToDelete.id);
      // Refresh accounts after deletion
      loadAccounts();
    }
  };

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 50, 100];

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
          onDelete();
          setIsModalDeleteOpen(false); // Close Edit modal after submitting
        }}
      />
    </div>
  );
};

export default AccountsTable;
