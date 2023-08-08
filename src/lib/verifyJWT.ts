import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function verifyJWT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("no token found");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
