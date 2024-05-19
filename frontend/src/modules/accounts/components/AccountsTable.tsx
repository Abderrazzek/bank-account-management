import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAccounts, useDeleteAccount } from "../hooks";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../hooks";
import {
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
} from "../constants";
import { useSelectedAccount } from "../context";
import { useModal } from "shared/hooks/useModal";
import ConfirmationModal from "shared/components/Modal";
import Spinner from "shared/components/Spinner";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  const { accounts, isLoading } = useAccounts();
  const { deleteAccount, isDeleteAccountPending } = useDeleteAccount();

  const { isOpen, toggle } = useModal();
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
        isOpen={isOpen}
        onClose={toggle}
        text="Do you really want to delete this account?"
        confirmBtnText="Delete"
        onConfirm={() => {
          deleteAccount(selectedAccountId);
          toggle();
        }}
      />
    </div>
  );
};

export default AccountsTable;
