import { FormInterface } from "@/utils/interfaces";

interface FormProps {
  handleSubmit?: (form: FormInterface) => void;
  formData: FormInterface;
  setFormData: (form: FormInterface) => void;
}

export default function Form({
  handleSubmit,
  formData,
  setFormData,
}: FormProps) {
  const { amount, type, description } = formData;

  // Type for the event should be React.ChangeEvent<HTMLInputElement>
  const onChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // onSubmit should prevent default and handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleSubmit) {
      handleSubmit(formData);
    }
  };

  return (
    <div className="lg:mx-20 mt-20 flex-auto px-4 pt-0 lg:px-2">
      <p className="text-lg text-gray-700">Transaction form</p>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-2/12">
            <div className="relative mb-3 w-full">
              <label className="label-text" htmlFor="grid-amount">
                Amount
              </label>
              <input
                type="number"
                className="input-text-primary"
                name="amount"
                value={amount}
                onChange={onChangeForm}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12">
            <div className="relative mb-3 w-full">
              <label className="label-text" htmlFor="grid-type">
                Tipo
              </label>
              <select
                className="input-select-primary"
                name="type"
                value={type}
                onChange={onChangeForm}
              >
                <option key={0} value=""></option>
                <option key={1} value="debit">
                  debit
                </option>
                <option key={2} value="credit">
                  credit
                </option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12">
            <div className="relative mb-3 w-full">
              <label className="label-text" htmlFor="grid-description">
                Description
              </label>
              <input
                type="text"
                className="input-text-primary"
                name="description"
                value={description}
                onChange={onChangeForm}
              />
            </div>
          </div>
        </div>

        <hr className="border-b-1 mt-6 border-gray-300" />

        <div className="mb-6 mt-3 flex justify-center text-center">
          <button
            className="button-red"
            type="button"
            onClick={() => setFormData({ id: 0, amount: 0, type: "", description: "" })}
          >
            Cancelar
          </button>
          <button className="button-blue" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
