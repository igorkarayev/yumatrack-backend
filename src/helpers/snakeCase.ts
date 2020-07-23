const snakeCase = (str: string) => {
  return str.replace(/(?:^|\.?)([A-Z0-9])/g, (e, t) => {
    return `_${t.toLowerCase()}`;
  }).replace(/^_/, '');
};

export {
  snakeCase,
};
