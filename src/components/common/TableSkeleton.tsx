import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const TableSkeleton = ({ rows, columns }: any) => {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            {columns.map((col: any, colIndex: number) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableSkeleton;
