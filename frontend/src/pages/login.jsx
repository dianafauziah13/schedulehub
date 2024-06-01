import React from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Lakukan logika otentikasi di sini, misalnya panggil API login

    // Jika otentikasi berhasil, navigasikan ke halaman dashboard
    const isAuthenticated = true;

    if (isAuthenticated) {
      // Jika otentikasi berhasil, arahkan ke halaman dashboard
      navigate("/dashboard");
    } else {
      // Jika otentikasi gagal, mungkin tampilkan pesan kesalahan atau lakukan tindakan lain
      console.log('Login failed');
    }
  };
  
  return (
    <div className="bg-white font-family-karla h-screen flex">
      <div className="w-auto flex flex-wrap">
        {/* Login Section */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a href="https://profil.persisbanjaran.org" className="bg-black text-white font-bold text-xl p-4">SCHEDULEHUB</a>
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Ahlan Wa Sahlan</p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={(event) => event.preventDefault()}>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <input
                type="submit"
                value="Log In"
                onClick={handleLogin}
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>Don't have an account? <a href="register.html" className="underline font-semibold">Register here.</a></p>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-1/2 shadow-2xl overflow-hidden">
          <img
            className="object-cover w-full h-full hidden md:block"
            src="./kantor-depan2.jpeg"
            alt="Login Background"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
