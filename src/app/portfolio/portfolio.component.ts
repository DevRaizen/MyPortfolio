import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GeminiService } from '../gemini.service';
import Lenis from '@studio-freight/lenis';

interface TerminalLine{
  html: string;
  pause: number;
}
 
@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('terminalOutput') terminalOutput?: ElementRef<HTMLDivElement>;
  menuOpen = false;
  email = '';
  lenis!: Lenis;

   
   private terminalLines: TerminalLine[] = [
    { html: '<span class="text-purple-400">const</span> developer = {', pause: 150 },
    { html: '&nbsp;&nbsp;<span class="text-blue-300">name</span>: <span class="text-green-400">"Shawn Michael Bulos"</span>,', pause: 150 },
    { html: '&nbsp;&nbsp;<span class="text-blue-300">role</span>: <span class="text-green-400">"Full Stack Developer"</span>,', pause: 150 },
    { html: '&nbsp;&nbsp;<span class="text-blue-300">based</span>: <span class="text-green-400">"Cabanatuan, Nueva Ecija"</span>,', pause: 150 },
    { html: '&nbsp;&nbsp;<span class="text-blue-300">stack</span>: [<span class="text-green-400">"Angular"</span>, <span class="text-green-400">"React"</span>, <span class="text-green-400">"Java"</span>],', pause: 150 },
    { html: '&nbsp;&nbsp;<span class="text-blue-300">status</span>: <span class="text-green-400">"Open to work"</span>', pause: 150 },
    { html: '};', pause: 0 },
  ];

  ngOnInit(): void {
    this.email = 'shaw' + 'nbu' + 'los03' + '@gmail.com';
    this.initLenis();
  }
  ngAfterViewInit(): void {
   
    this.typeTerminal();

 
  }

  
  private typeTerminal(): void {
    const out = this.terminalOutput?.nativeElement;
    if (!out) return;
 
    let lineIndex = 0;
 
    const typeLine = () => {
      if (lineIndex >= this.terminalLines.length) {
        out.insertAdjacentHTML(
          'beforeend',
          '<span class="inline-block w-[7px] h-[1.1em] bg-accent-glow align-text-bottom ml-px animate-blink"></span>'
        );
        return;
      }
 
      const current = this.terminalLines[lineIndex];
      const div = document.createElement('div');
      out.appendChild(div);
 
      let charIndex = 0;
      const interval = setInterval(() => {
        charIndex++;
        const progress = Math.min(charIndex * 3, current.html.length);
        div.innerHTML = current.html.slice(0, progress);
        if (progress >= current.html.length) {
          clearInterval(interval);
          lineIndex++;
          setTimeout(typeLine, current.pause);
        }
      }, 12);
    };
 
    setTimeout(typeLine, 900);
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
