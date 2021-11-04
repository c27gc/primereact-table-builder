import { Button } from "primereact/button";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React from "react";

const statusBodyTemplateClosure = (
  setInput,
  setInputDialog,
  setDeleteInputDialog,
  setCurrentForm,
  hasUpdateButton,
  hasDeleteButton
) => {
  const statusBodyTemplate = (rowData) => {
    const StatusBodyTemplate = () => {
      return (
        <>
          <div>
            {hasUpdateButton ? <Button
              icon="pi pi-pencil"
              className="p-button p-button-primary p-mr-2"
              onClick={() => {
                setInput({ ...rowData });
                setCurrentForm("edit")
                setInputDialog(true);
              }}
            /> : null}
            {hasDeleteButton ? <Button
              icon="pi pi-trash"
              className="p-button p-button-danger"
              onClick={() => {
                setInput(rowData)
                setDeleteInputDialog(true);
              }}
            /> : null}
          </div>
        </>
      );
    };

    return <StatusBodyTemplate />;
  };
  return statusBodyTemplate;
};

export default statusBodyTemplateClosure;
