import React , {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Clarifai  from 'clarifai';
import './App.css';
const app = new Clarifai.App({
 apiKey: 'c9ed66bc9aa04765b0b91abb105f41e8'
});

const particleoptions = {
  particles: {
      number : {
        value : 100,
        density : {
          enable : true,
          value_area : 800
        }
      }
    }
}
const initialstate = {
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
        }

class App extends Component {
  constructor()
  {
    super();
    this.state = initialstate 
  }
  

  loaduser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }

calculatefacelocation = (data) => {
const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
//console.log(width,height);
return {
  leftCol: clarifaiface.left_col * width,
  topRow: clarifaiface.top_row * height,
  rightCol: width - (clarifaiface.right_col * width),
  bottomRow: height - (clarifaiface.bottom_row * height)
}
}

displaybox = (box) => {
 // console.log(box);
  this.setState({box:box});
}


oninputchange = (event) => {
this.setState({input:event.target.value})
}

onbuttonsubmit = () =>{
  this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then( response => {
      if(response){
          fetch('http://localhost:3000/image', {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
      })
    }).then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user,{ entries:count}))
      })
      }
      this.displaybox( this.calculatefacelocation(response))
    })
    .catch(err =>console.log(err));
      
}
onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState(initialstate)
  }
  else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

  render(){
    const {isSignedIn, imageUrl, route, box}= this.state;
  return (
    <div className="App">
    <Particles className='particles'
    params={particleoptions}/>
      <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange} />
      { this.state.route === 'home' ? 
       <div>
        <Logo />
        <Rank  name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm  oninputchange={this.oninputchange} buttonsubmit={this.onbuttonsubmit}/>
        <FaceRecognition box={box} imageurl = {imageUrl}/>
      </div>
      :(
        route === 'signin' ? 
         <Signin loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
         :
         <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
        )
     
    }
    </div>
  );
}
}

export default App;
