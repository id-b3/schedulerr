import Layout from './Layout.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Profile from './Profile.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout />}>
                    <Route index element = {<Login />} />
                    <Route path = "/signup" element = {<Signup />} />
                    <Route path = "/profile" element = {<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
