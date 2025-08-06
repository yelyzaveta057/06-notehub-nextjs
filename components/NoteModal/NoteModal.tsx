

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

interface NoteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NoteModal({ onClose, onSuccess }: NoteModalProps) {
  return (
    <Modal onClose={onClose}>
      <NoteForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
}
