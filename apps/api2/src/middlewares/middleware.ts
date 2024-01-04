import { config } from "dotenv";
import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
// Load environment variables
config();

interface AuthenticatedRequest extends Request {
    user?: { email: string };
  }

  export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];
    if (Array.isArray(token)) {
      token = token[0]; // Take the first element of the array
    }
    if (!token) {
      return res.status(401).json({ status: "error", error: "Token is missing" });
    }
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
      const email = decoded.email;
      console.log(token);
      req.user = { email }; // Attach user object to the request for further use
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ status: "error", error: "Invalid token" });
    }
  };
  
  
  
  
  
  
  
    
    
    
    
    
    
  