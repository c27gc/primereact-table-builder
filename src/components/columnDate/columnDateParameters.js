import ColumnDateBodyClosure from "./columnDateBody";
import FilterElement from "./columnDataFilterElement";
import filterDate from "./columDateFunctions";

const columnDateParameters = (props) => {
  return {
    field: props.field,
    key: props.key,
    headerStyle: props.headerStyle,
    header: props.header,
    body: ColumnDateBodyClosure(props.field),
    sortable: true,
    filter: props.dataInfo.filterVisibility,
    filterMatchMode: "custom",
    filterFunction: filterDate,
    filterElement: FilterElement(props.field, props.tableRef),
  };
};

export default columnDateParameters;
