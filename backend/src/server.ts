import express,  {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) =>{
    res.send("Audit & Compliance SaaS Backend Running with TypeScript!");
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})