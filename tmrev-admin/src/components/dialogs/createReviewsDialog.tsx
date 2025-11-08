import { DataRow } from "@/features/users";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
  dataRow: DataRow
}

const CreateReviewsDialog: React.FC<Props> = ({
  onClose,
  open,
  onRefresh,
  dataRow,
  ...props
}: Props) => {
  const [numberOfReviews, setNumberOfReviews] = useState<number>(0)


  const handleCreateReviews = async () => {
    onClose()

    const array = Array.from({length: numberOfReviews}, (_, index) => index);


    const userPromise = array.map(() => 
      axios.post('/api/review/createReview', 
      {uid: dataRow.uuid}
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
    <span>{`create a random reviews for a user.`}</span>
    <p>Number of Reviews</p>
    <TextField
      id="movie-id"
      label="Number of Reviews"
      type="text"
      value={numberOfReviews}
      onChange={(e) => setNumberOfReviews(+e.target.value)}
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

export default CreateReviewsDialog