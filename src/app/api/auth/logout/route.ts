import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value ?? '';
    const refreshToken = cookieStore.get('refreshToken')?.value ?? '';

    // Xóa cookie
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    // Nếu không có cả accessToken và refreshToken, trả về lỗi
    if (!accessToken && !refreshToken) {
        return new Response(
            JSON.stringify({ message: "Không nhận được accessToken và refreshToken" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Gọi API đăng xuất
        const result = await authApiRequest.sLogout({ accessToken, refreshToken });

        return new Response(
            JSON.stringify(result.payload),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Lỗi khi gọi API sLogout:', error);

        return new Response(
            JSON.stringify({ message: 'Lỗi khi gọi API tới server backend' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
