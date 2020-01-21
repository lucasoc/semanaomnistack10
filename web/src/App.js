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

    // eslint-disable-next-line no-unused-vars
    const del = await api.delete(`/devs/${dev._id}`, dev);

    const response = await api.get('/devs');

      setDevs(response.data);
  }

  async function handleEditDev(dev, data) {

    console.log(dev, data)
    const response = await api.put(`/devs/${dev._id}`, data);
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
            <DevItem key={dev._id} dev = {dev} onDel={handleDelDev} onEdit={handleEditDev}/>
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
