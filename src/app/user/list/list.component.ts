import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model'
//import { ClientService } from '../client.service'


import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations : fuseAnimations
})
export class ListComponent implements OnInit {
  dataSource: User[]
  displayedColumns = ['_id','ci', 'firstName', 'lastName'];
  
  constructor(
    //private clientService: ClientService
  ) { }

  ngOnInit() {
    // this.getClients()
    /*
    this.clientService.getClients()
        .subscribe(clients => {
          this.dataSource = clients
          console.log('ohh sii', this.dataSource)
        });
    */
   //only test
    this.dataSource =[ {
        _id: "0",
        ci: "0",
        firstName: "No Existe",
        lastName: "Usuarios Registrados"
      }
    ]
  }

}
