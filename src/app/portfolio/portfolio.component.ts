import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeminiService } from '../gemini.service';
import Lenis from '@studio-freight/lenis';


@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit, OnDestroy {
  menuOpen = false;
  email = '';
  lenis!: Lenis;

  ngOnInit(): void {
    this.email = 'shaw' + 'nbu' + 'los03' + '@gmail.com';
    this.initLenis();
  }

  ngOnDestroy(): void {
    this.lenis?.destroy();
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.lenis.scrollTo(element, { offset: -64 });
    }
    this.closeMenu();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  chatOpen = false;

  constructor(private geminiService: GeminiService) {}

  skills = [
    {
      name: 'Python',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Java',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'Angular',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    },
    {
      name: 'JavaScript',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'HTML5',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS3',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      name: 'MySQL',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
      name: 'Git',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      name: 'C++',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    },
    {
      name: 'PHP',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    },
    {
      name: 'MongoDB',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'React',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Vercel',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    },
    {
      name: 'TypeScript',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'Supabase',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    },
  ];
  newMessage = '';
  messages: { text: string; sender: string }[] = [
    { text: 'Hi there! 👋 How can I help you today?', sender: 'bot' },
  ];

  async sendMessage() {
    if (!this.newMessage.trim()) return;

    // Push user message
    this.messages.push({
      text: this.newMessage,
      sender: 'me',
    });

    const userMessage = this.newMessage;
    this.newMessage = '';

    try {
      console.log('goods');
      const myContext = `
 Talk exactly in Shawn’s natural way of speaking.

Communication Style:
- Straightforward, casual, and practical.
- Taglish with smooth transitions.
- Explains tech clearly but not too formal.
- Avoids long intros.
- Direct to the point, parang nagco-code review or nag-e-explain sa classmate.
- No emojis.
- No polite assistant phrases like “How can I help you today?” or “Let me assist you.”
- No AI acknowledgments like “Got it”, “Sure”, “Okay”, “Understood.”
- Don’t sound robotic or scripted.
- Don’t introduce yourself.

Behavior Rules:
- Treat the conversation like normal chat between classmates.
- Answer naturally and confidently, the way Shawn talks when explaining things.
- Never talk about Shawn in third person.
- Respond directly to the message without any intro acknowledgments.
- If the user asks "Who are you?" or "Sino ka?", respond directly with "Ako si shawn, anong maitutulong ko sayo?"

Additional Context:
- Backend-focused developer based in Cabanatuan, Nueva Ecija.
- Comfortable with Python, Java, C++, PHP, Angular, TypeScript/JavaScript, HTML5, CSS3, MySQL, MongoDB.
- Familiar with Flask, Ionic, Tailwind CSS, server-side scripting, database management, full-stack development.
- Experience with QR, NLP, responsive web/mobile apps.
- Gamer (PUBG Mobile, Valorant). Watches Kdramas.
- Prefers clean and practical solutions.
- Likes integrating AI into projects.
- Favorite color black
- Favorite Food Adobong Sitaw
`;

      const resText = await this.geminiService.sendMessage(userMessage);

      // Use it directly since service already returns a string
      const botReply = resText || 'No response';

      this.messages.push({
        text: botReply,
        sender: 'bot',
      });
    } catch (err) {
      console.log('error');
      this.messages.push({
        text: 'Powered by Gemini\nError connecting to Gemini.',
        sender: 'bot',
      });
    }

    // Auto scroll to bottom
    setTimeout(() => {
      const box = document.getElementById('chat-box');
      if (box) box.scrollTop = box.scrollHeight;
    });
  }
}
