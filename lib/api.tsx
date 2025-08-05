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
  const params = {
    page: page.toString(),
    perPage: perPage.toString(),
    ...(query.trim() && { search: query }),
  };


  const res = await noteServiceClient.get<FetchNotesResponse>('/notes?{ params }');
  console.log("🔍 Full Axios Response:", res);
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await noteServiceClient.get<Note>(`/note/${id}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>('/note', noteData);
  
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/note/${noteId}`);
  return res.data;
};
