[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://utsavk28.github.io/HostedAssets/social-logo.png" alt="Logo" height="80">
  </a>

  <!-- <h3 align="center">Social</h3> -->

  <p align="center">
    A Social Media Web App with Real Time Chat features
    <br />
    <a href="https://social-app-v1.netlify.app/"><strong>Explore the Web App »</strong></a>
    <br />
    <br />
    <a href="https://social-app-v1.netlify.app/">Web App</a>
    ·
    <a href="https://github.com/utsavk28/Social/issues">Report Bug</a>
    ·
    <a href="https://github.com/utsavk28/Social/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
       <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
It is Social Media Web App with Real Time Chat Feature
* Home Page
![Social Home Page](https://utsavk28.github.io/HostedAssets/social-ss-2.png)
* Profile Page
![Social Profile Page](https://utsavk28.github.io/HostedAssets/social-ss-1.png)
* Chat Page
![Social Chat Page](https://utsavk28.github.io/HostedAssets/social-ss-3.png)

### Features
- CRUD operation on Posts, Profile and Comments
- Like/Unlike Post & Comments
- Follow/Unfollow Users 
- Chat with your Friends with Real Time Chat Feature
- Save Posts
- Explore Page


### Built With
* [Bootstrap](https://getbootstrap.com/)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [NodeJs](https://nodejs.org/en/)
* [Socket IO](https://socket.io/)
* [Axios](https://axios-http.com/)
* [Redux](https://redux.js.org/)


<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

1. Get a Mongo URI from [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/utsavk28/Social
   ```
3. Install NPM packages
   ```sh
   cd client && npm install
   ```
   ```sh
   cd server && npm install
   ```
4. Enter your Mongo URI and JWT Secret Token in `server/config/default.json`
   ```JSON
   {
		"mongoURI": "mongodb+srv://user:user@cluster10.uxypi.mongodb.net/test?retryWrites=true&w=majority",
		"jwtSecret": "SecretToken"
	}
   ```



<!-- USAGE EXAMPLES -->
## Usage

Allows individuals to keep in touch with friends and extended family


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).

 - [x] Phase 1
	 - CRUD Operations on Posts, Comments and Profile 
	 - CRUD operation on Posts, Profile and Comments
	- Like/Unlike Post & Comments
- [x] Phase 2
	- Follow/Unfollow Users 
	- Chat with your Friends with Real Time Chat Feature
	- Save Posts
	- Explore Page
- [ ] Phase 3
	- .

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [Utsav Khatu](https://www.linkedin.com/in/utsav-khatu-431b741bb/) 

Project Link: [https://github.com/utsavk28/Social](https://github.com/utsavk28/Social)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Project for Reference](https://github.com/utsavk28/DevConnector)
* [Socket Private Message](https://socket.io/get-started/private-messaging-part-1/)
* [Medium Article for Chat App](https://medium.com/@mcurena24/add-direct-messaging-to-your-app-using-react-redux-socket-io-4953ad53944d)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/utsavk28/Social.svg?style=for-the-badge
[contributors-url]: https://github.com/utsavk28/Social/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/outsavk28/Social.svg?style=for-the-badge
[forks-url]: https://github.com/utsavk28/Social/network/members
[stars-shield]: https://img.shields.io/github/stars/utsavk28/Social.svg?style=for-the-badge
[stars-url]: https://github.com/utsavk28/Social/stargazers
[issues-shield]: https://img.shields.io/github/issues/utsavk28/Social.svg?style=for-the-badge
[issues-url]: https://github.com/utsavk28/Social/issues
[license-shield]: https://img.shields.io/github/license/utsavk28/Social.svg?style=for-the-badge
[license-url]: https://github.com/utsavk28/Social/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/utsav-khatu-431b741bb/
