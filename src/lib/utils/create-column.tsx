import DeleteAction from "@/components/common/DeleteAction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PencilLine } from "lucide-react";
import { capitalizeWords } from "./helpers";

const columnHelper = createColumnHelper();

// Generalized columns creation function
const createColumns = (fields, actions = {}) => {
  const columns = fields.map((field) => {
    return columnHelper.accessor(field.key, {
      header: ({ column }) =>
        field.sorting === false ? (
          field.label
        ) : (
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            {capitalizeWords(field.label || field.key)}{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      cell: (info) => {
        const value = info.getValue();

        switch (field.type) {
          case "email":
            return <div className="lowercase">{value}</div>;
          case "status":
            return (
              <div className="capitalize">{value ? "Active" : "Inactive"}</div>
            );
          default:
            return value;
        }
      },
    });
  });

  // Adding action column if provided in the `actions` object
  if (actions.update || actions.delete) {
    columns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.update && (
              <DropdownMenuItem
                onClick={() => actions.update(row.original)}
                className="cursor-pointer"
              >
                <PencilLine className="mr-2 h-4 w-4" />
                <h3>Update</h3>
              </DropdownMenuItem>
            )}
            {actions.delete && (
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DeleteAction
                  route={`${actions.delete.apiRoute}/${row.original.id}`}
                  name={row.original[actions.delete.nameKey]}
                  onSuccess={actions.delete.onSuccess}
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    });
  }

  return columns;
};

export default createColumns;