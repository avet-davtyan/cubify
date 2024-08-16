import { useParams } from "react-router-dom";
import api from "../../http/base_api";
import { useEffect, useState } from "react";
import { Cube } from "../../types/CubeTypes";
import CubeCanvas from "./components/CubeCanvas";
import DeleteModal from "./components/CubeDeleteModal";
import SquareLoader from "react-spinners/SquareLoader";

const CubePage: React.FC = () => {
    const { cubeId } = useParams();
    const [cube, SetCube] = useState<Cube | null>(null);
    const [cubeLoaded, setCubeLoaded] = useState<boolean>(false);

    const fetch = async () => {
        try {
            const cubeData = (await api.get(`cube/specific/${cubeId}/`)).data;
            SetCube(cubeData);
        } catch {
            // setErrorText(`This page isn't available`);
        }
    };

    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            <div className="h-full w-full flex justify-center items-center">
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {cube ? (
                        <>
                            <CubeCanvas cube={cube} setCubeLoaded={setCubeLoaded} />
                            <DeleteModal cube={cube} />
                        </>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <SquareLoader color="white" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default CubePage;
