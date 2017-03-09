// Auto-generated. Do not edit.


    /**
     * File system operations
     */
    //% weight=5 color=#002050
declare namespace files {

    /**
     * Appends text and a new line to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="files_append_line" block="file %filename|append line %text"
    //% blockExternalInputs=1 weight=90 blockGap=8 shim=files::appendLine
    function appendLine(filename: string, text: string): void;

    /**
     * Appends text to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="fs_append_string" block="file %filename|append string %text"
    //% blockExternalInputs=1 weight=86 blockGap=8 shim=files::appendString
    function appendString(filename: string, text: string): void;

    /**
     * Reads the content of the file to send it to serial
     * @param filename file name, eg: "output.txt"
     */
    //% blockId="fs_write_to_serial" block="file %filename|read to serial"
    //% weight=80 shim=files::readToSerial
    function readToSerial(filename: string): void;

    /**
     * Removes the file. There is no undo for this operation.
     * @param filename name of the file to remove, eg: "output.txt"
     */
    //% blockId="fs_remove" block="file remove %filename"
    //% weight=50 advanced=true shim=files::remove
    function remove(filename: string): void;

    /**
     * Creates a directory
     * @param name full qualified path to the new directory
     */
    //% advanced=true weight=10
    //% blockId=files_create_directory block="files create directory %name" shim=files::createDirectory
    function createDirectory(name: string): void;

    /** 
     * Writes a number settings
     * @param name name of the setting, must be filename compatible, e.g.: setting
     * @param value value of the setting
     */
    //% blockId=settings_write_number block="settings save number %name|as %value"
    //% weight=20 shim=files::settingsSaveNumber
    function settingsSaveNumber(name: string, value: number): void;

    /**
     * Reads a number settings, -1 if not found.
     * @param name name of the settings, must be filename compatible, e.g.: setting
     */
    //% blockId=settings_read_number block="settings read number %name"
    //% weight=19 shim=files::settingsReadNumber
    function settingsReadNumber(name: string): number;
}

// Auto-generated. Do not edit. Really.
