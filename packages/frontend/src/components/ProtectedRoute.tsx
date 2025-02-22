import { Navigate } from "react-router-dom";
import { useAuth } from "./FirebaseAuth";
import { JSX } from "react";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    const {user, loadingAuth} = useAuth();

    if (loadingAuth){
        return ( <p>Loading</p>);
    }
    if (!user) {
        return (<>
            <Navigate to="/login" replace/>
        </>);
    }

    return children;
}

export default ProtectedRoute;