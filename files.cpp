#include "pxt.h"
#include "MicroBitFile.h"
#include "MicroBitFileSystem.h"

using namespace pxt;

/**
* File system operations
*/
//% weight=5 color=#002050
namespace files
{
// Initializes file system. Must be called before any FS operation.
// built-in size computation for file system
// does not take into account size changes
// for compiled code
initFileSystem()
{
    if (MicroBitFileSystem::defaultFileSystem == NULL)
    {
        MicroBitFileSystem(pxt::afterProgramPage());
    }
}

/**
    * Appends text and a new line to a file
    * @param filename file name, eg: "output.txt"
    * @param text the string to append to the end of the file
    */
//% blockId="files_append_line" block="file %filename|append string %text"
//% blockExternalInputs=1 weight=90 blockGap=8
void appendLine(StringData *filename, StringData *text)
{
    if (!text)
        return;

    initFileSystem();
    MicroBitFile f(filename);
    f.append(text);
    f.append("\r\n");
    f.close();
}

/**
    * Appends text and a new line to a file
    * @param filename file name, eg: "output.txt"
    * @param text the string to append to the end of the file
    */
//% blockId="fs_append_string" block="file %filename|append line %text"
//% blockExternalInputs=1 weight=86 blockGap=8
void appendString(StringData *filename, StringData *text)
{
    if (!text)
        return;

    initFileSystem();
    MicroBitFile f(filename);
    f.append(text);
    f.close();
}

/**
    * Removes the file. There is no undo for this operation.
    * @param filename name of the file to remove, eg: "output.txt"
    */
//% blockId="fs_remove" block="file remove %filename"
//% weight=50 advanced=true
void remove(StringData *filename)
{
    initFileSystem();
    MicroBitFile f(filename);
    f.remove();
}
}