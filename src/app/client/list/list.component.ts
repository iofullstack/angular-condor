import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client.model'
import { ClientService } from '../client.service'


import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations : fuseAnimations
})
export class ListComponent implements OnInit {
  dataSource: Client[]
  displayedColumns = ['_id','nit_passport', 'firstName', 'lastName'];
  
  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    // this.getClients()
    this.clientService.getClients()
        .subscribe(clients => {
          this.dataSource = clients
          console.log('ohh sii', this.dataSource)
        });
  }

}
