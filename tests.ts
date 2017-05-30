let fi = 0;
let file = "";
input.onButtonPressed(Button.B, () => {
    file = "data" + (fi++) + ".csv";
    serial.writeLine(file);
    files.remove(file)
    files.readToSerial(file);
    serial.writeLine("");
    basic.showString("o")
    for (let i = 0; i < 200; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(file, i);
        files.appendString(file, " ");
        files.appendNumber(file, i * i);
        files.appendLine(file, "");
        serial.writeLine(".")
        basic.pause(10)
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

let f = files.open("oo.txt");
f.seek(0, FileSystemSeekFlags.End);
f.flush();

input.onButtonPressed(Button.A, () => {
    files.appendLine(
        "output.txt",
        "hello"
    )
})
input.onButtonPressed(Button.B, () => {
    basic.showString("H")
    files.readToSerial("output.txt")
    serial.writeString("Hi")
})

const fn = "out2.txt";
input.onButtonPressed(Button.A, () => {
    basic.showString("o")
    files.appendLine(fn, "hello");
    serial.writeString("[")
    files.readToSerial(fn)
})
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
