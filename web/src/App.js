import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {


    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDelDev(dev) {

    console.log(dev)
    const response = await api.delete(`/devs/${dev._id}`, dev);
    console.log(response)

    const responsee = await api.get('/devs');

      setDevs(responsee.data);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev =>(
            <DevItem key={dev._id} dev = {dev} onDel={handleDelDev}/>
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
