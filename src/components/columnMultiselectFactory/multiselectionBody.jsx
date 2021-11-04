import { classNames } from "primereact/utils";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

const statusBodyTemplateClosure = (field, mappingPolicy, colorPolicy) => {
  const statusBodyTemplate = ( rowData ) => {
    return (
        <>
            <span className={classNames('customer-badge')} style={{ 
              backgroundColor: colorPolicy[mappingPolicy[rowData[field]]],
              color: 'white'
            }}>{mappingPolicy[rowData[field]]}</span>
        </>
    );
  }

  return statusBodyTemplate

}

export default statusBodyTemplateClosure;