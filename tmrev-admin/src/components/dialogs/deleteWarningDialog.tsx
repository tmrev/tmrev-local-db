import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from '@mui/material'
import React from 'react'

interface Props extends DialogProps {
  onClose: () => void
  onAction: () => void
  title: string
  content: string
  open: boolean
}

const DeleteWarningDialog:React.FC<Props> = ({
  onAction,
  onClose,
  title,
  content,
  open,
  ...props
}: Props) => {
  return (
  <Dialog
    {...props}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Once this action is completed it can NOT be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>NO</Button>
      <Button onClick={onAction} autoFocus>
        Yes, DELETE
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DeleteWarningDialog
