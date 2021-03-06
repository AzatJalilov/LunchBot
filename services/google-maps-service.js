const config = require('../resources/config.js');

const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  rate: {limit: 10},
  timeout: 5000,
  Promise: Promise
});
async function getPlacesList(query, nextPageToken) {
  const options = {
    query: query,
    location: [config.googleApi.locationAlt, config.googleApi.locationLet],
    radius: 1000,
    minprice: 0,
    maxprice:4,
    type: 'restaurant'
  };
  if(nextPageToken && nextPageToken.token) {
    options.pagetoken = nextPageToken.token;
  }
  const places = await googleMapsClient.places(options).asPromise();
  return { restaurants : places.json.results, token: places.json.next_page_token };
}
async function getPlaceDetail(placeId) {
  const placeDetailResponse = await googleMapsClient.place({ placeid: placeId }).asPromise();
  return placeDetailResponse.json.result;
}

module.exports = { getPlacesList, getPlaceDetail };