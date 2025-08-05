'use client'
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/NoteModal/NoteModal";

//css
import css from "./NotesPage.module.css"

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const perPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", debounceSearchTerm, currentPage],
    queryFn: () => fetchNotes(currentPage, debounceSearchTerm, perPage),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {error && (
        <div className={css.error}>
          <strong>Error loading notes:</strong> {error.message}
        </div>
      )}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={closeModal} onSuccess={closeModal} />}
    </div>
  );
}


// const Notes = async() => {
// const response = await getNotes()



// return (
// <div>
//     <NoteLIst notes={response.notes} />
// </div>)
// };

// export default Notes;





























