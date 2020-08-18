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
