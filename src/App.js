import React, { useEffect } from 'react'
import logo from './images/Troll Face.png'
// import memesData from './data/memesData' //change to api

export default function App(){
  const [allMemes, setAllMemes] = React.useState({});

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => setAllMemes(data));
  }, [])

  const [meme, setMeme] = React.useState({
    topText: 'SHUT UP',
    bottomText: 'Just take the money',
    image: 'https://i.imgflip.com/3si4.jpg',
  });

  function getRandomMeme(){
    const memesArray = allMemes.data.memes;
    const randomNum = Math.floor(Math.random() * memesArray.length);
    let urlImage = memesArray[randomNum].url;
    setMeme(preMeme => ({...preMeme, image: urlImage}));
  }

  function getText(event) {
    const {name, value} = event.target;
    setMeme(preMeme => (
      {
        ...preMeme,
        [name]: value,
      }
    ))
  }

  return (
    <div className="App">
      <header>
        <div className="header--logo">
          <img src={logo} alt="" />
          <h2>Meme Generator</h2>
        </div>
        <div className='project-text'>React Course - Project #</div>
      </header>

      <main>
        <div className="form">
          <div className="inputBoxs">
            <input 
              type="text" 
              placeholder='Top text'
              name='topText'
              value={meme.topText}
              onChange={getText}
            />
            <input 
              type="text" 
              placeholder='Bottom text'
              name='bottomText'
              value={meme.bottomText}
              onChange={getText}
            />
          </div>
          <button onClick={getRandomMeme}>Get a new meme image 🖼️</button>
        </div>
        <div className='meme'>
          <img className='memeImage' src={meme.image} alt="" />
          <h2 className='memeText top'>{meme.topText}</h2>
          <h2 className='memeText bottom'>{meme.bottomText}</h2>
        </div>
      </main>
    </div>
  );
}
