import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request) {
  // 1. Run next-intl middleware to handle locales and directions
  const response = intlMiddleware(request);

  // 2. Refresh the Supabase auth session and get user info
  const { supabaseResponse, user } = await updateSession(request, response);

  const pathname = request.nextUrl.pathname;
  
  // Extract locale from path (e.g. /ar/dashboard -> ar)
  const pathParts = pathname.split('/');
  const locale = routing.locales.includes(pathParts[1]) ? pathParts[1] : routing.defaultLocale;

  // Auth pages (redirect if already logged in)
  const isAuthPage = pathname.match(/^\/(ar|en)\/(login|signup)(\/|$)/);

  // Default to deny: protect everything except public paths (landing pages, auth pages)
  const isPublicPath = isAuthPage || pathname === '/' || pathname === '/en' || pathname === '/ar';

  if (!isPublicPath && !user) {
    // Redirect to login preserving the active locale
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && user) {
    // Redirect already logged in user to dashboard
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  /* Root paths will now render the landing page instead of redirecting
  if (pathname === '/' || pathname === '/en' || pathname === '/ar') {
    return NextResponse.redirect(new URL(`/${locale}/clients`, request.url));
  }
  */

  return supabaseResponse;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};
