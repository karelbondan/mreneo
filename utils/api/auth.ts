import { Cookies } from "next-client-cookies"
import { strings } from "../strings"
import { getCommonHeaders } from "../commonfunc"

export async function csrf(reqHeader: { [key: string]: string }): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/csrf`, {
        method: "GET",
        credentials: "include",
        headers: reqHeader
    })
    const body: { detail: string } = await res.json()
    if (res.status === 404 || res.status === 403) {
        return strings.auth.SESS_ERR;
    } else if (res.status === 401) {
        if (body.detail.includes("session token")) {
            return strings.auth.TOK_ERR;
        } else if (body.detail.includes("requester")) {
            return strings.auth.USR_ERR;
        } else {
            return strings.auth.SESS_INV_ERR;
        }
    }
    try {
    } catch (error) {
        return `${strings.error.INT_500_ERR}: ${String(error)}`;
    }
    return "";
}

export async function refreshAuth(reqHeader: { [key: string]: string }): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/refresh`, {
        method: "GET",
        credentials: "include",
        headers: reqHeader
    })
    const body: { detail: string } = await res.json()
    if (res.status === 404 || res.status === 403) {
        return strings.auth.SESS_ERR;
    } else if (res.status === 401) {
        if (body.detail.includes("session token")) {
            return strings.auth.TOK_ERR;
        } else if (body.detail.includes("requester")) {
            return strings.auth.USR_ERR;
        } else if (body.detail.includes("x-csrf")) {
            return strings.auth.CSRF_ERR; // this should never happen
        }
    }
    try {
    } catch (error) {
        return `${strings.error.INT_500_ERR}: ${String(error)}`;
    }
    return "";
}

export async function checkAuth(cookies: Cookies): Promise<string> {
    const sessionId = process.env.NEXT_PUBLIC_API_SESSIONID;
    const xcsrfHeader = process.env.NEXT_PUBLIC_API_XCSRF_HEADER;
    const xcsrf = process.env.NEXT_PUBLIC_API_XCSRF;

    const sessIdVal = cookies.get(sessionId!);
    const xcsrfVal = cookies.get(xcsrf!);

    console.log(sessIdVal, xcsrfVal);
    if (!sessIdVal || !xcsrfVal) {
        return strings.auth.SESS_ERR;
    }

    const xcsrfReq = getCommonHeaders();
    xcsrfReq[sessionId!] = cookies.get(sessionId!)!;

    // should redirect user to login in caller if error encountered
    const xcsrfRefr = await csrf(xcsrfReq);
    if (xcsrfRefr !== "") {
        return xcsrfRefr;
    }

    // was previously above and throwing out invalid csrf token.
    // order matters!
    const authReq = { ...xcsrfReq };
    authReq[xcsrfHeader!] = cookies.get(xcsrf!)!

    const authRefr = await refreshAuth(authReq);
    if (authRefr !== "") {
        return authRefr;
    }

    console.log(xcsrfRefr, authRefr);

    return "";
}