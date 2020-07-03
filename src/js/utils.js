export function normalizeUrl(featuredMedia) {
  if (Array.isArray(featuredMedia)) {
    // from from REST API
    return `/wp-content/uploads/${featuredMedia[0].media_details.file}`;
  } else {
    // from initial data
    return featuredMedia;
  }
}
