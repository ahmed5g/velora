import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwsomeIcons } from './shared/font-awsome-icons';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastService } from './layout/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ButtonModule,
    NavbarComponent,
    FooterComponent,
    Toast,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  faIconLibrary: FaIconLibrary = inject(FaIconLibrary);
  toastService = inject(ToastService);
  messageService = inject(MessageService);  // ✅ Add this line
  isListingView = true;

  ngOnInit(): void {
    this.initFontAwesome();
    this.listenToastService();
  }

  private initFontAwesome(): void {
    this.faIconLibrary.addIcons(...fontAwsomeIcons);
  }

  private listenToastService(): void {
    this.toastService.send$.subscribe({
      next: (newMessage) => {
        if (newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      },
      error: (err) => {
        console.error('Toast subscription error:', err);
      }
    });
  }

}
