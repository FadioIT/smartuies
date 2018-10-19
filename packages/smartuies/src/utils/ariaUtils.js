const ariaHiddenNodes = [];
const ariaHiddenKeys = [];

export const hideNode = (node, key) => {
  let index = ariaHiddenNodes.indexOf(node);

  if (index === -1) {
    index = ariaHiddenNodes.length;
    ariaHiddenNodes.push(node);
    ariaHiddenKeys.push([key]);
    node.setAttribute('aria-hidden', true);
    return;
  }

  if (ariaHiddenKeys[index].indexOf(key) === -1) {
    ariaHiddenKeys[index].push(key);
  }
};

export const showNode = (node, key) => {
  const index = ariaHiddenNodes.indexOf(node);

  if (index === -1) {
    return;
  }

  if (ariaHiddenKeys[index].length > 1) {
    ariaHiddenKeys[index].splice(ariaHiddenKeys[index].indexOf(key), 1);
    return;
  }

  ariaHiddenNodes.splice(index, 1);
  ariaHiddenKeys.splice(index, 1);
  node.removeAttribute('aria-hidden');
};
