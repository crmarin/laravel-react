import Transactions from "@/views/admin/Transactions";

// views

export default function Admin() {

  return (
    <>
      <div className="relative">
        <div className="mx-auto w-full h-full px-4 md:px-2">
          <Transactions />
        </div>
      </div>
    </>
  );
}
