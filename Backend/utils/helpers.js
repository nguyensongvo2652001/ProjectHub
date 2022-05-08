const filterObject = (object, { whiteList }) => {
  const newObject = {};
  Object.keys(object).forEach((key) => {
    if (!whiteList.includes(key)) return;
    newObject[key] = object[key];
  });

  return newObject;
};

exports.filterObject = filterObject;
