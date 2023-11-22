interface Props {
  type: 'button' | 'submit' | 'reset';
  maxWidth?: string;
  text: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  type = 'submit',
  maxWidth = 'md',
  text,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-white max-w-${maxWidth} ${disabled ? 'bg-gray-400' : 'bg-blue-700'} ${!disabled && 'hover:bg-blue-800'}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {text}
    </button>
  );
};

export default Button;