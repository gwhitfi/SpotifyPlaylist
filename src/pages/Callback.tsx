import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../api/spotify/spotifyAuth";

export function Callback() {
    const navigate = useNavigate();
    const exchangedRef = useRef(false);

    useEffect(() => {
        if (exchangedRef.current) return;
        exchangedRef.current = true;
        const exchangeCode = async () => {
            const success = await getToken();
            if (success) navigate("/");
        };
        exchangeCode();
    }, [navigate]);
    return <p>Logging In...</p>;
}
