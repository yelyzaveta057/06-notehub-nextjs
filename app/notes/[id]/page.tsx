// app/notes/[id]/page.tsx
import { fetchNoteById } from "@/src/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
