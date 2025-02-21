import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export default function AppRouter(){

    const NotFound = () => {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-5xl">404 - Page Not Found</h1>
            </div>
        
        );
    }

    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
