import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./FirebaseAuth";
import JournalPage from "../pages/JournalPage/JournalPage";

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
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="*" element={<NotFound/>}/>

                    {/* Protected journal route */}
                    <Route path="/journal"
                        element={
                            <ProtectedRoute>
                                <JournalPage/>
                            </ProtectedRoute>}>
                    </Route>
                </Routes>
            </AuthProvider>
            
        </Router>
    );
}
