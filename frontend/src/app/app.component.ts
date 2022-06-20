import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from './shared/services/recaptcha.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestirediel';

  public robot: boolean = false;

  constructor(   private recaptchaV3Service: ReCaptchaV3Service,   public captchaSerice: RecaptchaService
 
    ) {
      this.robot = true;
      this.recaptchaV3Service.execute('')
        .subscribe((token) => {
          const auxiliar = this.captchaSerice.getToken(token)
          if (  auxiliar.includes('true') ) {
            this.robot = false;
          }
        });
    }
}
