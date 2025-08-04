import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';

const BASE_URL = 'https://next-docs-api.onrender.com';
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

  const res = await noteServiceClient.get<FetchNotesResponse>('/', { params });
  return res.data;
};
export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await noteServiceClient.get<Note>(`${id}`);
  return res.data;
};


export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>('/', noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/${noteId}`);
  return res.data;
};








// const TOKEN = process.env.VITE_NOTEHUB_TOKEN;

// const noteServiceClient = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//   },
// });

// interface FetchNotesResponse {
//     notes: Note[];
//     totalPages: number;
// }

// export const fetchNotes = async (
//   page = 1,
//   query = '',
//   perPage = 12
// ): Promise<FetchNotesResponse> => {
//   const params: Record<string, string | number> = { page, perPage };
//   if (query.trim()) params.search = query;

//   const res = await noteServiceClient.get<FetchNotesResponse>('/', { params });
//   return res.data;
// };
// const getNotes = async () => {
//   const { notes } = await fetchNotes(); // можна передати page/query
//   return notes;
// };

// export const createNote = async (noteData: NewNoteData): Promise<Note> => {
//   const res = await noteServiceClient.post<Note>('/', noteData);
//   return res.data;
// };

// export const deleteNote = async (noteId: number): Promise<Note> => {
//   const res = await noteServiceClient.delete<Note>(`/${noteId}`);
//   return res.data;
// };