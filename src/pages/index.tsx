import type { NextPage } from 'next'
import { Dashboard } from '../components/Dashboard'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className='h-[100vh] flex flex-col'>
      <Header/>
      <Dashboard/>
    </div>
  )
}

export default Home
