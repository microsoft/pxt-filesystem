const file = "data.csv";
input.onButtonPressed(Button.A, () => {
    files.remove(file)
    files.readToSerial(file);
    basic.showString("v");
})    
input.onButtonPressed(Button.B, () => {
    basic.showString("o")
    for (let i = 0; i < 10; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(file, t);
        files.appendString(file, "\t");
        files.appendNumber(file, ay);
        files.appendLine(file, "");
        serial.writeString(".")
        basic.pause(20)
    }
    serial.writeLine("");
    files.readToSerial(file);
    basic.showString(":)")
})
let test = Math.random(1000);
files.settingsSaveNumber("test", test);
serial.writeValue("test", test);
let sertest = files.settingsReadNumber("test");
serial.writeValue("sertest", sertest);
control.assert(test == sertest);