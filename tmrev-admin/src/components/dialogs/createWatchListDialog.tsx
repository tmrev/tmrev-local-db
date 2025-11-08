import { DataRow } from "@/features/users";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle,TextField } from "@mui/material";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
  dataRow: DataRow
}

const CreateWatchListDialog: React.FC<Props> = ({
  onClose,
  open,
  onRefresh,
  dataRow,
  ...props
}: Props) => {
  const [watchLists, setWatchLists] = useState<number>(1)
  const [numberOfMovies, setNumberOfMovies] = useState<number>(10)


  const handleCreateWatchList = async () => {
    onClose()

    const array = Array.from({length: watchLists}, (_, index) => index);

    const watchedMoviesPromise = array.map(() => (
      fetch(`/api/watchlist/createWatchList`, {
        method: 'POST',
        body: JSON.stringify({uuid: dataRow.uuid, numberOfMovies}),
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
      Create WatchList for {dataRow.firstName} {dataRow.lastName}
    </DialogTitle>
    <DialogContent className="space-y-3 flex flex-col gap-4">
    <span>{`create ${watchLists} number of watch lists.`}</span>
    <TextField
      id="watched-movie-id"
      label="Number of watch lists"
      type="text"
      value={watchLists}
      onChange={(e) => setWatchLists(+e.target.value)}
    />
        <TextField
      id="number-movie-id"
      label="Number of movies per watch list"
      type="text"
      value={numberOfMovies}
      onChange={(e) => setNumberOfMovies(+e.target.value)}
    />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleCreateWatchList} autoFocus>
        Create
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CreateWatchListDialog