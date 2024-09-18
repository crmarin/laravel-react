import DataTable from "@/components/DataTable";
import { FormInterface } from "@/utils/interfaces";

interface Props {
  handleDelete: (id: number | undefined | null) => void;
  handleEdit: (id: number | undefined | null) => void;
}

export default function List({
  handleDelete,
  handleEdit,
}: Props) {
  return (
    <div className="lg:mx-20 mt-10 w-full px-4 lg:w-10/12">
      <div className="relative overflow-x-auto">
        <DataTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
