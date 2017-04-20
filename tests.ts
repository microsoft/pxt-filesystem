/*
const file = "data.csv";
input.onButtonPressed(Button.B, () => {
    files.remove(file)
    files.readToSerial(file);
    serial.writeLine("");
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

const fn = "out2.txt";
input.onButtonPressed(Button.A, () => {
    basic.showString("o")
    files.appendLine(fn, "hello");
    serial.writeString("[")
    files.readToSerial(fn)
})
*/

const f = "output.txt";
input.onButtonPressed(Button.A, () => {
    files.appendLine(f, "hello")
    serial.writeString("W")
    basic.showString("W")
})
input.onButtonPressed(Button.B, () => {
    files.readToSerial(f)
    serial.writeString("Hi")
    basic.showString("H")
})