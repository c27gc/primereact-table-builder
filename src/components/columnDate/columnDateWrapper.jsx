import React from 'react';
import ColumnDate from "./columnDate";

const DateColumnWrapper = (props) => {

  return (
    <>
      <ColumnDate
        key={props.key}
        headerStyle={props.headerStyle}
        field={props.field}
        header={props.header}
        tableRef={props.tableRef}
      />
    </>
  )
  
};

export default DateColumnWrapper;