import CreateUserDialog from "@/components/dialogs/createUserDialog";
import DeleteWarningDialog from "@/components/dialogs/deleteWarningDialog";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';


interface Props {
  data: any[]
}

type DataRow = {
  _id: string
  firstName: string
  lastName: string
  email: string
  public: boolean
  uuid: string
  following: string[]
  followers: string[]
  bio: string
  link: null
}

type ReviewDataRow = {
  averagedAdvancedScore: number
  advancedScore: {
    acting: number
    characters: number
    cinematograph: number
    climax: number
    ending: number
    music: number
    personalScore: number
    plot: number
    theme: number
    visuals: number
  }
  notes: string
  public: boolean
  title: string
  tmdbID: number
  user: string
  userId: string
  votes: {
    upVote: string[]
    downVote: string[]
  }
  _id: string
}

const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
  const [reviews, setReviews] = useState<any[]>([])
  const [selectedRows, setSelectedRows] = useState<ReviewDataRow[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmModal, setConfirmModal] = useState<boolean>(false)

  const columns:TableColumn<ReviewDataRow>[] = [
    {
      name: 'Title',
      selector: (row) => row.title,
      cell: (row) => ( 
        <a 
        className="text-blue-500 hover:underline"
        target="_blank" 
        href={`http://localhost:3000/movie/${row.tmdbID}`}
        >
          {row.title}
        </a>
      ),
      sortable: true,
      
    },
    {
      name: 'Averaged Score',
      selector: (row) => row.averagedAdvancedScore,
      sortable: true
    },
    {
      name: 'Public',
      selector: (row) => row.public.toString(),
      sortable: true
    }
  ]

  const handleSelectedRows = (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: any[];
  }) => {
    setSelectedRows(selected.selectedRows)
  }

  const handleClose = () => {
    setConfirmModal(false)
  }


  const handleDelete = async () => {
    handleClose()
    setIsLoading(true)
    const deletePromise = selectedRows.map(({_id}) => axios.delete(`/api/deleteReview/${_id}`))

    await Promise.allSettled(deletePromise)
    setIsLoading(false)
    await handleFetchUserInformation()
  }

  const handleFetchUserInformation = useCallback(async () => {
    const userData = await axios.get(`/api/users/reviews/${data._id}`)
    setReviews(userData.data.result.reviews);
  }, [data._id])

  useEffect(() => {
    handleFetchUserInformation()
  }, [handleFetchUserInformation])

  return (
    <div className="p-3">
      <div className="w-full flex justify-end">
      <Button 
        onClick={() => setConfirmModal(true)} 
        className="bg-red-600 hover:bg-red-700"
        disabled={!selectedRows.length} 
        variant='contained'
        >
          DELETE
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={reviews}
        selectableRows
        onSelectedRowsChange={handleSelectedRows}
        clearSelectedRows
        progressPending={isLoading}
        progressComponent={<CircularProgress />}
      />
      <DeleteWarningDialog
        onAction={handleDelete}
        onClose={handleClose}
        title={`You want to delete ${selectedRows.length} Review(s)?`}
        content="Once this action is completed it can NOT be undone."
        open={confirmModal}
      />
    </div>
  )
};

const Users: React.FC<Props> = ({data}: Props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<any[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'First Name',
      selector: (row: any)=> row.firstName,
      sortable: true
    },
    {
      name: 'Last Name',
      selector: (row: any)=> row.lastName,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row: any)=> row.email,
      sortable: true
    },
    {
      name: 'Public',
      selector: (row: any)=> row.public.toString(),
      sortable: true
    },
    {
      name: 'Firebase Id',
      selector: (row: any)=> row.uuid,
      sortable: true
    },
  ];
  
  const handleSelectedRows = (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: any[];
  }) => {
    setSelectedRows(selected.selectedRows)
  }

  const handleClose = () => {
    setConfirmModal(false)
  }

  const handleDelete = async () => {
    handleClose()
    setIsLoading(true)
    const deletePromise = selectedRows.map(({_id}) => axios.delete(`/api/users/deleteUser/${_id}`))

    await Promise.allSettled(deletePromise)
    setIsLoading(false)
    await fetchCurrentData()
  }

  const fetchCurrentData = async () => {
    setIsLoading(true)
    const users = await fetch('/api/users/retrieveUsers')

    const data = await users.json()
    setIsLoading(false)
    setCurrentData(data)
  }

  return (
    <div>
      <h1 className="text-xl text-red-500" >Users</h1>
      <div className="flex w-full justify-end">
        <Button onClick={() => setCreateModal(true)}>
          Create User
        </Button>
        <Button 
          onClick={() => setConfirmModal(true)} 
          className="bg-red-600 hover:bg-red-700"
          disabled={!selectedRows.length} 
          variant='contained'
        >
          DELETE
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={currentData || data}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        selectableRows
        onSelectedRowsChange={handleSelectedRows}
        clearSelectedRows
        progressPending={isLoading}
        progressComponent={<CircularProgress />}
      />
      <CreateUserDialog
        open={createModal}
        onClose={() => setCreateModal(false)}
        onRefresh={fetchCurrentData}
      />
      <DeleteWarningDialog
        onAction={handleDelete}
        onClose={handleClose}
        title={`You want to delete ${selectedRows.length} User(s)?`}
        content="Once this action is completed it can NOT be undone."
        open={confirmModal}
      />
    </div>
  )
}



export default Users