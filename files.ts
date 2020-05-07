/**
* File system operations
*/
//% weight=5 color=#002050 icon="\uf0a0"
namespace files {
    export let NEW_LINE = "\r\n";
    export let TAB = "\t";

    /**
     * Appends text and a new line to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="files_append_line" block="file %filename|append line %text"
    //% blockExternalInputs=1 weight=90 blockGap=8
    export function appendLine(filename: string, text: string): void {
        const file = open(filename);
        file.seek(0, FileSystemSeekFlags.End);
        file.writeString(text);
        file.writeString(NEW_LINE);
        file.close();
    }

    /**
     * Appends text to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="fs_append_string" block="file %filename|append string %text"
    //% blockExternalInputs=1 weight=86 blockGap=8
    export function appendString(filename: string, text: string): void {
        const file = open(filename);
        file.seek(0, FileSystemSeekFlags.End);
        file.writeString(text);
        file.close();
    }

    /**
    * Appends a number to a file
    * @param filename file name, eg: "output.txt"
    * @param value the value to write to the file
    */
    //% blockId="fs_append_number" block="file %filename|append number %value"
    //% blockExternalInputs=1 weight=85
    export function appendNumber(filename: string, value: number) {
        const file = open(filename);
        file.seek(0, FileSystemSeekFlags.End);
        file.writeString(value.toString());
        file.close();
    }

    /**
     * Appends a buffer to the end of the file
     * @param filename 
     * @param buffer 
     */
    //% blockId="fs_append_buffer" block="file %filename|append buffer $buffer"
    //% weight=84
    export function appendBuffer(filename: string, buffer: Buffer) {
        const file = open(filename);
        file.seek(0, FileSystemSeekFlags.End);
        file.writeBuffer(buffer);
        file.close();
    }

    /**
     * Opens a new file
     * @param filename file name to open, eg: "data.txt"
     */
    //% blockGap=8
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
    //% weight=20 blockGap=8
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
        //% blockGap=8
        //% blockId=fs_file_open block="%this|open" advanced=true
        public open(): void {
            if (this.fd < 0)
                this.fd = files.fsOpen(this.path);
        }

        /**
         * Flushes all pending write operations to FLASH
         */
        //% blockGap=8
        //% blockId=fs_file_flush block="%this|flush" advanced=true
        public flush(): void {
            files.fsFlush(this.fd);
        }

        /**
         * Closes the file and writes all pending data to FLASH
         */
        //% blockGap=8
        //% blockId=fs_file_close block="%this|close" advanced=true
        public close(): void {
            files.fsClose(this.fd);
            this.fd = -1;
        }

        /**
         * Removes the file
         */
        //% blockGap=8
        //% blockId=fs_file_remove block="%this|remove" advanced=true
        public remove(): void {
            files.fsRemove(this.path);
            this.fd = -1;
        }

        /**
         * Move the current position of a file handle, to be used for
         * subsequent read/write calls.
         */
        //% blockGap=8
        //% blockId=fs_file_seek block="%this|seek offset %offset|from %flags" advanced=true
        public seek(offset: number, flags: FileSystemSeekFlags): void {
            files.fsSeek(this.fd, offset, flags);
        }

        /**
         * Gets the current position in the file
         */
        //% blockGap=8
        //% blockId=fs_file_position block="%this|position" advanced=true
        public get position(): number {
            return files.fsSeek(this.fd, 0, FileSystemSeekFlags.Current);
        }

        /**
         * Seeks to a position in this file instance from the beginning of the file.
         * @param position the offset from the start of the file
         */
        //% blockGap=8 advanced=true
        //% blockId=fs_file_set_position block="%this|set position %position"
        public set position(position: number) {
            files.fsSeek(this.fd, position, FileSystemSeekFlags.Set);
        }

        /**
         * Returns the file length in bytes
         */
        //% blockGap=8 advanced=true
        //% blockId=fs_file_length block="%this|length"
        public get length(): number {
            files.fsSeek(this.fd, 0, FileSystemSeekFlags.End);
            const l = files.fsSeek(this.fd, 0, FileSystemSeekFlags.Current);
            files.fsSeek(this.fd, 0, FileSystemSeekFlags.Set);
            return l;
       }

        /**
         * Write a string to the file.
         */
        //% blockGap=8
        //% blockId=fs_file_write_string block="%this|write string %text" advanced=true
        public writeString(text: string): void {
            files.fsWriteString(this.fd, text);
        }

        /**
         * Write data to the file.
         */
        //% blockGap=8
        //% blockId=fs_file_write_buffer block="%this|write buffer %buffer" advanced=true
        public writeBuffer(buffer: Buffer): void {
            files.fsWriteBuffer(this.fd, buffer);
        }

        /**
         * Reads the file at the current position and fills a buffer
         * @param length maximum number of bytes to read, if negative reads the entire file eg: 64
         */
        //% blockGap=8
        //% blockId=fs_file_read_buffer block="%this|read buffer $length (bytes)" advanced=true
        public readBuffer(length: number): Buffer {
            const p = this.position;
            const l = this.length;
            if (length < 0)
                length = l;
            length = Math.min(length, l - p);
            return files.fsReadBuffer(this.fd, length);
        }

        /**
         * Reads the file at the current position and a string.
         * @param length maximum number of bytes to read, if negative reads the entire file eg: 64
         */
        //% blockGap=8
        //% blockId=fs_file_read_string block="%this|read string $length (chars)" advanced=true
        public readString(length: number): String {
            const p = this.position;
            const l = this.length;
            if (length < 0)
                length = l;
            length = Math.min(length, l - p);
            return files.fsReadString(this.fd, length);
        }

        /**
         * Reads the next character in the file at the current position
         */
        //% blockGap=8
        //% blockId=fs_file_read block="%this|read" advanced=true
        public read(): number {
            return files.fsRead(this.fd);
        }

        /**
         * Reads the next line in the file at the current position
         */
        //% blockGap=8
        //% blockId=fs_file_read_line block="%this|read line" advanced=true
        public readLine(): string {
            const nl = NEW_LINE;
            const length = this.length;
            const start = this.position;
            // scan until new line or eol
            let end = start;
            while (end < length) {
                let c = this.read();
                if (c == 13 /* \r */ && this.position < length) {
                    // try scanning for next character
                    c = this.read();
                }
                if (c == 10 /* \n */) {
                    // found a new line
                    break;
                }
                // update end position
                end = this.position;
            }

            // end of file shortcut
            if (start == end) return "";

            // remember current position
            const pos = this.position;
            this.position = start; // reset current cursor
            const line = fsReadString(this.fd, end - start); // read line
            this.position = pos; // skip new line
            return line;
        }
    }
}
