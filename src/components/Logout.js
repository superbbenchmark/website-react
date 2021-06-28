import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useGoogleLogout } from "react-google-login";

const clientId =
    "796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com";

export default function Logout() {
    const auth = useContext(AuthContext);
    const { signOut } = useGoogleLogout({ clientId });
    useEffect(() => {
        signOut();
        auth.logout();
    });
    return <></>;
}
