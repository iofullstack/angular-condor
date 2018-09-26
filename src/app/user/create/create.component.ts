import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
/* interface */
import { City } from './city.interface';
import { Gender } from './gender.interface';

@Component({
    selector   : 'create',
    templateUrl: './create.component.html',
    styleUrls  : ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy
{
    form: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;
    // Dates
    cities: City[] = [
      {value: 'CH', viewValue: 'Chuquisaca'},
      {value: 'PT', viewValue: 'Potosí'},
      {value: 'OR', viewValue: 'Oruro'},
      {value: 'LP', viewValue: 'La Paz'},
      {value: 'SC', viewValue: 'Santa Cruz'},
      {value: 'CB', viewValue: 'Cochabamba'},
      {value: 'BN', viewValue: 'Beni'},
      {value: 'PA', viewValue: 'Pando'},
      {value: 'TJ', viewValue: 'Tarija'}
    ];
    genders: Gender[] = [
      {value: 'Masculino', viewValue: 'Masculino'},
      {value: 'Femenino', viewValue: 'Femenino'},
      {value: 'Otro', viewValue: 'Otro'}
    ];
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        // Vertical Stepper form stepper
        this.verticalStepperStep1 = this._formBuilder.group({
            ci: ['', Validators.required],
            exp : ['', Validators.required]
        });

        this.verticalStepperStep2 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            gender: [{value:'Masculino'}, Validators.required]
        });

        this.verticalStepperStep3 = this._formBuilder.group({
            birthday  : ['', Validators.required],
            address   : ['', Validators.required],
            cellphone : ['', [ Validators.required,Validators.maxLength(8) ] ]
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void
    {
        alert('You have finished the vertical stepper!');
    }
}
