export function resizeUrl(_embedded, resize) {
  let heightWidth;

  if (resize === 'medium') {
    heightWidth = '300x225';
  } else if (resize === 'large') {
    heightWidth = '1024x768';
  } else if (resize === 'thumbnail') {
    heightWidth = '150x150';
  }

  let [
    first,
    last
  ] = `/wp-content/uploads/${_embedded['wp:featuredmedia'][0].media_details.file}`.split(
    '.'
  );

  return `${first}-${heightWidth}.${last}`;
}
