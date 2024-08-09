import { Skeleton } from "@nextui-org/react";
import { Cube } from "../../../types/CubeTypes";
import { useEffect, useState } from "react";
import api from "../../../http/base_api";
import CubeCanvas from "./components/CubeCanvas";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import useAuthStore from "../../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Flip, toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";

const CubeCard = ({ cube }: { cube: Cube }) => {
    const [liked, setLiked] = useState<boolean | null>(null);
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [cubeLoaded, setCubeLoaded] = useState<boolean>(false);
    const { isAuth } = useAuthStore();
    const [hover, setHover] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const likeHandler = async () => {
        try {
            const response = await api.post("cube/like", { cubeId: cube.id });
            console.log(response);
        } catch (e) {
            const error = e as Error | AxiosError;
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            }
        }
    };

    const getDate = (dateString: string): string => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };

    const navigate = useNavigate();

    useEffect(() => {
        api.post("/cube/isLiked", { cubeId: cube.id })
            .then((response) => {
                setLiked(response.data);
            })
            .catch(() => {});

        api.post("/cube/likeCount", { cubeId: cube.id })
            .then((response) => {
                setLikeCount(response.data);
            })
            .catch(() => {});
    }, []);
    return (
        <>
            <div>
                <div
                    style={{
                        width: "300px",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s",
                        gap: "10px",
                    }}
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    <div
                        onClick={() => {
                            navigate(`/cube/${cube.id}`);
                        }}
                        className="cursor-pointer"
                    >
                        <p
                            style={{
                                transition: "0.1s all",
                                fontSize: cubeLoaded && (hover || isMobile) ? "" : "0",
                            }}
                        >
                            {cube.name}
                        </p>
                        <p
                            style={{
                                transition: "0.1s all",
                                fontSize: cubeLoaded && (hover || isMobile) ? "12px" : "0",
                                fontWeight: "lighter",
                            }}
                        >
                            {getDate(cube.createdAt)}
                        </p>
                    </div>
                    <Skeleton isLoaded={cubeLoaded} className="rounded-lg">
                        <div
                            style={{
                                width: "100%",
                                aspectRatio: "1",
                                backgroundColor: "black",
                                overflow: "hidden",
                                display: "flex",
                                transition: "all 0.3s",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                            className="rounded"
                        >
                            <CubeCanvas cube={cube} setCubeLoaded={setCubeLoaded} />
                        </div>
                    </Skeleton>

                    <div
                        style={{
                            width: cubeLoaded && (hover || isMobile) ? "100%" : "0",
                            transition: "0.3s all",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Skeleton isLoaded={likeCount !== null}>
                            <p
                                style={{
                                    opacity: "0.4",
                                }}
                            >
                                {likeCount} likes
                            </p>
                        </Skeleton>
                        {isAuth && (
                            <Skeleton isLoaded={liked !== null}>
                                <button
                                    style={{
                                        padding: "10px",
                                    }}
                                    onClick={likeHandler}
                                >
                                    {liked ? <LikeFilled /> : <LikeOutlined />}
                                </button>
                            </Skeleton>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CubeCard;
