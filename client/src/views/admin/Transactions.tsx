import { useEffect, useState } from "react";

import { shallow } from "zustand/shallow";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import Form from "./components/Form";
import List from "./components/List";
import { FormInterface } from "@/utils/interfaces";

export default function Transactions() {

  const {
    getAllTransactions,
    transactions,
    registerTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransactionsStore(
    (state) => ({
      getAllTransactions: state.getAllTransactions,
      registerTransaction: state.registerTransaction,
      updateTransaction: state.updateTransaction,
      removeTransaction: state.removeTransaction,
      transactions: state.transactions,
    }),
    shallow
  );
  console.log("🚀 ~ file: Transactions.tsx:18 ~ Transactions ~ transactions:", transactions)

  const initialState: FormInterface = {
    id: null,
    amount: 0,
    type: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (formData: FormInterface) => {
    if (formData.id) {
      updateTransaction(formData, formData.id);
    } else {
      registerTransaction(formData);
    }
    setFormData(initialState);
  };

  const onDeleteTransaction = (id: number) => {
    removeTransaction(id);
  };

  const onEditTransaction = (id: number) => {
    const transaction: Array<FormInterface> = transactions?.filter((p:FormInterface, i:number) => p.id === id);
    setFormData({ ...formData, ...transaction[0] });
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="container mx-auto px-20">
      <Form
        handleSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <List transactions={transactions} handleDelete={onDeleteTransaction} handleEdit={onEditTransaction} />
    </div>
  );
}
