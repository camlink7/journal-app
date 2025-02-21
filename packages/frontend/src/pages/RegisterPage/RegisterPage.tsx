import { useState, useEffect } from "react";
import "../../App.css"
import Alert from "../../components/Alert";

export default function RegisterPage(){

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Add your API logic here
        console.log('Form submitted');
    }


    // Error State
    const [error, setError] = useState<string>("");
    
    // Email State
    const [email, setEmail] = useState<string>("");

    // Password States
    const validatePasswords = () => {
        if (password !== confirmPassword && password.length > 0 && confirmPassword.length > 0){
            setError("Passwords must match!");
        }
        else {
            setError("");
        }
    }

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        validatePasswords();
    }, [password, confirmPassword])

    return (
        <>
            <div className="flex items-center justify-center min-h-screen"> {/* Background color of the page */}
                <div>

                    <h1 className="text-3xl mb-12">Journal App</h1>
                    <form onSubmit={handleSubmit} className="card w-80 lg:w-96 bg-base-200 shadow-xl"> {/* Slightly lighter than base */}
                    <div className="card-body">
                        { error &&
                            <div className="my-5">    
                                <Alert type="error" message={error}/>
                            </div> 
                        }
                        

                        <h2 className="card-title">Register</h2>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="input input-bordered"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <a href="/login" className="mt-3 hover:scale-110 duration-100">or login here</a>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}