import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { refreshToken } from "firebase-admin/app";
import { title } from "process";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
}

const CreateUserDialog: React.FC<Props> = ({
  onClose,
  open,
  onRefresh,
  ...props
}: Props) => {
  const [numberOfUsers, setNumberOfUser] = useState<number>(5)
  const [numberOfReviews, setNumberOfReviews] = useState<number>(25)


  const handleCreateUsers = async () => {
    console.log('create users init')
    onClose()
    const array = Array.from({length: numberOfUsers}, (_, index) => index);

    const userPromise = array.map(() => axios.post('/api/users/createUser', {numberOfReviews}))

    await Promise.allSettled(userPromise)

    await onRefresh()
  }


  return (
    <Dialog
    {...props}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Create new Users
    </DialogTitle>
    <DialogContent className="space-y-3">
    <p>Number of Users</p>  
    <Select
    className="w-full"
    labelId="select-number-of-users-label"
    id="select-number-of-users"
    value={numberOfUsers}
    label="Number of Users"
    onChange={(e) => setNumberOfUser(+e.target.value) }
  >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={5}>5</MenuItem>
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={20}>20</MenuItem>
  </Select>
  <p>Number of Reviews for each User created</p>
  <Select
    className="w-full text-black"
    labelId="select-number-of-reviews-label"
    id="select-number-of-reviews"
    value={numberOfReviews}
    label="Number of Reviews pre User"
    onChange={(e) => setNumberOfReviews(+e.target.value) }
  >
    <MenuItem value={0}>0</MenuItem>
    <MenuItem value={25}>25</MenuItem>
    <MenuItem value={50}>50</MenuItem>
    <MenuItem value={100}>100</MenuItem>
    <MenuItem value={150}>150</MenuItem>
  </Select>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleCreateUsers} autoFocus>
        Create
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CreateUserDialog