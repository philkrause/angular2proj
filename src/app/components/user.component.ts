import { Component } from '@angular/core'
import { PostService } from '../services/post.service'

@Component({
  moduleId: module.id,
  selector: 'user',
  templateUrl: `user.component.html`,
  providers: [PostService]
})
export class UserComponent {
  name: string
  email: string
  address: address
  hobbies: string[]
  showHobbies: boolean
  posts: post[]

  constructor(private postService: PostService) {
    console.log('constructor ran')
    this.name = 'John Doe'
    this.email = 'john@gmail.com'
    this.address = {
      street: '12 main st',
      city: 'Chicago',
      state: 'IL'
    }
    this.hobbies = ['Music', 'Movie', 'Sports']
    this.showHobbies = false
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }
  toggleHobbies() {
    console.log('button pushed')
    if (this.showHobbies == true) {
      this.showHobbies = false
    } else if (this.showHobbies == false) {
      this.showHobbies = true
    }
  }

  addHobby(hobby: string) {
    this.hobbies.push(hobby)
  }
  deleteHobby(i: number) {
    this.hobbies.splice(i, 1)
  }
}

interface address {
  street: string
  city: string
  state: string
}
interface post {
  id: number
  title: string
  body: string
}
