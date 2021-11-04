import { Calendar } from "primereact/calendar";
import React, { useState } from "react";

const FilterElement = (columnName, dataTableRef) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Calendar
      value={selectedDate}
      dateFormat="yy-mm-dd"
      onChange={(e) => {
        const date = e.value ? e.value.toLocaleDateString().split('/').reduce( (acc, element) => {
          return  element.length > 1 ? element + '-' + acc : '0' + element + '-' + acc
        } , '').slice(0,-1) : ''

        // console.log(date)
        dataTableRef.current.filter(date, columnName, "custom");
        setSelectedDate(e.value);
      }}
      placeholder="Registration Date"
      className="p-column-filter"
    />
  );
};

export default FilterElement;
