import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import Layout from './common/Layout';
import PrivateRoute from './PrivateRoute';
import Profile from './admin/Profile';
import Password from './admin/Password';
import Userlist from './admin/Userlist';
import View from './admin/View';
import CategoryList from './category/CategoryList';
import CategoryView from './category/CategoryView';
import CategoryAdd from './category/CategoryAdd';
import SubCategoryList from './SubCategory/SubCategoryList';
import SubCategoryView from './SubCategory/SubCategoryView';
import SubCategoryAdd from './SubCategory/SubCategoryAdd';
import PrivacyPolicy from './cms/PrivacyPolicy';
import AboutUs from './cms/AboutUs';
import Terms from './cms/Terms';


const App = () => {
  return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<Layout/>}>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile/>}/>}/>
        <Route path="/password" element={<PrivateRoute element={<Password/>}/>}/>
        <Route path='/users' element={<PrivateRoute element={<Userlist/>}/>}/>
        <Route path='/viewuser/:_id' element={<PrivateRoute element={<View/>}/>}/>
        <Route path='/category' element={<PrivateRoute element={<CategoryList/>}/>}/>
        <Route path='/viewcategory/:_id' element={<PrivateRoute  element={<CategoryView/>}/>}/>
        <Route path='/addcategory' element={<PrivateRoute element={<CategoryAdd/>}/>}/>
        <Route path='/subcategory' element={<PrivateRoute element={<SubCategoryList/>}/>}/>
        <Route path='/service/:_id' element={<PrivateRoute element={<SubCategoryView/>}/>}/>
        <Route path='/addsubcategory' element={<PrivateRoute element={<SubCategoryAdd/>}/>}/>
        <Route path='/privacypolicy' element={<PrivateRoute element={<PrivacyPolicy/>}/>}/>
        <Route path='/aboutus' element={<PrivateRoute element={<AboutUs/>}/>}/>
        <Route path="/terms" element={<PrivateRoute element={<Terms/>}/>}/>
        </Route>
    </Routes>
  </Router>
  </>
  )
}

export default App
