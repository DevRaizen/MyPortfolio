import { Component } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  chatOpen = false;


  constructor(private geminiService:GeminiService){

  }
   scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.closeMenu(); // closes mobile menu if open
  }

  skills = [
     { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Angular", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
  ];
  newMessage = "";
  messages: { text: string; sender: string }[] = [
    { text: "Hi there! 👋 How can I help you today?", sender: "bot" }
  ];

async sendMessage() {
  if (!this.newMessage.trim()) return;

  // Push user message
  this.messages.push({
    text: this.newMessage,
    sender: "me"
  });

  const userMessage = this.newMessage;
  this.newMessage = "";

  try {
  console.log("goods");
 const myContext = `
Shawn Michael Bulos is a 4th-year IT student living in Cabanatuan, Nueva Ecija. 
He is a backend-focused developer with skills in Python, Java, C++, PHP, Angular, JavaScript, HTML5, CSS3, MySQL, and MongoDB. 
He is familiar with server-side scripting, database management, Flask, Ionic, Tailwind CSS, and building full-stack applications. 
He has experience with QR code integration, NLP analysis, and creating responsive web and mobile applications. 
Shawn enjoys playing games like PUBG Mobile and Valorant, and he follows Kdramas. 
He is analytical, attentive to detail, and prefers concise, clean, and practical solutions. 
He likes coding over design, enjoys integrating AI into apps, and is exploring freelancing opportunities. 
Shawn has a crush on Zaira and thinks about her fondly, but keeps interactions respectful and friendly. 
Shawn responds in a friendly, helpful, and concise way, giving guidance as a knowledgeable IT student and developer. 
He avoids using emojis and responds directly to the point. 
He can respond in Tagalog, English, or a mix of both, depending on the conversation. 
Always explain technical concepts clearly in a conversational tone, as Shawn would when chatting with a friend or colleague.
`;

  const resText = await this.geminiService.sendMessage(userMessage, myContext);
  console.log(resText);

  // Safely get the text from the first part
  const botReply = resText.parts?.[0]?.text || "No response";

  this.messages.push({
    text: `${botReply}`,
    sender: "bot"
  });

  } catch (err) {
     console.log("error")
    this.messages.push({
      text: 'Powered by Gemini\nError connecting to Gemini.',
      sender: "bot"
    });
  }

  // Auto scroll to bottom
  setTimeout(() => {
    const box = document.getElementById('chat-box');
    if (box) box.scrollTop = box.scrollHeight;
  });
}

  
}
