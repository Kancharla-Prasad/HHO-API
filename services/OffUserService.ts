import { NotFoundError, ValidationError } from "../exceptions/CustomError";
import offUserModel from "../models/off_users";
import OffUserRepo from "../repository/OffUserRepo";
import { OffUserDocument } from "../types/offUserType";
import jwt, { Jwt } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface IPayload {
    user: {
      id: string;
      name: string;
      role: string;
    };
}

class OffUserService{
    async login(userData: Partial<OffUserDocument>):Promise<String>{
            const { email, password } = userData;
        
            
            const userExist = await offUserModel.findOne({ email }) as OffUserDocument;
            console.log(userExist);
            if (!userExist) {
                throw new NotFoundError("User not found, Enter valid credentials");
            }
        
            if (password !== userExist.password) {
                throw new ValidationError("Invalid Credentials");
            }
            const payload: IPayload = {
                user: {
                  id: String(userExist._id),
                  name: userExist.name,
                  role: userExist.role,
                },
              };

              console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
              if (!JWT_SECRET_KEY) {
                throw new Error("JWT_SECRET_KEY is not defined in environment variables");
              }

              // Generate JWT token synchronously
            const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "100d" });
            return token;
    }

    async getUserData(id: string): Promise<OffUserDocument>{
      try{
          console.log(id);
          return await OffUserRepo.get(id);
      }catch(error){
        console.error("Getting data error :", error);
        throw error;  // Pass the error to the controller to handle
      }
    }

}

export default new OffUserService();