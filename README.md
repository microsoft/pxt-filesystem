# File system driver [![Build Status](https://travis-ci.org/Microsoft/pxt-filesystem.svg?branch=master)](https://travis-ci.org/Microsoft/pxt-filesystem)

To use this package, go to https://makecode.microbit.org, click ``Extensions`` and search for **filesystem**.

### ~ hint

BETA - This package is still under development and subject to changes.

### ~

## Usage

The package allows to read and write files to the @boardname@ flash.

### ~hint

The entire file system content is ERASED when a new .hex file is download onto the @boardname@.

### ~

### Writing data

* append text and a new line character

```blocks
files.appendLine("data.txt", "Hello");
```

* append text to the file

```blocks
files.appendString("data.txt", "Hello");
```

* append a number (as text) to the file

```blocks
files.appendNumber("data.txt", 42);
```

### Reading data

* send the content of a file to serial

```blocks
files.readToSerial("data.txt");
```

### Settings

The package allows to save and load number settings based on the file system

* save setting value

```blocks
files.settingsSaveNumber("calibrated", 1)
```

* read setting value

```blocks
let calibrated = files.settingsReadNumber("calibrated");
```

### File class

The ``File`` class allows to keep a file instance open, manipulate the pointer position and read from the file.


* open, flush or close the file

```blocks
let f = files.open("data.txt");
f.flush();
f.close();
```

* write strings or buffers
```blocks
let f = files.open("data.txt");
f.writeString("yay");
```

* read data
```blocks
let f = files.open("data.txt");
let buf = f.readBuffer(64);
let c = f.read();
```

* set the cursor position

```blocks
let f = files.open("data.txt");
f.setPosition(42);
let pos = f.position();
```

## Example: Writing accelerometer data

The following program allows to collect accelerometer data and save it in a ``data.csv`` file. 
When the user presses button ``A``, the @boardname@ pauses for 3 seconds, then starts collecting 720 acceleration samples.
Each sample is written to the file in a format that can be important by spreadsheet programs (CSV).

```blocks
let file = "data.csv";
input.onButtonPressed(Button.A, () => {    
    basic.pause(3000);
    files.remove(file);
    files.appendLine(file, "Time\tAcceleration");
    for (let i = 0; i < 100; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendLine(file, t + "\t" + ay);
        control.waitMicros(20);
    }
});
input.onButtonPressed(Button.B, () => {
    files.readToSerial(file);
    basic.showString(":)")
})
```

## Supported targets

* for PXT/ microbit
* for PXT/ calliope

## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
