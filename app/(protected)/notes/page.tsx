'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Input from '@/app/components/Input'
import NoteCard from '@/components/NoteCard'
import NoteList from '@/app/components/NoteList'
import restoreNoteAction from '@/app/actions/restoreNoteAction'
import NoteStateSelector from '@/app/components/NoteStateSelector'
import softDeleteNoteAction from '@/app/actions/softDeleteNoteAction'
import NotesLayoutSelector from '@/app/components/NotesLayoutSelector'
import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'

let dbData: GetNotesActionReutrn[] = []
type noteStates = 'stared' | 'notDeleted' | 'deleted'

const NotesList = () => {
  const [search, setSearch] = useState('')
  const [counter, setCounter] = useState<number>(0)
  const [layout, setLayout] = useState<'card' | 'list'>('list')
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [selectedState, setSelectedState] = useState<noteStates>('notDeleted')

  // fetch request
  const fetchNotes = async () => {
    try {
      const res = await getNotesAction() // fetch request
      //  on success
      if (res.status === 'success') {
        dbData = res.data // update inreactive data
        setCounter((c) => c + 1) // to update ui
      } else throw new Error('Unable to fetch notes')
    } catch (error) {
      // on reject
      console.log(error)
      toast.error('Unable to fetch note')
    }
  }

  // delete request
  const deleteNote = async (id: string) => {
    try {
      const { status } = await softDeleteNoteAction(id) // delete request

      // on success
      if (status === 'success') {
        // change the deleted state of onetime fetched data
        dbData = dbData.map((note) =>
          id === note.id
            ? { ...note, deletedAt: new Date().toString() }
            : { ...note }
        )

        // update the counter to update the notes list
        setCounter((c) => c + 1)
      } else throw new Error('Unable to delete note')
    } catch (error) {
      // on reject
      console.log({ error })
      toast.error('Unable to delete')
    }
  }

  const restoreNote = async (id: string) => {
    try {
      const { status } = await restoreNoteAction(id)
      // on success
      if (status === 'success') {
        dbData = dbData.map((note) =>
          id === note.id ? { ...note, deletedAt: null } : { ...note }
        )

        // update the counter to update the notes list
        setCounter((c) => c + 1)
      } else throw new Error('Unable to restore note')
    } catch (error) {
      // on reject
      console.log({ error })
      toast.error('Unable to restore')
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    let newNoteList: GetNotesActionReutrn[] = []

    const inSearch = (note: GetNotesActionReutrn) => {
      const string = search.toLocaleLowerCase()

      return (
        note.title.toLocaleLowerCase().includes(string) ||
        note.description.toLocaleLowerCase().includes(string)
      )
    }

    if (selectedState === 'notDeleted')
      newNoteList = dbData.filter((note) => !note.deletedAt && inSearch(note))
    else if (selectedState === 'deleted')
      newNoteList = dbData.filter((note) => note.deletedAt && inSearch(note))

    setNotes(newNoteList)
  }, [counter, search, selectedState])

  return (
    <main className="mt-4">
      <div className="flex gap-1">
        <Input
          id="search"
          value={search}
          placeholder="Search"
          labelClassName="w-full"
          onChange={({ value }) => setSearch(value)}
        />
        <div className="flex justify-end gap-1">
          <NoteStateSelector
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
          <NotesLayoutSelector layout={layout} setLayout={setLayout} />
        </div>
      </div>
      <div className="flex gap-5 flex-wrap justify-center mt-4">
        {notes.map((note) =>
          layout === 'card' ? (
            <NoteCard note={note} key={note.id} />
          ) : (
            <NoteList
              note={note}
              key={note.id}
              deleteNote={deleteNote}
              restoreNote={restoreNote}
            />
          )
        )}
      </div>
    </main>
  )
}

export default NotesList
