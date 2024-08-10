import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Providers/Services/api.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { BasicApiService } from 'src/Providers/Basic/basic-api.service';
import { LocalApiService } from 'src/Providers/Local/local-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { CartApiService } from 'src/Providers/Cart/cart-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.page.html',
  styleUrls: ['./catering.page.scss'],
})
export class CateringPage implements OnInit {
  imgpath: any;
  postdata: any = {};
  allProducts: any;
  timelist: any = [];
  data: any = {};
  constructor(
  	public menuCtrl: MenuController,
    public apiService: ApiService,
    public basic: BasicApiService,
	public localApi: LocalApiService,
	public cart: CartApiService,
    public route: Router,
    public alertController: AlertController,
    public location: Location,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.imgpath = environment.imagepath;
    this.getallProducts();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getallProducts();
      event.target.complete();
    }, 2000);
  }


  getallProducts(){
    this.basic.presentLoading();
	  this.apiService.postdata('getcaterigndesc', this.postdata).subscribe((resp: any) => {
		this.allProducts = resp.data;
  		console.log(this.allProducts);
      setTimeout(()=>{
        this.basic.dismissloader();
      },1000)
	}, (err: any) => {
	return false;
	});
  }
    chkbuftavl() {
        this.basic.presentLoading();
        this.apiService.postdata('chkbuffetavalble', this.data).subscribe((resp: any) => {
            console.log('AVL', resp);
            if (resp.data.status) {
                this.basic.alert('Info:', 'We are close on ' + this.getdayfullname(resp.data.datename));
            } else {
                this.timelist = resp.data;
                // let timesdel = resp.data;
                // let theNewInputs = [];
                // for(let i=0; i < timesdel.length; i++){
                //   theNewInputs.push(
                //     {
                //       name: 'deltimmy',
                //       type: 'radio',
                //       value: timesdel[i].value,
                //       checked: false,
                //       label: timesdel[i].value
                //     }
                //   );
                // }
            }
            setTimeout(() => {
                this.basic.dismissloader();
            }, 1000);
        }, () => {
            return false;
        });
    }

  submitevnt(){
  	if(!this.data.fullname){
  		this.basic.alert('Info:', 'Enter your full name');
  	} else if(!this.data.mobile){
  		this.basic.alert('Info:', 'Enter your contact number');
  	} else if(!this.data.date){
  		this.basic.alert('Info:', 'Enter event date');
  	} else {
		this.basic.presentLoading();
		this.apiService.postdata('savecateringenq', this.data).subscribe((resp: any) => {
			
	  		console.log(resp);
	      	setTimeout(()=>{
	        	this.basic.dismissloader();
	        	this.basic.alert('Thanks!', this.allProducts.thnk_msg);
	        	this.data = {};
	      	},1000)
		}, (err: any) => {
			return false;
		});
  	}
  }


    getdayfullname(name) {
        const dayname = {
            Mon: 'Monday',
            Tue: 'Tuesday',
            Wed: 'Wednesday',
            Thu: 'Thursday',
            Fri: 'Friday',
            Sat: 'Saturday',
            Sun: 'Sunday',
        };
        return dayname[name];

    }

}
