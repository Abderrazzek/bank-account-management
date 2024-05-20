import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDeleteAccount } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { usePagination } from "../hooks";
import {
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
} from "../constants";
import ConfirmationModal from "shared/components/Modal";
import Spinner from "shared/components/Spinner";
import { useAccounts, useModal } from "shared/hooks";

interface Props {
  isDeletedAccounts?: boolean;
}

const AccountsTable: React.FC<Props> = ({ isDeletedAccounts = false }) => {
  const { accounts, isLoading } = useAccounts(
    isDeletedAccounts ? "true" : "false"
  );
  const { deleteAccount, isDeleteAccountPending } = useDeleteAccount();

  const { isOpen, toggle } = useModal();
  // TODO REMOVE PROVIDER AND READ IT FROM URL
  const { id } = useParams();
  const { defaultColDef, colDefs } = usePagination();
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    navigate("/new-account");
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
          deleteAccount(id!);
          toggle();
        }}
      />
    </div>
  );
};

export default AccountsTable;
