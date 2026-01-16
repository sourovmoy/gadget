import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ['/add-item'];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to items page if accessing login with valid token
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/items', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-item/:path*', '/login'],
};
