#!/usr/local/bin/python3
import configparser
import os
import requests

IP_URL = "https://api.ipify.org?format=json"
GEOLOC_URL = "http://api.ipapi.com/api/{}?access_key={}"
WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}"

def get_config():
    config = configparser.ConfigParser()
    config.read(os.getcwd() + "/ayu-nibar/.config")
    geo_key = config["geolocation"]["key"]
    weather_key = config["weather"]["key"]
    weather_unit = config["weather"]["unit"]
    return (geo_key, weather_key, weather_unit)


def get_ip_addr():
    ip_result = requests.get(IP_URL)
    ip_addr = ip_result.json()["ip"]
    return ip_addr


def get_location(ip_addr, geo_key):
    geo_result = requests.get(GEOLOC_URL.format(ip_addr, geo_key))
    geo_json = geo_result.json()
    lat = geo_json["latitude"]
    lon = geo_json["longitude"]

    return (lat, lon)


def get_weather_at_location(lat, lon, weather_key):
    weather_result = requests.get(WEATHER_URL.format(lat, lon, weather_key))
    weather_json = weather_result.json()
    weather = weather_json["weather"][0]
    temp = weather_json["main"]["feels_like"]

    return (weather["id"], weather["icon"], temp)


def kelvin_to_format(kelvin, unit):
    celsius = kelvin - 273.15
    if unit == 'c':
        return round(celsius)

    if unit == 'f':
        return round(1.8 * celsius + 32)

    return round(kelvin)


# TODO handle error
geo_key, weather_key, unit = get_config()
ip_addr = get_ip_addr()
lat, lon = get_location(ip_addr, geo_key)
weather_id, weather_icon, temp = get_weather_at_location(lat, lon, weather_key)

display_temp = kelvin_to_format(temp, unit)

print("{}|{}|{}".format(weather_id, "d" if "d" in weather_icon else "n", display_temp))

