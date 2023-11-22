interface Props {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  setValue: (val: string) => void
  required: boolean;
  maxWidth?: string;
  rows?: number;
  subtitle?: string;
}

const TextArea: React.FC<Props> = ({
  id,
  label,
  value,
  setValue,
  placeholder,
  required,
  rows = 40,
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
        <textarea
          id={id}
          rows={rows}
          className={'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required={required}
        />
        {
          subtitle && (<p className="mt-3 text-sm leading-6 text-gray-600">{subtitle}</p>)
        }
      </div>
    </div>
  );
};

export default TextArea;