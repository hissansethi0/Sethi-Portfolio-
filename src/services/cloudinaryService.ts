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
}

export const CLOUDINARY_CONFIG = {
  cloudName: (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcaomiuls').trim(),
  uploadPreset: (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Sethi-Portfoilo').trim(),
};

/**
 * Uploads an image file to Cloudinary using an Unsigned Upload Preset.
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResponse> {
  const { cloudName, uploadPreset } = CLOUDINARY_CONFIG;

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
        } catch (e) {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        let errorMsg = 'Cloudinary upload failed';
        try {
          const res = JSON.parse(xhr.responseText);
          errorMsg = res.error?.message || errorMsg;
        } catch (e) {
          // ignore parse error
        }
        reject(new Error(`${errorMsg} (Status: ${xhr.status})`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred during Cloudinary upload. Ensure unsigned preset is configured.'));
    };

    xhr.send(formData);
  });
}
