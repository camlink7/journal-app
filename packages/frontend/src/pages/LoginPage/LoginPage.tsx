import "../../App.css"
import React from "react";

export default function LoginPage(){

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Add your API logic here
        console.log('Form submitted');
    }

    return (
    <>
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="text-3xl mb-12">Journal App</h1>
                <form onSubmit={handleSubmit} className="card w-80 lg:w-96 bg-base-200 shadow-xl">
                        <div className="card-body">
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
    </>);
}