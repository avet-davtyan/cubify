// let BASE_URL = import.meta.env.VITE_BACKEND_URL;
let BASE_URL = "https://13.60.52.242.nip.io";

if (!BASE_URL) {
    throw new Error("BASE_URL is required");
}

export { BASE_URL };
