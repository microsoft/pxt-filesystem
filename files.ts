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
     * A file on flash
     */
    class File {
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
            this.fd = 0;
        }

        /**
         * Removes the current file from the FLASH
         */
        //% blockId=fs_file_remove block="%this|remove" advanced=true
        public remove(): void {
            files.fsRemove(this.fd);
            this.fd = 0;
        }

        /**
         * Move the current position of a file handle, to be used for
         * subsequent read/write calls.
         */
        //% blockId=fs_file_seek block="%this|seek offset %offset|from %flags" advanced=true
        public seek(offset: number, flags: FileSystemSeekFlags): number {
            return files.fsSeek(this.fd, offset, flags);
        }

        /**
         * Write data to the file.
         */
        //% blockId=fs_file_write_ buffer block="%this|write buffer %buffer" advanced=true
        public writeBuffer(buffer: Buffer): number {
            return files.fsWrite(buffer);
        }
    }
}