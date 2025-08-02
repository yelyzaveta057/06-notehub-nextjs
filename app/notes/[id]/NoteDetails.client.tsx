// app/notes/[id]/NoteDetails.client.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { getSingleNote } from "@/src/lib/api";

const NoteDetailsClient = () => {
	const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
   <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>
  );
};

export default NoteDetailsClient;