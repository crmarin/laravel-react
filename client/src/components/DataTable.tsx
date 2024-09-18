import { useTransactionsStore } from "@/store/useTransactionsStore";
import { FormInterface } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

interface Props {
  handleDelete: (id: number | undefined | null) => void;
  handleEdit: (id: number | undefined | null) => void;
}

export default function DataTable({ handleDelete, handleEdit }: Props) {
  const { transactions, getAllTransactions } = useTransactionsStore(
    (state) => ({
      transactions: state.transactions,
      getAllTransactions: state.getAllTransactions,
    }),
    shallow
  );

  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState<keyof FormInterface>("amount");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set number of items per page

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // Sorting Function
  const sortData = (key: keyof Data) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return newOrder === "asc" ? -1 : 1;
      if (a[key] > b[key]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortKey(key);
    setSortOrder(newOrder);
  };

  const filteredData = data?.filter(
    (row) =>
      row.transactionID.toString().includes(searchTerm.toLowerCase()) ||
      row.amount.toString().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentData = filteredData;
  const totalPages = transactions.last_page;

  const paginateFirst = () => setCurrentPage(1);
  const paginateLast = () => setCurrentPage(totalPages);
  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    getAllTransactions(currentPage, filters);
  }, [currentPage, filters]);

  useEffect(() => {
    setData(transactions.data);
  }, [transactions]);

  return (
    <div>
      <p className="text-lg text-gray-700">Filters</p>
      <div className="flex flex-wrap gap-3 px-4">
        <div className="w-full px-4 lg:w-5/12">
          <div className="relative mb-3 w-full">
            <label className="label-text" htmlFor="grid-amount">
              Global Search
            </label>
            <input
              type="text"
              placeholder="Search by description, type or amount"
              className="input-text-primary"
              name="amount"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full px-4 lg:w-3/12">
          <div className="relative mb-3 w-full">
            <label className="label-text" htmlFor="grid-amount">
              Start date
            </label>
            <input
              type="date"
              name="startDate"
              className="input-text-primary"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="w-full px-4 lg:w-3/12">
          <div className="relative mb-3 w-full">
            <label className="label-text" htmlFor="grid-amount">
              End date
            </label>
            <input
              type="date"
              name="endDate"
              className="input-text-primary"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 mt-2">Transaction list</p>

      <table className="mt-2 w-full text-left text-sm text-gray-500">
        <thead className="text-xs uppercase text-gray-700 text-center">
          <tr>
            <th onClick={() => sortData("transactionID")}>
              ID{" "}
              {sortKey === "transactionID" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortData("amount")}>
              Amount {sortKey === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortData("type")}>
              Type {sortKey === "type" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortData("description")}>
              Description{" "}
              {sortKey === "description" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortData("creationDate")}>
              creationDate{" "}
              {sortKey === "creationDate" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData?.length > 0 ? (
            currentData?.map((transaction: FormInterface, index: number) => (
              <tr className="border-b border-gray-200" key={index}>
                <th scope="row" className="px-6 py-4">
                  {transaction.transactionID}
                </th>
                <th scope="row" className="px-6 py-4">
                  {transaction.amount}
                </th>
                <td className="px-6 py-4"> {transaction.type}</td>
                <td className="px-6 py-4"> {transaction.description}</td>
                <th scope="row" className="px-6 py-4">
                  {transaction.creationDate}
                </th>
                <td>
                  <button
                    className="button-red"
                    type="button"
                    onClick={() => handleDelete(transaction?.transactionID)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="button-blue"
                    type="button"
                    onClick={() => handleEdit(transaction?.transactionID)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-2 align-middle items-center">
        <button
          className="button-first w-18"
          onClick={paginateFirst}
          disabled={currentPage === 1}
        >
          <span>{"<< First"}</span>
        </button>
        <button
          className="button-prev w-18"
          onClick={paginatePrev}
          disabled={currentPage === 1}
        >
          <span>{"< Previous"}</span>
        </button>
        <button
          className="button-post w-18"
          onClick={paginateNext}
          disabled={currentPage === totalPages}
        >
          <span>{"> Next"}</span>
        </button>
        <button
          className="button-last w-18"
          onClick={paginateLast}
          disabled={currentPage === totalPages}
        >
          <span>{">> Last"}</span>
        </button>
        <div className="text-gray-700 text-sm">
          Page <span>{`${currentPage} of ${totalPages}`}</span>
        </div>
      </div>
    </div>
  );
}
