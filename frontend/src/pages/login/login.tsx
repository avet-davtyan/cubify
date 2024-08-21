import React, { useEffect, useState } from "react";
import SignInForm from "./components/SignInForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import SquareLoader from "react-spinners/SquareLoader";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const [loading, setLoading] = useState<boolean>(true);
    const verify = async () => {
        try {
            await authStore.verify();
            navigate("/cubes");
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verify();
    }, []);
    return (
        <div className="w-full h-full absolute flex justify-center items-center">
            {loading ? <SquareLoader color="white" /> : <SignInForm />}
        </div>
    );
};
export default Login;
