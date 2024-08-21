import { OrbitControls, Environment, useTexture, Html } from "@react-three/drei";
import { Cube } from "../../../types/CubeTypes";
import { Mesh, Texture } from "three";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { Dispatch, useEffect, useRef, useState } from "react";
import defaultTexture from "../../../assets/cubifyAv.png";
import api from "../../../http/base_api";
import { Button, Skeleton } from "@nextui-org/react";
import { GeneralUser } from "../../../types/AuthTypes";
import OwnerInfo from "./OwnerInfo";
import CubeTitle from "./CubeTitle";
import useAuthStore from "../../../store/AuthStore";
import { DeleteFilled, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useDeleteModalStore from "../../../store/DeleteModalStore";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";

const CubeEnvironment = ({
    cube,
    setCubeLoaded,
}: {
    cube: Cube;
    setCubeLoaded: Dispatch<React.SetStateAction<boolean>>;
}) => {
    const cubeRef = useRef<Mesh>(null!);
    const { user } = useAuthStore();

    const [side1, setSide1] = useState<null | string>(null);
    const [side2, setSide2] = useState<null | string>(null);
    const [side3, setSide3] = useState<null | string>(null);
    const [side4, setSide4] = useState<null | string>(null);
    const [side5, setSide5] = useState<null | string>(null);
    const [side6, setSide6] = useState<null | string>(null);

    const texture1 = useTexture(side1 ? (side1 as string) : defaultTexture) as Texture;
    const texture2 = useTexture(side2 ? (side2 as string) : defaultTexture) as Texture;
    const texture3 = useTexture(side3 ? (side3 as string) : defaultTexture) as Texture;
    const texture4 = useTexture(side4 ? (side4 as string) : defaultTexture) as Texture;
    const texture5 = useTexture(side5 ? (side5 as string) : defaultTexture) as Texture;
    const texture6 = useTexture(side6 ? (side6 as string) : defaultTexture) as Texture;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const { isOpen, setIsOpen } = useDeleteModalStore();

    const [owner, setOwner] = useState<GeneralUser | null>(null);
    const [likePosting, setLikePosting] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean | null>(null);
    const [likeCount, setLikeCount] = useState<number | null>(null);

    const navigate = useNavigate();

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

    const { isAuth } = useAuthStore();

    const fetchSidesWithPromises = () => {
        const promises = [];

        if (cube.side1) {
            promises.push(
                axios
                    .get<Blob>(cube.side1, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide1(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }

        if (cube.side2) {
            promises.push(
                axios
                    .get<Blob>(cube.side2, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide2(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }
        if (cube.side3) {
            promises.push(
                axios
                    .get<Blob>(cube.side3, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide3(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }
        if (cube.side4) {
            promises.push(
                axios
                    .get<Blob>(cube.side4, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide4(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }
        if (cube.side5) {
            promises.push(
                axios
                    .get<Blob>(cube.side5, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide5(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }
        if (cube.side6) {
            promises.push(
                axios
                    .get<Blob>(cube.side6, { responseType: "blob" })
                    .then((response: AxiosResponse<Blob>) => {
                        setSide6(URL.createObjectURL(response.data));
                    })
                    .catch()
            );
        }

        Promise.all(promises)
            .then(() => {
                setCubeLoaded(true);
                setIsLoaded(true);
            })
            .catch(() => {});
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
        fetchSidesWithPromises();
    }, []);
    return (
        <>
            <OrbitControls enableZoom={true} />
            <Environment preset="city" />

            <mesh scale={[1, 1, 1]} position={[0, 0, 0]} ref={cubeRef}>
                {isLoaded && <boxGeometry />}

                {side1 && <meshStandardMaterial map={texture1} attach={"material-0"} />}
                {side2 && <meshStandardMaterial map={texture2} attach={"material-1"} />}
                {side3 && <meshStandardMaterial map={texture3} attach={"material-2"} />}
                {side4 && <meshStandardMaterial map={texture4} attach={"material-3"} />}
                {side5 && <meshStandardMaterial map={texture5} attach={"material-4"} />}
                {side6 && <meshStandardMaterial map={texture6} attach={"material-5"} />}
            </mesh>
            {!isOpen && (
                <Html position={[0.8, 0.9, 0.8]}>
                    <OwnerInfo owner={owner} navigate={() => navigate(`/${owner?.username}`)} />
                    <CubeTitle title={cube.name} />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            margin: "20px",
                            gap: "20px",
                        }}
                    >
                        <Skeleton isLoaded={likeCount !== null} className="rounded-lg">
                            <p>{likeCount} likes</p>
                        </Skeleton>
                        {isAuth && (
                            <Skeleton isLoaded={liked !== null} className="rounded-lg">
                                <div className="flex">
                                    <div className="relative">
                                        <button
                                            className={`absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${
                                                likePosting && "opacity-0"
                                            }`}
                                            onClick={likeHandler}
                                        >
                                            {liked ? <LikeFilled /> : <LikeOutlined />}
                                        </button>
                                        <PuffLoader
                                            color="white"
                                            className={`${likePosting ? "opacity-100" : "opacity-0"}`}
                                        />
                                    </div>
                                    {cube.ownerId === user?.id && (
                                        <Button
                                            color="danger"
                                            variant="bordered"
                                            className="mx-3"
                                            onClick={() => {
                                                setIsOpen(true);
                                            }}
                                        >
                                            <DeleteFilled />
                                        </Button>
                                    )}
                                </div>
                            </Skeleton>
                        )}
                    </div>
                </Html>
            )}
        </>
    );
};

export default CubeEnvironment;
