const FormHeader = (props: any) => {
  return (
    <article className="format lg:format-lg">
      <h3>{props.children}</h3>
    </article>
  );
};

export default FormHeader;