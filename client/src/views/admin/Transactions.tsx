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

  const initialState: FormInterface = {
    transactionID: 0,
    amount: '',
    type: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (formData: FormInterface) => {
    if (formData.transactionID) {
      updateTransaction(formData, formData.transactionID);
    } else {
      registerTransaction(formData);
    }
    setFormData(initialState);
  };

  const onDeleteTransaction = (id: number) => {
    removeTransaction(id);
  };

  const onEditTransaction = (id: number) => {
    const transaction: Array<FormInterface> = transactions?.data?.filter((p:FormInterface, i:number) => p.transactionID === id);
    setFormData({ ...formData, ...transaction[0] });
  };

  useEffect(() => {
    getAllTransactions(1, null);
  }, []);

  return (
    <div className="container mx-auto lg:px-20">
      <Form
        handleSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <List handleDelete={onDeleteTransaction} handleEdit={onEditTransaction} />
    </div>
  );
}
