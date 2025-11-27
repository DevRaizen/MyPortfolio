import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../environments/environment';
import { GoogleGenAI } from '@google/genai';


@Injectable({
  providedIn: 'root'
})
export class GeminiService {

   private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  }

async sendMessage(prompt: string, myContext: string): Promise<any> {
  try {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt + myContext
    });

    // Safely get the first candidate content or fallback
    return response.candidates?.[0]?.content || 'No response from Gemini';
  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'Error connecting to Gemini';
  }
}


}
