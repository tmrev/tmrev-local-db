import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { refreshToken } from "firebase-admin/app";
import { title } from "process";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
  selectedRows: any[]
}

const CreateReviewDialog: React.FC<Props> = ({
  onClose,
  open,
  onRefresh,
  selectedRows,
  ...props
}: Props) => {
  const [movieId, setMovieId] = useState<number>(0)


  const handleCreateReviews = async () => {
    onClose()
    const userPromise = selectedRows.map((row) => axios.post('/api/review/createReview', 
      {uid: row.uuid, movieId}
    ))

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
      Create new reviews
    </DialogTitle>
    <DialogContent className="space-y-3">
    <span>{`create a review for ${selectedRows.length} users.`}</span>
    <p>Movie Id</p>
    <TextField
      id="movie-id"
      label="Movie Id"
      type="text"
      value={movieId}
      onChange={(e) => setMovieId(+e.target.value)}
    />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleCreateReviews} autoFocus>
        Create
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CreateReviewDialog