import React, {useEffect, useState} from "react";
import "./css/style.css";
import { apiKey } from "../constant";
import moment from 'moment';

const Tempapp = () =>{

    const [city, setCity] = useState('');
    const [search, setSearch] = useState("Jamshedpur");

    useEffect( () =>{

        const fetchApi = async () =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
            const response = await fetch(url);
            //console.log(response);
            const resJson = await response.json();
            //console.log(resJson);
            setCity(resJson);
        }

        fetchApi();
    },[search] )

    return(
        <>
            <div className="container">
                
                <table cellSpacing="10">
                <tr>
                    <td>
                        <img className="logo" src="./logo.png" alt="site logo"/>
                    </td>
                    <td>
                        <h1 className="heading">TrueWeather</h1>
                    </td>
                </tr>
                </table>
                <div>
                    <div className="search-wrapper">
                        <div className="fa fa-search fa-2x"></div>
                            <input type="text" placeholder="Search" className="inputFeild"
                            onChange={ (event) => { setSearch(event.target.value) } }/>
                        <div className="fa fa-times fa-2x"></div>
                    </div>
                </div>

                {!city.main ? (
                    <p className="ndf"> No Data Found </p>
                ) : (
                        <div>
                            <div>
                                <div className="weather-icon">
                                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="" />
                                    {/* <p className="des">{city.weather[0].main}</p> */}
                                </div>

                                <div className="info">
                                    <h2 className="location">
                                        <i className="fas fa-street-view"></i>{search}
                                    </h2>
                                    {/* <p id="date">WED | APR 14 | 12:24PM</p> */}
                                    <p className="date">{moment().format('dddd')} | {moment().format('LL')}</p>
                                    <h1 className="tempr">{city.main.temp}&deg;C</h1>
                                    <h3 className="tempmin-max">Min {city.main.temp_min}&deg;C | Max {city.main.temp_max}&deg;C</h3>
                                </div> 

                            </div>
                            
                        </div>
                    )
                }

            </div>
            
        </>
    );
}

export default Tempapp;