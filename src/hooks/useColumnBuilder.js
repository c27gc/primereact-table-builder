//import DateColumnWrapper from "../components/columnDate/columnDateWrapper";
import columnDateParameters from "../components/columnDate/columnDateParameters.js";
import columnNumberParameters from "../components/columnNumber/columnNumberParameters.js";
import columnStringParameter from "../components/columnString/columnStringParameters.js";
import columnCrudParameters from '../components/columnCrud/columnCrudParameters.js'

class ColumnBuilder {
  constructor() {
    this.columns = {};
    this.elements = {};
    return this;
  }

  addType(columnType) {
    if (columnType === "date") {
      this.columns[columnType] = columnDateParameters;
    } else if (columnType === "number") {
      this.columns[columnType] = columnNumberParameters;
    } else if (columnType === "string") {
      this.columns[columnType] = columnStringParameter;
    } else if (columnType === "crud") {
      this.columns[columnType] = columnCrudParameters
    }

    return this;
  }

  addCustomType(name, parametersGenerator) {
    this.columns[name] = parametersGenerator
    return this
  }

  build() {
    return this.columns;
  }
}

const useColumnBuilder = () => {
  return new ColumnBuilder();
};

export default useColumnBuilder;
