import { LoginDataInput } from "@/types/input";
import { getCommonHeaders } from "../commonfunc";
import { strings } from "../strings";

export async function login(loginData: LoginDataInput): Promise<string> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/akun/masuk`, {
            method: "post",
            credentials: "include",
            headers: getCommonHeaders(),
            body: JSON.stringify(loginData)
        })
        const body: { detail: string } = await res.json();
        if (res.status !== 200) {
            if (body.detail.includes("not found")) {
                return strings.auth.ACC_404_ERR;
            } else if (body.detail.includes("credentials")) {
                return strings.auth.PASS_ERR;
            }
        }
    } catch (error) {
        console.log(`An internal server error occured, please contact maintainer: ${String(error)}`);
        return `${strings.error.INT_500_ERR} ${String(error)}`;
    }
    return ""
}