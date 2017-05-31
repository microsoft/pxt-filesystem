/**
* File system operations
*/
//% weight=5 color=#002050 icon="\uf0a0"
namespace files {
    /**
    * Appends a number to a file
    * @param filename file name, eg: "output.txt"
    * @param value the value to write to the file
    */
    //% blockId="fs_append_number" block="file %filename|append number %value"
    //% blockExternalInputs=1 weight=85
    export function appendNumber(filename: string, value: number) {
        files.appendString(filename, value.toString());
    }

    /**
     * Opens a new file
     * @param filename file name to open, eg: "data.txt"
     */
    //% blockId=fs_open block="open %filename" advanced=true
    export function open(filename: string): File {
        const f = new File(filename);
        f.open();
        return f;
    }

    /**
    * Writes a number settings
    * @param name name of the setting, must be filename compatible, e.g.: setting
    * @param value value of the setting
    */
    //% blockId=settings_write_number block="settings save number %name|as %value"
    //% weight=20
    export function settingsSaveNumber(name: string, value: number) {
        files.createDirectory("settings");
        const fn = "settings/" + name;
        files.remove(fn);
        files.appendNumber(fn, value);
    }

    /**
     * A file on flash
     */
    //%
    export class File {
        private path: string;
        private fd: number;

        /**
         * Creates a new file instance
         */
        constructor(path: string) {
            this.path = path;
            this.fd = -1;
        }

        /**
         * Opens the file
         */
        //% blockId=fs_file_open block="%this|open" advanced=true
        public open(): void {
            if (this.fd < 0)
                this.fd = files.fsOpen(this.path);
        }

        /**
         * Flushes all pending write operations to FLASH
         */
        //% blockId=fs_file_flush block="%this|close" advanced=true
        public flush(): void {
            files.fsFlush(this.fd);
        }

        /**
         * Closes the file and writes all pending data to FLASH
         */
        //% blockId=fs_file_close block="%this|close" advanced=true
        public close(): void {
            files.fsClose(this.fd);
            this.fd = -1;
        }

        /**
         * Removes the file
         */
        //% blockId=fs_file_remove block="%this|remove" advanced=true
        public remove(): void {
            files.fsRemove(this.path);
            this.fd = -1;
        }

        /**
         * Move the current position of a file handle, to be used for
         * subsequent read/write calls.
         */
        //% blockId=fs_file_seek block="%this|seek offset %offset|from %flags" advanced=true
        public seek(offset: number, flags: FileSystemSeekFlags): void {
            files.fsSeek(this.fd, offset, flags);
        }

        /**
         * Write a string to the file.
         */
        //% blockId=fs_file_write_string block="%this|write string %text" advanced=true
        public writeString(text: string): void {
            files.fsWriteString(this.fd, text);
        }

        /**
         * Write data to the file.
         */
        //% blockId=fs_file_write_buffer block="%this|write buffer %buffer" advanced=true
        public writeBuffer(buffer: Buffer): void {
            files.fsWriteBuffer(this.fd, buffer);
        }

        /**
         * Reads the file at the current position and fills a buffer
         * @param length maximum number of bytes to read, eg: 64
         */
        //% blockId=fs_file_read_buffer block="%this|read buffer (bytes) %length" advanced=true
        public readBuffer(length: number): Buffer {
            return files.fsReadBuffer(this.fd, length);
        }

        /**
         * Reads the next character in the file at the current position
         */
        //% blockId=fs_file_read block="%this|read" advanced=true
        public read(): number {
            return files.fsRead(this.fd);
        }
    }
}