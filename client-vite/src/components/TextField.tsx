interface Props {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  setValue: (val: string) => void
  required: boolean;
  maxWidth?: string;
  subtitle?: string;
}

const TextField: React.FC<Props> = ({
  id,
  label,
  type,
  value,
  setValue,
  placeholder,
  required,
  maxWidth = 'md',
  subtitle = ''
}) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          onChange={(e) => setValue(e.target.value)}
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder={placeholder}
          value={value}
          required={required}
        />
        {
          subtitle && (<p className="mt-3 text-sm leading-6 text-gray-600">{subtitle}</p>)
        }
      </div>

    </div>
  )
}

export default TextField