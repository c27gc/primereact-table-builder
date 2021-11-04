import React from "react";

const ColumnDateBodyClosure = (columnName) => {
  const ColumnDateBody = (rowData) => {
    return (
      <>
        <span
          className=""
          style={{
          }}
        >
          {rowData[columnName]}
        </span>
      </>
    );
  };

  return ColumnDateBody;
};

export default ColumnDateBodyClosure;
