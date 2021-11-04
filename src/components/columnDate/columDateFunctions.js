const filterDate = (value, filter) => {
  
  if (
    filter === undefined ||
    filter === null ||
    (typeof filter === "string" && filter.trim() === "")
  ) {
    return true;
  }

  if (value === undefined || value === null) {
    return false;
  }

  return value === filter;
};


export default filterDate;
