import React, { useState, useMemo, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useAccountDetails from "accounts/details/hooks/useAccountDetails";
import { Account } from "accounts/hooks/useAccounts";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "modules/shared/components/ConfirmationModal";
import TableActionButtons from "components/tableActionButtons/TableActionButtons";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  const { accounts, loadAccounts, removeAccount } = useAccountDetails();
  const [rowData, setRowData] = useState<Account[]>(accounts);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
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

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<any[]>([
    {
      field: "ownerId",
      filter: true,
      flex: 1,
    },
    {
      field: "currency",
      filter: true,
      flex: 1,
    },
    {
      field: "balance",
      filter: true,
      flex: 1,
    },
    {
      field: "actions",
      filter: false,
      cellRenderer: (params: any) => (
        <TableActionButtons
          data={params.data}
          isDeletedAccounts={isDeletedAccounts}
          handleDeleteClick={() => handleDeleteClick}
        />
      ),
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

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
