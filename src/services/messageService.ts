import { ContactMessage } from '../types';
import { DB_PATHS, getDatabaseData, pushDatabaseData, setDatabaseData } from '../firebase/database';
import { apiGet, apiPost, apiPatch, apiDelete } from './apiService';

const LOCAL_MESSAGES_KEY = 'hissan_portfolio_messages';

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-demo-1',
    name: 'Ahmed Khan',
    email: 'ahmed.k@example.com',
    subject: 'Web Application Collaboration Inquiry',
    message: 'Salam Hissan! I came across your HS Cloud and Sethi Tech Store projects. We are currently looking for a full-stack React developer to help build an intuitive dashboard for our Peshawar logistics business. Would love to discuss availability.',
    timestamp: Date.now() - 86400000 * 2,
    read: false,
  },
  {
    id: 'msg-demo-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@globaltech.co',
    subject: 'Impressive Netlify Showcase',
    message: 'Hello Hissan, really liked the clean aesthetic and quick response time on your fragrance and calculation websites. Are you open to remote contract opportunities?',
    timestamp: Date.now() - 86400000 * 5,
    read: true,
  }
];

function getLocalMessages(): ContactMessage[] {
  const stored = localStorage.getItem(LOCAL_MESSAGES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(INITIAL_MESSAGES));
  return INITIAL_MESSAGES;
}

function saveLocalMessages(messages: ContactMessage[]): void {
  localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages));
}

export async function sendMessage(data: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...data,
    timestamp: Date.now(),
    read: false,
  };

  // Try server endpoint
  try {
    const res = await apiPost<{ success: boolean; message: ContactMessage }>('/api/messages', data);
    if (res && res.message) {
      newMsg.id = res.message.id;
    }
  } catch (err) {
    console.warn('Server message post failed:', err);
  }

  // Attempt write to Firebase Realtime Database
  try {
    const pushedKey = await pushDatabaseData(DB_PATHS.MESSAGES, newMsg);
    if (pushedKey) {
      newMsg.id = pushedKey;
    }
  } catch (err) {
    console.warn('Firebase message push failed, saving locally:', err);
  }

  // Always update local cache
  const current = getLocalMessages();
  saveLocalMessages([newMsg, ...current]);

  return newMsg;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  // Try server endpoint first
  try {
    const serverMessages = await apiGet<ContactMessage[]>('/api/messages');
    if (serverMessages && Array.isArray(serverMessages)) {
      saveLocalMessages(serverMessages);
      return serverMessages;
    }
  } catch (err) {
    console.warn('Server messages fetch failed:', err);
  }

  try {
    const remoteData = await getDatabaseData<Record<string, ContactMessage> | ContactMessage[]>(DB_PATHS.MESSAGES);
    if (remoteData) {
      if (Array.isArray(remoteData)) {
        const sorted = remoteData.filter(Boolean).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        saveLocalMessages(sorted);
        return sorted;
      }
      const list = Object.entries(remoteData).map(([key, val]) => ({
        ...val,
        id: key,
      })).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      saveLocalMessages(list);
      return list;
    }
  } catch (err) {
    console.warn('Failed to fetch messages from Firebase, falling back to local storage:', err);
  }

  return getLocalMessages();
}

export async function markMessageRead(id: string, read: boolean = true): Promise<void> {
  const messages = getLocalMessages();
  const updated = messages.map((m) => (m.id === id ? { ...m, read } : m));
  saveLocalMessages(updated);

  try {
    await apiPatch(`/api/messages/${id}`, { read });
  } catch (err) {
    console.warn('Server message mark read failed:', err);
  }

  try {
    const target = updated.find((m) => m.id === id);
    if (target) {
      await setDatabaseData(`${DB_PATHS.MESSAGES}/${id}`, target);
    }
  } catch (err) {
    console.warn('Firebase message mark read failed:', err);
  }
}

export async function deleteMessageById(id: string): Promise<void> {
  const messages = getLocalMessages();
  const updated = messages.filter((m) => m.id !== id);
  saveLocalMessages(updated);

  try {
    await apiDelete(`/api/messages/${id}`);
  } catch (err) {
    console.warn('Server message delete failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.MESSAGES, updated);
  } catch (err) {
    console.warn('Firebase delete message failed:', err);
  }
}
