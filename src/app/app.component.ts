import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService,private router: Router
    ,private userService:UserService, private shoppingCartService:ShoppingCartService){
    auth.user$.subscribe(user => {  
      if(!user)    return;
      
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

      if(!returnUrl)  return;
      
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
      
    })
  } 
}
