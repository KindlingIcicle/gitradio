# Github bling

Get real-time updates on repositories with auditory updates. 

## Team

  - __Product Owner__: Banun Idris
  - __Scrum Master__: Jason Matsui
  - __Development Team Members__: Charlie Harrington, Way Huang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Combine this with a repo to get auditory updates on your repository. You'll need to create a custom hook inside of git, create a server that has this repo. And then open the client to listen to updates. 

To change/update view on new event:

  one way: use the global object: gitEventCollection and push a new vanilla object that look like this:
  ```sh
  {
    data: {
        type: 'event type',
        time: '10/10/10 : 10:10:10',
        user: 'allen',
        user_url: 'http://github.userProfile.com',
        user_avatar_url: 'http://github.userProfile.picture',
        repo: 'repo name',
        repo_url: 'http://github.repo.path'
    };
  }
  ```
  second way: the server and client are paired by socket.io, whenever github sends a new event by webhook,
  that event will be heard by the server which then passes it to the client and heard in the app model.
  then the event is pushed to the eventCollection by the addNewEvent function in app model.
  this will trigger the view to change on appView.

component of the client:
  Views:
    appView:
      it renders/triggers the rendering of the main view on client
      it also the has the controller function to make ajex call to github to specify which personally associated repo to listen to.

    eventListView and eventEntryView:
      the first contains the second, and together they form the view of the list of events.

  Models:
    the app model:
      At initialization it establishes the connection with server and sets event listener for incoming events.

      addNewEvent: it adds new event to the the eventCollection.


## Requirements

- Node 0.10.x
- Express 4
- Backbone
- Bootstrap
- Socket.io
- Underscore
- Jquery
- Bower

## Development

- Mocha
- Chai
- Sinon

Note: tests still need to be written

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

- View the project press release [here](/documentation/_PRESS-RELEASE.md)
- View the project roadmap [here](/documentation/projectRoadmap.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
