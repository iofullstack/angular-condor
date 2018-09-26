import { Component, OnInit } from '@angular/core'
import { Client } from '../client.model'
import { ClientService } from '../client.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients: Client[]

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    // this.getClients()
    this.clientService.getClients()
        .subscribe(clients => {
          this.clients = clients
          console.log('ohh sii', this.clients)
        });
  }

  // getClients(): void {
    // this.clientService.getClients();
      /* .subscribe(clients => console.log(clients) ) //this.clients = clients  */
    /* console.log('joder') */
  // }

}
