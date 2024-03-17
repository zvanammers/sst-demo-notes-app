import { popularWeatherStats } from "../models/currentWeather"

export function convertFahrenheit(fah: number) {
    return ((fah - 32) / 1.8)
}

export function convertCelcius(cel: number) {
    return (((cel * 9) / 5) + 32)
}

export function convertPopularWeatherStats(stats: popularWeatherStats) {
    const newStats = stats;
    newStats.feels_like = convertFahrenheit(newStats.feels_like);
    newStats.temp = convertFahrenheit(newStats.temp);
    newStats.temp_max = convertFahrenheit(newStats.temp_max);
    newStats.temp_min = convertFahrenheit(newStats.temp_min);
    return newStats;
}