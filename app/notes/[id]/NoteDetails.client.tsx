"use client"

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '../../../lib/api'
import { useParams } from 'next/navigation'

import css  from "./NoteDetails.module.css"

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const noteId = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p className="loader">Loading, please wait...</p>;
  if (error || !note) return <p className="error">Something went wrong.</p>;

  return (
   <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	    <button className={css.editBtn}>Edit note</button>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>
  );
};

export default NoteDetailsClient;