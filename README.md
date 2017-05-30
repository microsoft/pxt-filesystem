# File system driver

To use this package, go to https://pxt.microbit.org, click ``Add package`` and search for **filesystem**.

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

```typescript
let f = files.open("data.txt");
f.flush();
f.close();
```

* write strings or buffers
```typescript
let f = files.open("data.txt");
f.writeString("yay");
```

* read data
```typescript
let f = files.open("data.txt");
let buf = f.readBuffer(64);
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
        files.appendNumber(file, t);
        files.appendString(file, "\t");
        files.appendNumber(file, ay);
        files.appendLine(file, "");

        control.waitMicros(20);
    }
});
input.onButtonPressed(Button.B, () => {
    files.readToSerial(file);
    basic.showString(":)")
})
```

## Supported targets

* for PXT/microbit

## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
