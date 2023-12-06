import { useContext, useEffect } from "react";
import { AuthContext } from "@/auth/AuthContext";

import { shallow } from "zustand/shallow";
import { useProductsStore } from "@/store/useProductsStore";

export default function Products() {
  const { isAuthenticated } = useContext(AuthContext);

  const { getAllProducts, products } = useProductsStore(
    (state) => ({
      getAllProducts: state.getAllProducts,
      products: state.products,
    }),
    shallow
  );

  useEffect(() => {
    getAllProducts();
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto px-20">
      <div className="mx-20 mt-20 w-full px-4 lg:w-10/12">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="bg-gray-50 px-6 py-3 dark:bg-gray-800"
                >
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4"> {product.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
