import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import Products from "@/views/admin/Products";

// views

export default function Admin() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="relative md:ml-72">
        <div className="mx-auto w-full h-full px-4 md:px-2">
          <Products />
        </div>
      </div>
    </>
  );
}
