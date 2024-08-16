import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { toast, Flip } from "react-toastify";

import useCreateCubeStore from "../../store/CreateCubeStore";
import api from "../../http/base_api";
import { AxiosError, isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import { useMediaQuery } from "react-responsive";
const CreateCube: React.FC = () => {
    const { setCubeName, sides, cubeName, resetSides, resetPreviewImages } = useCreateCubeStore();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <div className="w-full h-full absolute flex justify-center items-center">
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    height: "100%",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        height: "40%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "30px",
                            flexDirection: "column",
                        }}
                    >
                        <Input
                            label="Name"
                            placeholder="Enter cube name"
                            variant="underlined"
                            size="lg"
                            onChange={(e) => {
                                setCubeName(e.target.value);
                            }}
                        />
                        <Button
                            variant="shadow"
                            color="primary"
                            isLoading={isPosting}
                            onPress={async () => {
                                if (!cubeName) {
                                    toast.error("Please set cube's name", {
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
                                    return;
                                }
                                const formData = new FormData();
                                sides.side1 && formData.append("image1", sides.side1);
                                sides.side2 && formData.append("image2", sides.side2);
                                sides.side3 && formData.append("image3", sides.side3);
                                sides.side4 && formData.append("image4", sides.side4);
                                sides.side5 && formData.append("image5", sides.side5);
                                sides.side6 && formData.append("image6", sides.side6);

                                formData.append("name", cubeName);
                                try {
                                    setIsPosting(true);
                                    await api.post("cube/create_cube", formData);
                                    navigate(`/${user?.username}`);
                                    setCubeName(null);
                                    resetSides();
                                    resetPreviewImages();
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
                                    setIsPosting(false);
                                }
                            }}
                        >
                            Post a Cube
                        </Button>
                        <Toaster />
                    </div>
                </div>
                <div
                    style={{
                        height: isMobile ? "50%" : "100%",
                        width: "100%",
                    }}
                >
                    <Canvas shadows camera={{ position: [90, 90, 90], fov: 1 }}>
                        <color attach="background" args={["black"]} />
                        <Experience />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};
export default CreateCube;
