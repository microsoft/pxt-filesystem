#include "pxt.h"
#include "MicroBitFile.h"
#include "MicroBitFileSystem.h"

using namespace pxt;

/**
* File system operations
*/
//% weight=5 color=#002050 icon="\uf0a0"
namespace files
{
// Initializes file system. Must be called before any FS operation.
// built-in size computation for file system
// does not take into account size changes
// for compiled code
void initFileSystem()
{
    if (MicroBitFileSystem::defaultFileSystem == NULL)
    {
        /*
        char buf[128];
        sprintf(buf, "Init FS: %x %d\r\n", pxt::afterProgramPage(), pxt::programSize());
        uBit.serial.send(ManagedString(buf));
        */
        new MicroBitFileSystem(pxt::afterProgramPage());
    }
}

/**
    * Appends text and a new line to a file
    * @param filename file name, eg: "output.txt"
    * @param text the string to append to the end of the file
    */
//% blockId="files_append_line" block="file %filename|append line %text"
//% blockExternalInputs=1 weight=90 blockGap=8
void appendLine(StringData *filename, StringData *text)
{
    initFileSystem();
    ManagedString fn(filename);
    ManagedString t(text);
    MicroBitFile f(fn);
    f.append(t);
    f.append("\r\n");
    f.close();
}

/**
    * Appends text to a file
    * @param filename file name, eg: "output.txt"
    * @param text the string to append to the end of the file
    */
//% blockId="fs_append_string" block="file %filename|append string %text"
//% blockExternalInputs=1 weight=86 blockGap=8
void appendString(StringData *filename, StringData *text)
{
    initFileSystem();
    ManagedString fn(filename);
    ManagedString t(text);
    MicroBitFile f(fn);
    f.append(t);
    f.close();
}

/**
* Reads the content of the file to send it to serial
* @param filename file name, eg: "output.txt"
*/
//% blockId="fs_write_to_serial" block="file %filename|read to serial"
//% weight=80
void readToSerial(StringData* filename) {
    initFileSystem();
    ManagedString fn(filename);
    MicroBitFile f(fn);
    char buf[32];
    int read = 0;
    while((read = f.read(buf, 32 * sizeof(char))) > 0) {
         uBit.serial.send((uint8_t*)buf, read * sizeof(char));
    }   
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
    ManagedString fn(filename);
    MicroBitFileSystem::defaultFileSystem->remove(fn.toCharArray());
}

/**
* Creates a directory
* @param name full qualified path to the new directory
*/
//% advanced=true weight=10
//% blockId=files_create_directory block="files create directory %name"
void createDirectory(StringData* name) {
    initFileSystem();
    ManagedString fn(name);
    MicroBitFileSystem::defaultFileSystem->createDirectory(fn.toCharArray());
}

/** 
* Writes a number settings
* @param name name of the setting, must be filename compatible, e.g.: setting
* @param value value of the setting
*/
//% blockId=settings_write_number block="settings save number %name|as %value"
//% weight=20
void settingsSaveNumber(StringData* name, int value) {
    initFileSystem();
    MicroBitFileSystem::defaultFileSystem->createDirectory("settings");
    MicroBitFile f("settings/" + ManagedString(name));
    f.write(value);
    f.close();
}

/**
* Reads a number settings, -1 if not found.
* @param name name of the settings, must be filename compatible, e.g.: setting
*/
//% blockId=settings_read_number block="settings read number %name"
//% weight=19
int settingsReadNumber(StringData* name) {
    initFileSystem();
    MicroBitFile f("settings/" + ManagedString(name));
    if (!f.isValid()) 
        return -1;
    ManagedString v;
    ManagedString buff;
    do {
        buff = f.read(32);        
        v = v + buff;
    } while(buff.length() > 0);
    return atoi(v.toCharArray());
}

}
