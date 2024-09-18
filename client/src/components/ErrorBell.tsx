import { useErrorStore } from '@/store//useErrorStore';

export default function ErrorBell() {
  const errorGlobal = useErrorStore((state) => state.errorGlobal);

  return errorGlobal?.errors ?
    <>
      <span className="mr-2 text-sm text-red-500">
        <i className="fas fa-bell"></i>
      </span>
      {
        Object.entries(errorGlobal?.errors).map(([key, value], index) => (
          <div key={index}>
            <div className="mr-2 text-sm text-red-500">
              <span className='font-bold'>{key}</span>: {value}
            </div>
          </div>
        ))}
    </>
    : null
}
