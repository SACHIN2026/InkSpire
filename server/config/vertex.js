import {PredictionServiceClient} from "@google-cloud/aiplatform";
import dotenv from "dotenv";
dotenv.config();

const aiClient = new PredictionServiceClient();

export default aiClient;
