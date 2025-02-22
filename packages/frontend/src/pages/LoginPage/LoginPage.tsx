import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import "../../App.css"
import React, { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { replace, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/FirebaseAuth";

export default function LoginPage(){

    const [error, setError] = useState<string>("");
    const auth = useAuth();
    const navigate = useNavigate();
    
    // Check if already logged in, if so direct to journal page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user){
                navigate("/journal");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Email & Password States
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            setError("")
            navigate("/journal");
        })
        .catch((error) => {
            if (error.code === "auth/invalid-credential"){
                setError("Invalid email or password!")
            }
            else {
                setError("Something went wrong! Please try again later.")
            }
        })
    }

    useEffect(() => {
        setError("");
    }, [email, password]);

    return (
    <>
        {
            (!auth.loadingAuth) ?
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <h1 className="text-3xl mb-12">Journal App</h1>
                    <form onSubmit={handleSubmit} className="card w-80 lg:w-96 bg-base-200 shadow-xl">
                            <div className="card-body">
                            { error &&
                                <>
                                    <div className="my-5">    
                                        <Alert type="error" message={error}/>
                                    </div> 
                                </>
                            
                            }
                            <h2 className="card-title">Login</h2>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Email</span>
                                </label>
                                <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Password</span>
                                </label>
                                <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-control mt-6 mb-0">
                                <button type="submit" className="btn btn-primary">
                                Login
                                </button>
                            </div>
                            <a href="/register" className="mt-3 hover:scale-110 duration-100">or create account here</a>
                            </div>
                        </form>
                    </div>
            </div>

            : 
            <div className="flex min-h-screen justify-center align-items-center">
                    <span className="loading loading-bars loading-lg"></span>
            </div>
        }
        
    </>);
}