import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTransaction from './pages/NewTransaction'
import Transactions from './pages/Transactions'
import Transaction from './pages/Transaction'
import AllTransactions from './pages/AllTransactions'
import MyProfile from './pages/MyProfile'
import Users from './pages/Users'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/create-transaction'
              element={
                <PrivateRoute>
                  <NewTransaction />
                </PrivateRoute>
              }
            />
            <Route
              path='/all-transactions'
              element={
                <PrivateRoute>
                  <AllTransactions />
                </PrivateRoute>
              }
            />
            <Route
              path='/all-users'
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path='/my-profile'
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/transactions'
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path='/transaction/:transactionId'
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer position='top-right' theme='colored' autoClose={2500} />
    </>
  )
}

export default App
