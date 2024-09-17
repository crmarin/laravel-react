import DataTable from "@/components/DataTable";
import { FormInterface } from "@/utils/interfaces";

interface Props {
  transactions: FormInterface[];
  handleDelete: (id: number | undefined | null) => void;
  handleEdit: (id: number | undefined | null) => void;
}

export default function List({
  transactions,
  handleDelete,
  handleEdit,
}: Props) {
  return (
    <div className="mx-20 mt-10 w-full px-4 lg:w-10/12">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          initialData={transactions}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
