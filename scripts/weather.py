#!/usr/local/bin/python3
import configparser
from datetime import datetime, timedelta
import os
import pickle
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

geo_last_fetched, weather_last_fetched, location_obj, weather_obj = None, None, None, None
try:
    with open('./ayu-nibar/last_fetched.obj', 'rb') as pickle_file:
        geo_last_fetched, weather_last_fetched, location_obj, weather_obj = pickle.load(pickle_file)
except Exception:
    pass

# TODO handle errors
now = datetime.now()
geo_key, weather_key, unit = get_config()

if not geo_last_fetched or geo_last_fetched + timedelta(days=1) < now:
    ip_addr = get_ip_addr()
    lat, lon = get_location(ip_addr, geo_key)
    geo_last_fetched = now
else:
    lat, lon = location_obj

if not weather_last_fetched or weather_last_fetched + timedelta(seconds=20) < now:
    weather_last_fetched = now
    weather_id, weather_icon, temp = get_weather_at_location(lat, lon, weather_key)
else:
    weather_id, weather_icon, temp = weather_obj

display_temp = kelvin_to_format(temp, unit)

to_dump = (geo_last_fetched, weather_last_fetched, (lat, lon), (weather_id, weather_icon, temp))
try:
    with open('./ayu-nibar/last_fetched.obj', 'wb+') as pickle_file:
        pickle.dump(to_dump, pickle_file)
except Exception:
    pass

print("{}|{}|{}|{}".format(weather_id, "d" if "d" in weather_icon else "n", display_temp, unit))

