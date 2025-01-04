import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/manage']; // Các đường dẫn yêu cầu đăng nhập
const unAuthPaths = ['/login'];  // Các đường dẫn không yêu cầu đăng nhập

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = Boolean(request.cookies.get('accessToken')?.value);

  // Nếu truy cập vào các privatePaths nhưng chưa đăng nhập, chuyển hướng đến /login
  if (privatePaths.some(path => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã đăng nhập nhưng truy cập vào các unAuthPaths (vd: /login), chuyển về trang chủ
  if (unAuthPaths.some(path => pathname.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu hợp lệ, tiếp tục xử lý request
  return NextResponse.next();
}

// Cấu hình matcher
export const config = {
  matcher: ['/manage/:path*', '/login'],
};
