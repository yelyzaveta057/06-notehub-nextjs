'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api/noteApi'
import { Note } from '@/types/note'

type Props = {
  noteId: string
}

export default function NoteDetailsClient({ noteId }: Props) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  if (isLoading) return <p>Завантаження...</p>
  if (error) return <p>Помилка: {(error as Error).message}</p>

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  )
}
