import React, { useState } from 'react';
import './styles.css';
import ReactCardFlip from 'react-card-flip';
import { FaUserMinus, FaUserEdit, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

function DevItem({ dev, onDel, onEdit }) {
  const [isFlipped, setisFlipped] = useState(false);
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function handleClickMinus(e) {
    e.preventDefault();
    await onDel(dev);

  }

  async function handleClickEdit(e) {
    e.preventDefault();
    await onEdit(dev,{
      techs,
      latitude,
      longitude,
    });

  }

  async function handleFlip(e){
    setisFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
      <FaUserMinus id="FA-" onClick={handleClickMinus}/>
      <FaUserEdit id="FAE" onClick={handleFlip}/>
    </li>

    <li className="dev-itemb">
      <form onSubmit={handleClickEdit}>
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-infob">
          <strong>{dev.name}</strong>
          <input 
          className="techs" 
          required
          placeholder={dev.techs}
          onChange={ e => setTechs(e.target.value)}/>
        </div>
       </header> 
        <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            required
            placeholder={dev.location.coordinates[1]}
            onChange={ e => setLatitude(e.target.value)}/>
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            required
            placeholder={dev.location.coordinates[0]}
            onChange={ e => setLongitude(e.target.value)}/>
        </div>
      </div>
      <FaThumbsDown id="FAEC" onClick={handleFlip}/>
      <FaThumbsUp type="submit" id="FAEO" onClick={(e) => {handleClickEdit(e); handleFlip()}}/>
      </form>
    </li>
    </ReactCardFlip>
  )
}

export default DevItem;