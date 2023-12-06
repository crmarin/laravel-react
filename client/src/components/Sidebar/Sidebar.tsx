
/*eslint-disable*/
import { shallow } from "zustand/shallow";
import { useUserStore } from "@/store/useUserStore";

export default function Sidebar({ showSidebar, setShowSidebar }) {

  const { logout } = useUserStore(
    (state) => ({
      logout: state.logout,
    }),
    shallow
  );

  const onLogoutClick = () => {
    logout();
  };

  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl lg:fixed lg:bottom-0 lg:left-0 lg:top-0 lg:block lg:w-72 lg:flex-row lg:flex-nowrap lg:overflow-hidden lg:overflow-y-auto">
      <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 lg:min-h-full lg:flex-col lg:flex-nowrap lg:items-stretch">
        {/* Toggler */}

        <div className="flex w-full items-center justify-between align-middle">
          <button
            className="z-40 w-1/12 cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 lg:hidden"
            type="button"
            onClick={() => setShowSidebar(true)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="flex py-1">
            <button
              className="z-40 cursor-pointer rounded border border-solid border-transparent bg-transparent px-1 py-1 text-xl leading-none text-black opacity-50 lg:inline-block"
              type="button"
            >
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>

        {/* Collapse */}
        <aside
          className={`${
            showSidebar ? "transform-none" : "-translate-x-full"
          } fixed left-0 top-0 z-40 h-screen w-72 flex-1 items-center rounded shadow transition-transform lg:translate-x-0`}
        >
          {/* Brand */}
          <div className="h-full overflow-y-auto bg-gray-50 py-4 pl-8 dark:bg-gray-800">
            <div
              className={`${showSidebar ? "block" : "hidden"} lg:min-w-full`}
            >
              <div className="flex flex-wrap">
                <button
                  type="button"
                  className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-2xl leading-none text-black opacity-50 lg:hidden"
                  onClick={() => setShowSidebar(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />
            {/* Navigation */}

            <ul className="flex list-none flex-col lg:min-w-full lg:flex-col">
              <li>
                <a
                  onClick={() => onLogoutClick()}
                  href="#!"
                  className="block py-3 text-base text-indigo-600 hover:text-blue-600"
                >
                  {" "}
                  Cerrar Sesión
                </a>
              </li>
              {/* Navigation */}
              <hr className="my-4 lg:min-w-full" />
            </ul>
          </div>
        </aside>
      </div>
    </nav>
  );
}
