import FormHeader from "./FormHeader"

const Form = (props: any) => {
  return (
    <form onSubmit={props?.onSubmit}>
      <div className="space-y-12">
        <div className="my-1 border-b border-gray-900/10 pb-12">
          <FormHeader>
            {props?.header}
          </FormHeader>
          {props?.subtitle && (<p className="mt-1 text-sm leading-6 text-gray-600">
            {props?.subtitle}
          </p>)}

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {props.children}
          </div>

        </div>
        {props?.buttonSet}
      </div>
    </form>
  )
}

export default Form