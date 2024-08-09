import { Canvas } from "@react-three/fiber";
import { Cube } from "../../../types/CubeTypes";
import { Dispatch } from "react";
import CubeEnvironment from "./CubeEnvironment";

const CubeCanvas = ({
    cube,
    setCubeLoaded,
}: {
    cube: Cube;
    setCubeLoaded: Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <Canvas shadows camera={{ position: [150, 150, 150], fov: 1 }}>
            <color attach="background" args={["black"]} />
            <CubeEnvironment cube={cube} setCubeLoaded={setCubeLoaded} />
        </Canvas>
    );
};

export default CubeCanvas;
