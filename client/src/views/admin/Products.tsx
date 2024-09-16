import { useEffect, useState } from "react";

import { shallow } from "zustand/shallow";
import { useProductsStore } from "@/store/useProductsStore";
import Form from "./components/Form";
import List from "./components/List";
import { FormInterface } from "@/utils/interfaces";

export default function Products() {

  const {
    getAllProducts,
    products,
    registerProduct,
    updateProduct,
    removeProduct,
  } = useProductsStore(
    (state) => ({
      getAllProducts: state.getAllProducts,
      registerProduct: state.registerProduct,
      updateProduct: state.updateProduct,
      removeProduct: state.removeProduct,
      products: state.products,
    }),
    shallow
  );

  const initialState: FormInterface = {
    id: null,
    name: "",
    detail: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (formData: FormInterface) => {
    if (formData.id) {
      updateProduct(formData, formData.id);
    } else {
      registerProduct(formData);
    }
    setFormData(initialState);
  };

  const onDeleteProduct = (id: number) => {
    removeProduct(id);
  };

  const onEditProduct = (id: number) => {
    const product: Array<FormInterface> = products?.filter((p:FormInterface, i:number) => p.id === id);
    setFormData({ ...formData, ...product[0] });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto px-20">
      <Form
        handleSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <List products={products} handleDelete={onDeleteProduct} handleEdit={onEditProduct} />
    </div>
  );
}
