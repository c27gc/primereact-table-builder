import { Dropdown } from "primereact/dropdown";
import { classNames } from 'primereact/utils';
import { useState } from 'react';


const RenderStatusFilter = (mappingPolicy, colorPolicy, dt, field) => {

  const [selectedStatus, setSelectedStatus] = useState(null);


  const onStatusFilterChange = (event) => {
    const reverseMappingList = Object.keys(mappingPolicy).map( (element) => {
      return [mappingPolicy[element], element];
    })

    const reverseMapping = Object.fromEntries( reverseMappingList )
    console.log("reverseMapping",reverseMapping)

    dt.current.filter(reverseMapping[event.value], field, 'equals');
    setSelectedStatus(event.value);
  }

  const statusItemTemplate = (option) => {
    console.log("OPCION",option)
    return (
      <span className={classNames('customer-badge')} style={{ 
        backgroundColor: colorPolicy[option],
        color: 'white'
      }}>{option}</span>
    )
    }

  return (
      <Dropdown value={selectedStatus} options={Object.keys(colorPolicy)} onChange={onStatusFilterChange}
                  itemTemplate={statusItemTemplate} showClear placeholder="Select a Status" className="p-column-filter"/>
  );

}

export default RenderStatusFilter;