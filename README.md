fsoJS
=====

File System Object wrapper for simple file manipulation.

Methods:
--------
  open( filename [, params ] )
  
    filename: string containing file path to open or to be created
    params: object containing arguments for OpenTextFile method of FileSystemObject object

  open() returns an object with following methods:
    
    read()            - reads file content and returns it as a string
    write( string )   - writes string to a file and returns parent object
    append( string )  - appends a string and returns parent object
    prepend( string ) - prepends a string and returns parent object


Examples:
---------

  create a file:
  
    fso.open('file.txt')

  write to a file:
  
    fso.open('file.txt').write('Hello world');

  append a string and read the content:
  
    fso.open('file.txt').append('!!!').prepend('---').read();
    // this will return '---Hello world!!!'