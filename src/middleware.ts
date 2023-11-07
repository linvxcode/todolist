import {  NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { login } from "./common/libs/firebase/service";
import withAuth from './middlewares/withAuth'

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res
}


// export const config = {
//   matcher: "/dashboard:path*",
// }

export default withAuth(mainMiddleware, ['/dashboard']);