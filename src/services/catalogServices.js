import api from './api';

export async function fetchCountries(){
    const { data } = await api.get('/countries');
    console.log(data);
    return data;
}

export async function fetchStatesPopulation(country){
    const { data } = await api.get(`/country/${country}/states-population`);
    console.log(data);
    return data;
}

export async function fetchCountiesByState(state){
    const { data } = await api.get(`/counties/${state}`);
    console.log(data);
    return data;
}