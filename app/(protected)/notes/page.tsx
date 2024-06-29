'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import NoteCard from '@/components/NoteCard'
import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'

const NotesList = () => {
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])

  const fetchNotes = async () => {
    try {
      const res = await getNotesAction()
      console.log(res)
      if (res.status === 'success') setNotes(res.data)
      else throw new Error('Unable to fetch notes')
    } catch (error) {
      console.log(error)
      toast.error('Unable to fetch note')
    }
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
