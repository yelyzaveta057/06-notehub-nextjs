'use client'

type ErrorProps ={
    error: Error
    rest: () => void
}

export default function NotesError({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}