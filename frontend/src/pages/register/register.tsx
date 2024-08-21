import React, { useEffect } from "react";
import Welcome from "./components/Welcome";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import ErrorModal from "./components/ErrorModal";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import SquareLoader from "react-spinners/SquareLoader";

const Register: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenError, setIsOpenError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
        <div
            className="w-full h-full absolute flex justify-center items-center"
            // style={{ backgroundImage: `url(${backImage})`, overflow: 'auto' }}
        >
            {loading ? (
                <SquareLoader color="white" />
            ) : (
                <SignUpForm setIsOpen={setIsOpen} setIsOpenError={setIsOpenError} setErrorMessage={setErrorMessage} />
            )}
            <Welcome isOpen={isOpen} setIsOpen={setIsOpen} />
            <ErrorModal isOpen={isOpenError} setIsOpen={setIsOpenError} message={errorMessage} />
        </div>
    );
};
export default Register;
