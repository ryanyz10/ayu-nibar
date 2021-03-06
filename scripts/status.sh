#!/bin/sh

export LC_TIME="en_US.UTF-8"
TIME=$(date +"%H:%M")
DATE=$(date +"%a %m/%d")

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
    BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
    BATTERY_CHARGING="true"
fi

LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

WIFI_STATUS=$(ifconfig en0 | grep status | cut -c 10-)
WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

DND=$(defaults -currentHost read com.apple.notificationcenterui doNotDisturb)

SPOTIFY_STATUS=$(osascript -e "if application \"Spotify\" is running then" -e "tell application \"Spotify\" to player state as string" -e "end if")
SPOTIFY_ARTIST=$(osascript -e "if application \"Spotify\" is running then" -e "tell application \"Spotify\" to artist of current track as string" -e "end if")
SPOTIFY_NAME=$(osascript -e "if application \"Spotify\" is running then" -e "tell application \"Spotify\" to name of current track as string" -e "end if")

WEATHER=$(./ayu-nibar/scripts/weather.py)

echo $(cat <<-EOF
{
    "datetime": {
        "time": "$TIME",
        "date": "$DATE"
    },
    "battery": {
        "percentage": $BATTERY_PERCENTAGE,
        "charging": $BATTERY_CHARGING,
        "remaining": "$BATTERY_REMAINING"
    },
    "cpu": {
        "loadAverage": $LOAD_AVERAGE
    },
    "wifi": {
        "status": "$WIFI_STATUS",
        "ssid": "$WIFI_SSID"
    },
    "dnd": $DND,
    "spotify": {
        "status": "$SPOTIFY_STATUS",
        "artist": "$SPOTIFY_ARTIST",
        "name": "$SPOTIFY_NAME"
    },
    "weather": "$WEATHER"
}
EOF
)
