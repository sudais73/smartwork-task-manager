import { NextResponse, NextRequest } from 'next/server'
import { auth } from "./lib/auth"
 const protectedRoutes = ['/dashboard']
 const publicRoutes = ['/login']

export async  function middleware(request: NextRequest) {
const session = await auth()
const {pathname} = request.nextUrl
const isProtected = protectedRoutes.some((route)=>pathname.startsWith(route))
const isPublic = publicRoutes.some((route)=>pathname.startsWith(route))

if(isProtected && !session){
  return NextResponse.redirect(new URL('/login', request.url))

}
if(isPublic && session){
  return NextResponse.redirect(new URL('/dashboard', request.url))

}


  return NextResponse.next()
}
 
export const config = {
  matcher: ['/login', '/dashboard'],
}
