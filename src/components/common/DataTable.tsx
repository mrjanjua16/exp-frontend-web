// Data Table

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { flexRender } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

import { capitalizeWords } from '@/lib/utils/helpers';
import TableSkeleton from './TableSkeleton';
import Pagination from './Pagination';
import useDataTable from '@/lib/hooks/useDataTable';

const DataTable = ({ 
  heading, 
  apiResource, 
  nameKey, 
  fields, 
  AddComponent, 
  UpdateComponent 
}) => {
  const {
    fetchData,
    table,
    pagination,
    loading,
    search,
    setSearch,
    recordToEdit,
    handleCloseEdit
  } = useDataTable(apiResource, nameKey, fields);

  return (
    <>
      <div className="text-3xl font-bold">
        {heading} ({pagination.total})
      </div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter users by email and name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto mr-1">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {capitalizeWords(column.id.replace(/([A-Z])/g, ' $1').trim())}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {AddComponent && <AddComponent onRecordAdded={fetchData} />}
        </div>
        <div className="rounded-md border">
          {loading ? (
            <TableSkeleton rows={10} columns={table.getAllColumns()} />
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {!header.isPlaceholder &&
                          flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <Pagination
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={pagination.total}
          setCurrentPage={pagination.setCurrentPage}
        />
      </div>
      {UpdateComponent && recordToEdit && (
        <UpdateComponent record={recordToEdit} onClose={handleCloseEdit} />
      )}
    </>
  );
};

DataTable.propTypes = {
  heading: PropTypes.string.isRequired,
  apiResource: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  AddComponent: PropTypes.func,
  UpdateComponent: PropTypes.func
};

export default DataTable;
