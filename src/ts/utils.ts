import { MediaDetails } from './types';

export function normalizeUrl(
  featuredMedia: [Record<string, unknown>] | string
): string {
  if (Array.isArray(featuredMedia)) {
    const mediaObj = featuredMedia[0] as MediaDetails;

    if (mediaObj.media_details) {
      // from from REST API
      return `/wp-content/uploads/${mediaObj.media_details.file}`;
    } else {
      console.error('media_details does not exist on this object');
      console.log(mediaObj);

      return '';
    }
  } else {
    // from initial data
    return featuredMedia;
  }
}

export function parseHTML(html: string): string {
  const parser = new DOMParser();

  return parser.parseFromString(html, 'text/html').body.textContent;
}

export function truncate(string: string): string {
  if (string.length <= 28) {
    return string;
  }

  return `${string.substring(0, 25)}...`;
}
