import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';

const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;

  const res = await noteServiceClient.get<FetchNotesResponse>('/notes', { params });

  return res.data;
  
};



export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await noteServiceClient.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

console.log("🔐 Token:", TOKEN);
