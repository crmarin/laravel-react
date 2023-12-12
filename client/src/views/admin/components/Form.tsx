export default function Form({ handleSubmit, formData, setFormData }) {
  const { name, detail } = formData;

  const onChangeForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="mt-20 mx-20 flex-auto px-4 py-10 pt-0 lg:px-2">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
            <div className="relative mb-3 w-full">
              <label className="label-text" htmlFor="grid-name">
                Name
              </label>
              <input
                type="text"
                className="input-text-primary"
                name="name"
                value={name}
                onChange={onChangeForm}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
            <div className="relative mb-3 w-full">
              <label className="label-text" htmlFor="grid-detail">
                Detail
              </label>
              <input
                type="text"
                className="input-text-primary"
                name="detail"
                value={detail}
                onChange={onChangeForm}
              />
            </div>
          </div>
        </div>

        <hr className="border-b-1 mt-6 border-gray-300" />

        <div className="mb-6 mt-3 flex justify-center text-center">
          <button className="button-red" type="button" onClick={() => setFormData({name: '', detail: ''})}>
            Cancelar
          </button>
          <button
            className="button-blue"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
