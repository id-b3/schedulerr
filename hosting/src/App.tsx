import React from 'react';
import LoginForm from './LoginForm.tsx';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
        return (
        <div className="App">
        <Container>
            <div className="page-header">
                <h1> Schedul&#128075;!</h1>
            </div>
        </Container>
            <LoginForm />
        </div>
        );
    }

export default App;
