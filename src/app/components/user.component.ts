import { Component } from '@angular/core'
import { PostService } from '../services/post.service'

@Component({
  selector: 'user',
  template: `
    <h1>{{ name }}</h1>
    <p><strong>Email</strong> {{ email }}</p>
    <p>
      <strong>Address:</strong> {{ address.street }} {{ address.city }},
      {{ address.state }}
    </p>

    <button (click)="toggleHobbies()">
      {{ showHobbies ? 'Hide Hobbies' : 'Show Hobbies' }}
    </button>

    <div *ngIf="showHobbies">
      <h3>Hobbies</h3>
      <ul>
        <li *ngFor="let hobby of hobbies">
          {{ hobby }}<button (click)="deleteHobby(i)">X</button>
        </li>
      </ul>
      <form (submit)="addHobby(hobby.value)">
        <label>Add Hobby: </label><br />
        <input type="text" #hobby /><br />
      </form>
    </div>
    <hr />

    <h3>Edit User</h3>
    <form>
      <label>Name: </label><br />
      <input type="text" name="name" [(ngModel)]="name" /><br />
      <label>Email: </label><br />
      <input type="text" name="email" [(ngModel)]="email" /><br />
      <label>Street: </label><br />
      <input
        type="text"
        name="address.street"
        [(ngModel)]="address.street"
      /><br />
      <label>City: </label><br />
      <input type="text" name="address.city" [(ngModel)]="address.city" /><br />
      <label>State: </label><br />
      <input
        type="text"
        name="address.state"
        [(ngModel)]="address.state"
      /><br />
    </form>
    <hr />
    <h3>Posts</h3>
    <div *ngFor="let post of posts">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  `,
  providers: [PostService]
})
export class UserComponent {
  name: string
  email: string
  address: address
  hobbies: string[]
  showHobbies: boolean
  posts: Post[]

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
