# ayu-nibar

Simple [Übersicht](https://github.com/felixhageloh/uebersicht) widget status bar with [yabai](https://github.com/koekeishiya/yabai) support.

Forked from [nibar](https://github.com/kkga/nibar), which provided a great base to work with. I'm mostly changing it to fit my aesthetic and adding some additional functionality I find useful.

## Screenshot

![img](./ss.png)

## Installation

Clone this repo to your Übersicht widgets directory.

```bash
$ git clone https://github.com/ryanyz10/ayu-nibar $HOME/Library/Application\ Support/Übersicht/widgets/ayu-nibar
```

## Dependencies

- [jq](https://github.com/stedolan/jq) — used for parsing json output and displaying the workspaces widget
    - install with homebrew: `brew install jq`
- [SF Fonts](https://developer.apple.com/fonts/) (optional) — used for symbols in the statusbar widget

## Usage

### Yabai workspaces widgets

There are 2 widgets for displaying workspaces: `spaces-primary` and `spaces-secondary`. The `spaces-secondary` is used when working with dual displays.
If you're using a single display, disable it in the Übersicht's menu.

### Refreshing yabai workspaces widget

The widgets for displaying yabai workspaces aren't refreshing automatically (to preserve battery). To refresh them, you can add these lines utilizing [yabai's signals](https://github.com/koekeishiya/yabai/wiki/Commands#automation-with-rules-and-signals) at the end of `.yabairc`:

#### When using a single display

```sh
yabai -m signal --add event=space_changed \
    action="osascript -e 'tell application \"Übersicht\" to refresh widget id \"nibar-spaces-primary-jsx\"'"
```

#### When using dual displays

```sh
yabai -m signal --add event=space_changed \
    action="osascript -e 'tell application \"Übersicht\" to refresh widget id \"nibar-spaces-primary-jsx\"'"
yabai -m signal --add event=display_changed \
    action="osascript -e 'tell application \"Übersicht\" to refresh widget id \"nibar-spaces-primary-jsx\"'"

yabai -m signal --add event=space_changed \
    action="osascript -e 'tell application \"Übersicht\" to refresh widget id \"nibar-spaces-secondary-jsx\"'"
yabai -m signal --add event=display_changed \
    action="osascript -e 'tell application \"Übersicht\" to refresh widget id \"nibar-spaces-secondary-jsx\"'"
```

### Weather

I wrote a quick python script to fetch the current location and weather using [ipapi](https://ipapi.com/) and [openweathermap](https://openweathermap.org/api). You will need to sign up for API keys on the website. The script depends on the requests package which you can install as follows:

```bash
pip3 install requests 
```

The keys are specified in a `.config` file in the root of the project. It should be structured as below:

```
[geolocation]
key=<ipapi key here>

[weather]
key=<openweathermap key here>
unit=f
```

Unit is the temperature unit, which can either be fahrenheit or celsius (but defaults to kelvin if neither are selected).


