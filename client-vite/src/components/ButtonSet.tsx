const ButtonSet = (props: any) => {
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      {props.children}
    </div>
  );
};

export default ButtonSet;