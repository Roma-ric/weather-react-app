import background from '../images/pexels-pixabay-531756.jpg'
import { useState, useEffect } from 'react';

function App() {

  const [inputOpen, setInputOpen] = useState(false);
  const [data, setData] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    alert("Cliqué sur l'icône 🔍 pour rechercher la météo d'une ville");
  }, []);

  const recherche = () => {
    const location = (document.getElementById("location").value).trim();
    if (location === "" || location === undefined) {
      alert("Entrer le nom d'une ville svp!");
    } else {
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=7ff595a5c038495797982215231212&q=${location}&days=7&aqi=no&alerts=no`)
        .then((response) => response.json())
        .then((surveyData) => {
          setData(surveyData)
          setDataLoading(false)
        })
        .catch((error) => {
          console.log(error);
          alert("Recherche invalide ou Erreur de connexion à l'API.")
        })
    }
  }

  return (
    <div style={{ background: `url(${background})`, backgroundSize: "cover", height: "1000px" }}>
      <h5 className='text-light p-3'> Bienvenue sur Weather App, votre compagnon météo pour des prévisions précises et instantanées, où que vous soyez dans le monde ! </h5>
      <div className='d-flex justify-content-center'>
        {
          inputOpen ?
            <div className='d-flex flex-lg-row flex-column justify-content-around'>
              <div className='bg-light d-flex mt-2' style={{ borderRadius: "25px" }}>
                <input type="search" name="location" id="location" placeholder="Rechercher la météo d'une ville..." className='form-control border-0' style={{ borderRadius: "30px" }} />
                <div className='card btn btn-outline-primary p-2 rounded-circle d-flex justify-content-center align-items-center' style={{ width: "50px", height: "50px" }} onClick={() => setInputOpen(!inputOpen)}>
                  <span class="material-symbols-outlined"> search </span>
                </div>
              </div>
              <button className='btn btn-primary mt-lg-2 mt-1' onClick={recherche}> Rechercher </button>
            </div>
            :
            <div className='card btn btn-outline-primary p-2 mt-2 rounded-circle d-flex justify-content-center align-items-center' style={{ width: "50px", height: "50px" }} onClick={() => setInputOpen(!inputOpen)}>
              <span class="material-symbols-outlined"> search </span>
            </div>
        }

      </div>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='card bg-transparent mt-4 col-lg-10 col-11 shadow-lg' style={{ height: "auto" }}>
          <div className='d-flex flex-lg-row flex-column justify-content-between p-lg-3 p-1'>
            <div className='d-flex flex-column col-lg-5 col-11'>
              <h2 className='text-light'> {
                data.location ?
                  data.location.name + "," + data.location.country
                  :
                  <div class="spinner-border text-light " role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
              } </h2>
              <h4 className='text-light'>   {
                data.location ?
                  new Date(data.location.localtime).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
                  :
                  <div class="spinner-border text-light " role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
              } </h4>
              <p className="text-light m-1"> </p>
            </div>
            {
              data.current ?
                <img src={'https:' + data.current.condition.icon} alt="" className='col-3' />
                :
                <div class="spinner-border text-light " role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            }
            <p className='text-light fs-1'> <span class="material-symbols-outlined"> device_thermostat </span> {
              data.current ?
                data.current.temp_c
                :
                <div class="spinner-border text-light " role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            }<sup>o</sup>C  </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
