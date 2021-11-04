const columnNumberParameters = (props) => {
  return {
    key:props.key,
    field: props.field,
    sortable: true,
    headerStyle: props.headerStyle,
    header: props.header,
    filter: props.dataInfo.filterVisibility,
    filterMatchMode: 'startsWith'
  }
}

export default columnNumberParameters