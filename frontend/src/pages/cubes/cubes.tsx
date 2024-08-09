import { useEffect, useState } from "react";
import CubeCard from "./components/CubeCard";
import api from "../../http/base_api";
import { Cube } from "../../types/CubeTypes";
import { Pagination, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import useCubeStore from "../../store/CubeStore";
import SquareLoader from "react-spinners/SquareLoader";

const Cubes = () => {
    const [cubes, setCubes] = useState<null | Cube[]>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const cubeStore = useCubeStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");
    const [selected, setSelected] = useState<"most" | "last">("last");
    const handleSelectionChange = (newSelection: any) => {
        const selection = newSelection as "most" | "last";
        if (selection === "most") {
            fetchMostLiked(page, pageSize);
        } else if (selection === "last") {
            fetchRecentlyPublished(page, pageSize);
        }
        setSelected(newSelection);
    };

    const fetchMostLiked = async (page?: string | number | null, pageSize?: string | number | null) => {
        setLoading(true);
        const fetchedCubes = (await api.get(`/cube/most-liked?page=${page || 1}&pageSize=${pageSize || 9}`)).data;
        setCubes(fetchedCubes);
        setLoading(false);
    };

    const fetchRecentlyPublished = async (page?: string | number | null, pageSize?: string | number | null) => {
        setLoading(true);
        const fetchedCubes = (await api.get(`/cube/latest?page=${page || 1}&pageSize=${pageSize || 9}`)).data;
        setCubes(fetchedCubes);
        setLoading(false);
    };

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
        if (selected === "most") {
            fetchMostLiked(page);
        } else if (selected === "last") {
            fetchRecentlyPublished(page);
        }
    };

    useEffect(() => {
        if (selected === "most") {
            fetchMostLiked(page, pageSize);
        } else if (selected === "last") {
            fetchRecentlyPublished(page, pageSize);
        }
    }, []);
    return !loading ? (
        <div>
            <div className="flex gap-5 my-5 w-full">
                <Tabs
                    variant="underlined"
                    aria-label="Tabs variants"
                    selectedKey={selected}
                    onSelectionChange={handleSelectionChange}
                >
                    <Tab key="most" title="Most Liked" />
                    <Tab key="last" title="Recently published" />
                </Tabs>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
                {cubes && cubes?.map((_cube) => <CubeCard cube={_cube} key={_cube.id} />)}
            </div>
            <div
                style={{
                    width: "100%",

                    display: "flex",
                    justifyContent: "center",
                }}
                className="my-10"
            >
                <Skeleton isLoaded={cubeStore.cubeCount !== null}>
                    <Pagination
                        showControls
                        isCompact
                        total={cubeStore.cubeCount ? Math.ceil(cubeStore.cubeCount / (Number(pageSize) || 9)) : 0}
                        initialPage={Number(page) || 1}
                        onChange={handlePageChange}
                    />
                </Skeleton>
            </div>
        </div>
    ) : (
        <div className="w-full h-full flex justify-center items-center">
            <SquareLoader color="white" />
        </div>
    );
};

export default Cubes;
