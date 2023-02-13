import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from './component/Login';
import NotFound from './component/NotFound';
import Dashboard from "./component/Home/Dashboard";
import Layout from "./component/Layout";

import ApplicantEditForm from "./component/Candidate/ApplicantEditForm";
import HireProcessBar from "./component/Candidate/HireProcessBar";
import Account from "./component/account";
import EditCandidate from "./component/Candidate/EditCandidate";
import ApplicantFeedbackFormEmp from "./component/Candidate/FeedbackForm";
import EditFeedback from "./component/Candidate/EditFeedback";
import FeedbackForm from "./component/Candidate/FeedbackForm";
import ApplicantCreateForm from "./component/Candidate/ApplicantCreateForm";
import ApplicantFeedbackForm from "./component/Candidate/ApplicantFeedbackForm";

function RoutesPage() {
  
  return(
    <BrowserRouter>
      <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/"  element={<Login />} />
      <Route exact path="/dashboard" element={
      <Layout>
        <Dashboard />
        </Layout>
      } />
      <Route exact path="/account" element={
      <Layout>
        <Account />
        </Layout>
      } />
      {/* <Route exact path="/profile" element={
      <Layout>
        <AccountProfileDetails />
        </Layout>
      } /> */}
     
      <Route exact path="/profile/:id" element={
      <Layout>
        
        <EditCandidate />
        </Layout>
      } />

    <Route exact path="/feedback_/:id" element={
          <Layout>
           <EditFeedback />
            </Layout>
          } />
      <Route exact path="/feedback/view/:id" element={
          <Layout>
           <EditFeedback />
            </Layout>
          } />

     <Route exact path="/feedback/:id" element={
          <Layout>
           <FeedbackForm />
            </Layout>
          } />

      </Routes>


    </BrowserRouter>

  )
}
export default RoutesPage;