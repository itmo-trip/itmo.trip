import "jwt-decode";
import {jwtDecode} from "jwt-decode";

export default class AuthUtils {
    static isTokenExpired(token: string) {
        try {
            let decoded = jwtDecode(token);
            return decoded.exp! < Date.now() / 1000;
        } catch (err) {
            return true;
        }
    }

    static getIdToken = () =>
        localStorage.getItem("idToken");

    static setIdToken = (idToken: string) =>
        localStorage.setItem("idToken", idToken);

    static clearIdToken = () =>
        localStorage.removeItem("idToken");


    static getRefreshToken = () =>
        localStorage.getItem("refreshToken");

    static setRefreshToken = (refreshToken: string) =>
        localStorage.setItem("refreshToken", refreshToken);

    static clearRefreshToken = () =>
        localStorage.removeItem("refreshToken");
}
