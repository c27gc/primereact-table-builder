import React, { useRef, useEffect, useState } from "react";
//import ColumnDate from "../components/columnDate/columnDate";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import TableHeader from "./tableHeader";
import CrudModals from "../columnCrud/crudModals";


console.log("DataTable", typeof DataTable);
const GeneralTableComponent = ({
  paginatedDataRoute,
  isDownloadable,
  hasCreateButton,
  title,
  dataRoute,
  initialPage,
  requestData,
  columns,
  isLazy,
  template,
  dataInfo,
  editCallback,
  deleteCallback,
  newCallback,
  numberOfPages,
  hasUpdateButton,
  hasDeleteButton,
  headerFormComponent,
  filterRoute,
  rowClickActionName,
  rowClickActionCallback,
  hasRowReorder,
  onRowReorderCallback,
  numberOfRecords
}) => {
  /* ================= base states ================= */

  const dataTableRef = useRef(null);

  const [filters, setFilters] = useState({});

  const [input, setInput] = useState({});
  const [inputDialog, setInputDialog] = useState(false);
  const [deleteInputDialog, setDeleteInputDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });
  /* =============================================== */

  /* ================== base refs ================== */
  const [data, setData] = useState([{}]);

  const [reRender, setReRender] = useState(false);

  const [first, setFirst] = useState(0);

  const filteredFields = Object.keys(dataInfo).filter( field => {
    if (dataInfo[field].filterVisibility) {
      return field;
    }
  })

  const dataModel = Object.keys(dataInfo).map(field => {
    return field
  }).reduce( (acc, field) => {
    acc[field] = ""
    return acc
  }, {})



  const loadLazyData = async (lazyParams) => {
    setLoading(true);
    console.log("LAZU PARAMS IN LOAD", lazyParams);

    const stringifyFilter = lazyParams["filters"] ? 
      Object.keys(lazyParams["filters"]).reduce((accumulate, current) => {

        console.log("________lazyParams_________", lazyParams)
        const value = lazyParams["filters"][current]["value"]

        console.log("_____VALUE", value )
        console.log("_____OTHER VALUE", [""] )
        console.log("_____", value !== [""])

        if ( (typeof value ==="string") && ( value !== undefined && value !== null && value !== "" && value !== [null]) ) {
          accumulate[current] = value;
        } else if ( value.every( v => ( Boolean(v) === true))) {
          accumulate[current] = value;
        } 
        
        return accumulate;
      }, {}
    ) : {}


    const dataReceive = await requestData( stringifyFilter, lazyParams["page"] +1 );
    console.log("dataReceive.data 1", dataReceive)
    setData(dataReceive);

    setLoading(false);
  };

  useEffect(() => {

    const stringifyFilter = filters ? 
      Object.keys(filters).reduce((accumulate, current) => {
        const value = filters[current]["value"]
        if ( value !== "" && value !== [""] && value !== []) {
          accumulate[current] = value;
        }
        return accumulate;
      }, {}
    ) : {}

    const requestInitialData = async () => {
      const dataReceive = await requestData(stringifyFilter, params["page"] + 1)
      console.log("dataReceive.data 2", dataReceive)
      setData(dataReceive);
    }

    requestInitialData();


  }, [])

  const onPage = (event) => {
    console.log("onPage:", event);
    let _lazyParams = { ...params, ...event };
    _lazyParams["first"] = event["first"];
    setParams(_lazyParams);
  };

  const onFilter = (event) => {
    let _lazyParams = { ...params, ...event };
    _lazyParams["first"] = 0;
    setParams(_lazyParams);
  };

  useEffect(() => {
    loadLazyData(params);
    setFirst(params["first"]);
    setFilters(params["filters"]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // setRoute(isPaginated ? paginatedDataRoute + "/" + initialPage : dataRoute)

  // useEffect(() => {
  //   const fetchData = async (route2) => {
  //     const response = await requestData(route2);
  //     setData(response);
  //   };

  //   setData([{}]);
  //   setNumberOfPage(numberOfPage);
  //   fetchData(route);
  // }, [numberOfPage, requestData, route]);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!inputDialog && rowClickActionName === "redirection" && selectedItem) {
      const redirectionRoute = rowClickActionCallback(selectedItem);
      window.open(redirectionRoute);
    } else if (
      !inputDialog &&
      rowClickActionName === "getData" &&
      selectedItem
    ) {
      rowClickActionCallback(selectedItem);
    }
  }, [rowClickActionName, inputDialog, selectedItem, rowClickActionCallback]);

  const dataFields = Object.keys(dataInfo).map((element) => {
    const elementInfo = {};
    elementInfo["field"] = element;
    elementInfo["header"] = dataInfo[element].title;

    return elementInfo;
  });

  useEffect(() => {
    console.log("data REQUESTED: ", data);
  }, [data]);

  // useEffect(() => {
  //   console.log("ROUTE CHANGE: ", route);
  // }, [route]);

  const [requestObject, setRequestObject] = React.useState({});

  // Efecto de filtrado en el TableHeader
  useEffect(() => {

    if (isLazy && requestObject["ready"]) {
      const { ready, ...finalRequest } = requestObject;
      setRequestObject({ ...finalRequest, ready: false });

      /* [AnX] Esto permite conservar data entre los renderizados destructivos
      del header, se conserva en requestObject pero no se envia en el
      query al backend */
      delete finalRequest.temp;

      const newFilters = Object.keys(finalRequest).reduce((accumulate, current) => {
        accumulate[current] = {
          value: finalRequest[current],
          matchMode: "startsWith",
        }
        return accumulate;
      }, {})


      console.log(filters)
      
      const cleanedFiltersKeys = filters ? Object.keys(filters).filter( oldFilterKey => {
        return filteredFields.includes(oldFilterKey)
           
      }) : []

      console.log(cleanedFiltersKeys)
      const cleannedFilters = (cleanedFiltersKeys.length > 0) ? cleanedFiltersKeys.reduce((accumulate, current) => {
        accumulate[current] = filters[current];
        return accumulate;
      }, {}) : {}

      console.log("cleannedFilters", cleannedFilters)

      // se puede agrwegar ...filters
      let _lazyParams = { ...params, ...{filters: {  ...cleannedFilters, ...newFilters }} };

      _lazyParams["first"] = 0;
      setParams(_lazyParams);


      // [AnX] Para generalizar que se indique una ruta con $params donde sea que este ubicado el objeto de filtrado
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestObject["ready"]] );

  // useEffect(() => {

  //   const stringifyFilter = lazyParams[filters] ? JSON.stringify(
  //     Object.keys(lazyParams[filters]).reduce((accumulate, current) => {
  //       accumulate[current] = filters[current]["value"];
  //       return accumulate;
  //     }, {}) 
  //   ) : {}
    
  //   requestData(lazyParams, JSON.stringify(stringifyFilter), lazyParams["page"]);
  // }, [filters]);

  const onRowReorder = (e) => {
    console.log("CAMBIADO", e);
    onRowReorderCallback(e.value);
    setData(e.value);
  };

  return (
    <div className="">
      <>
        <DataTable
          ref={dataTableRef}
          value={data}
          lazy={isLazy}
          paginator
          rows={5}
          selectionMode="single"
          rowHover
          onRowReorder={onRowReorder}
          totalRecords={numberOfRecords}
          loading={loading}
          header={
            <TableHeader
              title={title}
              dataInfo={dataFields}
              dataInformation={dataInfo}
              dt={dataTableRef}
              data={data}
              dataSchema={dataModel}
              createButton={hasCreateButton}
              isDownloadable={isDownloadable}
              input={input}
              setInput={setInput}
              submitted={submitted}
              setSubmitted={setSubmitted}
              inputDialog={inputDialog}
              setInputDialog={setInputDialog}
              setParams={setParams}
              setCurrentForm={setCurrentForm}
              isPaginated={isLazy}
              headerFormComponent={headerFormComponent}
              requestObject={requestObject}
              setRequestObject={setRequestObject}
              
            />
          }
          selection={selectedItem}
          filters={isLazy ? params.filters: filters}
          first={first}
          onPage={ onPage }
          onFilter={ onFilter }
          onSelectionChange={(e) => setSelectedItem(e.value)}
          emptyMessage="No data found."
        >
          {hasRowReorder ? (
            <Column rowReorder style={{ width: "3em" }} />
          ) : null}

          <Column selectionMode="simple" style={{ width: "3em" }} />

          {Object.keys(dataInfo).map((fieldName, index) => {
            if (!dataInfo[fieldName].visible) {
              return null;
            }

            const ColumnRender = columns[dataInfo[fieldName].type];

            return (
              <Column
                {...ColumnRender({
                  key: fieldName + index,
                  headerStyle: {
                    minWidth: "150px",
                  },
                  field: fieldName,
                  header: dataInfo[fieldName].title,
                  tableRef: dataTableRef,
                  dataInfo: dataInfo[fieldName],
                })}
              />
            );
          })}

          {columns["crud"] ? (
            <Column
              {...columns["crud"]({
                key: "crudkey",
                headerStyle: {
                  minWidth: "150px",
                },
                header: "",
                tableRef: dataTableRef,
                dataInfo: dataInfo,
                setInput: setInput,
                setInputDialog: setInputDialog,
                setDeleteInputDialog: setDeleteInputDialog,
                setCurrentForm: setCurrentForm,
                hasUpdateButton: hasUpdateButton,
                hasDeleteButton: hasDeleteButton,
              })}
            />
          ) : null}
        </DataTable>

        
          <CrudModals
            input={input}
            setInput={setInput}
            submitted={submitted}
            setSubmitted={setSubmitted}
            inputDialog={inputDialog}
            setInputDialog={setInputDialog}
            deleteInputDialog={deleteInputDialog}
            setDeleteInputDialog={setDeleteInputDialog}
            dataSchema={dataModel}
            dataInfo={dataInfo}
            editCBInput={editCallback}
            deleteCBInput={deleteCallback}
            newCBinput={newCallback}
            currentForm={currentForm}
            setReRender={setReRender}
          />
      </>
    </div>
  );
};

export default GeneralTableComponent;
