// TableActionButtons.tsx

import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Account } from "../models";

const TableActionButtons: React.FC<{
  data: Account;
  isDeletedAccounts: boolean;
  handleDeleteClick: () => void;
}> = ({ data, isDeletedAccounts, handleDeleteClick }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/${isDeletedAccounts ? "deleted-" : ""}accounts/${data.id}`, {
      state: {
        data,
      },
    });
  };

  const handleEditClick = () => {
    //TODO handle deleted-account
    navigate(`/accounts/${data.id}`, {
      state: {
        data,
        isReadOnly: false,
        handleDeleteClick,
      },
    });
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
      {!isDeletedAccounts && (
        <>
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
        </>
      )}
    </Flex>
  );
};

export default TableActionButtons;
