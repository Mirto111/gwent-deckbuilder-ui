const IMAGES = importAll(
  require.context("../images/med", false, /\.(png|jpe?g|svg)$/)
);

function importAll(r) {
  let cache = {};
  r.keys().forEach(key => (cache[key] = r(key)));
  return cache;
}

function imagesReducer(state = IMAGES, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default imagesReducer;
