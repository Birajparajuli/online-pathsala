export { auth as middleware } from "@/auth";
// export default authMiddleware({
//   publicRoutes: ["/api/webhook", "/api/uploadthing" ]
// });
 
export const config = {
  matcher: [ "/((?!api/webhook|api/uploadthing|auth/signin|_next/static|_next/image|favicon.ico).*)",],
  
};
 

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  
// };
 


