import { Button, Flex } from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationModal from "shared/components/Modal";
import { Account } from "shared/constants";
import { useDeleteAccount, usePermanentDeleteAccount } from "../hooks";
import { useModal } from "shared/hooks";

const TableActionButtons: React.FC<{
  data: Account;
}> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen: isDeleteOpen, toggle: toggleDelete } = useModal();
  const { isOpen: isPermanentDeleteOpen, toggle: togglePermanentDelete } =
    useModal();
  const { deleteAccount } = useDeleteAccount();
  const { permanentDeleteAccount } = usePermanentDeleteAccount();
  const handleViewClick = () => {
    navigate(`${location.pathname}/${data.id}?mode=view`);
  };

  const handleEditClick = () => {
    navigate(`/accounts/${data.id}`);
  };

  const handleDeleteModalConfirm = () => {
    deleteAccount(data!.id);
    toggleDelete();
  };

  const handlePermanentDeleteModalConfirm = () => {
    permanentDeleteAccount(data!.id);
    togglePermanentDelete();
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
            onClick={toggleDelete}
          >
            Delete
          </Button>
          <ConfirmationModal
            isOpen={isDeleteOpen}
            onClose={toggleDelete}
            text="Are you sure you want to delete this account? This action will mark the account as deleted. The account will still be accessible for viewing but cannot be used for any transactions."
            confirmBtnText="Delete"
            onConfirm={handleDeleteModalConfirm}
          />
        </>
      )}
      {location.pathname === "/deleted-accounts" && (
        <>
          <Button
            leftIcon={<FiTrash />}
            size="sm"
            variant="link"
            onClick={togglePermanentDelete}
          >
            Permanent Delete
          </Button>
          <ConfirmationModal
            isOpen={isPermanentDeleteOpen}
            onClose={togglePermanentDelete}
            text="Are you sure you want to permanently delete this account? This action cannot be undone and you will lose all associated data."
            confirmBtnText="Delete"
            onConfirm={handlePermanentDeleteModalConfirm}
          />
        </>
      )}
    </Flex>
  );
};

export default TableActionButtons;
