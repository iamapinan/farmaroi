import "next-auth";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "STAFF";
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "ADMIN" | "STAFF";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "STAFF";
  }
}

