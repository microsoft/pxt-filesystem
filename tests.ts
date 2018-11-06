let fi = 0;
{   // settings
    let test = Math.randomRange(0, 1000);
    files.settingsSaveNumber("test", test);
    serial.writeValue("test", test);
    let serTest = files.settingsReadNumber("test");
    serial.writeValue("serTest", serTest);
    control.assert(test == serTest);
}

{   // readline
    fi++;
    let expected = "";
    const r = Math.random().toString();
    for (let i = 0; i < 3; ++i) {
        files.appendLine(fi + ".txt", r);
        expected += r + files.NEW_LINE;
    }
    
    control.assert()
}

{   // file append line
    let f = files.open("output.txt");
    f.writeString("writeString\r\n");
    f.seek(0, FileSystemSeekFlags.End);
    f.flush();
    f.close();    
}

{   // stress
    let file = "data.csv";
    serial.writeLine(file);
    files.remove(file)
    files.readToSerial(file);
    serial.writeLine("");
    basic.showString("o")
    const buf = control.createBuffer(4);
    buf.setNumber(NumberFormat.UInt32LE, 0, ~0);
    for (let i = 0; i < 200; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(file, i);
        files.appendString(file, " ");
        files.appendNumber(file, i * i);
        files.appendLine(file, "");
        files.appendBuffer(file, buf);
        files.appendLine(file, "");
        serial.writeLine(".")
        basic.pause(10)
    }
    serial.writeLine("");
    files.readToSerial(file);
    basic.showString(":)")
}

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
const fo = "output.txt";
input.onButtonPressed(Button.A, () => {
    files.appendLine(fo, "hello")
    serial.writeString("W")
    basic.showString("W")
})
input.onButtonPressed(Button.B, () => {
    files.readToSerial(fo)
    serial.writeString("Hi")
    basic.showString("H")
})
