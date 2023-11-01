import './LoginForm.css'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Email: " + email);
        console.log("Password: " + password);
    }

    return (
    <Container>
        <InputGroup className="input">
            <InputGroup.Text id="email-input">📧</InputGroup.Text>
            <Form.Control
                size="lg"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </InputGroup>
        <InputGroup className="input">
            <InputGroup.Text id="password-input">🔑</InputGroup.Text>
            <Form.Control
                size="lg"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </InputGroup>
        <InputGroup className="input">
            <Button variant="primary" size="lg" className="login-button" onClick={handleLogin}>Login</Button>
        </InputGroup>
    </Container>
    );
}

export default LoginForm;
