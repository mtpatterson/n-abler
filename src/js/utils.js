export function resizeUrl(featuredMedia, resize) {
  let first;
  let last;
  let size;

  if (resize === 'medium') {
    size = '300x225';
  } else if (resize === 'large') {
    size = '1024x768';
  } else if (resize === 'thumbnail') {
    size = '150x150';
  }

  if (Array.isArray(featuredMedia)) {
    // from from REST API
    [
      first,
      last
    ] = `/wp-content/uploads/${featuredMedia[0].media_details.file}`.split('.');
  } else {
    // from initial data
    [first, last] = `${featuredMedia}`.split('.');
  }

  return `${first}-${size}.${last}`;
}
