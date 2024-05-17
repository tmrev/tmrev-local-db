import { DataRow } from "@/features/users";
import { 
  Button, 
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogContentText,
  DialogProps, 
  DialogTitle, 
  FormControlLabel, 
  Grid, 
  MenuItem, 
  Select, 
  Switch, 
  TextField 
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useState } from "react";


type UpdateUserDialogProps = DialogProps & {
  onClose: () => void
  open: boolean
  onRefresh: () => Promise<void>
  data: DataRow
}

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({
  onClose,
  open,
  onRefresh,
  data,
  ...props
}: UpdateUserDialogProps) => {
  const [firstName, setFirstName] = useState<string>(data.firstName)
  const [lastName, setLastName] = useState<string>(data.lastName)
  const [email, setEmail] = useState<string>(data.email)
  const [publicUser, setPublicUser] = useState<boolean>(data.public)
  const [bio, setBio] = useState<string>(data.bio)
  const [link, setLink] = useState<string | null>(data.link)
  const [followers, setFollowers] = useState<string[]>(data.followers)
  const [following, setFollowing] = useState<string[]>(data.following)
  const [photoUrl, setPhotoUrl] = useState<string | null>(data.photoUrl)
  
  const handleUpdateUser = async () => {
    onClose()
    const formData = {
      email,
      bio,
      link,
      followers,
      following,
      photoUrl,
      firstName,
      lastName,
      public: publicUser
    }

    await fetch('/api/users/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({uid: data.uuid, formData})
    })

    await onRefresh()
  }

  const handleGenerateUserPhoto = async () => {
    const randomUser = await axios.get('https://randomuser.me/api/?results=1')

    const user = randomUser.data.results[0]

    setPhotoUrl(user.picture.thumbnail)
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
        Update {data.firstName} {data.lastName}
      </DialogTitle>
      <DialogContent className="space-y-3">
        <div className="flex gap-4 flex-wrap mt-4">
          <TextField
            id="first-name"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="last-name"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="bio"
            label="Bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <TextField
            id="link"
            label="Link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <FormControlLabel
            label={publicUser ? 'Public' : 'Private'} 
            control={ <Switch onChange={(e) => setPublicUser(e.target.checked)} value={publicUser} />} 
          />
          <div className="flex items-center">
            <TextField
              id="photo-url"
              label="Photo URL"
              type="text"
              value={photoUrl}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button onClick={handleGenerateUserPhoto} >Generate</Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancel</Button>
        <Button   onClick={handleUpdateUser}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateUserDialog