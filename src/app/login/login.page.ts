import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public router: Router) { 
    this.formularioLogin = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async guardar(){

    var usuario = {
      user: "Ale",
      password: "1234"
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  async login(){

    this.guardar();

    var f = this.formularioLogin.value;
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.user == f.user && usuario.password == f.password)
    {
      console.log("user ok");
      this.router.navigate(['/home']);
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'El usuario o contraseña no son correctos',
        buttons: ['Aceptar']
      });

      await alert.present()
    }
  }

}
