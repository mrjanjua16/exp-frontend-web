import dataTableService from "../api/dataTableService";

import createColumns from "../utils/create-column";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useDataTable = (resource, nameKey, fields) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const actions = {
    update: (row) => setRecordToEdit(row),
    delete: {
      apiRoute: resource,
      nameKey: nameKey,
      onSuccess: () => fetchData(),
    },
  };

  const handleCloseEdit = (reload) => {
    setRecordToEdit(null);
    reload && fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await datatableService.listRecords(resource, {
        page: currentPage + 1,
        size: pageSize,
        search,
      });
      setTableData(data);
    } catch (error) {
      toast.error(error.response?.data.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search]);

  const table = useReactTable({
    data: tableData.data,
    columns: createColumns(fields, actions),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
  });

  return {
    fetchData,
    table,
    pagination: {
      currentPage,
      setCurrentPage,
      pageSize,
      total: tableData?.meta?.total ?? 0,
    },
    loading,
    recordToEdit,
    setRecordToEdit,
    handleCloseEdit,
    search,
    setSearch,
  };
};

export default useDataTable;
