import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  // Vercel backend endpoint
private apiUrl = 'https://api-b2xpdvrqc-devraizens-projects.vercel.app/api/data';

  constructor(private http: HttpClient) {}

  async sendMessage(prompt: string): Promise<any> {
    try {
      // Send the prompt + context to your backend
      const payload = { prompt};

      // Use firstValueFrom to convert Observable to Promise
      const response: any = await firstValueFrom(this.http.post(this.apiUrl, payload));

      // Backend should return the AI response
      return response.result || 'No response from backend';
    } catch (err) {
      console.error('Backend API Error:', err);
      return 'Error connecting to backend';
    }
  }
}
