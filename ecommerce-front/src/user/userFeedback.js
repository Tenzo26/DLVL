import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';



const userFeedback = () => {

    return (
        <Layout title = "Feedbacks" description = {` Welcome to Feedback page `}
        className = "container-fluid">
        </Layout>
    );
};


export default userFeedback;