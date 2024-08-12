'use client'

import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import Input from '@/app/components/Input'
import NoteCard from '@/components/NoteCard'
import NoteList from '@/app/components/NoteList'
import TokenFilter from '@/app/components/TokenFilter'
import restoreNoteAction from '@/app/actions/restoreNoteAction'
import NoteStateSelector from '@/app/components/NoteStateSelector'
import softDeleteNoteAction from '@/app/actions/softDeleteNoteAction'
import NotesLayoutSelector from '@/app/components/NotesLayoutSelector'
import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'

let dbData: GetNotesActionReutrn[] = []
type noteStates = 'stared' | 'notDeleted' | 'deleted'

interface Tokens {
  value: string
  isSelected: boolean
}

const NotesList = () => {
  const [search, setSearch] = useState('')
  const [counter, setCounter] = useState<number>(0)
  const [layout, setLayout] = useState<'card' | 'list'>('list')
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [selectedState, setSelectedState] = useState<noteStates>('notDeleted')
  const [tokens, setTokens] = useState<Tokens[]>()

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

  const inSearch = useCallback(
    (note: GetNotesActionReutrn) => {
      const string = search.toLocaleLowerCase()

      return (
        note.title.toLocaleLowerCase().includes(string) ||
        note.description.toLocaleLowerCase().includes(string)
      )
    },
    [search]
  )

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    let newNoteList: GetNotesActionReutrn[] = []

    const inTokenFilter = (note: GetNotesActionReutrn) => {
      const selectedTokens = tokens?.filter((t) => t.isSelected)
      if (!selectedTokens?.length) return true // if no token selected then return true(behave as all are selected)

      return selectedTokens.filter(
        (token) =>
          token.isSelected &&
          (note.description.toLowerCase().includes(token.value) ||
            note.title.toLowerCase().includes(token.value))
      ).length
    }

    if (selectedState === 'notDeleted')
      newNoteList = dbData.filter(
        (note) => !note.deletedAt && inSearch(note) && inTokenFilter(note)
      )
    else if (selectedState === 'deleted')
      newNoteList = dbData.filter(
        (note) => note.deletedAt && inSearch(note) && inTokenFilter(note)
      )
    setNotes(newNoteList)
  }, [counter, selectedState, tokens, inSearch])

  useEffect(() => {
    const filterSet = new Set(
      dbData
        .filter((note) => inSearch(note))
        .map((t) => t.description.toLowerCase())
        .join(' ')
        .replace(/[^a-zA-Z !?]+/g, ' ')
        .split(' ')
    )

    const fitlerArray = Array.from(filterSet).filter((c) => c.length > 2)
    setTokens(fitlerArray.map((c) => ({ value: c, isSelected: false })))
  }, [counter, inSearch])

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
      <TokenFilter tokens={tokens} setTokens={setTokens} />
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
