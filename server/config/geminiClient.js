import {GenerativeModel} from "@google-cloud/vertexai";
import dotenv from "dotenv";
dotenv.config();

export const gemini = new GenerativeModel({
    modelName: "gemini-2.5-pro",
})

export const suggestTitle = async (req , res) =>{
    const {content}  = req.body;
    try {
        const [response] = await gemini.generateText({
            prompt: `Suggest a catchy blog title for:\n\n${content}`,
            temperature: 0.7,
            maxOutputTokens: 20
        });
        res.json({ title: response.candidates[0].content });
        return res.status(200).json({title : response.text});
        
    } catch (error) {
        console.error("Error generating title:", error);
        return res.status(500).json({ message: "Error generating title" });
    
    }
}