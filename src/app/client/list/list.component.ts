import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Client } from '../client.model'
import { ClientService } from '../client.service'
import { fuseAnimations } from '@fuse/animations'
import { SocketioService } from '../../socketio.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations : fuseAnimations,
  providers: [ SocketioService ]
})
export class ListComponent implements OnInit {
  dataSource: Client[]
  displayedColumns = ['_id','nit_passport', 'firstName', 'lastName']
  msg1: string
  
  constructor(
    private clientService: ClientService,
    private socket: SocketioService
  ) { }

  ngOnInit() {
    this.getClients()
  }

  getClients(): void {
    this.clientService.getClients()
        .subscribe(clients => {
          this.dataSource = clients
        })
    this.socket
      .getMessage()
      .subscribe(
        msg => {
          this.msg1 = `Msg on port 8988: ${msg.msg}`
          console.log(this.msg1)
        }
      )
  }

  sendMsg1(msg) {
    this.socket.sendMessage(msg);
  }
}
