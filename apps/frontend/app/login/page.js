'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
   <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0'
}}>
  <div style={{
    background: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px'
  }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
    
    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
    
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
    
    <button
      onClick={handleLogin}
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '15px'
      }}
    >
      Login
    </button>

    <p style={{color: 'black', textAlign: 'center' }}>
      Don't have an account?{'    '}
      <a
        href="/signup"
        style={{
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Sign up
      </a>
    </p>
  </div>
</div>

  );
}
