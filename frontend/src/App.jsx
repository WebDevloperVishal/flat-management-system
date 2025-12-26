
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import FlatApprovedPage from './pages/user/FlatApprovedPage'
import MyFlatPage from './pages/user/MyFlatPage'
import EnquiriesPage from './pages/user/EnquiriesPage'
import EnquiriesForMyFlat from './pages/user/EnquiriesForMyFlat'
import AdminDashPage from './pages/admin/AdminDashPage'
import PendingFlats from './pages/admin/PendingFlats'
import ApprovedFlats from './pages/admin/ApprovedFlats'
import SoldFlats from './pages/admin/SoldFlats'
import AllEnquiries from './pages/admin/AllEnquiries'
import AddFlatPage from './pages/user/AddFlatPage'


function App() {

  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/user-dash' element={<UserDashboard/>}>
              <Route index element={<FlatApprovedPage/>}/>
              <Route path='myflats' element={<MyFlatPage/>}/>
              <Route path='myflats/add' element={<AddFlatPage/>}/>
              <Route path='enquiries' element={<EnquiriesPage/>}/>
              <Route path='enquiries/received' element={<EnquiriesForMyFlat/>}/>
              
            </Route>
            <Route path='/admin-dash' element={<AdminDashboard/>}>
              <Route index element={<AdminDashPage/>}/>
              <Route path='pending' element={<PendingFlats/>}/>
              <Route path='approved' element={<ApprovedFlats/>}/>
              <Route path='sold' element={<SoldFlats/>}/>
              <Route path='enquiriesAll' element={<AllEnquiries/>}/>
              
            </Route>
        </Routes>
     </Router>
    </>
  )
}

export default App
