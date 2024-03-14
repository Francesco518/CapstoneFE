import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/auth/service/profile.service';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any

  
  


  
  constructor(private profileService: ProfileService) { 
    this.randomHouse = this.houseNames[Math.floor(Math.random() * this.houseNames.length)]
    this.randomAnimal = this.animalsNames[Math.floor(Math.random() * this.animalsNames.length)]
    this.randomWand = this.wandNames[Math.floor(Math.random() * this.wandNames.length)]
  }
  
  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.user = data
      },
      (error) => {
        console.error('Error fetching user profile')
      }
    )
  }
  houseNames = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
  randomHouse: string
  
  animalsNames = ['Owl', 'Mouse', 'Frog', 'Cat']
  randomAnimal: string
  
  wandNames = ['Unicorn Hair', 'Phoenix Feather', 'Dragon Heartstring']
  randomWand: string
  
}
