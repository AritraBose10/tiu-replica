/**
 * Converts any Google Drive sharing/view URL into a directly embeddable
 * image URL using the Drive thumbnail API.
 *
 * Supported input formats:
 * - https://drive.google.com/file/d/<ID>/view?...
 * - https://drive.google.com/open?id=<ID>
 * - https://drive.google.com/uc?id=<ID>&export=view
 * - https://drive.google.com/uc?export=view&id=<ID>
 * - https://lh3.googleusercontent.com/d/<ID> (already correct pass through)
 *
 * @param {string} url - The original URL (Drive or otherwise).
 * @param {number} [size=300] - Requested width in pixels (Drive thumbnail sz parameter).
 * @returns {string} A URL that can be used directly in an <img> src.
 */
export function getDriveImageUrl(url, size = 300) {
 if (!url) return url;

 // Already a lh3.googleusercontent.com URL fine as-is
 if (url.includes('lh3.googleusercontent.com')) return url;

 // Not a Google Drive URL return unchanged
 if (!url.includes('drive.google.com')) return url;

 let fileId = null;

 // Pattern 1: /file/d/<ID>/
 const fileMatch = url.match(/\/file\/d\/([^/?#&]+)/);
 if (fileMatch) fileId = fileMatch[1];

 // Pattern 2: id=<ID> query param
 if (!fileId) {
 const paramMatch = url.match(/[?&]id=([^&]+)/);
 if (paramMatch) fileId = paramMatch[1];
 }

 if (!fileId) return url; // can't parse return original

 // Return direct lh3.googleusercontent.com URL which guarantees CORS headers and no redirects
 return `https://lh3.googleusercontent.com/d/${fileId}=w${size}`;
}
