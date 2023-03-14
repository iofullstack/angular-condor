import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { User } from '../user.model'
import { UserService } from '../user.service'

import { fuseAnimations } from '@fuse/animations'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations : fuseAnimations
})
export class ListComponent implements OnInit {
  dataSource: User[]
  // displayedColumns = ['_id','ci', 'exp', 'firstname', 'lastname', 'avatar', 'email', 'gender', 'birthday', 'address', 'cellphone', 'createdAt']

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => {
          console.log(users)
          // this.dataSource = users
        })
  }
}
