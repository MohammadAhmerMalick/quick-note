'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import NoteCard from '@/components/NoteCard'
import NoteList from '@/app/components/NoteList'
import NotesLayoutSelector from '@/app/components/NotesLayoutSelector'
import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'

const NotesList = () => {
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [layout, setLayout] = useState<'card' | 'list'>('list')

  const fetchNotes = async () => {
    try {
      const res = await getNotesAction()
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
    <main className="mt-4">
      <div className="flex justify-end">
        <NotesLayoutSelector layout={layout} setLayout={setLayout} />
      </div>
      <div className="flex gap-5 flex-wrap justify-center mt-4">
        {notes.map((note) =>
          layout === 'card' ? (
            <NoteCard key={note.id} note={note} />
          ) : (
            <NoteList key={note.id} note={note} />
          )
        )}
      </div>
    </main>
  )
}

export default NotesList
