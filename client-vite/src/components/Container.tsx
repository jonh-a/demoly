const Container = (props: any) => {
  const { maxWidth = 'xl' } = props
  return (
    <div className={`container mx-auto px-4 max-w-${maxWidth}`}>
      {props.children}
    </div>
  )
}

export default Container