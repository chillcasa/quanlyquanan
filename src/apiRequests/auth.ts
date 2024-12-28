import http from "@/lib/http";
import { LoginBody, LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    login: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),
}

export default authApiRequest