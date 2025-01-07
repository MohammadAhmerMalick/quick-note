'use client'

import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'

import getNotesAction, {
  type GetNotesActionReutrn,
} from '@/actions/getNotesAction'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import NoteCard from '@/components/NoteCard'
import NoteList from '@/components/NoteList'
import TokenFilter from '@/components/TokenFilter'
import deleteNoteAction from '@/actions/deleteNoteAction'
import restoreNoteAction from '@/actions/restoreNoteAction'
import NoteStateSelector from '@/components/NoteStateSelector'
import softDeleteNoteAction from '@/actions/softDeleteNoteAction'
import NotesLayoutSelector from '@/components/NotesLayoutSelector'

let dbData: GetNotesActionReutrn[] = []
type noteStates = 'stared' | 'notDeleted' | 'deleted'

interface Tokens {
  value: string
  isSelected: boolean
}

const NotesList = () => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [counter, setCounter] = useState<number>(0)
  const [layout, setLayout] = useState<'card' | 'list'>('list')
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [selectedState, setSelectedState] = useState<noteStates>('notDeleted')
  const [tokens, setTokens] = useState<Tokens[]>()
  const [modalNote, setModalNote] = useState<GetNotesActionReutrn | null>(null)

  // fetch request
  const fetchNotes = async () => {
    try {
      const res = await getNotesAction() // fetch request
      //  on success
      if (res.status === 'success') {
        dbData = res.data // update inreactive data
        setCounter((c) => c + 1) // to update ui
        setIsOpen(false)
      } else throw new Error('Unable to fetch notes')
    } catch (error) {
      // on reject
      console.log(error)
      toast.error('Unable to fetch note')
    }
  }

  // soft delete request
  const softDeleteNote = async (id: string) => {
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
        setIsOpen(false)
      } else throw new Error('Unable to delete note')
    } catch (error) {
      // on reject
      console.log({ error })
      toast.error('Unable to delete')
    }
  }

  //  delete request
  const deleteNote = async (id: string) => {
    try {
      const { status } = await deleteNoteAction(id) // delete request

      // on success
      if (status === 'success') {
        // change the deleted state of onetime fetched data
        dbData = dbData.filter((note) => id !== note.id)

        // update the counter to update the notes list
        setCounter((c) => c + 1)
        setIsOpen(false)
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
        setIsOpen(false)
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
          note.description.toLowerCase().includes(token.value) ||
          note.title.toLowerCase().includes(token.value)
      ).length
    }

    newNoteList = dbData.filter(
      (note) =>
        (selectedState === 'deleted' ? note.deletedAt : !note.deletedAt) &&
        inSearch(note) &&
        inTokenFilter(note)
    )

    setNotes(newNoteList)
  }, [counter, selectedState, tokens, inSearch])

  useEffect(() => {
    const filterSet = new Set(
      dbData
        .filter(
          (note) =>
            (selectedState === 'deleted' ? note.deletedAt : !note.deletedAt) &&
            inSearch(note)
        )
        .map((note) => note.description.toLowerCase())
        .join(' ')
        .replace(/[^a-zA-Z !?]+/g, ' ')
        .split(' ')
    )

    const fitlerArray = Array.from(filterSet).filter((c) => c.length > 2)
    setTokens(fitlerArray.sort().map((c) => ({ value: c, isSelected: false })))
  }, [counter, selectedState, inSearch])

  return (
    <main className="mt-4">
      <Modal
        isOpen={isOpen}
        note={modalNote}
        restoreNote={restoreNote}
        softDeleteNote={softDeleteNote}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex gap-1">
        <Input
          isFocused
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

          <Button className="flex min-w-9 max-w-max items-center justify-center !px-1">
            {notes.length}
          </Button>
        </div>
      </div>

      <TokenFilter tokens={tokens} setTokens={setTokens} />

      <div className="mt-4 flex flex-wrap justify-center gap-3 md:gap-4">
        {notes.map((note) =>
          layout === 'card' ? (
            <NoteCard note={note} key={note.id} />
          ) : (
            <NoteList
              note={note}
              key={note.id}
              onDeleteNote={deleteNote}
              onRestoreNote={restoreNote}
              onSoftDeleteNote={softDeleteNote}
              onClick={() => {
                setModalNote(note)
                setIsOpen(!isOpen)
              }}
            />
          )
        )}
      </div>
    </main>
  )
}

export default NotesList
