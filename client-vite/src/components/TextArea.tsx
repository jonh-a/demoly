interface Props {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  setValue: (val: string) => void
  required: boolean;
  maxWidth?: string;
  rows?: number;
}

const TextArea: React.FC<Props> = ({
  id,
  label,
  value,
  setValue,
  placeholder,
  required,
  maxWidth = 'lg',
  rows = 40
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={`block max-w-${maxWidth} p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        required={required}
      />
    </div>
  )
}

export default TextArea