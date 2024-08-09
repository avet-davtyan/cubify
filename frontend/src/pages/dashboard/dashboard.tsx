import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import style from "./dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useAuthStore from "../../store/AuthStore";

const Dashboard: React.FC = () => {
    const [, setInit] = useState(false);
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <>
            <div className="absolute h-full w-full p-24 flex justify-center items-center flex-col">
                {!isAuth ? (
                    <>
                        <img className={style.floating} src={"cubify.svg"} width={isMobile ? 200 : 500} />
                        <div className="flex flex-col gap-6 items-center">
                            <button
                                style={{
                                    width: isMobile ? "200px" : "",
                                }}
                                className={style.signButton}
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                style={{
                                    width: isMobile ? "200px" : "",
                                }}
                                className={style.signUpButton}
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </>
                ) : (
                    <img src={"cubify.svg"} width={600} className={style.floatingCubify} />
                )}
            </div>
        </>
    );
};
export default Dashboard;
