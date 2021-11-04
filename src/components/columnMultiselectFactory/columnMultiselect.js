import statusBodyTemplateClosure from './multiselectionBody'
import RenderStatusFilter from './multiselectionFilterElement'

const columnMultiselectFactory = (mappingPolicy, colorPolicy) => {

  const columnMultiselect = (props) => {
    return {
      key: props.key,
      field: props.field,
      header: props.header,
      headerStyle: props.headerStyle,
      body: statusBodyTemplateClosure(props.field, mappingPolicy, colorPolicy),
      filter: props.dataInfo.filterVisibility,
      filterElement: RenderStatusFilter(mappingPolicy, colorPolicy, props.tableRef, props.field),
    }
  }

  return columnMultiselect


}

export default columnMultiselectFactory