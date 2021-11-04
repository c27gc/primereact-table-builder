import statusBodyTemplateClosure from "./modalButtonBody";

const columnCrudParameters = (props) => {
  return {
    key: props.key,
    header: props.header,
    headerStyle: props.headerStyle,
    body: statusBodyTemplateClosure(props.setInput, props.setInputDialog, props.setDeleteInputDialog, props.setCurrentForm, props.hasUpdateButton, props.hasDeleteButton),
  };
};

export default columnCrudParameters;
