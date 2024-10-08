export interface CubeImageUrls {
    side1?: string;
    side2?: string;
    side3?: string;
    side4?: string;
    side5?: string;
    side6?: string;
}

export interface Cube {
    id: number;
    ownerId: string;
    name: string;
    pending?: boolean;
    description?: string;
    backgroundColor?: string;
    createdAt: string;
    side1: string;
    side3: string;
    side4: string;
    side2: string;
    side5: string;
    side6: string;
}

export type ImageKey = "side1" | "side2" | "side3" | "side4" | "side5" | "side6";
