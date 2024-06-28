'use client'

import { useEffect, useState } from 'react'
import NoteCard from '@/components/NoteCard'
import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'

const NotesList = () => {
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])

  const fetchNotes = async () => {
    const res = await getNotesAction()
    setNotes(res)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <main>
      <div className="flex gap-5 flex-wrap justify-center mt-8">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </main>
  )
}

export default NotesList
