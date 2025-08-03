import { getNotes } from "@/src/lib/api";

const Notes = async() => {
const notes = await getNotes()
console.log('notes', notes)
return <div>Notes</div>
};

export default Notes;





























// //css
// import css from "./App.module.css";
// import React from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { useDebounce } from "use-debounce";
// import { useState } from "react";
// import Error from "next/error";
// import NoteModal from "@/components/NoteModal/NoteModal";
// import { fetchNotes } from "@/src/services/noteService";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import Pagination from "@/components/Pagination/Pagination";
// import NoteList from "@/components/NoteList/NoteList";







// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
//   const perPage = 12;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["notes", debounceSearchTerm, currentPage],
//     queryFn: () => fetchNotes(currentPage, debounceSearchTerm, perPage),
//     placeholderData: keepPreviousData,
//   });

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSearchChange = (newTerm: string) => {
//     setSearchTerm(newTerm);
//     setCurrentPage(1);
//   };

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={searchTerm} onChange={handleSearchChange} />
//         {data && data.totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             pageCount={data.totalPages}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <button className={css.button} onClick={openModal}>
//           Create note +
//         </button>
//       </header>
//       {isLoading && <strong className={css.loading}>Loading notes...</strong>}
//       {isError && searchTerm.trim() !== "" && (
//         <Error message="Something went wrong" statusCode={500} />


//       )}
//       {data && <NoteList notes={data.notes} />}
//       {isModalOpen && <NoteModal onClose={closeModal} onSuccess={closeModal} />}
//     </div>
//   );
// }