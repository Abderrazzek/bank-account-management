import React, { useState, useMemo, useEffect } from "react";
import { Button, Flex, Box } from "@chakra-ui/react"; // Chakra UI components
import { FiEye, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useAccountDetails from "accounts/details/hooks/useAccountDetails";
import { Account } from "accounts/hooks/useAccounts";
import { useNavigate } from "react-router-dom";

const Accounts: React.FC = () => {
  const { accounts, loadAccounts } = useAccountDetails();
  const [rowData, setRowData] = useState<Account[]>(accounts);
  const navigate = useNavigate();

  const ActionButtonsComponent: React.FC<any> = ({ data }) => {
    const handleViewClick = () => {
      navigate(`/accounts/${data.id}`, {
        state: {
          data,
        },
      });
    };

    const handleEditClick = () => {
      navigate(`/accounts/${data.id}`, {
        state: {
          data,
          isReadOnly: false,
          // handleDeleteClick,
        },
      });
    };

    const handleDeleteClick = () => {
      //TODO: handle Delete Account using data.id
    };

    return (
      <Flex justify="space-between" align="center" h="100%">
        <Button
          leftIcon={<FiEye />}
          size="sm"
          variant="link"
          onClick={handleViewClick}
        >
          View
        </Button>
        <Button
          leftIcon={<FiEdit />}
          size="sm"
          variant="link"
          onClick={handleEditClick}
        >
          Edit
        </Button>
        <Button
          leftIcon={<FiTrash />}
          size="sm"
          variant="link"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Flex>
    );
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
      cellRenderer: ActionButtonsComponent,
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  useEffect(() => {
    setRowData(accounts);
  }, [accounts]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 50, 100];

  const handleNewAccountClick = () => {
    // Redirect to create new account page
    navigate("/accounts/new");
  };

  return (
    <div>
      <Box mb={4} display="flex" justifyContent="flex-end">
        <Button
          colorScheme="teal"
          leftIcon={<FiPlus />}
          onClick={handleNewAccountClick}
        >
          Create New Account
        </Button>
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
    </div>
  );
};

export default Accounts;
