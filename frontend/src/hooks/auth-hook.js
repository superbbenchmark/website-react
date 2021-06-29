import { useState, useCallback, useEffect } from "react";
import { useGoogleLogout } from "react-google-login";

let logoutTimer;

const clientId =
    "796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com";

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const { signOut } = useGoogleLogout({ clientId });

    const login = useCallback((token, expirationDate) => {
        setToken(token);
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
            "data",
            JSON.stringify({
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        signOut();
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("data");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout };
};
