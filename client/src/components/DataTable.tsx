import { FormInterface } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";

interface Props {
  initialData: FormInterface[];
  handleDelete: (id: number | undefined | null) => void;
  handleEdit: (id: number | undefined | null) => void;
}

export default function DataTable({
  initialData,
  handleDelete,
  handleEdit,
}: Props) {
  const [data, setData] = useState(initialData); 
  const [sortKey, setSortKey] = useState<keyof FormInterface>("amount");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page

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

  const filteredData = data.filter(
    (row) =>
      row.transactionID.toString().includes(searchTerm.toLowerCase()) ||
      row.amount.toString().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  useEffect(()=> {
    setData(initialData)
  }, [initialData])

  return (
    <div>
      <div className="w-full px-4 lg:w-6/12">
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

      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
          <tr>
            <th onClick={() => sortData("transactionID")}>
              ID {sortKey === "transactionID" && (sortOrder === "asc" ? "↑" : "↓")}
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
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData?.map((transaction: FormInterface, index: number) => (
              <tr
                className="border-b border-gray-200 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4"
                >
                  {transaction.transactionID}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4"
                >
                  {transaction.amount}
                </th>
                <td className="px-6 py-4"> {transaction.type}</td>
                <td className="px-6 py-4"> {transaction.description}</td>
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

      <div style={{ marginTop: "10px" }}>
        <button
          className="button-first w-18"
          onClick={paginateFirst}
          disabled={currentPage === 1}
        >
          <span className="">{"<< Primero"}</span>
        </button>
        <button
          className="button-prev w-18"
          onClick={paginatePrev}
          disabled={currentPage === 1}
        >
          <span className="">{"< Anterior"}</span>
        </button>
        <button
          className="button-post w-18"
          onClick={paginateNext}
          disabled={currentPage === totalPages}
        >
          <span className="">{"> Siguiente"}</span>
        </button>
        <button
          className="button-last w-18"
          onClick={paginateLast}
          disabled={currentPage === totalPages}
        >
          <span className="">{">> Último"}</span>
        </button>
        <div className="text-gray-800 dark:text-gray-300">
          Página <span>{`${currentPage} de ${totalPages}`}</span>
        </div>
      </div>
    </div>
  );
}
