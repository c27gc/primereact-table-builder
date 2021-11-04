import React from "react";

const ColumnDateBodyClosure = (columnName) => {
  const ColumnDateBody = (rowData) => {
    return (
      <React.Fragment>
        <span
          className=""
          style={{
          }}
        >
          {rowData[columnName]}
        </span>
      </React.Fragment>
    );
  };

  return ColumnDateBody;
};

export default ColumnDateBodyClosure;
