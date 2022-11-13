# chrome-fs
Use the Node `fs` API in Chrome Apps

This module is used by [chromiumify](https://github.com/chromiumify)

## Usage 

This library can be used directly with your browserify builds with targeting Chrome Packaged Apps. 

```
$ npm install chrome-fs --save
$ browserify -r chrome-fs:fs index.js -o bundle.js
```

## API Status 

This list is based on the node.js documentation https://nodejs.org/api/fs.html 
Sync apis won't be supported they are listed here https://github.com/No9/chrome-fs/wiki/API-Mapping 

#### fs
- [x] fs.rename(oldPath, newPath, callback)
- [x] fs.ftruncate(fd, len, callback)
- [x] fs.truncate(path, len, callback)
- [x] fs.chown(path, uid, gid, callback)
- [x] fs.fchown(fd, uid, gid, callback)
- [ ] fs.lchown(path, uid, gid, callback)
- [x] fs.chmod(path, mode, callback)
- [x] fs.fchmod(fd, mode, callback)
- [ ] fs.lchmod(path, mode, callback)
- [X] fs.stat(path, callback)
- [ ] fs.lstat(path, callback)
- [x] fs.fstat(fd, callback)
- [ ] fs.link(srcpath, dstpath, callback)
- [ ] fs.symlink(srcpath, dstpath[, type], callback)
- [ ] fs.readlink(path, callback)
- [ ] fs.realpath(path[, cache], callback)
- [x] fs.unlink(path, callback)
- [x] fs.rmdir(path, callback)
- [x] fs.mkdir(path[, mode], callback)
- [x] fs.readdir(path, callback)
- [x] fs.close(fd, callback)
- [x] fs.open(path, flags[, mode], callback)
- [ ] fs.utimes(path, atime, mtime, callback)
- [ ] fs.futimes(fd, atime, mtime, callback)
- [x] fs.write(fd, buffer, offset, length[, position], callback)
- [x] fs.write(fd, data[, position[, encoding]], callback)
- [x] fs.read(fd, buffer, offset, length, position, callback)
- [x] fs.readFile(filename[, options], callback)
- [x] fs.writeFile(filename, data[, options], callback)
- [x] fs.appendFile(filename, data[, options], callback)
- [ ] fs.watchFile(filename[, options], listener)
- [ ] fs.unwatchFile(filename[, listener])
- [ ] fs.watch(filename[, options][, listener])
- [x] fs.exists(path, callback)
- [ ] fs.access(path[, mode], callback)
- [x] fs.createReadStream(path[, options])
- [x] fs.createWriteStream(path[, options])

#### Class: - fs.Stats 
- [ ] fs.Stats
- [ ] Stat Time Values

#### Class: - fs.ReadStream 
- [x] fs.ReadStream
- [x] Event: 'open'

#### Class: - fs.WriteStream 
- [x] fs.WriteStream
- [x] Event: 'open'
- [x] file.bytesWritten

#### Class: - fs.FSWatcher 
- [ ] fs.FSWatcher
- [ ] watcher.close()
- [ ] Event: 'change'
- [ ] Event: 'error'

## Test 

```
$ npm test
```

This will load the folder `test/chrome-app` as an unpacked extension in chrome.
Test currently designed for Chrome on Windows and Linux Canary on Mac other variants accepted

## Permissions 

It is recommended that the following permissions are added to your chrome packaged app for this module.

```
  "permissions": [
    "unlimitedStorage"
  ]
```

## Caveats 

### Relative Directories

Chrome Packaged Apps don't have the notion of current working directory ```CWD```.
So relative paths are not escapted they are trimmed to be relative from root 
i.e. 
`../../direct1/file1` Will resolve to `/direct1/file1`

`.` Will resolve to `/`

### Ownership Mod Mapping

Chrome Packaged Apps allow you to see and edit the filesystem from the dev tools so the `chown, fchown, chmod, fmod` calls are there for compatibility only.
Any chown call *will not* be reflected in `stat` 

### Stat 

Best effort has been made to support `stat` but the Chrome File System is not a complete implementation.
Files have `size` and `last modified` but directories have no size and default to the start of epoc for last modified. 

### Encoding 

Currently only UTF-8 is supported

### File Extensions

There seems to be an issue around saving files in chomefs 

# Contributors 

anton whalley @no9 