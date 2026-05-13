import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './portfolio.component';
import { GeminiService } from '../gemini.service';

const mockGeminiService = {
  sendMessage: jasmine
    .createSpy('sendMessage')
    .and.returnValue(Promise.resolve('Hello from Gemini!')),
};

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioComponent],
      imports: [FormsModule],
      providers: [{ provide: GeminiService, useValue: mockGeminiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Init ────────────────────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set email correctly on init', () => {
    expect(component.email).toBe('shawnbulos03@gmail.com');
  });

  it('should start with menuOpen as false', () => {
    expect(component.menuOpen).toBeFalse();
  });

  it('should start with chatOpen as false', () => {
    expect(component.chatOpen).toBeFalse();
  });

  it('should have an initial bot greeting message', () => {
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].sender).toBe('bot');
    expect(component.messages[0].text).toBe(
      'Hi there! 👋 How can I help you today?',
    );
  });

  it('should have 15 skills defined', () => {
    expect(component.skills.length).toBe(15);
  });

  // ─── Menu ────────────────────────────────────────────────────────────────

  it('should toggle menuOpen when toggleMenu() is called', () => {
    expect(component.menuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should close menu when closeMenu() is called', () => {
    component.menuOpen = true;
    component.closeMenu();
    expect(component.menuOpen).toBeFalse();
  });

  // ─── scrollTo ────────────────────────────────────────────────────────────

  it('should close menu when scrollTo() is called', () => {
    component.menuOpen = true;
    spyOn(document, 'getElementById').and.returnValue(null);
    component.scrollTo('home');
    expect(component.menuOpen).toBeFalse();
  });

  it('should call lenis.scrollTo when element is found', () => {
    const fakeEl = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(fakeEl);
    const lenisSpy = jasmine.createSpyObj('lenis', ['scrollTo']);
    (component as any).lenis = lenisSpy;
    component.scrollTo('skills');
    expect(lenisSpy.scrollTo).toHaveBeenCalledWith(fakeEl, { offset: -64 });
  });

  // ─── sendMessage ─────────────────────────────────────────────────────────

  it('should not send if newMessage is empty', fakeAsync(() => {
    component.newMessage = '   ';
    component.sendMessage();
    tick();
    expect(component.messages.length).toBe(1);
  }));

  it('should add user message and bot reply on sendMessage()', fakeAsync(() => {
    mockGeminiService.sendMessage.and.returnValue(
      Promise.resolve('Nice to meet you!'),
    );
    component.newMessage = 'Hello';
    component.sendMessage();
    tick();
    expect(component.messages.length).toBe(3);
    expect(component.messages[1]).toEqual({ text: 'Hello', sender: 'me' });
    expect(component.messages[2]).toEqual({
      text: 'Nice to meet you!',
      sender: 'bot',
    });
  }));

  it('should clear newMessage after sending', fakeAsync(() => {
    component.newMessage = 'Test message';
    component.sendMessage();
    tick();
    expect(component.newMessage).toBe('');
  }));

  it('should show error message when gemini service throws', fakeAsync(() => {
    mockGeminiService.sendMessage.and.returnValue(
      Promise.reject('Network error'),
    );
    component.newMessage = 'Hey';
    component.sendMessage();
    tick();
    const lastMsg = component.messages[component.messages.length - 1];
    expect(lastMsg.sender).toBe('bot');
    expect(lastMsg.text).toContain('Error connecting to Gemini');
  }));

  it('should handle null/empty response from gemini gracefully', fakeAsync(() => {
    mockGeminiService.sendMessage.and.returnValue(Promise.resolve(null));
    component.newMessage = 'Hi';
    component.sendMessage();
    tick();
    const lastMsg = component.messages[component.messages.length - 1];
    expect(lastMsg.text).toBe('No response');
  }));

  // ─── Skills ──────────────────────────────────────────────────────────────

  it('should have Python in the skills list', () => {
    const python = component.skills.find((s) => s.name === 'Python');
    expect(python).toBeTruthy();
  });

  it('each skill should have a name and img', () => {
    component.skills.forEach((skill) => {
      expect(skill.name).toBeTruthy();
      expect(skill.img).toBeTruthy();
    });
  });

  // ─── Lenis cleanup ───────────────────────────────────────────────────────

  it('should destroy lenis on ngOnDestroy', () => {
    const lenisSpy = jasmine.createSpyObj('lenis', ['destroy']);
    (component as any).lenis = lenisSpy;
    component.ngOnDestroy();
    expect(lenisSpy.destroy).toHaveBeenCalled();
  });
});
