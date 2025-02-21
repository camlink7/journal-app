import "../../App.css"

export default function RegisterPage(){

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Add your API logic here
        console.log('Form submitted');
    }


    return (
        <>
            <div className="flex items-center justify-center min-h-screen"> {/* Background color of the page */}
                <form onSubmit={handleSubmit} className="card w-80 lg:w-96 bg-base-200 shadow-xl"> {/* Slightly lighter than base */}
                <div className="card-body">
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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="input input-bordered"
                            required
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
        </>
    );
}