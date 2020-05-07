let fi = 0;
{   // settings
    console.log("settings");
    fi++;
    let test = Math.randomRange(0, 1000);
    files.settingsSaveNumber("test", test);
    serial.writeValue("test", test);
    let serTest = files.settingsReadNumber("test");
    serial.writeValue("serTest", serTest);
    control.assert(test == serTest);
}

{   // readline
    console.log("append")
    const fn = "test" + (fi++) + ".txt";
    let expected = "";
    const r = Math.random().toString();
    const n = 3;
    serial.writeValue("expected lines", n);
    for (let i = 0; i < n; ++i) {
        files.appendLine(fn, r);
        expected += r + files.NEW_LINE;
    }

    { // readString
        let actual = files.open(fn).readString(-1);
        serial.writeLine("readstring: " + actual);
        control.assert(expected == actual);
    }

    { // readline
        let actual = "";
        let line = "";
        const f = files.open(fn);
        let i = 0;
        do {
            line = f.readLine();
            actual += line + files.NEW_LINE;
            i++;
        } while (line.length)
        serial.writeValue("actual lines", i);
        control.assert(n == i);
        serial.writeLine("readline: " + actual);
        control.assert(expected == actual);
    }
}

{   // file append line
    console.log("file")
    const fn = "test" + (fi++) + ".txt";
    let f = files.open(fn);
    const expected = "writeString\r\n";
    f.writeString(expected);
    f.seek(0, FileSystemSeekFlags.End);
    f.flush();
    f.close();
    let actual = files.open(fn).readString(-1);
    control.assert(expected == actual);
}

{   // stress
    console.log("stress")
    const fn = "test" + (fi++) + ".txt";
    serial.writeLine(fn);
    files.remove(fn)
    files.readToSerial(fn);
    serial.writeLine("");
    basic.showString("o")
    const buf = control.createBuffer(4);
    buf.setNumber(NumberFormat.UInt32LE, 0, ~0);
    for (let i = 0; i < 200; ++i) {
        let t = input.runningTime();
        let ay = input.acceleration(Dimension.Y);
        files.appendNumber(fn, i);
        files.appendString(fn, " ");
        files.appendNumber(fn, i * i);
        files.appendLine(fn, "");
        files.appendBuffer(fn, buf);
        files.appendLine(fn, "");
        serial.writeLine(".")
        basic.pause(10)
    }
    serial.writeLine("");
    files.readToSerial(fn);
    basic.showString(":)")
}
