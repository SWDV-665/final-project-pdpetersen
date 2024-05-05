import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {



  constructor(public alertCtrl: AlertController, public dataService: JobsProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }


  showPrompt(job?, index?) {
    const prompt = this.alertCtrl.create({
      title: job ? 'Edit Open Job' : 'Add job',
      message: job ? "Edit job..." : "Enter job...",
      inputs: [
        {
          name: 'job_title',
          placeholder: 'Job Title',
          value: job ? job.job_title : null,
        },
        {
          name: 'job_location',
          placeholder: 'Location',
          value: job ? job.job_location : null
        },
        {
          name: 'job_department',
          placeholder: 'Department',
          value: job ? job.job_department : null
        },
        {
          name: 'job_shift',
          placeholder: 'Shift',
          value: job ? job.job_shift : null
        },
        {
          name: 'job_class',
          placeholder: 'Class',
          value: job ? job.job_class : null
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          handler: job => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: job => {
            console.log('Saved clicked', job);
            if (index !== undefined) {
              this.dataService.editJob(job, index);
            }
            else {
              this.dataService.addJob(job);
            }

          }
        }
      ]
    });
    prompt.present();
  }

}
