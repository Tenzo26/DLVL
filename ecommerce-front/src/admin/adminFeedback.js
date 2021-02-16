import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';



const adminFeedback = () => {

    const {user: {name}} = isAuthenticated()

    return (
        <Layout title = "Feedbacks" description = {` ${name}, Please review the feedbacks here`}
        className = "container-fluid">
        </Layout>
    );
};


export default adminFeedback;