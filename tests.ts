const file = "data.csv";
files.remove(file)
files.appendLine(file, "Time\tAcceleration");
input.onButtonPressed(Button.B, () => {
    basic.showString("o")
    for (let i = 0; i < 50; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(file, t);
        files.appendString(file, "\t");
        files.appendNumber(file, ay);
        files.appendLine(file, "");

        control.waitMicros(20);
    }
    files.readToSerial(file);
    basic.showString(":)")
})