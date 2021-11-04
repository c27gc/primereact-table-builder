import React from "react";
import { Button } from "primereact/button";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const TableHeader = ({
  title,
  dataInfo,
  dataInformation,
  dt,
  data,
  dataSchema,
  createButton,
  isDownloadable,
  input,
  setInput,
  submitted,
  setSubmitted,
  inputDialog,
  setInputDialog,
  setParams,
  setCurrentForm,
  isPaginated,
  headerFormComponent,
  requestObject,
  setRequestObject,
}) => {
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const initialInput = {};

  
    Object.keys(dataSchema).forEach((input) => {
      initialInput[input] = "";
    });
  // const cols = [
  //   { field: "code", header: "Code" },
  //   { field: "name", header: "Name" },
  //   { field: "category", header: "Category" },
  //   { field: "quantity", header: "Quantity" }
  // ];

  const exportColumns = dataInfo.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, data);
        doc.save("products.pdf");
      });
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  return (
    <>
      <h5>{title}</h5>
      <div className="p-d-flex p-ai-center export-buttons justify-left">
        <div>
          {isDownloadable ? (
            <div>
              <Button
                type="button"
                icon="pi pi-file-o"
                onClick={() => exportCSV(false)}
                className="p-mr-2"
                data-pr-tooltip="CSV"
              />

              <Button
                type="button"
                icon="pi pi-file-excel"
                onClick={exportExcel}
                className="p-button-success p-mr-2"
                data-pr-tooltip="XLS"
              />

              <Button
                type="button"
                icon="pi pi-file-pdf"
                onClick={exportPdf}
                className="p-button-danger p-mr-2"
                data-pr-tooltip="PDF"
              />
            </div>
          ) : null}
        </div>
        <div>
          {createButton ? (
            <>
              <Button
                label="Nuevo"
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={() => {
                  //newCallback()
                  setInputDialog(true);
                  setSubmitted(true);
                  setCurrentForm("new");
                  setInput(initialInput);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      <div className="mt-2">
        {(() => {
          if (headerFormComponent) {
            const FindForm = headerFormComponent(setParams, dataInformation);
            return (
              <FindForm
                requestObject={requestObject}
                setRequestObject={setRequestObject}
              />
            );
          }
        })()}
      </div>
    </>
  );
};

export default TableHeader;
