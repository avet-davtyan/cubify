import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/AuthStore";
import SquareLoader from "react-spinners/SquareLoader";
import useCubeStore from "../../store/CubeStore";
import { AxiosError, isAxiosError } from "axios";
import SideBar from "./components/SideBar";
import { useMediaQuery } from "react-responsive";

function PrivateRoute() {
    const authStore = useAuthStore();
    const cubeStore = useCubeStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    useEffect(() => {
        const fetch = async () => {
            try {
                const accessToken: string | null = searchParams.get("at");
                const refreshToken: string | null = searchParams.get("rt");
                if (accessToken && refreshToken) {
                    localStorage.setItem("at", accessToken);
                    localStorage.setItem("rt", refreshToken);
                }
                searchParams.delete("at");
                searchParams.delete("rt");
                const newUrl = `${window.location.pathname}${searchParams.toString()}`;
                window.history.replaceState({}, "", newUrl);

                await cubeStore.getCubeCount();
                await authStore.verify();
            } catch (e) {
                const error = e as Error | AxiosError;
                if (isAxiosError(error)) {
                    if (error.response?.status === 403) {
                        navigate("verify");
                    } else if (error.response?.status === 422) {
                        navigate("createusername");
                    }
                }
            } finally {
                authStore.setLoading(false);
            }
        };
        fetch();
    }, []);
    return (
        <>
            {authStore.isLoading ? (
                <div
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <SquareLoader color="white" />
                </div>
            ) : (
                <>
                    <div
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                        }}
                    >
                        <NavBar setSideBarOpen={setSideBarOpen} />
                        <Outlet />
                    </div>
                    {isMobile && <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />}
                </>
            )}
        </>
    );
}

export default PrivateRoute;
