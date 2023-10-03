import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { map } from 'rxjs/operators'
import { ask, confirm, message, open, save } from '@tauri-apps/api/dialog'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  httpClient = inject(HttpClient)
  greetingMessage = "";

  async greet(event: SubmitEvent, name: string) {
    // event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });


    // Save in directory
    // await save({
    //   title:'Sample text',
    //   filters: [{
    //     name: 'Text',
    //     extensions: ['txt']
    //   }],
    // })


  }

  // network call
  posts$ = this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(map((posts) => posts))

  // open dialog via rust api

  async openDialog() {
    // const yes = await ask('Are you sure ?', { title: 'Info', type: 'info' })
    // const yes = await confirm('Are you sure ?', { title: 'Info', type: 'info' })
    // const yes = await message('Are you sure ?', { title: 'Info', type: 'info' })

    const selected = await open({
      multiple: true,
      filters: [
        {
          name: 'Image',
          extensions: ['png', 'jpeg']
        }
      ]
    })

    if (Array.isArray(selected)) {
      console.log('Multiple', selected)
    } else if (selected === null) {
      console.log('Cancel', selected)
    } else {
      console.log('Single', selected)
    }

  }
}
