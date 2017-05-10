import React from 'react';



export default function LoginPage() {

    return (
    <div>
      <h1 className='login-title'>Let It Mow</h1>
      <a href={'/api/auth/google'}>Login with Google</a>;
    </div>
    );
}
