/**
 * Cloudinary Media Service
 * Uses client-side unsigned upload presets for safe, secret-free media uploads.
 *
 * PUBLIC CONFIGURATION:
 * Cloud Name: dcaomiuls
 * Upload Preset: Sethi-Portfoilo
 *
 * (Note: The Cloudinary API Secret is strictly excluded from client-side code).
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  created_at?: string;
}

/**
 * Dynamically resolves Cloudinary configuration from settings, env vars, or defaults.
 */
export function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  let cloudName = 'dcaomiuls';
  let uploadPreset = 'Sethi-Portfoilo';

  // 1. Check local storage user settings if previously customized
  try {
    const raw = localStorage.getItem('hissan_portfolio_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.cloudinaryCloudName?.trim()) {
        cloudName = parsed.cloudinaryCloudName.trim();
      }
      if (parsed.cloudinaryUploadPreset?.trim()) {
        uploadPreset = parsed.cloudinaryUploadPreset.trim();
      }
    }
  } catch {
    // ignore
  }

  // 2. Vite environment variables if available
  if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME.trim();
  }
  if (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
    uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET.trim();
  }

  return { cloudName, uploadPreset };
}

export const CLOUDINARY_CONFIG = getCloudinaryConfig();

/**
 * Checks if a given string is a raw Base64 Data URL (stored in LocalStorage).
 */
export function isBase64Image(url?: string | null): boolean {
  if (!url) return false;
  return url.startsWith('data:image/') || url.includes(';base64,');
}

/**
 * Checks if a given URL is hosted on Cloudinary CDN.
 */
export function isCloudinaryUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Uploads an image file or blob to Cloudinary using an Unsigned Upload Preset.
 */
export async function uploadImageToCloudinary(
  file: File | Blob,
  onProgress?: (percent: number) => void,
  overrideConfig?: { cloudName?: string; uploadPreset?: string }
): Promise<CloudinaryUploadResponse> {
  const currentConfig = getCloudinaryConfig();
  const cloudName = overrideConfig?.cloudName?.trim() || currentConfig.cloudName;
  const uploadPreset = overrideConfig?.uploadPreset?.trim() || currentConfig.uploadPreset;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary cloud name or upload preset is not configured.');
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText) as CloudinaryUploadResponse;
          resolve(response);
        } catch {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        let errorMsg = 'Cloudinary upload failed';
        try {
          const res = JSON.parse(xhr.responseText);
          errorMsg = res.error?.message || errorMsg;
        } catch {
          // ignore parse error
        }
        reject(new Error(`${errorMsg} (Status: ${xhr.status})`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary upload. Ensure unsigned preset allows unsigned uploads.'));
    };

    xhr.send(formData);
  });
}

/**
 * Converts a base64 Data URL (e.g. from LocalStorage) to a Blob and uploads it to Cloudinary.
 * Used to migrate local storage images directly to Cloudinary CDN.
 */
export async function uploadDataUrlToCloudinary(
  dataUrl: string,
  fileName = 'migrated_image.jpg',
  onProgress?: (percent: number) => void,
  overrideConfig?: { cloudName?: string; uploadPreset?: string }
): Promise<CloudinaryUploadResponse> {
  // Convert Data URL to Blob
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  const file = new File([blob], fileName, { type: mime });

  return uploadImageToCloudinary(file, onProgress, overrideConfig);
}

/**
 * Tests Cloudinary connection with a tiny SVG data blob.
 */
export async function testCloudinaryConnection(
  cloudName?: string,
  uploadPreset?: string
): Promise<{ success: boolean; url?: string; message: string }> {
  try {
    const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="#10B981"/></svg>`;
    const blob = new Blob([testSvg], { type: 'image/svg+xml' });
    const file = new File([blob], 'cloudinary_test_ping.svg', { type: 'image/svg+xml' });
    const res = await uploadImageToCloudinary(file, undefined, { cloudName, uploadPreset });
    return {
      success: true,
      url: res.secure_url,
      message: `Connected successfully! Test asset uploaded to Cloudinary: ${res.public_id}`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Connection test failed.',
    };
  }
}
