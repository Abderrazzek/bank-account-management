import { Button, Flex } from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationModal from "shared/components/Modal";
import { Account } from "shared/constants";
import { useModal } from "shared/hooks/useModal";
import { useDeleteAccount } from "../hooks";

const TableActionButtons: React.FC<{
  data: Account;
}> = ({ data }) => {
  console.log("=====data", data.id);
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggle } = useModal();
  const { deleteAccount } = useDeleteAccount();

  const handleViewClick = () => {
    navigate(`${location.pathname}/${data.id}?mode=view`);
  };

  const handleEditClick = () => {
    navigate(`/accounts/${data.id}`);
  };

  const handleModalConfirm = () => {
    deleteAccount(data!.id);
    toggle();
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
      {location.pathname === "/accounts" && (
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
            onClick={toggle}
          >
            Delete
          </Button>
          <ConfirmationModal
            isOpen={isOpen}
            onClose={toggle}
            text="Do you really want to delete this account?"
            confirmBtnText="Delete"
            onConfirm={handleModalConfirm}
          />
        </>
      )}
    </Flex>
  );
};

export default TableActionButtons;
