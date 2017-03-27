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
     * @param filename file name to open
     */    
    export function open(filename: string): File {
        const f = new File(filename);
        f.open(FileSystemOpenFlags.Read);
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
        constructor(path: string, fd: number) {
            this.path = path;
            this.fd = fd;
        }

        /**
         * Opens the file
         */
        public open(flags: number): void {
            // already opened
            this.fd = files.fsOpen(this.path, flags);
        }

        /**
         * Flushes all pending write operations to FLASH
         */
        public flush() : void {
            files.fsFlush(this.fd);
        }

        /**
         * Closes the file and writes all pending data to FLASH
         */
        public close(): void {            
            files.fsClose(this.fd);
            this.fd = 0;
        }

        /**
         * Move the current position of a file handle, to be used for
         * subsequent read/write calls.
         */
        public seek(offset: number, flags: FileSystemSeekFlags): number {
            return files.fsSeek(this.fd, offset, flags);
        }

        /**
         * Write data to the file.
         */
        public writeBuffer(buffer: Buffer): number {
            return files.fsWrite(buffer);
        }
    }
}