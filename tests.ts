let r = Math.random(1000);
serial.writeLine("" + r)
files.settingsSaveNumber("val.txt", r)

let rr = files.settingsReadNumber("val.txt");
serial.writeLine("" + rr)

input.onButtonPressed(Button.A, () => {
    serial.writeLine("hello")
});

const file = "data.csv";
input.onButtonPressed(Button.B, () => {
    basic.showString("0")
    files.remove(file)
    files.appendLine(file, "Time\tAcceleration");
    for (let i = 0; i < 50; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(file, t);
        files.appendString(file, "\t");
        files.appendNumber(file, ay);
        files.appendLine(file, "");

        basic.pause(5);       
    }
    files.readToSerial(file);
    basic.showString(":)")
})