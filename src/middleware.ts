import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: [
    "/api/logistics-events",
    "/api/logistics-objects",
    "/api/authenticate",
    "/api/search",
  ],
  publicRoutes: ["/globe"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
