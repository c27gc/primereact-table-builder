const columnComponentWihoutFilter = (body) => {
  const columnComponentWihoutFilterFactory = (props) => {
    return {
      key: props.key,
      field: props.field,
      header: props.header,
      body: body,
      filter: false
    }
  }

  return columnComponentWihoutFilterFactory
}

export default columnComponentWihoutFilter