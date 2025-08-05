import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
console.log("🔐 Token:", TOKEN);

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = '',
  perPage = 12
): Promise<FetchNotesResponse> => {
  try {
    if (!TOKEN) {
      throw new Error('Token is not configured. Please set NEXT_PUBLIC_NOTEHUB_TOKEN environment variable.');
    }

    const params = {
      page: page.toString(),
      perPage: perPage.toString(),
      ...(query.trim() && { search: query }),
    };

    console.log("🔍 Fetching notes with params:", params);
    const res = await noteServiceClient.get<FetchNotesResponse>('/notes', { params });
    console.log("🔍 Full Axios Response:", res);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    throw error;
  }
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    if (!TOKEN) {
      throw new Error('Token is not configured. Please set NEXT_PUBLIC_NOTEHUB_TOKEN environment variable.');
    }
    
    const res = await noteServiceClient.get<Note>(`/note/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching note by id:", error);
    throw error;
  }
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    if (!TOKEN) {
      throw new Error('Token is not configured. Please set NEXT_PUBLIC_NOTEHUB_TOKEN environment variable.');
    }
    
    console.log("🔍 Creating note with data:", noteData);
    const res = await noteServiceClient.post<Note>('/note', noteData);
    console.log("🔍 Create note response:", res);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    if (!TOKEN) {
      throw new Error('Token is not configured. Please set NEXT_PUBLIC_NOTEHUB_TOKEN environment variable.');
    }
    
    const res = await noteServiceClient.delete<Note>(`/note/${noteId}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    throw error;
  }
};
