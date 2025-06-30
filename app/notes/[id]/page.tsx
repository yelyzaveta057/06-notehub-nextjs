import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query'
import NoteDetailsClient from './NoteDetails.client'
import { fetchNoteById } from '../../../lib/api'

export default async function NoteDetails({
  params,
}: {
  params: { id: string }
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', Number(params.id)],
    queryFn: () => fetchNoteById(Number(params.id)),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}

