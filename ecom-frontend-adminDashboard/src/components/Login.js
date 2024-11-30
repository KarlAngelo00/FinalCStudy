import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register

  // State for form data
  const [formData, setFormData] = useState({
    username: 'admin@example.com',
    password: 'password123',
    email: '',
  });

  // States for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  // Handle form submission (front-end only, no actual API call)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a login for front-end testing
    if (isLogin) {
      console.log('Logging in with:', formData);

      // Simulate successful login (hardcoded)
      if (formData.username === 'admin@example.com' && formData.password === 'password123') {
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => {
          navigate('/dashboard');  // Simulate redirection after successful login
        }, 1500);  // Redirect after 1.5 seconds
      } else {
        setError('Invalid username or password. Please try again.');
        setSuccess('');
      }
    } else {
      console.log('Registering with:', formData);
      // Add registration logic here if needed
    }
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', password: '', email: '' }); // Reset form fields
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={4} className="text-center">
          <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h2 className="mb-4" style={{ color: '#4b4b4b' }}>{isLogin ? 'Login' : 'Register'}</h2>

            {/* Error and Success Alerts */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              {isLogin && (
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#4b4b4b', textAlign: 'left', display: 'block' }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.username} // Using username as email in login form
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                    style={{ borderColor: '#ccc' }}
                  />
                </Form.Group>
              )}
              {!isLogin && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#4b4b4b', textAlign: 'left', display: 'block' }}>
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                      style={{ borderColor: '#ccc' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#4b4b4b', textAlign: 'left', display: 'block' }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      style={{ borderColor: '#ccc' }}
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#4b4b4b', textAlign: 'left', display: 'block' }}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: '#6a8759',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </Form>

            <p className="mt-3" style={{ color: '#4b4b4b' }}>
              {isLogin ? (
                <>
                  Not Registered?{' '}
                  <span
                    onClick={toggleForm}
                    style={{ color: '#6a8759', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already Registered?{' '}
                  <span
                    onClick={toggleForm}
                    style={{ color: '#6a8759', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;
