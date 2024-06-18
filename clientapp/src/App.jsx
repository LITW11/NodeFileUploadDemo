import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import FileUpload from './Pages/FileUpload';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/fileupload' element={<FileUpload />} />
            </Routes>
        </Layout>
    );
}

export default App;