const columnStringParameters = (props) => {
  return {
    field: props.field,
    key: props.key,
    headerStyle: props.headerStyle,
    header: props.header,
    filter: props.dataInfo.filterVisibility,
    filterMatchModed: 'startsWith'
  }
}

export default columnStringParameters;