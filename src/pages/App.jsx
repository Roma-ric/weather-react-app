import background from '../images/pexels-pixabay-531756.jpg'
import oxygen from '../images/Oxygen-Icon..png'
import soleil from '../images/soleil.png'
import pluie from '../images/pluie.png'
import couvert from '../images/couvert.png'
// import backgroundVideo from '../images/'

import { useState, useEffect } from 'react';

function App() {

  const [inputOpen, setInputOpen] = useState(false);
  const [data, setData] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);

  const recherche = () => {
    const location = document.getElementById("location").value;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=7ff595a5c038495797982215231212&q=${location}&days=7&aqi=no&alerts=no`)
      .then((response) => response.json())
      .then((surveyData) => {
        setData(surveyData)
        setDataLoading(false)
      })
      .catch((error) => {
        console.log(error);
        alert("Nom de ville incorrecte ou ville non retrouvée.")
      })
  }

  return (
    <div style={{ background: `url(${background})`, backgroundSize: "cover", height: "1000px" }}>
      <div className='d-flex justify-content-center'>
        {
          inputOpen ?
            <div className='d-flex flex-lg-row flex-column justify-content-around'>
              <div className='bg-light d-flex mt-5' style={{ borderRadius: "25px" }}>
                <input type="search" name="location" id="location" placeholder='Rechercher une ville...' className='form-control border-0' style={{ borderRadius: "30px" }} />
                <div className='card btn btn-outline-primary p-2 rounded-circle d-flex justify-content-center align-items-center' style={{ width: "50px", height: "50px" }} onClick={() => setInputOpen(!inputOpen)}>
                  <span class="material-symbols-outlined"> search </span>
                </div>
              </div>
              <button className='btn btn-primary mt-lg-5 mt-1' onClick={recherche}> Rechercher </button>
            </div>
            :
            <div className='card btn btn-outline-primary p-2 mt-5 rounded-circle d-flex justify-content-center align-items-center' style={{ width: "50px", height: "50px" }} onClick={() => setInputOpen(!inputOpen)}>
              <span class="material-symbols-outlined"> search </span>
            </div>
        }

      </div>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        {
          isDataLoading ?
            <div class="spinner-border w-25 text-light " role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            :
            <div className='card bg-transparent mt-4 col-lg-10 col-11 shadow-lg' style={{ height: "500px" }}>
              <div className='d-flex justify-content-between p-lg-3 p-1'>
                <div className='d-flex flex-column col-5'>
                  <h2 className='text-light'> {data.location ? data.location.name + "," + data.location.country : "----------"} </h2>
                  <h4 className='text-light'>   {data.location ? new Date(data.location.localtime).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }) : "---------------"} </h4>
                  <p className="text-light m-1 d-flex"><span class="material-symbols-outlined"> humidity_low </span> Humidité: {data.current ? data.current.humidity : "------"} </p>
                  <p className="text-light m-1"> </p>
                </div>
                {
                  data.current ? <img src={'https:' + data.current.condition.icon} alt="" className='col-3' /> : <h1 className='text-light'> -------------------------- </h1>
                }

                <p className='text-light fs-1'> <span class="material-symbols-outlined"> device_thermostat </span> {data.current ? data.current.temp_c : "-------"}<sup>o</sup>C  </p>
              </div>
              <div className='mt-2 d-flex flex-wrap justify-content-around p-lg-3 p-1'>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items-center">
                  <img src={soleil} alt="" width={60} height={60} />
                  <h6 className='text-light'> Lundi </h6>
                  <h5 className='text-light'> +{19} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={pluie} alt="" width={60} height={60} />
                  <h6 className='text-light'> Mardi </h6>
                  <h5 className='text-light'> +{21} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={couvert} alt="" width={60} height={60} />
                  <h6 className='text-light'> Mercredi </h6>
                  <h5 className='text-light'> +{15} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={soleil} alt="" width={60} height={60} />
                  <h6 className='text-light'> Jeudi </h6>
                  <h5 className='text-light'> +{32} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={pluie} alt="" width={60} height={60} />
                  <h6 className='text-light'> Vendredi </h6>
                  <h5 className='text-light'> +{29} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={couvert} alt="" width={60} height={60} />
                  <h6 className='text-light'> Samedi </h6>
                  <h5 className='text-light'> +{27} <sup>o</sup>C</h5>
                </div>
                <div className="card bg-transparent border-secondary shadow-lg p-2 d-flex flex-column align-items">
                  <img src={soleil} alt="" width={60} height={60} />
                  <h6 className='text-light'> Dimanche </h6>
                  <h5 className='text-light'> +{35} <sup>o</sup>C</h5>
                </div>
              </div>
            </div>
        }

      </div>
    </div>
  );
}

export default App;
