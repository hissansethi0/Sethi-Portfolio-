import { ContactMessage } from '../types';
import { DB_PATHS, getDatabaseData, setDatabaseData, pushDatabaseData } from '../firebase/database';

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

  // Attempt write to Firebase Realtime Database
  try {
    const pushedKey = await pushDatabaseData(DB_PATHS.MESSAGES, newMsg);
    if (pushedKey) {
      newMsg.id = pushedKey;
    }
  } catch (err) {
    console.warn('Firebase message push failed, saving locally:', err);
  }

  // Always update local cache so admin can immediately view it
  const current = getLocalMessages();
  saveLocalMessages([newMsg, ...current]);

  return newMsg;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  try {
    const remoteData = await getDatabaseData<Record<string, ContactMessage> | ContactMessage[]>(DB_PATHS.MESSAGES);
    if (remoteData) {
      if (Array.isArray(remoteData)) {
        return remoteData.filter(Boolean).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      }
      return Object.entries(remoteData).map(([key, val]) => ({
        ...val,
        id: key,
      })).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
    }
  } catch (error) {
    console.warn('Could not fetch messages from Firebase, falling back to local storage:', error);
  }
  return getLocalMessages();
}

export async function markMessageRead(id: string, read: boolean = true): Promise<void> {
  const messages = getLocalMessages();
  const updated = messages.map((m) => (m.id === id ? { ...m, read } : m));
  saveLocalMessages(updated);

  try {
    // If Firebase is connected, update the specific record
    await setDatabaseData(`${DB_PATHS.MESSAGES}/${id}/read`, read);
  } catch (err) {
    console.warn('Failed to update message read state in Firebase:', err);
  }
}

export async function deleteMessageById(id: string): Promise<void> {
  const messages = getLocalMessages();
  const updated = messages.filter((m) => m.id !== id);
  saveLocalMessages(updated);

  try {
    await setDatabaseData(`${DB_PATHS.MESSAGES}/${id}`, null);
  } catch (err) {
    console.warn('Failed to delete message in Firebase:', err);
  }
}
