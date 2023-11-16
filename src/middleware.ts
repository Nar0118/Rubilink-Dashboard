import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = ['/login', '/forgot-password', '/reset-password', '/setup'];
const regularPaths = [
  '/dashboard',
  '/dashboard/projects',
  '/dashboard/user-management-system',
  '/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;
  if (token && authPaths.includes(pathname)) {
    request.nextUrl.pathname = '/dashboard';
    return NextResponse.redirect(request.nextUrl);
  }

  if (!token && regularPaths.includes(pathname)) {
    request.nextUrl.pathname = '/login';
    return NextResponse.redirect(request.nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...authPaths, ...regularPaths],
};
