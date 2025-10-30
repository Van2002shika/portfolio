import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

interface Project {
  title: string;
  shortDesc: string;
  details: string[];
  category: string;
  image: string;
}
interface FeaturedProject {
  title: string;
  image: string;
  description: string;
  link: string;
  delay?: string;
  colSize: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'portfolio';
  fullText = "Hello, I'm Vanshika Parihar 👋";
  ft = 'Software development Engineer II';
  displayedText = '';
  displayedText2 = '';
  currentYear = new Date().getFullYear();

  private index = 0;
  private index2 = 0;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.typeWriter();
  }
  ngAfterViewInit(): void {
        const triggerTabList = document.querySelectorAll('#myTab a');
    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new bootstrap.Tab(triggerEl);
      triggerEl.addEventListener('click', (event) => {
        event.preventDefault();
        tabTrigger.show();
      });
    });
    this.revealOnScroll(); // Trigger immediately on load
  }
  typeWriter() {
    if (this.index < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeWriter(), 100); // typing speed
    } else {
      // Wait a bit, then start typing the second line
      setTimeout(() => this.typeWriterSecond(), 800);
    }
  }

  typeWriterSecond() {
    if (this.index2 < this.ft.length) {
      this.displayedText2 += this.ft.charAt(this.index2);
      this.index2++;
      setTimeout(() => this.typeWriterSecond(), 100);
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.revealOnScroll();
  }

  private revealOnScroll(): void {
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('appear');
      }
    });
  }

  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'UbiCRM — Customer Relationship Management',
      category: 'CRM',
      image: 'assets/images/crm-project.jpg',
      shortDesc:
        'Developed a full-scale CRM platform for sales automation, customer tracking, and calendar scheduling integration.',
      details: [
        'Designed and built modular CRM architecture covering Leads, Deals, Activities, and Reports.',
        'Developed full-stack CRUD functionality with Angular 19 (frontend) and AdonisJS 6 (backend).',
        'Integrated Highcharts.js dashboards for real-time analytics and sales tracking.',
        'Implemented meeting & calendar scheduling with cron-based email reminders.',
        'Developed secure multi-organization SaaS architecture ensuring complete data isolation.',
        'Enhanced lead management with scoring, assignment rules, and deal forecasting tools.',
        'Built dynamic web forms for capturing leads directly from client websites.',
        'Implemented detailed reports for revenue, activity, and conversion performance.',
      ],
    },
    {
      title: 'UbiHRM — Human Resource Management System',
      category: 'HRMS',
      image: 'assets/images/hrms-project.jpg',
      shortDesc:
        'Engineered a modular HRMS platform for employee, leave, salary, and organization management with optimized backend APIs.',
      details: [
        'Created dynamic modules for leave management and employee tracking.',
        'Built organization hierarchy and department-role management.',
        'Integrated employee salary computation and attendance records.',
        'Optimized PHP backend APIs for faster payroll operations.',
        'Enhanced HR analytics dashboard with summarized workforce insights.',
      ],
    },
    {
      title: 'UbiRecruit — Recruitment Management System',
      category: 'Recruitment',
      image: 'assets/images/recruitment-project.jpg',
      shortDesc:
        'Built a recruitment automation system to streamline hiring, onboarding, and interviews efficiently.',
      details: [
        'Developed onboarding and offboarding workflows for HR teams.',
        'Integrated meeting and interview scheduling modules.',
        'Created candidate tracking with smart filters and resume parsing.',
        'Enabled status-driven recruitment pipelines for faster hiring.',
        'Linked recruitment data with HRMS for seamless employee entry.',
      ],
    },
    {
      title: 'Enterprise PHP Solutions — API & Integration Work',
      category: 'PHP',
      image: 'assets/images/php-backend.jpg',
      shortDesc:
        'Worked on scalable PHP API development, backend optimization, and database integration for enterprise systems.',
      details: [
        'Built secure RESTful APIs for CRM and HRMS platforms.',
        'Optimized SQL joins and transactions for large-scale datasets.',
        'Implemented middleware authentication and role-based access.',
        'Handled complex data migrations and reporting pipelines.',
        'Ensured cross-system integration with external CRON-based automations.',
      ],
    },
  ];
  featuredProjects: FeaturedProject[] = [
    {
      title: 'React Chat Application',
      image: 'assets/images/chat-app.jpg',
      description:
        'A real-time chat platform built using React and Firebase for seamless instant messaging, authentication, and live user presence tracking.',
      link: 'https://github.com/vanshikaparihar/react-chat-app',
      delay: '',
      colSize: 'col-md-4',
    },
    {
      title: 'Facebook Clone',
      image: 'assets/images/facebook-clone.jpg',
      description:
        'A social media web app created with Angular that mimics Facebook’s interface — featuring posts, likes, comments, and profile management.',
      link: 'https://github.com/vanshikaparihar/facebook-clone-angular',
      delay: 'delay-1',
      colSize: 'col-md-8',
    },
    {
      title: 'Instagram Clone',
      image: 'assets/images/instagram-clone.jpg',
      description:
        'Built using Angular and Firebase — supports photo uploads, stories, likes, and real-time feed updates with user authentication.',
      link: 'https://github.com/vanshikaparihar/instagram-clone-angular',
      delay: 'delay-2',
      colSize: 'col-md-9',
    },
    {
      title: 'Cinepolis Clone',
      image: 'assets/images/cinepolis-clone.jpg',
      description:
        'A cinema booking app developed with React. Integrated real-time movie schedules, seat booking, and payment simulation APIs.',
      link: 'https://github.com/vanshikaparihar/cinepolis-clone-react',
      delay: 'delay-3',
      colSize: 'col-md-3',
    },
  ];

  openModal(project: Project) {
    this.selectedProject = project;
    const modal = document.getElementById('projectModal');
    if (modal) {
      const modalElement = new bootstrap.Modal(modal);
      modalElement.show();
    }
  }

  closeModal() {
    this.selectedProject = null;
  }
}
