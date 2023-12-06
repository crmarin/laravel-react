import background from '@/assets/img/404.svg';

export default function Page404() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div
          className="bg-50 absolute h-full w-full bg-cover"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="container mx-auto h-full px-4">
          <div className="-mx-4 flex h-full flex-wrap items-center">
            <div className="relative w-full px-4 text-center">
              <h1 className="text-10 sm:text-12 tracking-875 text-gray-800">
                404
              </h1>
              <h4 className="mb-2 mt-0 text-4xl">
                No tiene permisos para acceder a esta ruta :(
              </h4>
              <p className="text-2xl leading-normal text-gray-800">
                Ooooups! Puede contactarse con el administrador o servicio
                técnico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
