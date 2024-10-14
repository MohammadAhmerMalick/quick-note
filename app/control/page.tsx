'use client'

import { toast } from 'react-toastify'

import Button from '@/components/Button'
import terminateFirebaseAdminAction from '@/actions/terminateFirebaseAdminAction'
import initializeFirebaseAdminAction from '@/actions/initializeFirebaseAdminAction'

const Controls = () => {
  const terminateFirebase = async () => {
    const res = await terminateFirebaseAdminAction()
    if (res.status === 'success') toast.success('App terminated')
    if (res.status === 'error') toast.error('Unable to terminated app')
  }
  const initializeFirebaseAdmin = async () => {
    const res = await initializeFirebaseAdminAction()
    if (res.status === 'success') toast.success('Firebase app connected')
    if (res.status === 'error') toast.error('Unable to connected Firebase app ')
  }
  return (
    <div className="flex gap-3">
      <Button className="max-w-max" onClick={terminateFirebase}>
        Terimnate Firebase connection
      </Button>
      <Button className="max-w-max" onClick={initializeFirebaseAdmin}>
        Firebase connect
      </Button>
    </div>
  )
}

export default Controls
