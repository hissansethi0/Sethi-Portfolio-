/**
 * Client API utility to communicate with full-stack server endpoints
 * Includes timeout fallbacks and error handling.
 */

const API_TIMEOUT_MS = 6000;

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

export async function apiGet<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[API] GET ${endpoint} error:`, err);
    return null;
  }
}

export async function apiPost<T, B = unknown>(endpoint: string, body: B): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[API] POST ${endpoint} error:`, err);
    return null;
  }
}

export async function apiPatch<T, B = unknown>(endpoint: string, body: B): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[API] PATCH ${endpoint} error:`, err);
    return null;
  }
}

export async function apiDelete(endpoint: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.warn(`[API] DELETE ${endpoint} error:`, err);
    return false;
  }
}
