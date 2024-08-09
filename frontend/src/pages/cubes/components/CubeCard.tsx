import { Avatar, Card, CardBody, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
import { Cube } from "../../../types/CubeTypes";
import { useEffect, useState } from "react";
import api from "../../../http/base_api";
import CubeCanvas from "./components/CubeCanvas";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import useAuthStore from "../../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import CubeLoader from "./components/CubeLoader";
import { GeneralUser } from "../../../types/AuthTypes";
import { AxiosError, isAxiosError } from "axios";
import { toast, Flip } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";

const CubeCard = ({ cube }: { cube: Cube }) => {
    const [owner, setOwner] = useState<GeneralUser | null>(null);
    const [likePosting, setLikePosting] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean | null>(null);
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [cubeLoaded, setCubeLoaded] = useState<boolean>(false);
    const { isAuth, user } = useAuthStore();
    const navigate = useNavigate();
    const personal = owner && owner.id === user?.id;

    const getDate = (dateString: string): string => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };

    const navigateToOwner = () => {
        navigate(`/${owner?.username}/`);
    };

    const likeHandler = async () => {
        try {
            setLikePosting(true);
            const liked = (await api.post("cube/like", { cubeId: cube.id })).data;
            setLiked(liked);
            setLikeCount((prevState) =>
                prevState !== null ? (liked === true ? prevState + 1 : prevState - 1) : prevState
            );
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
        } finally {
            setLikePosting(false);
        }
    };

    useEffect(() => {
        api.get<GeneralUser>("/user/" + cube.ownerId)
            .then((response) => {
                setOwner(response.data);
            })
            .catch(() => {
                setOwner(null);
            });

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
            <Card
                className="p-0"
                style={{
                    maxWidth: "300px",
                }}
            >
                <CardHeader className="justify-between">
                    <div
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: personal ? "linear-gradient(to right, #8360c3, #2ebf91)" : "",
                        }}
                        className="rounded-lg"
                    >
                        <Skeleton isLoaded={owner ? true : false} className="rounded-lg">
                            <div
                                className="flex gap-5 cursor-pointer p-1"
                                style={{
                                    width: "100%",
                                }}
                                onClick={navigateToOwner}
                            >
                                <Avatar radius="full" size="md" src={owner?.avatar} isBordered />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none ">{owner?.fullName}</h4>
                                    <h5 className="tracking-tight text-tiny">
                                        {owner?.username && "@" + owner?.username}
                                    </h5>
                                </div>
                            </div>
                        </Skeleton>
                    </div>
                </CardHeader>
                <CardBody className="px-10 py-0 ">
                    <div
                        className="flex justify-between my-3 cursor-pointer"
                        onClick={() => {
                            navigate(`/cube/${cube.id}`);
                        }}
                    >
                        <p className="opacity-100 text-small">{cube.name}</p>
                        <p className=" font-thin font-sans text-small">{getDate(cube.createdAt)}</p>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "1",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        {!cubeLoaded && (
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CubeLoader />
                            </div>
                        )}
                        <div
                            className={cubeLoaded ? "opacity-100" : "opacity-0"}
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <CubeCanvas cube={cube} setCubeLoaded={setCubeLoaded} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "0.3s all",
                        }}
                    >
                        <Skeleton isLoaded={likeCount !== null} className="rounded-lg">
                            <p
                                style={{
                                    opacity: "0.4",
                                }}
                            >
                                {likeCount} likes
                            </p>
                        </Skeleton>
                        {isAuth && (
                            <Skeleton isLoaded={liked !== null} className="rounded-lg">
                                {likePosting ? (
                                    <PuffLoader color="white" />
                                ) : (
                                    <button className="p-3" disabled={likePosting} onClick={likeHandler}>
                                        {liked ? <LikeFilled /> : <LikeOutlined />}
                                    </button>
                                )}
                            </Skeleton>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default CubeCard;
