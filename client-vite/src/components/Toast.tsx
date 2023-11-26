import { useEffect } from 'react';

interface Props {
  header: string;
  text: string;
  type: 'error' | 'warning' | 'success'
  open: boolean;
  setOpen: (open: boolean) => void
}

const Toast: React.FC<Props> = ({
  header,
  text,
  type,
  open,
  setOpen,
}) => {
  const colors = {
    error: 'red',
    warning: 'orange',
    success: 'green',
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      {
        open && (
          <div className={`my-3 bg-${colors[type]}-200 border border-${colors[type]}-400 text-${colors[type]}-700 px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{header} </strong>
            <span className="block sm:inline">{text}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className={`fill-current h-6 w-6 text-${colors[type]}-500`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setOpen(false)}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )
      }
    </>
  );
};

export default Toast;