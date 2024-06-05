export function recursiveWrapper(labels: any[]) {
  const newLabels = labels;
  function recursivelyFindAllChildrenElement(labels: any[]) {
    if (!labels || !labels.length) return;

    labels.forEach((el) => {
      const { children, name } = el;
      el.label = name;
      recursivelyFindAllChildrenElement(children);
    });
  }
  recursivelyFindAllChildrenElement(newLabels);
  return newLabels;
}
