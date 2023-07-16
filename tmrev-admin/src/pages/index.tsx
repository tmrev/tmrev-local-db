import Users from '@/features/users'
import { GetServerSideProps, NextPage } from 'next'

interface Props {
  users: any
}

const Home:NextPage<Props> = ({users}: Props) => {
  return (
   <div className='p-8'>
      <Users data={users}/>
   </div>
  )
}


export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('http://localhost:3001/api/users/retrieveUsers')
  const users = await res.json()

  return { 
    props: {
      users
    } 
  }
}

export default Home