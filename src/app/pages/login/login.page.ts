import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// forms
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

//auth
import { AuthService } from '../../core/auth.service';

// firestore
// import { Firestore } from '@angular/fire/firestore';
// import { addDoc, collection } from 'firebase/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';

// import { firebase } from 'firebase/app';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonCheckbox,
} from '@ionic/angular/standalone';

import { Observable } from 'rxjs';
export interface Item {
  name: string;
}
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from '@firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonText,
    IonLabel,

    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonGrid,

    IonCol,
    IonRow,

    IonButton,

    IonContent,
    IonHeader,
    IonSelect,
    IonSelectOption,
    IonTitle,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  // @ViewChild('createUserForm') createUserForm: any;
  // firestore: Firestore = inject(Firestore);

  content: any;

  // private itemsCollection: AngularFirestoreCollection<Item>;
  // items: Observable<Item[]>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    this.createLoginForm();
    this.createRegisterForm();

    // console.log(afs.collection('user'))
    // this.content = this.afa.authState
    //   this.itemsCollection = afs.collection<Item>('items');
    // this.items = this.itemsCollection.valueChanges();
    // console.log(this.itemsCollection)
    // console.log(this.items)
  }

  ngOnInit() {
    return 0;
    // const firebaseConfig = { // (2)
    //   apiKey: "AIzaSyCvIyotDj4Z49qUnlGKZEdH4ZLkTFg8XHQ",
    //   authDomain: "enigma-ef35a.firebaseapp.com",
    //   databaseURL: "https://enigma-ef35a-default-rtdb.firebaseio.com",
    //   projectId: "enigma-ef35a",
    //   storageBucket: "enigma-ef35a.appspot.com",
    //   messagingSenderId: "906797692956",
    //   appId: "1:906797692956:web:110b1ad7e62fd0065f07d9",
    //   measurementId: "G-W0NLQPYJRM"
    // };
    // firebase.initializeApp(firebaseConfig);
  }

  /////////////////////////////
  // switching bettwing login and register
  show_login() {
    const formLogin = document.getElementById('form_login');
    const formRegister = document.getElementById('form_register');
    const tabLogin = document.getElementById('labelLogin');
    const tabRegister = document.getElementById('labelRegister');

    if (formLogin!.style.display == 'none') {
      formRegister!.style.display = 'none';
      formLogin!.style.display = 'block';
      tabLogin!.classList.add('selected');
      tabRegister!.classList.remove('selected');
    }
  }

  show_register() {
    const formLogin = document.getElementById('form_login');
    const formRegister = document.getElementById('form_register');
    const tabLogin = document.getElementById('labelLogin');
    const tabRegister = document.getElementById('labelRegister');

    if (formRegister !== null) {
      formLogin!.style.display = 'none';
      formRegister.style.display = 'block';
      tabLogin!.classList.remove('selected');
      tabRegister!.classList.add('selected');
    }
  }

  ///////////////////////////////
  // forms construction

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      location: ['', Validators.required],
      firstName: ['', Validators.required, Validators.maxLength(100)],
      lastName: ['', Validators.required, Validators.maxLength(100)],
      registerEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      registerPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],
      zipcode: ['', Validators.required, Validators.maxLength(5)],
    });
  }

  ////////////////////////////
  //reset all values
  resetForm(): void {
    this.loginForm.reset({
      email: '',
      password: '',
    });
    this.registerForm.reset({
      location: '',
      firstName: '',
      lastName: '',
      registerEmail: '',
      registerPassword: '',
      zipcode: '',
    });
  }

  ///////////////////////////
  // save and store data
  // saveData(): void {
  //   const fsCollection = collection(this.firestore, 'user');

  //   addDoc(fsCollection, {
  //     location: this.registerForm.value.location,
  //     firstName: this.registerForm.value.firstName,
  //     lastName: this.registerForm.value.lastName,
  //     email: this.registerForm.value.registerEmail,
  //     password: this.registerForm.value.registerPassword,
  //     zipcode: this.registerForm.value.zipcode,
  //   });
  // }

  ///////////////////////
  // login using other app

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then((res) => {
      this.resetForm();
      this.router.navigate(['/user']);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then((res) => {
      this.resetForm();
      this.router.navigate(['/user']);
    });
  }

  //////////////////////
  //get values from form controls

  get loginForms() {
    return this.loginForm.controls;
  }

  get registerForms() {
    return this.registerForm.controls;
  }

  //   get loginForms() {
  //   return this.loginForm.get('aliases') as FormArray;
  // }

  ////////////////////////////////////
  // login authentication
  tryLogin() {
    this.authService
      .doLogin(
        this.loginForms['email'].value,
        this.loginForms['password'].value
      )
      // .then(
      //   (res) => {
      //     this.resetForm();
      //     this.router.navigate(['/user']);
      //   },
      //   (err) => {
      //     alert(err.message);
      //   }
      // );
    console.log(
      this.loginForms['email'].value,
      this.loginForms['password'].value
    );
  }

  ////////////////////////////////////
  // register authentication

  tryRegister() {
    this.authService
      .doRegister(
        this.registerForms['firstName'].value,
        this.registerForms['lastName'].value,
        this.registerForms['email'].value,
        this.registerForms['password'].value,
        this.registerForms['zipcode'].value
      )
      .then(
        (res) => {
          this.resetForm();
          this.authService.doLogOut();
        },
        (err) => {
          alert(err.message);
        }
      );
    if (this.registerForm.value.registerPassword)
      // this.saveData();
      // this.resetForm();
      console.log(this.registerForm);
  }
}
