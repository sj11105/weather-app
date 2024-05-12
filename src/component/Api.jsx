import React, { useState } from "react";

function Api(){
 const [ background,setbackground]=useState();
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const apiKey = "b571afaa1cae624ad34071c6b9b3f178"; 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
    

      
      setWeather(data);
      setError("");
      console.log(data)
      setbackground(data.weather[0].main);
      const backgroundimage={
        ' few clouds':'url(https://cdn.pixabay.com/photo/2014/08/09/15/45/sky-414199_1280.jpg)',
        'haze':'url(https://www.istockphoto.com/photo/smog-over-noida-delhi-gurgaon-in-the-morning-gm873551900-243947436?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fhaze%2F&utm_term=haze)',
       
  
      };
      const imgurl =backgroundimage[background];
      document.body.style.backgroundImage=imgurl;
   
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchWeatherData();
    }
  };


  return(
  <>
    <div class="card weathercard " style={{width: "18rem", justifyContent:'center'}} >
     
  <div class="card-body ">
   
  </div>
  <h5 class="card-title center">Weather</h5>
  <div>
    <div>
      <input className="input"
        type="text"
        placeholder="Enter city name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    {error && <p>{error}</p>}
    {weather && 
      <div className="info">
       
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Description: {weather.weather[0].description}</p>
        </div>
    }
    
    <p class="card-text"></p>
    <button onClick={handleSearch} class="btn btn-info btnw">Search</button>
  </div>
    </div>
</>
  )
  
};
export default Api;