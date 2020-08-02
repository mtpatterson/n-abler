import { MediaDetails } from './types';

export function normalizeUrl(
  featuredMedia: [Record<string, unknown>] | string
): string {
  if (Array.isArray(featuredMedia)) {
    const {
      media_details: { file }
    } = featuredMedia[0] as MediaDetails;

    // from from REST API
    return `/wp-content/uploads/${file}`;
  } else {
    // from initial data
    return featuredMedia;
  }
}
