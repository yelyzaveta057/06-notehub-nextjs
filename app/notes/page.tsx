
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsCliet from "./Notes.client";
import { getSingleNote } from "@/src/lib/api";


type Props = {
    params: Promise<{id: string}>;
};

// app/notes/[id]/page.tsx



const NoteDetails = async({params}: Props) =>{
    const {id} = await params;
    const queryClient =  new QueryClient();

await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
});
return <HydrationBoundary state={dehydrate(queryClient)}>
<NoteDetailsCliet/>
</HydrationBoundary>
};
export default NoteDetails;