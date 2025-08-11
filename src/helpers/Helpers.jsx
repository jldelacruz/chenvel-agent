export const getOptions = (list = []) => {
  const options = [];
  list.forEach((v) => {
    options.push({ text: v["name"], value: "" + v["id"] });
  });
  return options;
};
