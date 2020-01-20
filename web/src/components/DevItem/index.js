import React from 'react';
import './styles.css';
import { FaUserMinus, FaUserEdit } from 'react-icons/fa';

function DevItem({ dev, onDel }) {

  async function handleClickMinus(e) {
    e.preventDefault();
    await onDel(dev);

  }

  return (
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
      <FaUserEdit id="FAE"/>
    </li>
  )
}

export default DevItem;