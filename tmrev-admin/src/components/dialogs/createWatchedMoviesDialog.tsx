import { DataRow } from "@/features/users";
import { createWatched } from "@/functions/createWatched";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { create } from "domain";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
  dataRow: DataRow
}

const CreateWatchedMoviesDialog: React.FC<Props> = ({
  onClose,
  open,
  onRefresh,
  dataRow,
  ...props
}: Props) => {
  const [watchedMovies, setWatchedMovies] = useState<number>(10)


  const handleCreateWatchedMovies = async () => {
    onClose()

    const array = Array.from({length: watchedMovies}, (_, index) => index);

    const watchedMoviesPromise = array.map(() => (
      fetch(`/api/watched/createWatched`, {
        method: 'POST',
        body: JSON.stringify({uuid: dataRow.uuid}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ))

    await Promise.allSettled(watchedMoviesPromise)

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
      Create Watched Movies for {dataRow.firstName} {dataRow.lastName}
    </DialogTitle>
    <DialogContent className="space-y-3 flex flex-col gap-4">
    <span>{`create ${watchedMovies} number of watched movies.`}</span>
    <TextField
      id="watched-movie-id"
      label="Number of watched movies"
      type="text"
      value={watchedMovies}
      onChange={(e) => setWatchedMovies(+e.target.value)}
    />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleCreateWatchedMovies} autoFocus>
        Create
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CreateWatchedMoviesDialog