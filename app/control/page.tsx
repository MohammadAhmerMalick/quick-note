'use client'

import { toast } from 'react-toastify'

import Button from '@/components/Button'
import useIsLoggedIn from '@/hooks/useAuth'
import updateNotesCountLimitAction from '@/actions/updateNotesCountLimitAction'
import terminateFirebaseAdminAction from '@/actions/terminateFirebaseAdminAction'
import initializeFirebaseAdminAction from '@/actions/initializeFirebaseAdminAction'

const Controls = () => {
  const { isLoggedIn } = useIsLoggedIn()

  const terminateFirebase = async () => {
    const { status } = await terminateFirebaseAdminAction()
    if (status === 'success') toast.success('App terminated')
    else if (status === 'error') toast.error('Unable to terminated app')
  }
  const initializeFirebaseAdmin = async () => {
    const { status } = await initializeFirebaseAdminAction()
    if (status === 'success') toast.success('Firebase app connected')
    else if (status === 'error')
      toast.error('Unable to connected Firebase app ')
  }

  const resetNotesCountLimit = async () => {
    const isUpdated = await updateNotesCountLimitAction(0)
    if (isUpdated) toast.success('Count updated')
    else toast.error('Unable to update count')
  }

  return (
    <div className="flex gap-3">
      <Button className="max-w-max" onPress={terminateFirebase}>
        Terimnate Firebase Connection
      </Button>
      <Button className="max-w-max" onPress={initializeFirebaseAdmin}>
        Firebase Connect
      </Button>

      {isLoggedIn && (
        <Button className="max-w-max" onPress={resetNotesCountLimit}>
          Reset Notes Count Limit
        </Button>
      )}
    </div>
  )
}

export default Controls
