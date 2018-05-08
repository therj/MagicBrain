import React, { Component } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank'
import Logo from './components/Logo/Logo'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'de5bd1ba9d13499ea205053cb7316576',
})

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'edge',
      stroke: {
        width: 0,
        color: '#ffffff',
      },
      polygon: {
        nb_sides: 12,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 100,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 160,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }
  onInputChange = e => {
    this.setState({
      input: e.target.value,
    })
  }
  calculateFaceLocation = data => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.querySelector('#inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      topRow: clarifyFace.top_row * height,
      leftCol: clarifyFace.left_col * width,
      rightCol: width - clarifyFace.right_col * width,
      bottomRow: height - clarifyFace.bottom_row * height,
    }
  }

  displayfaceBox(box) {
    this.setState({
      box: box,
    })
  }
  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .then(box => this.displayfaceBox(box))
      .catch(err => console.log(err))
  }
  onRouteChange = route => {
    if (route === 'signin') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles" />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    )
  }
}

export default App
