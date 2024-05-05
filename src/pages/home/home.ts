import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Subscription } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Open Jobs";
  jobs =[];
  errorMessage: string;
  dataChangedSubscription: Subscription;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: JobsProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
    this.dataChangedSubscription = dataService.dataChanged$.subscribe((dataChanged: boolean) => {

        this.loadJobs();

    });
  }

  ionViewDidLoad() {
    this.loadJobs()
  }

  ionViewDidLeave() {
    if(this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
    }
  }

  loadJobs() {
    this.dataService.getJobs()
      .subscribe(
        jobs => this.jobs = jobs,
        error => this.errorMessage = <any>error,
      )
  }

  removeJob(job, index) {
    console.log("Removing Open Job - ", job, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Open Job - ' + job.job_title + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeJob(index);  
  }

  shareJob(job, index) {
    console.log("Sharing Open Job - ", job, index);

    let message = "Open Job - Job Title: " + job.job_title + " Location: " + job.job_location+ " Department: " + job.job_department+ " Shift: " + job.job_shift+ " Class: " + job.job_class;
    let subject = "Shared via Jobs Manager app";

    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully");
    }).catch((error) => {
      console.log("Error while sharing ", error);
    });
  }

  editJob(job, index) {
    console.log("Edit Open Job - ", job, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Open Job - ' + job.job_title + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(job, index);
  }  

  addJob() {
    console.log("Adding Open Job");
    this.inputDialogService.showPrompt();
  }



}