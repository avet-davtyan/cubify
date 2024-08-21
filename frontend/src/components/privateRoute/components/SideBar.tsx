import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore";
import CloseSideBar from "../../../assets/closeSideBar.svg";
import { SearchOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { Avatar, Button } from "@nextui-org/react";

const SideBar = ({
    sideBarOpen,
    setSideBarOpen,
}: {
    sideBarOpen: boolean;
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const pathName = location.pathname;
    const { isAuth, reset } = useAuthStore();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const navigateAndClose = (path: string) => {
        navigate(path);
        setSideBarOpen(false);
    };

    const closeSideBar = () => {
        setSideBarOpen(false);
    };

    const logout = () => {
        reset();
        navigate("/login");
    };

    return (
        <div
            style={{
                position: "absolute",
                transition: "all 0.7s",
                height: "100%",
                width: "100%",
                backgroundColor: "black",
                zIndex: "40",
                transform: `translate(${sideBarOpen ? 0 : "-100%"}, 0)`,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "40px",
                gap: "40px",
                overflow: "hidden",
            }}
        >
            {isAuth
                ? isMobile && (
                      <a onClick={() => navigateAndClose(`/${user?.username}`)}>
                          <div className="flex items-center gap-3">
                              <p
                                  style={{
                                      opacity: "0.7",
                                  }}
                              >
                                  {user?.fullName}
                              </p>
                              <Avatar src={user?.avatar} />
                          </div>
                      </a>
                  )
                : isMobile && (
                      <div className={`flex ${isMobile ? "gap-1" : "gap-4"}`}>
                          <Button
                              size="sm"
                              color="primary"
                              variant="shadow"
                              onClick={() => {
                                  navigate("/login");
                              }}
                          >
                              Sign In
                          </Button>
                          <Button
                              size="sm"
                              color="primary"
                              variant="bordered"
                              onClick={() => {
                                  navigate("/register");
                              }}
                          >
                              Sign Up
                          </Button>
                      </div>
                  )}
            {!isAuth && (
                <p
                    style={{
                        cursor: "pointer",
                        opacity: pathName == "/" ? "0.5" : "1",
                        borderBottom: pathName == "/" ? "1px solid" : "",
                    }}
                    onClick={() => {
                        navigateAndClose("/");
                    }}
                >
                    Home
                </p>
            )}
            <p
                style={{
                    cursor: "pointer",
                    opacity: pathName == "/cubes" ? "0.5" : "1",
                    borderBottom: pathName == "/cubes" ? "1px solid" : "",
                }}
                onClick={() => {
                    navigateAndClose("/cubes");
                }}
            >
                Cubes
            </p>
            <p
                style={{
                    cursor: "pointer",
                    opacity: pathName == "/search" ? "0.5" : "1",
                    borderBottom: pathName == "/search" ? "1px solid" : "",
                }}
                onClick={() => {
                    navigateAndClose("/search");
                }}
            >
                <div className="flex gap-2 items-center">
                    Search
                    <SearchOutlined />
                </div>
            </p>
            {isAuth && (
                <>
                    <p
                        style={{
                            cursor: "pointer",
                            opacity: pathName == "/create_cube" ? "0.5" : "1",
                            borderBottom: pathName == "/create_cube" ? "1px solid" : "",
                        }}
                        onClick={() => {
                            navigateAndClose("/create_cube");
                        }}
                    >
                        Create a cube
                    </p>
                    <p onClick={() => logout()}>Logout</p>
                </>
            )}
            <div className="absolute right-5 top-5 cursor-pointer" onClick={closeSideBar}>
                <img src={CloseSideBar} width={20} />
            </div>
        </div>
    );
};

export default SideBar;
