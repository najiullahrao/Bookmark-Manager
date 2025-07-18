'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
    
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
      onClick={handleSignup}
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Sign Up
    </button>

    <p style={{color: 'black', textAlign: 'center', marginTop: '15px' }}>
      Already have an account?{' '}
      <a
        href="/login"
        style={{
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Login
      </a>
    </p>
  </div>
</div>

  );
}
