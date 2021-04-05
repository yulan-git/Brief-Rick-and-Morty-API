function _fetchData(url) {
  return fetch(url).then((res) => res.json());
}
function _fetchDataAll(array) {
  return Promise.all(array.map((url) => _fetchData(url))).then((resp) =>
    Promise.all(resp.map((res) => res))
  );
}

export { _fetchData, _fetchDataAll };
