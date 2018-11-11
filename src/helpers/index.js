export function findProductName(data, key) {
  if (data.length > 1) {
    const product = data.filter(x => x.key === key)[0];
    if (!product) {
      return key;
    }
    return product.name;
  }
  return key;
}

export function filterByKey(data, key) {
  const product = data.filter(x => x.key === key);
  if (product.length !== 1) {
    console.log({ data, key, error: "found more than one" });
  }
  return product[0];
}
