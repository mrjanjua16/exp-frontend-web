import api from "@/lib/api/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteAction = ({
  route,
  name,
  onSuccess,
  onError,
  children = "Delete",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(route);
      toast.success(`${name} deleted successfully`, {
        autoClose: 2000,
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || `Error deleting ${name}`;
      toast.error(errorMessage);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className={"w-full text-left flex items-center cursor-pointer"}
      >
        <Trash2 className="mr-2 flex h-4 w-4" />
        {children}
      </button>
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you want to delete {name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {name}{" "}
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} variant="destructive">
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Define PropTypes
DeleteAction.propTypes = {
  route: PropTypes.string.isRequired, // The route to delete the item
  name: PropTypes.string.isRequired, // Name of the item being deleted
  onSuccess: PropTypes.func, // Function to call on success
  onError: PropTypes.func, // Function to call on error
  children: PropTypes.node, // Children elements (optional)
};

export default DeleteAction;
