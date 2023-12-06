import { useContext, useState } from "react";
import { AuthContext } from "@/auth/AuthContext";

import { shallow } from "zustand/shallow";
import { useUserStore } from "@/store/useUserStore";

export default function Login() {
  const { isAuthenticated } = useContext(AuthContext);
  const { login } = useUserStore(
    (state) => ({
      login: state.login,
    }),
    shallow
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      login(formData);
    }
  };

  return (
    <div className="container mx-auto h-full px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-4/12">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-4 border-l-0 border-r-0 border-t-0 border-indigo-500 bg-white shadow-lg">
            <div className="mb-0 rounded-t px-6 py-6">
              <div className="mb-3 flex items-center justify-between px-2 text-center md:px-4"></div>
              <div className="mb-3 text-center">
                <h6 className="text-md text-gray-600">Iniciar Sesión</h6>
              </div>
              <hr className="border-b-1 mt-6 border-indigo-500" />
            </div>
            <div className="flex-auto px-4 pb-4 pt-2 lg:px-10">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="relative mb-3 w-full">
                  <label className="label-text" htmlFor="grid-email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="input-textarea-primary"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative mb-3 w-full">
                  <label className="label-text" htmlFor="grid-password">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="input-textarea-primary"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-6 text-center">
                  <button className="button-update w-full" type="submit">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
