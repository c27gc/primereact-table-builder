import React from "react";
import GeneralTableComponent from "../components/generalTableComponent/generalTableComponent";
import useColumnBuilder from "./useColumnBuilder";

class TableBuilder {
  constructor(isPaginated, isDownloadable, columnBuilder) {
    this.columnBuilder = columnBuilder;
    this.isPaginated = isPaginated || false;
    this.isDownloadable = isDownloadable && true;
    this.tableName = "Table Title";
    this.hasCreateButton = false;
    this.headerFormComponent = null;
    this.requestData = () => {};
    this.editCallback = () => {};
    this.deleteCallback = () => {};
    this.newCallback = () => {};
    this.columns = [];
    this.hasUpdateButton = false;
    this.hasDeleteButton = false;
    this.filterRoute = null;
    this.hasRowReorder = false;
    return this;
  }

  addTableName(title) {
    this.tableName = title;
    return this;
  }

  addRowClickAction(actionName, actionCallback) {
    this.rowClickActionName = actionName;
    this.rowClickActionCallback = actionCallback;
    return this;
  }

  addColumnFilters(filters) {
    filters.forEach((element) => {
      this.columnBuilder.addType(element);
    });
    return this;
  }

  

  addCustomColumnFilter(name, parametersGenerator) {
    this.columnBuilder.addCustomType(name, parametersGenerator);
    return this;
  }

  addNewFunction(callback) {
    this.newCallback = callback;
    return this;
  }

  addEditFunction(callback) {
    this.editCallback = callback;
    return this;
  }

  addNumberOfPages(route) {
    this.numberOfPages = route;
    return this;
  }

  addDeleteFunction(callback) {
    this.deleteCallback = callback;
    return this;
  }

  addRequestData(requestData) {
    this.requestData = requestData;
    return this;
  }

  addNumberOfRecords( numberOfRecords) {
    this.numberOfRecords = numberOfRecords
    return this
  }

  addPaginatedDataRoute(route) {
    if (!this.isPaginated) {
      throw new Error(
        "The method addPaginatedDataRoute in only available in paginated tables, try with addDataRoute method."
      );
    } else {
      this.paginatedDataRoute =
        route.slice(-1) !== "/" ? route : route.slice(0, -1);
      return this;
    }
  }

  addHeaderFilter(headerFormComponent) {
    // if (!this.isPaginated) {
    //   throw new Error(
    //     "The method addHeaderFilter in only available in paginated tables."
    //   );
    // } else {
    //   console.log("headerFormComponent", headerFormComponent);
      this.headerFormComponent = headerFormComponent;
      return this;
    // }
  }

  addFilterRoute(filterRoute) {
    this.filterRoute = filterRoute;
    return this;
  }

  addDataRoute(route) {
    if (this.isPaginated) {
      throw new Error(
        "The method addDataRoute is only available in non paginated tables, try with addPaginatedDataRoute method."
      );
    } else {
      this.dataRoute = route;
      return this;
    }
  }

  addCrudColumn(createButton, updateButton, deleteButton) {
    this.hasUpdateButton = updateButton;
    this.hasDeleteButton = deleteButton;
    this.hasCreateButton = createButton;
    return this;
  }

  addInitialPage(initialPage) {
    this.initialPage = initialPage;
    return this;
  }

  addPaginatorTemplate(template) {
    this.paginatorTemplate = template;
    return this;
  }

  addDataInfo(dataInfo) {
    this.dataInfo = dataInfo;
    return this;
  }
  
  addOnRowReorder(onRowReorder) {
    this.hasRowReorder = true
    this.onRowReorder = onRowReorder
    return this
  }

  build() {
    const TableResult = () => {
      return (
        <GeneralTableComponent
          paginatedDataRoute={this.paginatedDataRoute}
          dataRoute={this.dataRoute}
          title={this.tableName}
          isDownloadable={this.isDownloadable}
          hasUpdateButton={this.hasUpdateButton}
          hasDeleteButton={this.hasDeleteButton}
          hasCreateButton={this.hasCreateButton}
          initialPage={this.initialPage}
          requestData={this.requestData}
          columns={this.columnBuilder.build()}
          isLazy={this.isPaginated}
          template={this.template}
          dataInfo={this.dataInfo}
          editCallback={this.editCallback}
          deleteCallback={this.deleteCallback}
          newCallback={this.newCallback}
          numberOfPages={this.numberOfPages}
          hasRowClickRedirection={this.hasRowClickRedirection}
          rowClickRedirection={this.rowClickRedirection}
          headerFormComponent={this.headerFormComponent}
          filterRoute={this.filterRoute}
          rowClickActionName={this.rowClickActionName}
          rowClickActionCallback={this.rowClickActionCallback}
          hasRowReorder={this.hasRowReorder}
          onRowReorderCallback={this.onRowReorder}
          numberOfRecords={this.numberOfRecords}
        />
      );
    };

    return TableResult;
  }
}

const useTableBuilder = (isPaginated, isDownloadable) => {
  const columnBuilder = useColumnBuilder();

  return new TableBuilder(isPaginated, isDownloadable, columnBuilder);
};

export default useTableBuilder;
