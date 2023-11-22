const CancelButton = (props: any) => {
  return (
    <button
      type="button"
      className="text-sm font-semibold leading-6 text-gray-900"
      onClick={props?.onClick}
    >
      {props?.text}
    </button>
  );
};

export default CancelButton;