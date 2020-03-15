(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["vendor"],{

/***/ "../node_modules/@nativescript/core/debugger/debugger.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", {
  value: true
});
var network;

function getNetwork() {
  return network;
}

exports.getNetwork = getNetwork;

function setNetwork(newNetwork) {
  network = newNetwork;
}

exports.setNetwork = setNetwork;
var dom;

function getDOM() {
  return dom;
}

exports.getDOM = getDOM;

function setDOM(newDOM) {
  dom = newDOM;
}

exports.setDOM = setDOM;
var css;

function getCSS() {
  return css;
}

exports.getCSS = getCSS;

function setCSS(newCSS) {
  css = newCSS;
}

exports.setCSS = setCSS;
var NetworkAgent;

(function (NetworkAgent) {
  function responseReceived(requestId, result, headers) {
    var requestIdStr = requestId.toString();
    var mimeType = headers["Content-Type"] || headers["content-type"] || "application/octet-stream";
    var contentLengthHeader = headers["Content-Length"] || headers["content-length"];
    var contentLength = parseInt(contentLengthHeader, 10);

    if (isNaN(contentLength)) {
      contentLength = 0;
    }

    var response = {
      url: result.url || "",
      status: result.statusCode,
      statusText: result.statusText || "",
      headers: headers,
      mimeType: mimeType,
      fromDiskCache: false,
      connectionReused: true,
      connectionId: 0,
      encodedDataLength: contentLength,
      securityState: "info"
    };
    var responseData = {
      requestId: requestIdStr,
      type: mimeTypeToType(response.mimeType),
      response: response,
      timestamp: getTimeStamp()
    };

    global.__inspector.responseReceived(responseData);

    global.__inspector.loadingFinished({
      requestId: requestIdStr,
      timestamp: getTimeStamp(),
      encodedDataLength: contentLength
    });

    var hasTextContent = responseData.type === "Document" || responseData.type === "Script";
    var data;

    if (!hasTextContent) {
      if (responseData.type === "Image") {
        var bitmap = result.responseAsImage;

        if (bitmap) {
          var outputStream = new java.io.ByteArrayOutputStream();
          bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, outputStream);
          var base64Image = android.util.Base64.encodeToString(outputStream.toByteArray(), android.util.Base64.DEFAULT);
          data = base64Image;
        }
      }
    } else {
      data = result.responseAsString;
    }

    var successfulRequestData = {
      requestId: requestIdStr,
      data: data,
      hasTextContent: hasTextContent
    };

    global.__inspector.dataForRequestId(successfulRequestData);
  }

  NetworkAgent.responseReceived = responseReceived;

  function requestWillBeSent(requestId, options) {
    var request = {
      url: options.url,
      method: options.method,
      headers: options.headers || {},
      postData: options.content ? options.content.toString() : "",
      initialPriority: "Medium",
      referrerPolicy: "no-referrer-when-downgrade"
    };
    var requestData = {
      requestId: requestId.toString(),
      url: request.url,
      request: request,
      timestamp: getTimeStamp(),
      type: "Document",
      wallTime: 0
    };

    global.__inspector.requestWillBeSent(requestData);
  }

  NetworkAgent.requestWillBeSent = requestWillBeSent;

  function getTimeStamp() {
    var d = new Date();
    return Math.round(d.getTime() / 1000);
  }

  function mimeTypeToType(mimeType) {
    var type = "Document";

    if (mimeType) {
      if (mimeType.indexOf("image") === 0) {
        type = "Image";
      } else if (mimeType.indexOf("javascript") !== -1 || mimeType.indexOf("json") !== -1) {
        type = "Script";
      }
    }

    return type;
  }
})(NetworkAgent = exports.NetworkAgent || (exports.NetworkAgent = {}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/@nativescript/core/file-system/file-system-access.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var text_1 = __webpack_require__("../node_modules/@nativescript/core/text/text.js");

var utils_1 = __webpack_require__("../node_modules/@nativescript/core/utils/utils.js");

var FileSystemAccess = function () {
  function FileSystemAccess() {
    this.readText = this.readTextSync.bind(this);
    this.read = this.readSync.bind(this);
    this.writeText = this.writeTextSync.bind(this);
    this.write = this.writeSync.bind(this);
  }

  FileSystemAccess.prototype.getLastModified = function (path) {
    var fileManager = NSFileManager.defaultManager;
    var attributes = fileManager.attributesOfItemAtPathError(path);

    if (attributes) {
      return attributes.objectForKey("NSFileModificationDate");
    } else {
      return new Date();
    }
  };

  FileSystemAccess.prototype.getFileSize = function (path) {
    var fileManager = NSFileManager.defaultManager;
    var attributes = fileManager.attributesOfItemAtPathError(path);

    if (attributes) {
      return attributes.objectForKey("NSFileSize");
    } else {
      return 0;
    }
  };

  FileSystemAccess.prototype.getParent = function (path, onError) {
    try {
      var fileManager = NSFileManager.defaultManager;
      var nsString = NSString.stringWithString(path);
      var parentPath = nsString.stringByDeletingLastPathComponent;
      var name_1 = fileManager.displayNameAtPath(parentPath);
      return {
        path: parentPath.toString(),
        name: name_1
      };
    } catch (exception) {
      if (onError) {
        onError(exception);
      }

      return undefined;
    }
  };

  FileSystemAccess.prototype.getFile = function (path, onError) {
    try {
      var fileManager = NSFileManager.defaultManager;
      var exists = fileManager.fileExistsAtPath(path);

      if (!exists) {
        var parentPath = this.getParent(path, onError).path;

        if (!fileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(parentPath, true, null) || !fileManager.createFileAtPathContentsAttributes(path, null, null)) {
          if (onError) {
            onError(new Error("Failed to create file at path '" + path + "'"));
          }

          return undefined;
        }
      }

      var fileName = fileManager.displayNameAtPath(path);
      return {
        path: path,
        name: fileName,
        extension: this.getFileExtension(path)
      };
    } catch (exception) {
      if (onError) {
        onError(exception);
      }

      return undefined;
    }
  };

  FileSystemAccess.prototype.getFolder = function (path, onError) {
    try {
      var fileManager = NSFileManager.defaultManager;
      var exists = this.folderExists(path);

      if (!exists) {
        try {
          fileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(path, true, null);
        } catch (ex) {
          if (onError) {
            onError(new Error("Failed to create folder at path '" + path + "': " + ex));
          }

          return undefined;
        }
      }

      var dirName = fileManager.displayNameAtPath(path);
      return {
        path: path,
        name: dirName
      };
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to create folder at path '" + path + "'"));
      }

      return undefined;
    }
  };

  FileSystemAccess.prototype.getExistingFolder = function (path, onError) {
    try {
      var fileManager = NSFileManager.defaultManager;
      var exists = this.folderExists(path);

      if (exists) {
        var dirName = fileManager.displayNameAtPath(path);
        return {
          path: path,
          name: dirName
        };
      }

      return undefined;
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to get folder at path '" + path + "'"));
      }

      return undefined;
    }
  };

  FileSystemAccess.prototype.eachEntity = function (path, onEntity, onError) {
    if (!onEntity) {
      return;
    }

    this.enumEntities(path, onEntity, onError);
  };

  FileSystemAccess.prototype.getEntities = function (path, onError) {
    var fileInfos = new Array();

    var onEntity = function onEntity(entity) {
      fileInfos.push(entity);
      return true;
    };

    var errorOccurred;

    var localError = function localError(error) {
      if (onError) {
        onError(error);
      }

      errorOccurred = true;
    };

    this.enumEntities(path, onEntity, localError);

    if (!errorOccurred) {
      return fileInfos;
    }

    return null;
  };

  FileSystemAccess.prototype.fileExists = function (path) {
    var result = this.exists(path);
    return result.exists;
  };

  FileSystemAccess.prototype.folderExists = function (path) {
    var result = this.exists(path);
    return result.exists && result.isDirectory;
  };

  FileSystemAccess.prototype.exists = function (path) {
    var fileManager = NSFileManager.defaultManager;
    var isDirectory = new interop.Reference(interop.types.bool, false);
    var exists = fileManager.fileExistsAtPathIsDirectory(path, isDirectory);
    return {
      exists: exists,
      isDirectory: isDirectory.value
    };
  };

  FileSystemAccess.prototype.concatPath = function (left, right) {
    return NSString.pathWithComponents([left, right]).toString();
  };

  FileSystemAccess.prototype.deleteFile = function (path, onError) {
    this.deleteEntity(path, onError);
  };

  FileSystemAccess.prototype.deleteFolder = function (path, onError) {
    this.deleteEntity(path, onError);
  };

  FileSystemAccess.prototype.emptyFolder = function (path, onError) {
    var fileManager = NSFileManager.defaultManager;
    var entities = this.getEntities(path, onError);

    if (!entities) {
      return;
    }

    for (var i = 0; i < entities.length; i++) {
      try {
        fileManager.removeItemAtPathError(entities[i].path);
      } catch (ex) {
        if (onError) {
          onError(new Error("Failed to empty folder '" + path + "': " + ex));
        }

        return;
      }
    }
  };

  FileSystemAccess.prototype.rename = function (path, newPath, onError) {
    var fileManager = NSFileManager.defaultManager;

    try {
      fileManager.moveItemAtPathToPathError(path, newPath);
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to rename '" + path + "' to '" + newPath + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.getLogicalRootPath = function () {
    var mainBundlePath = NSBundle.mainBundle.bundlePath;
    var resolvedPath = NSString.stringWithString(mainBundlePath).stringByResolvingSymlinksInPath;
    return resolvedPath;
  };

  FileSystemAccess.prototype.getDocumentsFolderPath = function () {
    return this.getKnownPath(9);
  };

  FileSystemAccess.prototype.getTempFolderPath = function () {
    return this.getKnownPath(13);
  };

  FileSystemAccess.prototype.getCurrentAppPath = function () {
    return utils_1.ios.getCurrentAppPath();
  };

  FileSystemAccess.prototype.readTextAsync = function (path, encoding) {
    var actualEncoding = encoding || text_1.encoding.UTF_8;
    return new Promise(function (resolve, reject) {
      try {
        NSString.stringWithContentsOfFileEncodingCompletion(path, actualEncoding, function (result, error) {
          if (error) {
            reject(error);
          } else {
            resolve(result.toString());
          }
        });
      } catch (ex) {
        reject(new Error("Failed to read file at path '" + path + "': " + ex));
      }
    });
  };

  FileSystemAccess.prototype.readTextSync = function (path, onError, encoding) {
    var actualEncoding = encoding || text_1.encoding.UTF_8;

    try {
      var nsString = NSString.stringWithContentsOfFileEncodingError(path, actualEncoding);
      return nsString.toString();
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to read file at path '" + path + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.readAsync = function (path) {
    return new Promise(function (resolve, reject) {
      try {
        NSData.dataWithContentsOfFileCompletion(path, resolve);
      } catch (ex) {
        reject(new Error("Failed to read file at path '" + path + "': " + ex));
      }
    });
  };

  FileSystemAccess.prototype.readSync = function (path, onError) {
    try {
      return NSData.dataWithContentsOfFile(path);
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to read file at path '" + path + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.writeTextAsync = function (path, content, encoding) {
    var nsString = NSString.stringWithString(content);
    var actualEncoding = encoding || text_1.encoding.UTF_8;
    return new Promise(function (resolve, reject) {
      try {
        nsString.writeToFileAtomicallyEncodingCompletion(path, true, actualEncoding, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (ex) {
        reject(new Error("Failed to write file at path '" + path + "': " + ex));
      }
    });
  };

  FileSystemAccess.prototype.writeTextSync = function (path, content, onError, encoding) {
    var nsString = NSString.stringWithString(content);
    var actualEncoding = encoding || text_1.encoding.UTF_8;

    try {
      nsString.writeToFileAtomicallyEncodingError(path, false, actualEncoding);
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to write to file '" + path + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.writeAsync = function (path, content) {
    return new Promise(function (resolve, reject) {
      try {
        content.writeToFileAtomicallyCompletion(path, true, function () {
          resolve();
        });
      } catch (ex) {
        reject(new Error("Failed to write file at path '" + path + "': " + ex));
      }
    });
  };

  FileSystemAccess.prototype.writeSync = function (path, content, onError) {
    try {
      content.writeToFileAtomically(path, true);
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to write to file '" + path + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.getKnownPath = function (folderType) {
    var fileManager = NSFileManager.defaultManager;
    var paths = fileManager.URLsForDirectoryInDomains(folderType, 1);
    var url = paths.objectAtIndex(0);
    return url.path;
  };

  FileSystemAccess.prototype.getFileExtension = function (path) {
    var dotIndex = path.lastIndexOf(".");

    if (dotIndex && dotIndex >= 0 && dotIndex < path.length) {
      return path.substring(dotIndex);
    }

    return "";
  };

  FileSystemAccess.prototype.deleteEntity = function (path, onError) {
    var fileManager = NSFileManager.defaultManager;

    try {
      fileManager.removeItemAtPathError(path);
    } catch (ex) {
      if (onError) {
        onError(new Error("Failed to delete file at path '" + path + "': " + ex));
      }
    }
  };

  FileSystemAccess.prototype.enumEntities = function (path, callback, onError) {
    try {
      var fileManager = NSFileManager.defaultManager;
      var files = void 0;

      try {
        files = fileManager.contentsOfDirectoryAtPathError(path);
      } catch (ex) {
        if (onError) {
          onError(new Error("Failed to enum files for folder '" + path + "': " + ex));
        }

        return;
      }

      for (var i = 0; i < files.count; i++) {
        var file = files.objectAtIndex(i);
        var info = {
          path: this.concatPath(path, file),
          name: file,
          extension: ""
        };

        if (!this.folderExists(this.joinPath(path, file))) {
          info.extension = this.getFileExtension(info.path);
        }

        var retVal = callback(info);

        if (retVal === false) {
          break;
        }
      }
    } catch (ex) {
      if (onError) {
        onError(ex);
      }
    }
  };

  FileSystemAccess.prototype.getPathSeparator = function () {
    return "/";
  };

  FileSystemAccess.prototype.normalizePath = function (path) {
    var nsString = NSString.stringWithString(path);
    var normalized = nsString.stringByStandardizingPath;
    return normalized;
  };

  FileSystemAccess.prototype.joinPath = function (left, right) {
    var nsString = NSString.stringWithString(left);
    return nsString.stringByAppendingPathComponent(right);
  };

  FileSystemAccess.prototype.joinPaths = function (paths) {
    return utils_1.ios.joinPaths.apply(utils_1.ios, paths);
  };

  return FileSystemAccess;
}();

exports.FileSystemAccess = FileSystemAccess;

/***/ }),

/***/ "../node_modules/@nativescript/core/file-system/file-system.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var file_system_access_1 = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system-access.js");

var profiling_1 = __webpack_require__("../node_modules/@nativescript/core/profiling/profiling.js");

var fileAccess;

function getFileAccess() {
  if (!fileAccess) {
    fileAccess = new file_system_access_1.FileSystemAccess();
  }

  return fileAccess;
}

var platform;

function ensurePlatform() {
  if (!platform) {
    platform = __webpack_require__("../node_modules/@nativescript/core/platform/platform.js");
  }
}

function createFile(info) {
  var file = new File();
  file._path = info.path;
  file._name = info.name;
  file._extension = info.extension;
  return file;
}

function createFolder(info) {
  var documents = knownFolders.documents();

  if (info.path === documents.path) {
    return documents;
  }

  var temp = knownFolders.temp();

  if (info.path === temp.path) {
    return temp;
  }

  var folder = new Folder();
  folder._path = info.path;
  folder._name = info.name;
  return folder;
}

var FileSystemEntity = function () {
  function FileSystemEntity() {}

  Object.defineProperty(FileSystemEntity.prototype, "parent", {
    get: function get() {
      var onError = function onError(error) {
        throw error;
      };

      var folderInfo = getFileAccess().getParent(this.path, onError);

      if (!folderInfo) {
        return undefined;
      }

      return createFolder(folderInfo);
    },
    enumerable: true,
    configurable: true
  });

  FileSystemEntity.prototype.remove = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var hasError = false;

      var localError = function localError(error) {
        hasError = true;
        reject(error);
      };

      _this.removeSync(localError);

      if (!hasError) {
        resolve();
      }
    });
  };

  FileSystemEntity.prototype.removeSync = function (onError) {
    if (this._isKnown) {
      if (onError) {
        onError({
          message: "Cannot delete known folder."
        });
      }

      return;
    }

    var fileAccess = getFileAccess();

    if (this instanceof File) {
      fileAccess.deleteFile(this.path, onError);
    } else if (this instanceof Folder) {
      fileAccess.deleteFolder(this.path, onError);
    }
  };

  FileSystemEntity.prototype.rename = function (newName) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var hasError = false;

      var localError = function localError(error) {
        hasError = true;
        reject(error);
      };

      _this.renameSync(newName, localError);

      if (!hasError) {
        resolve();
      }
    });
  };

  FileSystemEntity.prototype.renameSync = function (newName, onError) {
    if (this._isKnown) {
      if (onError) {
        onError(new Error("Cannot rename known folder."));
      }

      return;
    }

    var parentFolder = this.parent;

    if (!parentFolder) {
      if (onError) {
        onError(new Error("No parent folder."));
      }

      return;
    }

    var fileAccess = getFileAccess();
    var path = parentFolder.path;
    var newPath = fileAccess.joinPath(path, newName);

    var localError = function localError(error) {
      if (onError) {
        onError(error);
      }

      return null;
    };

    fileAccess.rename(this.path, newPath, localError);
    this._path = newPath;
    this._name = newName;

    if (this instanceof File) {
      this._extension = fileAccess.getFileExtension(newPath);
    }
  };

  Object.defineProperty(FileSystemEntity.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FileSystemEntity.prototype, "path", {
    get: function get() {
      return this._path;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FileSystemEntity.prototype, "lastModified", {
    get: function get() {
      var value = this._lastModified;

      if (!this._lastModified) {
        value = this._lastModified = getFileAccess().getLastModified(this.path);
      }

      return value;
    },
    enumerable: true,
    configurable: true
  });
  return FileSystemEntity;
}();

exports.FileSystemEntity = FileSystemEntity;

var File = function (_super) {
  __extends(File, _super);

  function File() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  File.fromPath = function (path) {
    var onError = function onError(error) {
      throw error;
    };

    var fileInfo = getFileAccess().getFile(path, onError);

    if (!fileInfo) {
      return undefined;
    }

    return createFile(fileInfo);
  };

  File.exists = function (path) {
    return getFileAccess().fileExists(path);
  };

  Object.defineProperty(File.prototype, "extension", {
    get: function get() {
      return this._extension;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(File.prototype, "isLocked", {
    get: function get() {
      return !!this._locked;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(File.prototype, "size", {
    get: function get() {
      return getFileAccess().getFileSize(this.path);
    },
    enumerable: true,
    configurable: true
  });

  File.prototype.read = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        _this.checkAccess();
      } catch (ex) {
        reject(ex);
        return;
      }

      _this._locked = true;
      getFileAccess().readAsync(_this.path).then(function (result) {
        resolve(result);
        _this._locked = false;
      }, function (error) {
        reject(error);
        _this._locked = false;
      });
    });
  };

  File.prototype.readSync = function (onError) {
    this.checkAccess();
    this._locked = true;
    var that = this;

    var localError = function localError(error) {
      that._locked = false;

      if (onError) {
        onError(error);
      }
    };

    var content = getFileAccess().readSync(this.path, localError);
    this._locked = false;
    return content;
  };

  File.prototype.write = function (content) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        _this.checkAccess();
      } catch (ex) {
        reject(ex);
        return;
      }

      _this._locked = true;
      getFileAccess().writeAsync(_this.path, content).then(function () {
        resolve();
        _this._locked = false;
      }, function (error) {
        reject(error);
        _this._locked = false;
      });
    });
  };

  File.prototype.writeSync = function (content, onError) {
    this.checkAccess();

    try {
      this._locked = true;
      var that_1 = this;

      var localError = function localError(error) {
        that_1._locked = false;

        if (onError) {
          onError(error);
        }
      };

      getFileAccess().writeSync(this.path, content, localError);
    } finally {
      this._locked = false;
    }
  };

  File.prototype.readText = function (encoding) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        _this.checkAccess();
      } catch (ex) {
        reject(ex);
        return;
      }

      _this._locked = true;
      getFileAccess().readTextAsync(_this.path, encoding).then(function (result) {
        resolve(result);
        _this._locked = false;
      }, function (error) {
        reject(error);
        _this._locked = false;
      });
    });
  };

  File.prototype.readTextSync = function (onError, encoding) {
    this.checkAccess();
    this._locked = true;
    var that = this;

    var localError = function localError(error) {
      that._locked = false;

      if (onError) {
        onError(error);
      }
    };

    var content = getFileAccess().readTextSync(this.path, localError, encoding);
    this._locked = false;
    return content;
  };

  File.prototype.writeText = function (content, encoding) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        _this.checkAccess();
      } catch (ex) {
        reject(ex);
        return;
      }

      _this._locked = true;
      getFileAccess().writeTextAsync(_this.path, content, encoding).then(function () {
        resolve();
        _this._locked = false;
      }, function (error) {
        reject(error);
        _this._locked = false;
      });
    });
  };

  File.prototype.writeTextSync = function (content, onError, encoding) {
    this.checkAccess();

    try {
      this._locked = true;
      var that_2 = this;

      var localError = function localError(error) {
        that_2._locked = false;

        if (onError) {
          onError(error);
        }
      };

      getFileAccess().writeTextSync(this.path, content, localError, encoding);
    } finally {
      this._locked = false;
    }
  };

  File.prototype.checkAccess = function () {
    if (this.isLocked) {
      throw new Error("Cannot access a locked file.");
    }
  };

  __decorate([profiling_1.profile], File.prototype, "readTextSync", null);

  return File;
}(FileSystemEntity);

exports.File = File;

var Folder = function (_super) {
  __extends(Folder, _super);

  function Folder() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Folder.fromPath = function (path) {
    var onError = function onError(error) {
      throw error;
    };

    var folderInfo = getFileAccess().getFolder(path, onError);

    if (!folderInfo) {
      return undefined;
    }

    return createFolder(folderInfo);
  };

  Folder.exists = function (path) {
    return getFileAccess().folderExists(path);
  };

  Folder.prototype.contains = function (name) {
    var fileAccess = getFileAccess();
    var path = fileAccess.joinPath(this.path, name);

    if (fileAccess.fileExists(path)) {
      return true;
    }

    return fileAccess.folderExists(path);
  };

  Folder.prototype.clear = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var hasError = false;

      var onError = function onError(error) {
        hasError = true;
        reject(error);
      };

      _this.clearSync(onError);

      if (!hasError) {
        resolve();
      }
    });
  };

  Folder.prototype.clearSync = function (onError) {
    getFileAccess().emptyFolder(this.path, onError);
  };

  Object.defineProperty(Folder.prototype, "isKnown", {
    get: function get() {
      return this._isKnown;
    },
    enumerable: true,
    configurable: true
  });

  Folder.prototype.getFile = function (name) {
    var fileAccess = getFileAccess();
    var path = fileAccess.joinPath(this.path, name);

    var onError = function onError(error) {
      throw error;
    };

    var fileInfo = fileAccess.getFile(path, onError);

    if (!fileInfo) {
      return undefined;
    }

    return createFile(fileInfo);
  };

  Folder.prototype.getFolder = function (name) {
    var fileAccess = getFileAccess();
    var path = fileAccess.joinPath(this.path, name);

    var onError = function onError(error) {
      throw error;
    };

    var folderInfo = fileAccess.getFolder(path, onError);

    if (!folderInfo) {
      return undefined;
    }

    return createFolder(folderInfo);
  };

  Folder.prototype.getEntities = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var hasError = false;

      var localError = function localError(error) {
        hasError = true;
        reject(error);
      };

      var entities = _this.getEntitiesSync(localError);

      if (!hasError) {
        resolve(entities);
      }
    });
  };

  Folder.prototype.getEntitiesSync = function (onError) {
    var fileInfos = getFileAccess().getEntities(this.path, onError);

    if (!fileInfos) {
      return null;
    }

    var entities = new Array();

    for (var i = 0; i < fileInfos.length; i++) {
      if (fileInfos[i].extension) {
        entities.push(createFile(fileInfos[i]));
      } else {
        entities.push(createFolder(fileInfos[i]));
      }
    }

    return entities;
  };

  Folder.prototype.eachEntity = function (onEntity) {
    if (!onEntity) {
      return;
    }

    var onSuccess = function onSuccess(fileInfo) {
      var entity;

      if (fileInfo.extension) {
        entity = createFile(fileInfo);
      } else {
        entity = createFolder(fileInfo);
      }

      return onEntity(entity);
    };

    var onError = function onError(error) {
      throw error;
    };

    getFileAccess().eachEntity(this.path, onSuccess, onError);
  };

  return Folder;
}(FileSystemEntity);

exports.Folder = Folder;
var knownFolders;

(function (knownFolders) {
  var _documents;

  var _temp;

  var _app;

  function documents() {
    if (!_documents) {
      var path_1 = getFileAccess().getDocumentsFolderPath();
      _documents = new Folder();
      _documents._path = path_1;
      _documents._isKnown = true;
    }

    return _documents;
  }

  knownFolders.documents = documents;

  function temp() {
    if (!_temp) {
      var path_2 = getFileAccess().getTempFolderPath();
      _temp = new Folder();
      _temp._path = path_2;
      _temp._isKnown = true;
    }

    return _temp;
  }

  knownFolders.temp = temp;

  function currentApp() {
    if (!_app) {
      var path_3 = getFileAccess().getCurrentAppPath();
      _app = new Folder();
      _app._path = path_3;
      _app._isKnown = true;
    }

    return _app;
  }

  knownFolders.currentApp = currentApp;
  var ios;

  (function (ios) {
    function _checkPlatform(knownFolderName) {
      ensurePlatform();

      if (!platform.isIOS) {
        throw new Error("The \"" + knownFolderName + "\" known folder is available on iOS only!");
      }
    }

    var _library;

    function library() {
      _checkPlatform("library");

      if (!_library) {
        var existingFolderInfo = getExistingFolderInfo(5);

        if (existingFolderInfo) {
          _library = existingFolderInfo.folder;
          _library._path = existingFolderInfo.path;
          _library._isKnown = true;
        }
      }

      return _library;
    }

    ios.library = library;

    var _developer;

    function developer() {
      _checkPlatform("developer");

      if (!_developer) {
        var existingFolderInfo = getExistingFolderInfo(6);

        if (existingFolderInfo) {
          _developer = existingFolderInfo.folder;
          _developer._path = existingFolderInfo.path;
          _developer._isKnown = true;
        }
      }

      return _developer;
    }

    ios.developer = developer;

    var _desktop;

    function desktop() {
      _checkPlatform("desktop");

      if (!_desktop) {
        var existingFolderInfo = getExistingFolderInfo(12);

        if (existingFolderInfo) {
          _desktop = existingFolderInfo.folder;
          _desktop._path = existingFolderInfo.path;
          _desktop._isKnown = true;
        }
      }

      return _desktop;
    }

    ios.desktop = desktop;

    var _downloads;

    function downloads() {
      _checkPlatform("downloads");

      if (!_downloads) {
        var existingFolderInfo = getExistingFolderInfo(15);

        if (existingFolderInfo) {
          _downloads = existingFolderInfo.folder;
          _downloads._path = existingFolderInfo.path;
          _downloads._isKnown = true;
        }
      }

      return _downloads;
    }

    ios.downloads = downloads;

    var _movies;

    function movies() {
      _checkPlatform("movies");

      if (!_movies) {
        var existingFolderInfo = getExistingFolderInfo(17);

        if (existingFolderInfo) {
          _movies = existingFolderInfo.folder;
          _movies._path = existingFolderInfo.path;
          _movies._isKnown = true;
        }
      }

      return _movies;
    }

    ios.movies = movies;

    var _music;

    function music() {
      _checkPlatform("music");

      if (!_music) {
        var existingFolderInfo = getExistingFolderInfo(18);

        if (existingFolderInfo) {
          _music = existingFolderInfo.folder;
          _music._path = existingFolderInfo.path;
          _music._isKnown = true;
        }
      }

      return _music;
    }

    ios.music = music;

    var _pictures;

    function pictures() {
      _checkPlatform("pictures");

      if (!_pictures) {
        var existingFolderInfo = getExistingFolderInfo(19);

        if (existingFolderInfo) {
          _pictures = existingFolderInfo.folder;
          _pictures._path = existingFolderInfo.path;
          _pictures._isKnown = true;
        }
      }

      return _pictures;
    }

    ios.pictures = pictures;

    var _sharedPublic;

    function sharedPublic() {
      _checkPlatform("sharedPublic");

      if (!_sharedPublic) {
        var existingFolderInfo = getExistingFolderInfo(21);

        if (existingFolderInfo) {
          _sharedPublic = existingFolderInfo.folder;
          _sharedPublic._path = existingFolderInfo.path;
          _sharedPublic._isKnown = true;
        }
      }

      return _sharedPublic;
    }

    ios.sharedPublic = sharedPublic;

    function getExistingFolderInfo(pathDirectory) {
      var fileAccess = getFileAccess();
      var folderPath = fileAccess.getKnownPath(pathDirectory);
      var folderInfo = fileAccess.getExistingFolder(folderPath);

      if (folderInfo) {
        return {
          folder: createFolder(folderInfo),
          path: folderPath
        };
      }

      return undefined;
    }
  })(ios = knownFolders.ios || (knownFolders.ios = {}));
})(knownFolders = exports.knownFolders || (exports.knownFolders = {}));

var path;

(function (path_4) {
  function normalize(path) {
    return getFileAccess().normalizePath(path);
  }

  path_4.normalize = normalize;

  function join() {
    var paths = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      paths[_i] = arguments[_i];
    }

    var fileAccess = getFileAccess();
    return fileAccess.joinPaths(paths);
  }

  path_4.join = join;
  path_4.separator = getFileAccess().getPathSeparator();
})(path = exports.path || (exports.path = {}));

/***/ }),

/***/ "../node_modules/@nativescript/core/http/http-request/http-request-common.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getFilenameFromUrl(url) {
  var fs = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system.js");

  var slashPos = url.lastIndexOf("/") + 1;
  var questionMarkPos = url.lastIndexOf("?");
  var actualFileName;

  if (questionMarkPos !== -1) {
    actualFileName = url.substring(slashPos, questionMarkPos);
  } else {
    actualFileName = url.substring(slashPos);
  }

  var result = fs.path.join(fs.knownFolders.documents().path, actualFileName);
  return result;
}

exports.getFilenameFromUrl = getFilenameFromUrl;

/***/ }),

/***/ "../node_modules/@nativescript/core/http/http-request/http-request.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var types = __webpack_require__("../node_modules/@nativescript/core/utils/types.js");

var domainDebugger = __webpack_require__("../node_modules/@nativescript/core/debugger/debugger.js");

var http_request_common_1 = __webpack_require__("../node_modules/@nativescript/core/http/http-request/http-request-common.js");

var HttpResponseEncoding;

(function (HttpResponseEncoding) {
  HttpResponseEncoding[HttpResponseEncoding["UTF8"] = 0] = "UTF8";
  HttpResponseEncoding[HttpResponseEncoding["GBK"] = 1] = "GBK";
})(HttpResponseEncoding = exports.HttpResponseEncoding || (exports.HttpResponseEncoding = {}));

var currentDevice = UIDevice.currentDevice;
var device = currentDevice.userInterfaceIdiom === 0 ? "Phone" : "Pad";
var osVersion = currentDevice.systemVersion;
var GET = "GET";
var USER_AGENT_HEADER = "User-Agent";
var USER_AGENT = "Mozilla/5.0 (i" + device + "; CPU OS " + osVersion.replace(".", "_") + " like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/" + osVersion + " Mobile/10A5355d Safari/8536.25";
var sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration;
var queue = NSOperationQueue.mainQueue;

function parseJSON(source) {
  var src = source.trim();

  if (src.lastIndexOf(")") === src.length - 1) {
    return JSON.parse(src.substring(src.indexOf("(") + 1, src.lastIndexOf(")")));
  }

  return JSON.parse(src);
}

var NSURLSessionTaskDelegateImpl = function (_super) {
  __extends(NSURLSessionTaskDelegateImpl, _super);

  function NSURLSessionTaskDelegateImpl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  NSURLSessionTaskDelegateImpl.prototype.URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler = function (session, task, response, request, completionHandler) {
    completionHandler(null);
  };

  NSURLSessionTaskDelegateImpl.ObjCProtocols = [NSURLSessionTaskDelegate];
  return NSURLSessionTaskDelegateImpl;
}(NSObject);

var sessionTaskDelegateInstance = NSURLSessionTaskDelegateImpl.new();
var defaultSession;

function ensureDefaultSession() {
  if (!defaultSession) {
    defaultSession = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);
  }
}

var sessionNotFollowingRedirects;

function ensureSessionNotFollowingRedirects() {
  if (!sessionNotFollowingRedirects) {
    sessionNotFollowingRedirects = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, sessionTaskDelegateInstance, queue);
  }
}

var imageSource;

function ensureImageSource() {
  if (!imageSource) {
    imageSource = __webpack_require__("../node_modules/@nativescript/core/image-source/image-source.js");
  }
}

var fs;

function ensureFileSystem() {
  if (!fs) {
    fs = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system.js");
  }
}

function request(options) {
  return new Promise(function (resolve, reject) {
    if (!options.url) {
      reject(new Error("Request url was empty."));
      return;
    }

    try {
      var network = domainDebugger.getNetwork();
      var debugRequest_1 = network && network.create();
      var urlRequest = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(options.url));
      urlRequest.HTTPMethod = types.isDefined(options.method) ? options.method : GET;
      urlRequest.setValueForHTTPHeaderField(USER_AGENT, USER_AGENT_HEADER);

      if (options.headers) {
        for (var header in options.headers) {
          urlRequest.setValueForHTTPHeaderField(options.headers[header] + "", header);
        }
      }

      if (types.isString(options.content) || options.content instanceof FormData) {
        urlRequest.HTTPBody = NSString.stringWithString(options.content.toString()).dataUsingEncoding(4);
      } else if (options.content instanceof ArrayBuffer) {
        var buffer = options.content;
        urlRequest.HTTPBody = NSData.dataWithData(buffer);
      }

      if (types.isNumber(options.timeout)) {
        urlRequest.timeoutInterval = options.timeout / 1000;
      }

      var session = void 0;

      if (types.isBoolean(options.dontFollowRedirects) && options.dontFollowRedirects) {
        ensureSessionNotFollowingRedirects();
        session = sessionNotFollowingRedirects;
      } else {
        ensureDefaultSession();
        session = defaultSession;
      }

      var dataTask = session.dataTaskWithRequestCompletionHandler(urlRequest, function (data, response, error) {
        if (error) {
          reject(new Error(error.localizedDescription));
        } else {
          var headers_1 = {};

          if (response && response.allHeaderFields) {
            var headerFields = response.allHeaderFields;
            headerFields.enumerateKeysAndObjectsUsingBlock(function (key, value, stop) {
              addHeader(headers_1, key, value);
            });
          }

          if (debugRequest_1) {
            debugRequest_1.mimeType = response.MIMEType;
            debugRequest_1.data = data;
            var debugResponse = {
              url: options.url,
              status: response.statusCode,
              statusText: NSHTTPURLResponse.localizedStringForStatusCode(response.statusCode),
              headers: headers_1,
              mimeType: response.MIMEType,
              fromDiskCache: false
            };
            debugRequest_1.responseReceived(debugResponse);
            debugRequest_1.loadingFinished();
          }

          resolve({
            content: {
              raw: data,
              toArrayBuffer: function toArrayBuffer() {
                return interop.bufferFromData(data);
              },
              toString: function toString(encoding) {
                var str = NSDataToString(data, encoding);

                if (typeof str === "string") {
                  return str;
                } else {
                  throw new Error("Response content may not be converted to string");
                }
              },
              toJSON: function toJSON(encoding) {
                return parseJSON(NSDataToString(data, encoding));
              },
              toImage: function toImage() {
                ensureImageSource();
                return new Promise(function (resolve, reject) {
                  UIImage.tns_decodeImageWithDataCompletion(data, function (image) {
                    if (image) {
                      resolve(new imageSource.ImageSource(image));
                    } else {
                      reject(new Error("Response content may not be converted to an Image"));
                    }
                  });
                });
              },
              toFile: function toFile(destinationFilePath) {
                ensureFileSystem();

                if (!destinationFilePath) {
                  destinationFilePath = http_request_common_1.getFilenameFromUrl(options.url);
                }

                if (data instanceof NSData) {
                  var file = fs.File.fromPath(destinationFilePath);
                  data.writeToFileAtomically(destinationFilePath, true);
                  return file;
                } else {
                  reject(new Error("Cannot save file with path: " + destinationFilePath + "."));
                }
              }
            },
            statusCode: response.statusCode,
            headers: headers_1
          });
        }
      });

      if (options.url && debugRequest_1) {
        var request_1 = {
          url: options.url,
          method: "GET",
          headers: options.headers
        };
        debugRequest_1.requestWillBeSent(request_1);
      }

      dataTask.resume();
    } catch (ex) {
      reject(ex);
    }
  });
}

exports.request = request;

function NSDataToString(data, encoding) {
  var code = NSUTF8StringEncoding;

  if (encoding === HttpResponseEncoding.GBK) {
    code = 1586;
  }

  var encodedString = NSString.alloc().initWithDataEncoding(data, code);

  if (!encodedString) {
    code = NSISOLatin1StringEncoding;
    encodedString = NSString.alloc().initWithDataEncoding(data, code);
  }

  return encodedString.toString();
}

function addHeader(headers, key, value) {
  if (!headers[key]) {
    headers[key] = value;
  } else if (Array.isArray(headers[key])) {
    headers[key].push(value);
  } else {
    var values = [headers[key]];
    values.push(value);
    headers[key] = values;
  }
}

exports.addHeader = addHeader;

/***/ }),

/***/ "../node_modules/@nativescript/core/http/http.js":
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var httpRequest = __webpack_require__("../node_modules/@nativescript/core/http/http-request/http-request.js");

__export(__webpack_require__("../node_modules/@nativescript/core/http/http-request/http-request.js"));

function getString(arg) {
  return new Promise(function (resolve, reject) {
    httpRequest.request(typeof arg === "string" ? {
      url: arg,
      method: "GET"
    } : arg).then(function (r) {
      try {
        var str = r.content.toString();
        resolve(str);
      } catch (e) {
        reject(e);
      }
    }, function (e) {
      return reject(e);
    });
  });
}

exports.getString = getString;

function getJSON(arg) {
  return new Promise(function (resolve, reject) {
    httpRequest.request(typeof arg === "string" ? {
      url: arg,
      method: "GET"
    } : arg).then(function (r) {
      try {
        var json = r.content.toJSON();
        resolve(json);
      } catch (e) {
        reject(e);
      }
    }, function (e) {
      return reject(e);
    });
  });
}

exports.getJSON = getJSON;

function getImage(arg) {
  return new Promise(function (resolve, reject) {
    httpRequest.request(typeof arg === "string" ? {
      url: arg,
      method: "GET"
    } : arg).then(function (r) {
      try {
        resolve(r.content.toImage());
      } catch (err) {
        reject(err);
      }
    }, function (err) {
      reject(err);
    });
  });
}

exports.getImage = getImage;

function getFile(arg, destinationFilePath) {
  return new Promise(function (resolve, reject) {
    httpRequest.request(typeof arg === "string" ? {
      url: arg,
      method: "GET"
    } : arg).then(function (r) {
      try {
        var file = r.content.toFile(destinationFilePath);
        resolve(file);
      } catch (e) {
        reject(e);
      }
    }, function (e) {
      return reject(e);
    });
  });
}

exports.getFile = getFile;

function getBinary(arg) {
  return new Promise(function (resolve, reject) {
    httpRequest.request(typeof arg === "string" ? {
      url: arg,
      method: "GET"
    } : arg).then(function (r) {
      try {
        var arrayBuffer = r.content.toArrayBuffer();
        resolve(arrayBuffer);
      } catch (e) {
        reject(e);
      }
    }, function (e) {
      return reject(e);
    });
  });
}

exports.getBinary = getBinary;

/***/ }),

/***/ "../node_modules/@nativescript/core/image-source/image-source.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var file_system_1 = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system.js");

var utils_1 = __webpack_require__("../node_modules/@nativescript/core/utils/utils.js");

exports.isFileOrResourcePath = utils_1.isFileOrResourcePath;
var http;

function ensureHttp() {
  if (!http) {
    http = __webpack_require__("../node_modules/@nativescript/core/http/http.js");
  }
}

var ImageSource = function () {
  function ImageSource(nativeSource) {
    if (nativeSource) {
      this.setNativeSource(nativeSource);
    }
  }

  Object.defineProperty(ImageSource.prototype, "height", {
    get: function get() {
      if (this.ios) {
        return this.ios.size.height;
      }

      return NaN;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ImageSource.prototype, "width", {
    get: function get() {
      if (this.ios) {
        return this.ios.size.width;
      }

      return NaN;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ImageSource.prototype, "rotationAngle", {
    get: function get() {
      return NaN;
    },
    set: function set(_value) {},
    enumerable: true,
    configurable: true
  });

  ImageSource.fromAsset = function (asset) {
    return new Promise(function (resolve, reject) {
      asset.getImageAsync(function (image, err) {
        if (image) {
          resolve(new ImageSource(image));
        } else {
          reject(err);
        }
      });
    });
  };

  ImageSource.fromUrl = function (url) {
    ensureHttp();
    return http.getImage(url);
  };

  ImageSource.fromResourceSync = function (name) {
    var nativeSource = UIImage.tns_safeImageNamed(name) || UIImage.tns_safeImageNamed(name + ".jpg");
    return nativeSource ? new ImageSource(nativeSource) : null;
  };

  ImageSource.fromResource = function (name) {
    return new Promise(function (resolve, reject) {
      try {
        UIImage.tns_safeDecodeImageNamedCompletion(name, function (image) {
          if (image) {
            resolve(new ImageSource(image));
          } else {
            UIImage.tns_safeDecodeImageNamedCompletion(name + ".jpg", function (image) {
              resolve(new ImageSource(image));
            });
          }
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };

  ImageSource.fromFileSync = function (path) {
    var uiImage = UIImage.imageWithContentsOfFile(getFileName(path));
    return uiImage ? new ImageSource(uiImage) : null;
  };

  ImageSource.fromFile = function (path) {
    return new Promise(function (resolve, reject) {
      try {
        UIImage.tns_decodeImageWidthContentsOfFileCompletion(getFileName(path), function (uiImage) {
          resolve(new ImageSource(uiImage));
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };

  ImageSource.fromFileOrResourceSync = function (path) {
    if (!utils_1.isFileOrResourcePath(path)) {
      throw new Error("Path \"" + "\" is not a valid file or resource.");
    }

    if (path.indexOf(utils_1.RESOURCE_PREFIX) === 0) {
      return ImageSource.fromResourceSync(path.substr(utils_1.RESOURCE_PREFIX.length));
    }

    return ImageSource.fromFileSync(path);
  };

  ImageSource.fromDataSync = function (data) {
    var uiImage = UIImage.imageWithData(data);
    return uiImage ? new ImageSource(uiImage) : null;
  };

  ImageSource.fromData = function (data) {
    return new Promise(function (resolve, reject) {
      try {
        UIImage.tns_decodeImageWithDataCompletion(data, function (uiImage) {
          resolve(new ImageSource(uiImage));
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };

  ImageSource.fromBase64Sync = function (source) {
    var uiImage;

    if (typeof source === "string") {
      var data = NSData.alloc().initWithBase64EncodedStringOptions(source, 1);
      uiImage = UIImage.imageWithData(data);
    }

    return uiImage ? new ImageSource(uiImage) : null;
  };

  ImageSource.fromBase64 = function (source) {
    return new Promise(function (resolve, reject) {
      try {
        var data = NSData.alloc().initWithBase64EncodedStringOptions(source, 1);
        UIImage.imageWithData["async"](UIImage, [data]).then(function (uiImage) {
          resolve(new ImageSource(uiImage));
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };

  ImageSource.fromFontIconCodeSync = function (source, font, color) {
    var _a;

    var fontSize = utils_1.layout.toDevicePixels(font.fontSize);

    if (!fontSize) {
      fontSize = UIFont.labelFontSize;
    }

    var density = utils_1.layout.getDisplayDensity();
    var scaledFontSize = fontSize * density;
    var attributes = (_a = {}, _a[NSFontAttributeName] = font.getUIFont(UIFont.systemFontOfSize(scaledFontSize)), _a);

    if (color) {
      attributes[NSForegroundColorAttributeName] = color.ios;
    }

    var attributedString = NSAttributedString.alloc().initWithStringAttributes(source, attributes);
    UIGraphicsBeginImageContextWithOptions(attributedString.size(), false, 0.0);
    attributedString.drawAtPoint(CGPointMake(0, 0));
    var iconImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return iconImage ? new ImageSource(iconImage) : null;
  };

  ImageSource.prototype.fromAsset = function (asset) {
    var _this = this;

    console.log("fromAsset() is deprecated. Use ImageSource.fromAsset() instead.");
    return ImageSource.fromAsset(asset).then(function (imgSource) {
      _this.setNativeSource(imgSource.ios);

      return _this;
    });
  };

  ImageSource.prototype.loadFromResource = function (name) {
    console.log("loadFromResource() is deprecated. Use ImageSource.fromResourceSync() instead.");
    var imgSource = ImageSource.fromResourceSync(name);
    this.ios = imgSource ? imgSource.ios : null;
    return !!this.ios;
  };

  ImageSource.prototype.fromResource = function (name) {
    var _this = this;

    console.log("fromResource() is deprecated. Use ImageSource.fromResource() instead.");
    return ImageSource.fromResource(name).then(function (imgSource) {
      _this.ios = imgSource.ios;
      return !!_this.ios;
    });
  };

  ImageSource.prototype.loadFromFile = function (path) {
    console.log("loadFromFile() is deprecated. Use ImageSource.fromFileSync() instead.");
    var imgSource = ImageSource.fromFileSync(path);
    this.ios = imgSource ? imgSource.ios : null;
    return !!this.ios;
  };

  ImageSource.prototype.fromFile = function (path) {
    var _this = this;

    console.log("fromFile() is deprecated. Use ImageSource.fromFile() instead.");
    return ImageSource.fromFile(path).then(function (imgSource) {
      _this.ios = imgSource.ios;
      return !!_this.ios;
    });
  };

  ImageSource.prototype.loadFromData = function (data) {
    console.log("loadFromData() is deprecated. Use ImageSource.fromDataSync() instead.");
    var imgSource = ImageSource.fromDataSync(data);
    this.ios = imgSource ? imgSource.ios : null;
    return !!this.ios;
  };

  ImageSource.prototype.fromData = function (data) {
    var _this = this;

    console.log("fromData() is deprecated. Use ImageSource.fromData() instead.");
    return ImageSource.fromData(data).then(function (imgSource) {
      _this.ios = imgSource.ios;
      return !!_this.ios;
    });
  };

  ImageSource.prototype.loadFromBase64 = function (source) {
    console.log("loadFromBase64() is deprecated. Use ImageSource.fromBase64Sync() instead.");
    var imgSource = ImageSource.fromBase64Sync(source);
    this.ios = imgSource ? imgSource.ios : null;
    return !!this.ios;
  };

  ImageSource.prototype.fromBase64 = function (source) {
    var _this = this;

    console.log("fromBase64() is deprecated. Use ImageSource.fromBase64() instead.");
    return ImageSource.fromBase64(source).then(function (imgSource) {
      _this.ios = imgSource.ios;
      return !!_this.ios;
    });
  };

  ImageSource.prototype.loadFromFontIconCode = function (source, font, color) {
    console.log("loadFromFontIconCode() is deprecated. Use ImageSource.fromFontIconCodeSync() instead.");
    var imgSource = ImageSource.fromFontIconCodeSync(source, font, color);
    this.ios = imgSource ? imgSource.ios : null;
    return !!this.ios;
  };

  ImageSource.prototype.setNativeSource = function (source) {
    if (source && !(source instanceof UIImage)) {
      throw new Error("The method setNativeSource() expects UIImage instance.");
    }

    this.ios = source;
  };

  ImageSource.prototype.saveToFile = function (path, format, quality) {
    if (!this.ios) {
      return false;
    }

    if (quality) {
      quality = (quality - 0) / (100 - 0);
    }

    var data = getImageData(this.ios, format, quality);

    if (data) {
      return NSFileManager.defaultManager.createFileAtPathContentsAttributes(path, data, null);
    }

    return false;
  };

  ImageSource.prototype.toBase64String = function (format, quality) {
    var res = null;

    if (!this.ios) {
      return res;
    }

    if (quality) {
      quality = (quality - 0) / (100 - 0);
    }

    var data = getImageData(this.ios, format, quality);

    if (data) {
      res = data.base64Encoding();
    }

    return res;
  };

  return ImageSource;
}();

exports.ImageSource = ImageSource;

function getFileName(path) {
  var fileName = typeof path === "string" ? path.trim() : "";

  if (fileName.indexOf("~/") === 0) {
    fileName = file_system_1.path.join(file_system_1.knownFolders.currentApp().path, fileName.replace("~/", ""));
  }

  return fileName;
}

function getImageData(instance, format, quality) {
  if (quality === void 0) {
    quality = 0.9;
  }

  var data = null;

  switch (format) {
    case "png":
      data = UIImagePNGRepresentation(instance);
      break;

    case "jpeg":
    case "jpg":
      data = UIImageJPEGRepresentation(instance, quality);
      break;
  }

  return data;
}

function fromAsset(asset) {
  console.log("fromAsset() is deprecated. Use ImageSource.fromAsset() instead.");
  return ImageSource.fromAsset(asset);
}

exports.fromAsset = fromAsset;

function fromResource(name) {
  console.log("fromResource() is deprecated. Use ImageSource.fromResourceSync() instead.");
  return ImageSource.fromResourceSync(name);
}

exports.fromResource = fromResource;

function fromFile(path) {
  console.log("fromFile() is deprecated. Use ImageSource.fromFileSync() instead.");
  return ImageSource.fromFileSync(path);
}

exports.fromFile = fromFile;

function fromData(data) {
  console.log("fromData() is deprecated. Use ImageSource.fromDataSync() instead.");
  return ImageSource.fromDataSync(data);
}

exports.fromData = fromData;

function fromFontIconCode(source, font, color) {
  console.log("fromFontIconCode() is deprecated. Use ImageSource.fromFontIconCodeSync() instead.");
  return ImageSource.fromFontIconCodeSync(source, font, color);
}

exports.fromFontIconCode = fromFontIconCode;

function fromBase64(source) {
  console.log("fromBase64() is deprecated. Use ImageSource.fromBase64Sync() instead.");
  return ImageSource.fromBase64Sync(source);
}

exports.fromBase64 = fromBase64;

function fromNativeSource(nativeSource) {
  console.log("fromNativeSource() is deprecated. Use ImageSource constructor instead.");
  return new ImageSource(nativeSource);
}

exports.fromNativeSource = fromNativeSource;

function fromUrl(url) {
  console.log("fromUrl() is deprecated. Use ImageSource.fromUrl() instead.");
  return ImageSource.fromUrl(url);
}

exports.fromUrl = fromUrl;

function fromFileOrResource(path) {
  console.log("fromFileOrResource() is deprecated. Use ImageSource.fromFileOrResourceSync() instead.");
  return ImageSource.fromFileOrResourceSync(path);
}

exports.fromFileOrResource = fromFileOrResource;

/***/ }),

/***/ "../node_modules/@nativescript/core/platform/platform.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var platformNames;

(function (platformNames) {
  platformNames.android = "Android";
  platformNames.ios = "iOS";
})(platformNames = exports.platformNames || (exports.platformNames = {}));

var Device = function () {
  function Device() {}

  Object.defineProperty(Device.prototype, "manufacturer", {
    get: function get() {
      return "Apple";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "os", {
    get: function get() {
      return platformNames.ios;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "osVersion", {
    get: function get() {
      if (!this._osVersion) {
        this._osVersion = UIDevice.currentDevice.systemVersion;
      }

      return this._osVersion;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "model", {
    get: function get() {
      if (!this._model) {
        this._model = UIDevice.currentDevice.model;
      }

      return this._model;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "sdkVersion", {
    get: function get() {
      if (!this._sdkVersion) {
        this._sdkVersion = UIDevice.currentDevice.systemVersion;
      }

      return this._sdkVersion;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "deviceType", {
    get: function get() {
      if (!this._deviceType) {
        if (UIDevice.currentDevice.userInterfaceIdiom === 0) {
          this._deviceType = "Phone";
        } else {
          this._deviceType = "Tablet";
        }
      }

      return this._deviceType;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "uuid", {
    get: function get() {
      var userDefaults = NSUserDefaults.standardUserDefaults;
      var uuid_key = "TNSUUID";
      var app_uuid = userDefaults.stringForKey(uuid_key);

      if (!app_uuid) {
        app_uuid = NSUUID.UUID().UUIDString;
        userDefaults.setObjectForKey(app_uuid, uuid_key);
        userDefaults.synchronize();
      }

      return app_uuid;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "language", {
    get: function get() {
      if (!this._language) {
        var languages = NSLocale.preferredLanguages;
        this._language = languages[0];
      }

      return this._language;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Device.prototype, "region", {
    get: function get() {
      if (!this._region) {
        this._region = NSLocale.currentLocale.objectForKey(NSLocaleCountryCode);
      }

      return this._region;
    },
    enumerable: true,
    configurable: true
  });
  return Device;
}();

var MainScreen = function () {
  function MainScreen() {}

  Object.defineProperty(MainScreen.prototype, "screen", {
    get: function get() {
      if (!this._screen) {
        this._screen = UIScreen.mainScreen;
      }

      return this._screen;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MainScreen.prototype, "widthPixels", {
    get: function get() {
      return this.widthDIPs * this.scale;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MainScreen.prototype, "heightPixels", {
    get: function get() {
      return this.heightDIPs * this.scale;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MainScreen.prototype, "scale", {
    get: function get() {
      return this.screen.scale;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MainScreen.prototype, "widthDIPs", {
    get: function get() {
      return this.screen.bounds.size.width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MainScreen.prototype, "heightDIPs", {
    get: function get() {
      return this.screen.bounds.size.height;
    },
    enumerable: true,
    configurable: true
  });
  return MainScreen;
}();

exports.device = new Device();
var screen;

(function (screen) {
  screen.mainScreen = new MainScreen();
})(screen = exports.screen || (exports.screen = {}));

exports.isIOS = true;
exports.isAndroid = false;

/***/ }),

/***/ "../node_modules/@nativescript/core/profiling/profiling.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", {
  value: true
});

function uptime() {
  return global.android ? org.nativescript.Process.getUpTime() : global.__tns_uptime();
}

exports.uptime = uptime;

function log(message) {
  if (global.__nslog) {
    global.__nslog("CONSOLE LOG: " + message);
  }

  console.log(message);
}

exports.log = log;
var timers = {};
var anyGlobal = global;
var profileNames = [];
exports.time = global.__time || Date.now;

function start(name) {
  var info = timers[name];

  if (info) {
    info.currentStart = exports.time();
    info.runCount++;
  } else {
    info = {
      totalTime: 0,
      count: 0,
      currentStart: exports.time(),
      runCount: 1
    };
    timers[name] = info;
    profileNames.push(name);
  }
}

exports.start = start;

function stop(name) {
  var info = timers[name];

  if (!info) {
    throw new Error("No timer started: " + name);
  }

  if (info.runCount) {
    info.runCount--;

    if (info.runCount) {
      info.count++;
    } else {
      info.lastTime = exports.time() - info.currentStart;
      info.totalTime += info.lastTime;
      info.count++;
      info.currentStart = 0;
    }
  } else {
    throw new Error("Timer " + name + " paused more times than started.");
  }

  return info;
}

exports.stop = stop;

function timer(name) {
  return timers[name];
}

exports.timer = timer;

function print(name) {
  var info = timers[name];

  if (!info) {
    throw new Error("No timer started: " + name);
  }

  console.log("---- [" + name + "] STOP total: " + info.totalTime + " count:" + info.count);
  return info;
}

exports.print = print;

function isRunning(name) {
  var info = timers[name];
  return !!(info && info.runCount);
}

exports.isRunning = isRunning;

function countersProfileFunctionFactory(fn, name, type) {
  if (type === void 0) {
    type = 1;
  }

  profileNames.push(name);
  return function () {
    start(name);

    try {
      return fn.apply(this, arguments);
    } finally {
      stop(name);
    }
  };
}

function timelineProfileFunctionFactory(fn, name, type) {
  if (type === void 0) {
    type = 1;
  }

  return type === 1 ? function () {
    var start = exports.time();

    try {
      return fn.apply(this, arguments);
    } finally {
      var end = exports.time();
      console.log("Timeline: Modules: " + name + " " + this + "  (" + start + "ms. - " + end + "ms.)");
    }
  } : function () {
    var start = exports.time();

    try {
      return fn.apply(this, arguments);
    } finally {
      var end = exports.time();
      console.log("Timeline: Modules: " + name + "  (" + start + "ms. - " + end + "ms.)");
    }
  };
}

var Level;

(function (Level) {
  Level[Level["none"] = 0] = "none";
  Level[Level["lifecycle"] = 1] = "lifecycle";
  Level[Level["timeline"] = 2] = "timeline";
})(Level = exports.Level || (exports.Level = {}));

var tracingLevel = Level.none;
var profileFunctionFactory;

function enable(mode) {
  if (mode === void 0) {
    mode = "counters";
  }

  profileFunctionFactory = mode && {
    counters: countersProfileFunctionFactory,
    timeline: timelineProfileFunctionFactory
  }[mode];
  tracingLevel = {
    lifecycle: Level.lifecycle,
    timeline: Level.timeline
  }[mode] || Level.none;
}

exports.enable = enable;

try {
  var appConfig = __webpack_require__("./package.json");

  if (appConfig && appConfig.profiling) {
    enable(appConfig.profiling);
  }
} catch (e1) {
  try {
    console.log("Profiling startup failed to figure out defaults from package.json, error: " + e1);
  } catch (e2) {}
}

function disable() {
  profileFunctionFactory = undefined;
}

exports.disable = disable;

function profileFunction(fn, customName) {
  return profileFunctionFactory(fn, customName || fn.name);
}

var profileMethodUnnamed = function profileMethodUnnamed(target, key, descriptor) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  var originalMethod = descriptor.value;
  var className = "";

  if (target && target.constructor && target.constructor.name) {
    className = target.constructor.name + ".";
  }

  var name = className + key;
  descriptor.value = profileFunctionFactory(originalMethod, name, 1);
  return descriptor;
};

var profileStaticMethodUnnamed = function profileStaticMethodUnnamed(ctor, key, descriptor) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(ctor, key);
  }

  var originalMethod = descriptor.value;
  var className = "";

  if (ctor && ctor.name) {
    className = ctor.name + ".";
  }

  var name = className + key;
  descriptor.value = profileFunctionFactory(originalMethod, name, 0);
  return descriptor;
};

function profileMethodNamed(name) {
  return function (target, key, descriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }

    var originalMethod = descriptor.value;
    descriptor.value = profileFunctionFactory(originalMethod, name);
    return descriptor;
  };
}

var voidMethodDecorator = function voidMethodDecorator() {};

function profile(nameFnOrTarget, fnOrKey, descriptor) {
  if (typeof nameFnOrTarget === "object" && (typeof fnOrKey === "string" || typeof fnOrKey === "symbol")) {
    if (!profileFunctionFactory) {
      return;
    }

    return profileMethodUnnamed(nameFnOrTarget, fnOrKey, descriptor);
  } else if (typeof nameFnOrTarget === "function" && (typeof fnOrKey === "string" || typeof fnOrKey === "symbol")) {
    if (!profileFunctionFactory) {
      return;
    }

    return profileStaticMethodUnnamed(nameFnOrTarget, fnOrKey, descriptor);
  } else if (typeof nameFnOrTarget === "string" && typeof fnOrKey === "function") {
    if (!profileFunctionFactory) {
      return fnOrKey;
    }

    return profileFunction(fnOrKey, nameFnOrTarget);
  } else if (typeof nameFnOrTarget === "function") {
    if (!profileFunctionFactory) {
      return nameFnOrTarget;
    }

    return profileFunction(nameFnOrTarget);
  } else if (typeof nameFnOrTarget === "string") {
    if (!profileFunctionFactory) {
      return voidMethodDecorator;
    }

    return profileMethodNamed(nameFnOrTarget);
  } else {
    if (!profileFunctionFactory) {
      return voidMethodDecorator;
    }

    return profileMethodUnnamed;
  }
}

exports.profile = profile;

function dumpProfiles() {
  profileNames.forEach(function (name) {
    var info = timers[name];

    if (info) {
      console.log("---- [" + name + "] STOP total: " + info.totalTime + " count:" + info.count);
    } else {
      console.log("---- [" + name + "] Never called");
    }
  });
}

exports.dumpProfiles = dumpProfiles;

function resetProfiles() {
  profileNames.forEach(function (name) {
    var info = timers[name];

    if (info) {
      if (info.runCount) {
        console.log("---- timer with name [" + name + "] is currently running and won't be reset");
      } else {
        timers[name] = undefined;
      }
    }
  });
}

exports.resetProfiles = resetProfiles;

function startCPUProfile(name) {
  if (anyGlobal.android) {
    __startCPUProfiler(name);
  }
}

exports.startCPUProfile = startCPUProfile;

function stopCPUProfile(name) {
  if (anyGlobal.android) {
    __stopCPUProfiler(name);
  }
}

exports.stopCPUProfile = stopCPUProfile;

function level() {
  return tracingLevel;
}

exports.level = level;

function trace(message, start, end) {
  log("Timeline: Modules: " + message + "  (" + start + "ms. - " + end + "ms.)");
}

exports.trace = trace;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/@nativescript/core/text/text-common.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Object_prototype_toString = {}.toString;
var ArrayBufferString = Object_prototype_toString.call(ArrayBuffer.prototype);

function decoderReplacer(encoded) {
  var codePoint = encoded.charCodeAt(0) << 24;
  var leadingOnes = Math.clz32(~codePoint) | 0;
  var endPos = 0,
      stringLen = encoded.length | 0;
  var result = "";

  if (leadingOnes < 5 && stringLen >= leadingOnes) {
    codePoint = codePoint << leadingOnes >>> 24 + leadingOnes;

    for (endPos = 1; endPos < leadingOnes; endPos = endPos + 1 | 0) {
      codePoint = codePoint << 6 | encoded.charCodeAt(endPos) & 0x3f;
    }

    if (codePoint <= 0xFFFF) {
      result += String.fromCharCode(codePoint);
    } else if (codePoint <= 0x10FFFF) {
      codePoint = codePoint - 0x10000 | 0;
      result += String.fromCharCode((codePoint >> 10) + 0xD800 | 0, (codePoint & 0x3ff) + 0xDC00 | 0);
    } else {
      endPos = 0;
    }
  }

  for (; endPos < stringLen; endPos = endPos + 1 | 0) {
    result += "\ufffd";
  }

  return result;
}

function encoderReplacer(nonAsciiChars) {
  var point = nonAsciiChars.charCodeAt(0) | 0;

  if (point >= 0xD800 && point <= 0xDBFF) {
    var nextcode = nonAsciiChars.charCodeAt(1) | 0;

    if (nextcode !== nextcode) {
      return String.fromCharCode(0xef, 0xbf, 0xbd);
    }

    if (nextcode >= 0xDC00 && nextcode <= 0xDFFF) {
      point = (point - 0xD800 << 10) + nextcode - 0xDC00 + 0x10000 | 0;

      if (point > 0xffff) {
        return String.fromCharCode(0x1e << 3 | point >>> 18, 0x2 << 6 | point >>> 12 & 0x3f, 0x2 << 6 | point >>> 6 & 0x3f, 0x2 << 6 | point & 0x3f);
      }
    } else {
      return String.fromCharCode(0xef, 0xbf, 0xbd);
    }
  }

  if (point <= 0x007f) {
    return nonAsciiChars;
  } else if (point <= 0x07ff) {
    return String.fromCharCode(0x6 << 5 | point >>> 6, 0x2 << 6 | point & 0x3f);
  } else {
    return String.fromCharCode(0xe << 4 | point >>> 12, 0x2 << 6 | point >>> 6 & 0x3f, 0x2 << 6 | point & 0x3f);
  }
}

var TextDecoder = function () {
  function TextDecoder() {
    this[Symbol.toStringTag] = "TextDecoder";
  }

  Object.defineProperty(TextDecoder.prototype, "encoding", {
    get: function get() {
      return "utf-8";
    },
    enumerable: true,
    configurable: true
  });

  TextDecoder.prototype.decode = function (input) {
    var buffer = ArrayBuffer.isView(input) ? input.buffer : input;

    if (Object_prototype_toString.call(buffer) !== ArrayBufferString) {
      throw Error("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
    }

    var inputAs8 = new Uint8Array(buffer);
    var resultingString = "";

    for (var index_1 = 0, len = inputAs8.length | 0; index_1 < len; index_1 = index_1 + 32768 | 0) {
      resultingString += String.fromCharCode.apply(0, inputAs8.slice(index_1, index_1 + 32768 | 0));
    }

    return resultingString.replace(/[\xc0-\xff][\x80-\xbf]*/g, decoderReplacer);
  };

  TextDecoder.prototype.toString = function () {
    return "[object TextDecoder]";
  };

  return TextDecoder;
}();

exports.TextDecoder = TextDecoder;

var TextEncoder = function () {
  function TextEncoder() {
    this[Symbol.toStringTag] = "TextEncoder";
  }

  Object.defineProperty(TextEncoder.prototype, "encoding", {
    get: function get() {
      return "utf-8";
    },
    enumerable: true,
    configurable: true
  });

  TextEncoder.prototype.encode = function (input) {
    if (input === void 0) {
      input = "";
    }

    var encodedString = input === undefined ? "" : ("" + input).replace(/[\x80-\uD7ff\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, encoderReplacer);
    var len = encodedString.length | 0,
        result = new Uint8Array(len);

    for (var i = 0; i < len; i = i + 1 | 0) {
      result[i] = encodedString.charCodeAt(i);
    }

    return result;
  };

  TextEncoder.prototype.toString = function () {
    return "[object TextEncoder]";
  };

  return TextEncoder;
}();

exports.TextEncoder = TextEncoder;

/***/ }),

/***/ "../node_modules/@nativescript/core/text/text.js":
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__("../node_modules/@nativescript/core/text/text-common.js"));

var encoding;

(function (encoding) {
  encoding.ISO_8859_1 = 5;
  encoding.US_ASCII = 1;
  encoding.UTF_16 = 10;
  encoding.UTF_16BE = 0x90000100;
  encoding.UTF_16LE = 0x94000100;
  encoding.UTF_8 = 4;
})(encoding = exports.encoding || (exports.encoding = {}));

/***/ }),

/***/ "../node_modules/@nativescript/core/trace/trace.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var enabled = false;
var _categories = {};
var _writers = [];
var _eventListeners = [];

var _errorHandler;

function enable() {
  enabled = true;
}

exports.enable = enable;

function disable() {
  enabled = false;
}

exports.disable = disable;

function isEnabled() {
  return enabled;
}

exports.isEnabled = isEnabled;

function isCategorySet(category) {
  return category in _categories;
}

exports.isCategorySet = isCategorySet;

function addWriter(writer) {
  _writers.push(writer);
}

exports.addWriter = addWriter;

function removeWriter(writer) {
  var index = _writers.indexOf(writer);

  if (index >= 0) {
    _writers.splice(index, 1);
  }
}

exports.removeWriter = removeWriter;

function clearWriters() {
  if (_writers.length > 0) {
    _writers.splice(0, _writers.length);
  }
}

exports.clearWriters = clearWriters;

function setCategories(categories) {
  _categories = {};
  addCategories(categories);
}

exports.setCategories = setCategories;

function addCategories(categories) {
  var split = categories.split(",");

  for (var i = 0; i < split.length; i++) {
    _categories[split[i].trim()] = true;
  }
}

exports.addCategories = addCategories;

function write(message, category, type) {
  var i;

  if (type === messageType.error) {
    for (i = 0; i < _writers.length; i++) {
      _writers[i].write(message, category, type);
    }

    return;
  }

  if (!enabled) {
    return;
  }

  if (!(category in _categories)) {
    return;
  }

  for (i = 0; i < _writers.length; i++) {
    _writers[i].write(message, category, type);
  }
}

exports.write = write;

function notifyEvent(object, name, data) {
  if (!enabled) {
    return;
  }

  var i, listener, filters;

  for (i = 0; i < _eventListeners.length; i++) {
    listener = _eventListeners[i];

    if (listener.filter) {
      filters = listener.filter.split(",");
      filters.forEach(function (value) {
        if (value.trim() === name) {
          listener.on(object, name, data);
        }
      });
    } else {
      listener.on(object, name, data);
    }
  }
}

exports.notifyEvent = notifyEvent;

function addEventListener(listener) {
  _eventListeners.push(listener);
}

exports.addEventListener = addEventListener;

function removeEventListener(listener) {
  var index = _eventListeners.indexOf(listener);

  if (index >= 0) {
    _eventListeners.splice(index, 1);
  }
}

exports.removeEventListener = removeEventListener;
var messageType;

(function (messageType) {
  messageType.log = 0;
  messageType.info = 1;
  messageType.warn = 2;
  messageType.error = 3;
})(messageType = exports.messageType || (exports.messageType = {}));

var categories;

(function (categories) {
  categories.VisualTreeEvents = "VisualTreeEvents";
  categories.Layout = "Layout";
  categories.Style = "Style";
  categories.ViewHierarchy = "ViewHierarchy";
  categories.NativeLifecycle = "NativeLifecycle";
  categories.Debug = "Debug";
  categories.Navigation = "Navigation";
  categories.Test = "Test";
  categories.Binding = "Binding";
  categories.BindingError = "BindingError";
  categories.Error = "Error";
  categories.Animation = "Animation";
  categories.Transition = "Transition";
  categories.Livesync = "Livesync";
  categories.ModuleNameResolver = "ModuleNameResolver";
  categories.separator = ",";
  categories.All = [categories.VisualTreeEvents, categories.Layout, categories.Style, categories.ViewHierarchy, categories.NativeLifecycle, categories.Debug, categories.Navigation, categories.Test, categories.Binding, categories.Error, categories.Animation, categories.Transition, categories.Livesync, categories.ModuleNameResolver].join(categories.separator);

  function concat() {
    var result;

    for (var i = 0; i < arguments.length; i++) {
      if (!result) {
        result = arguments[i];
        continue;
      }

      result = result.concat(categories.separator, arguments[i]);
    }

    return result;
  }

  categories.concat = concat;
})(categories = exports.categories || (exports.categories = {}));

var ConsoleWriter = function () {
  function ConsoleWriter() {}

  ConsoleWriter.prototype.write = function (message, category, type) {
    if (!console) {
      return;
    }

    var msgType;

    if (type === undefined) {
      msgType = messageType.log;
    } else {
      msgType = type;
    }

    switch (msgType) {
      case messageType.log:
        console.log(category + ": " + message);
        break;

      case messageType.info:
        console.info(category + ": " + message);
        break;

      case messageType.warn:
        console.warn(category + ": " + message);
        break;

      case messageType.error:
        console.error(category + ": " + message);
        break;
    }
  };

  return ConsoleWriter;
}();

addWriter(new ConsoleWriter());

var DefaultErrorHandler = function () {
  function DefaultErrorHandler() {}

  DefaultErrorHandler.prototype.handlerError = function (error) {
    throw error;
  };

  return DefaultErrorHandler;
}();

exports.DefaultErrorHandler = DefaultErrorHandler;
setErrorHandler(new DefaultErrorHandler());

function getErrorHandler() {
  return _errorHandler;
}

exports.getErrorHandler = getErrorHandler;

function setErrorHandler(handler) {
  _errorHandler = handler;
}

exports.setErrorHandler = setErrorHandler;

function error(error) {
  if (!_errorHandler) {
    return;
  }

  if (typeof error === "string") {
    error = new Error(error);
  }

  _errorHandler.handlerError(error);
}

exports.error = error;

/***/ }),

/***/ "../node_modules/@nativescript/core/ui/builder/module-name-sanitizer.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function sanitizeModuleName(moduleName, removeExtension) {
  if (removeExtension === void 0) {
    removeExtension = true;
  }

  moduleName = moduleName.trim();

  if (moduleName.startsWith("~/")) {
    moduleName = moduleName.substring(2);
  } else if (moduleName.startsWith("~")) {
    moduleName = moduleName.substring(1);
  } else if (moduleName.startsWith("/")) {
    moduleName = moduleName.substring(1);
  }

  if (removeExtension) {
    var extToRemove = ["js", "ts", "xml", "html", "css", "scss"];
    var extensionRegEx = new RegExp("(.*)\\.(?:" + extToRemove.join("|") + ")", "i");
    moduleName = moduleName.replace(extensionRegEx, "$1");
  }

  return moduleName;
}

exports.sanitizeModuleName = sanitizeModuleName;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/layout-helper/layout-helper-common.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODE_SHIFT = 30;
exports.MODE_MASK = 0x3 << exports.MODE_SHIFT;
exports.UNSPECIFIED = 0 << exports.MODE_SHIFT;
exports.EXACTLY = 1 << exports.MODE_SHIFT;
exports.AT_MOST = 2 << exports.MODE_SHIFT;
exports.MEASURED_HEIGHT_STATE_SHIFT = 0x00000010;
exports.MEASURED_STATE_TOO_SMALL = 0x01000000;
exports.MEASURED_STATE_MASK = 0xff000000;
exports.MEASURED_SIZE_MASK = 0x00ffffff;

function getMode(mode) {
  switch (mode) {
    case exports.EXACTLY:
      return "Exact";

    case exports.AT_MOST:
      return "AtMost";

    default:
      return "Unspecified";
  }
}

exports.getMode = getMode;

function getMeasureSpecMode(spec) {
  return spec & exports.MODE_MASK;
}

exports.getMeasureSpecMode = getMeasureSpecMode;

function getMeasureSpecSize(spec) {
  return spec & ~exports.MODE_MASK;
}

exports.getMeasureSpecSize = getMeasureSpecSize;

function measureSpecToString(measureSpec) {
  var mode = getMeasureSpecMode(measureSpec);
  var size = getMeasureSpecSize(measureSpec);
  var text = "MeasureSpec: ";

  if (mode === exports.UNSPECIFIED) {
    text += "UNSPECIFIED ";
  } else if (mode === exports.EXACTLY) {
    text += "EXACTLY ";
  } else if (mode === exports.AT_MOST) {
    text += "AT_MOST ";
  }

  text += size;
  return text;
}

exports.measureSpecToString = measureSpecToString;

function round(value) {
  var res = Math.floor(value + 0.5);

  if (res !== 0) {
    return res;
  } else if (value === 0) {
    return 0;
  } else if (value > 0) {
    return 1;
  }

  return -1;
}

exports.round = round;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/layout-helper/layout-helper.js":
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var layout_helper_common_1 = __webpack_require__("../node_modules/@nativescript/core/utils/layout-helper/layout-helper-common.js");

__export(__webpack_require__("../node_modules/@nativescript/core/utils/layout-helper/layout-helper-common.js"));

var mainScreenScale;

function makeMeasureSpec(size, mode) {
  return Math.round(Math.max(0, size)) & ~layout_helper_common_1.MODE_MASK | mode & layout_helper_common_1.MODE_MASK;
}

exports.makeMeasureSpec = makeMeasureSpec;

function getDisplayDensity() {
  return mainScreenScale;
}

exports.getDisplayDensity = getDisplayDensity;

function toDevicePixels(value) {
  return value * mainScreenScale;
}

exports.toDevicePixels = toDevicePixels;

function toDeviceIndependentPixels(value) {
  return value / mainScreenScale;
}

exports.toDeviceIndependentPixels = toDeviceIndependentPixels;

function measureNativeView(nativeView, width, widthMode, height, heightMode) {
  var view = nativeView;
  var nativeSize = view.sizeThatFits({
    width: widthMode === 0 ? Number.POSITIVE_INFINITY : toDeviceIndependentPixels(width),
    height: heightMode === 0 ? Number.POSITIVE_INFINITY : toDeviceIndependentPixels(height)
  });
  nativeSize.width = layout_helper_common_1.round(toDevicePixels(nativeSize.width));
  nativeSize.height = layout_helper_common_1.round(toDevicePixels(nativeSize.height));
  return nativeSize;
}

exports.measureNativeView = measureNativeView;
mainScreenScale = UIScreen.mainScreen.scale;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/mainthread-helper.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function dispatchToMainThread(func) {
  NSOperationQueue.mainQueue.addOperationWithBlock(func);
}

exports.dispatchToMainThread = dispatchToMainThread;

function isMainThread() {
  return NSThread.isMainThread;
}

exports.isMainThread = isMainThread;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/native-helper.js":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var trace_1 = __webpack_require__("../node_modules/@nativescript/core/trace/trace.js");

var radToDeg = Math.PI / 180;

function isOrientationLandscape(orientation) {
  return orientation === 3 || orientation === 4;
}

function openFileAtRootModule(filePath) {
  try {
    var appPath = ios.getCurrentAppPath();
    var path = filePath.replace("~", appPath);
    var controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(path));
    controller.delegate = new ios.UIDocumentInteractionControllerDelegateImpl();
    return controller.presentPreviewAnimated(true);
  } catch (e) {
    trace_1.write("Error in openFile", trace_1.categories.Error, trace_1.messageType.error);
  }

  return false;
}

var ios;

(function (ios) {
  function getter(_this, property) {
    console.log("utils.ios.getter() is deprecated; use the respective native property instead");

    if (typeof property === "function") {
      return property.call(_this);
    } else {
      return property;
    }
  }

  ios.getter = getter;
  var collections;

  (function (collections) {
    function jsArrayToNSArray(str) {
      return NSArray.arrayWithArray(str);
    }

    collections.jsArrayToNSArray = jsArrayToNSArray;

    function nsArrayToJSArray(a) {
      var arr = [];

      if (a !== undefined) {
        var count = a.count;

        for (var i = 0; i < count; i++) {
          arr.push(a.objectAtIndex(i));
        }
      }

      return arr;
    }

    collections.nsArrayToJSArray = nsArrayToJSArray;
  })(collections = ios.collections || (ios.collections = {}));

  function isLandscape() {
    console.log("utils.ios.isLandscape() is deprecated; use application.orientation instead");
    var deviceOrientation = UIDevice.currentDevice.orientation;
    var statusBarOrientation = UIApplication.sharedApplication.statusBarOrientation;
    var isDeviceOrientationLandscape = isOrientationLandscape(deviceOrientation);
    var isStatusBarOrientationLandscape = isOrientationLandscape(statusBarOrientation);
    return isDeviceOrientationLandscape || isStatusBarOrientationLandscape;
  }

  ios.isLandscape = isLandscape;
  ios.MajorVersion = NSString.stringWithString(UIDevice.currentDevice.systemVersion).intValue;

  function openFile(filePath) {
    console.log("utils.ios.openFile() is deprecated; use utils.openFile() instead");
    return openFileAtRootModule(filePath);
  }

  ios.openFile = openFile;

  function getCurrentAppPath() {
    var currentDir = __dirname;
    var tnsModulesIndex = currentDir.indexOf("/tns_modules");
    var appPath = currentDir;

    if (tnsModulesIndex !== -1) {
      appPath = currentDir.substring(0, tnsModulesIndex);
    }

    return appPath;
  }

  ios.getCurrentAppPath = getCurrentAppPath;

  function joinPaths() {
    var paths = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      paths[_i] = arguments[_i];
    }

    if (!paths || paths.length === 0) {
      return "";
    }

    return NSString.stringWithString(NSString.pathWithComponents(paths)).stringByStandardizingPath;
  }

  ios.joinPaths = joinPaths;

  function getVisibleViewController(rootViewController) {
    if (rootViewController.presentedViewController) {
      return getVisibleViewController(rootViewController.presentedViewController);
    }

    if (rootViewController.isKindOfClass(UINavigationController.class())) {
      return getVisibleViewController(rootViewController.visibleViewController);
    }

    if (rootViewController.isKindOfClass(UITabBarController.class())) {
      return getVisibleViewController(rootViewController);
    }

    return rootViewController;
  }

  ios.getVisibleViewController = getVisibleViewController;

  function applyRotateTransform(transform, x, y, z) {
    if (x) {
      transform = CATransform3DRotate(transform, x * radToDeg, 1, 0, 0);
    }

    if (y) {
      transform = CATransform3DRotate(transform, y * radToDeg, 0, 1, 0);
    }

    if (z) {
      transform = CATransform3DRotate(transform, z * radToDeg, 0, 0, 1);
    }

    return transform;
  }

  ios.applyRotateTransform = applyRotateTransform;

  var UIDocumentInteractionControllerDelegateImpl = function (_super) {
    __extends(UIDocumentInteractionControllerDelegateImpl, _super);

    function UIDocumentInteractionControllerDelegateImpl() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    UIDocumentInteractionControllerDelegateImpl.prototype.getViewController = function () {
      var app = UIApplication.sharedApplication;
      return app.keyWindow.rootViewController;
    };

    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewControllerForPreview = function (controller) {
      return this.getViewController();
    };

    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewForPreview = function (controller) {
      return this.getViewController().view;
    };

    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerRectForPreview = function (controller) {
      return this.getViewController().view.frame;
    };

    UIDocumentInteractionControllerDelegateImpl.ObjCProtocols = [UIDocumentInteractionControllerDelegate];
    return UIDocumentInteractionControllerDelegateImpl;
  }(NSObject);

  ios.UIDocumentInteractionControllerDelegateImpl = UIDocumentInteractionControllerDelegateImpl;
})(ios = exports.ios || (exports.ios = {}));

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/types.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

exports.isString = isString;

function isNumber(value) {
  return typeof value === "number" || value instanceof Number;
}

exports.isNumber = isNumber;

function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}

exports.isBoolean = isBoolean;

function isFunction(value) {
  if (!value) {
    return false;
  }

  return typeof value === "function";
}

exports.isFunction = isFunction;

function isObject(value) {
  if (!value) {
    return false;
  }

  return typeof value === "object";
}

exports.isObject = isObject;

function isUndefined(value) {
  return value === undefined;
}

exports.isUndefined = isUndefined;

function isDefined(value) {
  return typeof value !== "undefined";
}

exports.isDefined = isDefined;

function isNullOrUndefined(value) {
  return value === undefined || value === null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function verifyCallback(value) {
  if (value && !isFunction(value)) {
    throw new TypeError("Callback must be a valid function.");
  }
}

exports.verifyCallback = verifyCallback;
var classInfosMap = new Map();
var funcNameRegex = /function ([_a-zA-Z0-9]{1,})\(/;

function getClass(object) {
  return getClassInfo(object).name;
}

exports.getClass = getClass;

function getClassInfo(object) {
  var constructor = object.constructor;
  var result = classInfosMap.get(constructor);

  if (!result) {
    result = new ClassInfo(constructor);
    classInfosMap.set(constructor, result);
  }

  return result;
}

exports.getClassInfo = getClassInfo;

function getBaseClasses(object) {
  var result = [];
  var info = getClassInfo(object);

  while (info) {
    result.push(info.name);
    info = info.baseClassInfo;
  }

  return result;
}

exports.getBaseClasses = getBaseClasses;

var ClassInfo = function () {
  function ClassInfo(typeCosntructor) {
    this._typeCosntructor = typeCosntructor;
  }

  Object.defineProperty(ClassInfo.prototype, "name", {
    get: function get() {
      if (!this._name) {
        var results = funcNameRegex.exec(this._typeCosntructor.toString());
        this._name = results && results.length > 1 ? results[1] : "";
      }

      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ClassInfo.prototype, "baseClassInfo", {
    get: function get() {
      if (isUndefined(this._baseClassInfo)) {
        this._baseClassInfo = ClassInfo._getBase(this);

        if (this._baseClassInfo && this._baseClassInfo.name === this.name) {
          this._baseClassInfo = ClassInfo._getBase(this._baseClassInfo);
        }
      }

      return this._baseClassInfo;
    },
    enumerable: true,
    configurable: true
  });

  ClassInfo._getBase = function (info) {
    var result = null;
    var constructorProto = info._typeCosntructor.prototype;

    if (constructorProto.__proto__) {
      result = getClassInfo(constructorProto.__proto__);
    }

    return result;
  };

  return ClassInfo;
}();

exports.ClassInfo = ClassInfo;

function toUIString(obj) {
  return isNullOrUndefined(obj) ? "" : obj + "";
}

exports.toUIString = toUIString;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/utils-common.js":
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var types = __webpack_require__("../node_modules/@nativescript/core/utils/types.js");

var mainthread_helper_1 = __webpack_require__("../node_modules/@nativescript/core/utils/mainthread-helper.js");

var module_name_sanitizer_1 = __webpack_require__("../node_modules/@nativescript/core/ui/builder/module-name-sanitizer.js");

var layout = __webpack_require__("../node_modules/@nativescript/core/utils/layout-helper/layout-helper.js");

exports.layout = layout;

__export(__webpack_require__("../node_modules/@nativescript/core/utils/mainthread-helper.js"));

exports.RESOURCE_PREFIX = "res://";
exports.FILE_PREFIX = "file:///";

function escapeRegexSymbols(source) {
  var escapeRegex = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
  return source.replace(escapeRegex, "\\$&");
}

exports.escapeRegexSymbols = escapeRegexSymbols;

function convertString(value) {
  var result;

  if (!types.isString(value) || value.trim() === "") {
    result = value;
  } else {
    var valueAsNumber = +value;

    if (!isNaN(valueAsNumber)) {
      result = valueAsNumber;
    } else if (value && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      result = value.toLowerCase() === "true" ? true : false;
    } else {
      result = value;
    }
  }

  return result;
}

exports.convertString = convertString;

function getModuleName(path) {
  var moduleName = path.replace("./", "");
  return module_name_sanitizer_1.sanitizeModuleName(moduleName);
}

exports.getModuleName = getModuleName;

function isFileOrResourcePath(path) {
  if (!types.isString(path)) {
    return false;
  }

  return path.indexOf("~/") === 0 || path.indexOf("/") === 0 || path.indexOf(exports.RESOURCE_PREFIX) === 0;
}

exports.isFileOrResourcePath = isFileOrResourcePath;

function isFontIconURI(uri) {
  if (!types.isString(uri)) {
    return false;
  }

  var firstSegment = uri.trim().split("//")[0];
  return firstSegment && firstSegment.indexOf("font:") === 0;
}

exports.isFontIconURI = isFontIconURI;

function isDataURI(uri) {
  if (!types.isString(uri)) {
    return false;
  }

  var firstSegment = uri.trim().split(",")[0];
  return firstSegment && firstSegment.indexOf("data:") === 0 && firstSegment.indexOf("base64") >= 0;
}

exports.isDataURI = isDataURI;

function mergeSort(arr, compareFunc) {
  if (arr.length < 2) {
    return arr;
  }

  var middle = arr.length / 2;
  var left = arr.slice(0, middle);
  var right = arr.slice(middle, arr.length);
  return merge(mergeSort(left, compareFunc), mergeSort(right, compareFunc), compareFunc);
}

exports.mergeSort = mergeSort;

function merge(left, right, compareFunc) {
  var result = [];

  while (left.length && right.length) {
    if (compareFunc(left[0], right[0]) <= 0) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
}

exports.merge = merge;

function hasDuplicates(arr) {
  return arr.length !== eliminateDuplicates(arr).length;
}

exports.hasDuplicates = hasDuplicates;

function eliminateDuplicates(arr) {
  return Array.from(new Set(arr));
}

exports.eliminateDuplicates = eliminateDuplicates;

function executeOnMainThread(func) {
  if (mainthread_helper_1.isMainThread()) {
    return func();
  } else {
    mainthread_helper_1.dispatchToMainThread(func);
  }
}

exports.executeOnMainThread = executeOnMainThread;

function mainThreadify(func) {
  return function () {
    var _this = this;

    var argsToPass = arguments;
    executeOnMainThread(function () {
      return func.apply(_this, argsToPass);
    });
  };
}

exports.mainThreadify = mainThreadify;

/***/ }),

/***/ "../node_modules/@nativescript/core/utils/utils.js":
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var native_helper_1 = __webpack_require__("../node_modules/@nativescript/core/utils/native-helper.js");

exports.ios = native_helper_1.ios;

var trace_1 = __webpack_require__("../node_modules/@nativescript/core/trace/trace.js");

__export(__webpack_require__("../node_modules/@nativescript/core/utils/utils-common.js"));

function openFile(filePath) {
  try {
    var appPath = native_helper_1.ios.getCurrentAppPath();
    var path = filePath.replace("~", appPath);
    var controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(path));
    controller.delegate = new native_helper_1.ios.UIDocumentInteractionControllerDelegateImpl();
    return controller.presentPreviewAnimated(true);
  } catch (e) {
    trace_1.write("Error in openFile", trace_1.categories.Error, trace_1.messageType.error);
  }

  return false;
}

exports.openFile = openFile;

function GC() {
  __collect();
}

exports.GC = GC;

function releaseNativeObject(object) {
  __releaseNativeCounterpart(object);
}

exports.releaseNativeObject = releaseNativeObject;

function openUrl(location) {
  try {
    var url = NSURL.URLWithString(location.trim());

    if (UIApplication.sharedApplication.canOpenURL(url)) {
      return UIApplication.sharedApplication.openURL(url);
    }
  } catch (e) {
    trace_1.write("Error in OpenURL", trace_1.categories.Error, trace_1.messageType.error);
  }

  return false;
}

exports.openUrl = openUrl;

/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media " + item[2] + "{" + content + "}";
      } else {
        return content;
      }
    }).join("");
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === "string") modules = [[null, modules, ""]];
    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];
      if (typeof id === "number") alreadyImportedModules[id] = true;
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      //  when a module is imported multiple times with different media queries.
      //  I hope this will never occur (Hey this way we have smaller bundles)

      if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/core.css":
/***/ (function(module, exports) {

module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"comment","comment":"!\n * NativeScript Theme v2.2.1 (https://nativescript.org)\n * Copyright 2016-2016 The Theme Authors\n * Copyright 2016-2019 Progress Software\n * Licensed under Apache 2.0 (https://github.com/NativeScript/theme/blob/master/LICENSE)\n "},{"type":"keyframes","name":"empty","keyframes":[]},{"type":"rule","selectors":[".c-black"],"declarations":[{"type":"declaration","property":"color","value":"#000"}]},{"type":"rule","selectors":[".c-bg-black"],"declarations":[{"type":"declaration","property":"background-color","value":"#000"}]},{"type":"rule","selectors":[".c-white"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".c-bg-white"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".c-grey"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".c-bg-grey"],"declarations":[{"type":"declaration","property":"background-color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".c-grey-light"],"declarations":[{"type":"declaration","property":"color","value":"#bababa"}]},{"type":"rule","selectors":[".c-bg-grey-light"],"declarations":[{"type":"declaration","property":"background-color","value":"#bababa"}]},{"type":"rule","selectors":[".c-charcoal"],"declarations":[{"type":"declaration","property":"color","value":"#303030"}]},{"type":"rule","selectors":[".c-bg-charcoal"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":[".c-transparent"],"declarations":[{"type":"declaration","property":"color","value":"transparent"}]},{"type":"rule","selectors":[".c-bg-transparent"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":[".c-aqua"],"declarations":[{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".c-bg-aqua"],"declarations":[{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".c-blue"],"declarations":[{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".c-bg-blue"],"declarations":[{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".c-brown"],"declarations":[{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".c-bg-brown"],"declarations":[{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".c-forest"],"declarations":[{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".c-bg-forest"],"declarations":[{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".c-grey-dark"],"declarations":[{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".c-bg-grey-dark"],"declarations":[{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".c-purple"],"declarations":[{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".c-bg-purple"],"declarations":[{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".c-lemon"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".c-bg-lemon"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".c-lime"],"declarations":[{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".c-bg-lime"],"declarations":[{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".c-orange"],"declarations":[{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".c-bg-orange"],"declarations":[{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".c-ruby"],"declarations":[{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".c-bg-ruby"],"declarations":[{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".c-sky"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".c-bg-sky"],"declarations":[{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".c-error"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"}]},{"type":"rule","selectors":[".c-bg-error"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"}]},{"type":"rule","selectors":[".w-full"],"declarations":[{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":[".w-100"],"declarations":[{"type":"declaration","property":"width","value":"100"}]},{"type":"rule","selectors":[".h-full"],"declarations":[{"type":"declaration","property":"height","value":"100%"}]},{"type":"rule","selectors":[".h-100"],"declarations":[{"type":"declaration","property":"height","value":"100"}]},{"type":"rule","selectors":[".m-0"],"declarations":[{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":[".m-t-0"],"declarations":[{"type":"declaration","property":"margin-top","value":"0"}]},{"type":"rule","selectors":[".m-r-0"],"declarations":[{"type":"declaration","property":"margin-right","value":"0"}]},{"type":"rule","selectors":[".m-b-0"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":[".m-l-0"],"declarations":[{"type":"declaration","property":"margin-left","value":"0"}]},{"type":"rule","selectors":[".m-x-0"],"declarations":[{"type":"declaration","property":"margin-right","value":"0"},{"type":"declaration","property":"margin-left","value":"0"}]},{"type":"rule","selectors":[".m-y-0"],"declarations":[{"type":"declaration","property":"margin-top","value":"0"},{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":[".m-2"],"declarations":[{"type":"declaration","property":"margin","value":"2"}]},{"type":"rule","selectors":[".m-t-2"],"declarations":[{"type":"declaration","property":"margin-top","value":"2"}]},{"type":"rule","selectors":[".m-r-2"],"declarations":[{"type":"declaration","property":"margin-right","value":"2"}]},{"type":"rule","selectors":[".m-b-2"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"2"}]},{"type":"rule","selectors":[".m-l-2"],"declarations":[{"type":"declaration","property":"margin-left","value":"2"}]},{"type":"rule","selectors":[".m-x-2"],"declarations":[{"type":"declaration","property":"margin-right","value":"2"},{"type":"declaration","property":"margin-left","value":"2"}]},{"type":"rule","selectors":[".m-y-2"],"declarations":[{"type":"declaration","property":"margin-top","value":"2"},{"type":"declaration","property":"margin-bottom","value":"2"}]},{"type":"rule","selectors":[".m-4"],"declarations":[{"type":"declaration","property":"margin","value":"4"}]},{"type":"rule","selectors":[".m-t-4"],"declarations":[{"type":"declaration","property":"margin-top","value":"4"}]},{"type":"rule","selectors":[".m-r-4"],"declarations":[{"type":"declaration","property":"margin-right","value":"4"}]},{"type":"rule","selectors":[".m-b-4"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"4"}]},{"type":"rule","selectors":[".m-l-4"],"declarations":[{"type":"declaration","property":"margin-left","value":"4"}]},{"type":"rule","selectors":[".m-x-4"],"declarations":[{"type":"declaration","property":"margin-right","value":"4"},{"type":"declaration","property":"margin-left","value":"4"}]},{"type":"rule","selectors":[".m-y-4"],"declarations":[{"type":"declaration","property":"margin-top","value":"4"},{"type":"declaration","property":"margin-bottom","value":"4"}]},{"type":"rule","selectors":[".m-5"],"declarations":[{"type":"declaration","property":"margin","value":"5"}]},{"type":"rule","selectors":[".m-t-5"],"declarations":[{"type":"declaration","property":"margin-top","value":"5"}]},{"type":"rule","selectors":[".m-r-5"],"declarations":[{"type":"declaration","property":"margin-right","value":"5"}]},{"type":"rule","selectors":[".m-b-5"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"5"}]},{"type":"rule","selectors":[".m-l-5"],"declarations":[{"type":"declaration","property":"margin-left","value":"5"}]},{"type":"rule","selectors":[".m-x-5"],"declarations":[{"type":"declaration","property":"margin-right","value":"5"},{"type":"declaration","property":"margin-left","value":"5"}]},{"type":"rule","selectors":[".m-y-5"],"declarations":[{"type":"declaration","property":"margin-top","value":"5"},{"type":"declaration","property":"margin-bottom","value":"5"}]},{"type":"rule","selectors":[".m-8"],"declarations":[{"type":"declaration","property":"margin","value":"8"}]},{"type":"rule","selectors":[".m-t-8"],"declarations":[{"type":"declaration","property":"margin-top","value":"8"}]},{"type":"rule","selectors":[".m-r-8"],"declarations":[{"type":"declaration","property":"margin-right","value":"8"}]},{"type":"rule","selectors":[".m-b-8"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"8"}]},{"type":"rule","selectors":[".m-l-8"],"declarations":[{"type":"declaration","property":"margin-left","value":"8"}]},{"type":"rule","selectors":[".m-x-8"],"declarations":[{"type":"declaration","property":"margin-right","value":"8"},{"type":"declaration","property":"margin-left","value":"8"}]},{"type":"rule","selectors":[".m-y-8"],"declarations":[{"type":"declaration","property":"margin-top","value":"8"},{"type":"declaration","property":"margin-bottom","value":"8"}]},{"type":"rule","selectors":[".m-10"],"declarations":[{"type":"declaration","property":"margin","value":"10"}]},{"type":"rule","selectors":[".m-t-10"],"declarations":[{"type":"declaration","property":"margin-top","value":"10"}]},{"type":"rule","selectors":[".m-r-10"],"declarations":[{"type":"declaration","property":"margin-right","value":"10"}]},{"type":"rule","selectors":[".m-b-10"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"10"}]},{"type":"rule","selectors":[".m-l-10"],"declarations":[{"type":"declaration","property":"margin-left","value":"10"}]},{"type":"rule","selectors":[".m-x-10"],"declarations":[{"type":"declaration","property":"margin-right","value":"10"},{"type":"declaration","property":"margin-left","value":"10"}]},{"type":"rule","selectors":[".m-y-10"],"declarations":[{"type":"declaration","property":"margin-top","value":"10"},{"type":"declaration","property":"margin-bottom","value":"10"}]},{"type":"rule","selectors":[".m-12"],"declarations":[{"type":"declaration","property":"margin","value":"12"}]},{"type":"rule","selectors":[".m-t-12"],"declarations":[{"type":"declaration","property":"margin-top","value":"12"}]},{"type":"rule","selectors":[".m-r-12"],"declarations":[{"type":"declaration","property":"margin-right","value":"12"}]},{"type":"rule","selectors":[".m-b-12"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"12"}]},{"type":"rule","selectors":[".m-l-12"],"declarations":[{"type":"declaration","property":"margin-left","value":"12"}]},{"type":"rule","selectors":[".m-x-12"],"declarations":[{"type":"declaration","property":"margin-right","value":"12"},{"type":"declaration","property":"margin-left","value":"12"}]},{"type":"rule","selectors":[".m-y-12"],"declarations":[{"type":"declaration","property":"margin-top","value":"12"},{"type":"declaration","property":"margin-bottom","value":"12"}]},{"type":"rule","selectors":[".m-15"],"declarations":[{"type":"declaration","property":"margin","value":"15"}]},{"type":"rule","selectors":[".m-t-15"],"declarations":[{"type":"declaration","property":"margin-top","value":"15"}]},{"type":"rule","selectors":[".m-r-15"],"declarations":[{"type":"declaration","property":"margin-right","value":"15"}]},{"type":"rule","selectors":[".m-b-15"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"15"}]},{"type":"rule","selectors":[".m-l-15"],"declarations":[{"type":"declaration","property":"margin-left","value":"15"}]},{"type":"rule","selectors":[".m-x-15"],"declarations":[{"type":"declaration","property":"margin-right","value":"15"},{"type":"declaration","property":"margin-left","value":"15"}]},{"type":"rule","selectors":[".m-y-15"],"declarations":[{"type":"declaration","property":"margin-top","value":"15"},{"type":"declaration","property":"margin-bottom","value":"15"}]},{"type":"rule","selectors":[".m-16"],"declarations":[{"type":"declaration","property":"margin","value":"16"}]},{"type":"rule","selectors":[".m-t-16"],"declarations":[{"type":"declaration","property":"margin-top","value":"16"}]},{"type":"rule","selectors":[".m-r-16"],"declarations":[{"type":"declaration","property":"margin-right","value":"16"}]},{"type":"rule","selectors":[".m-b-16"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"16"}]},{"type":"rule","selectors":[".m-l-16"],"declarations":[{"type":"declaration","property":"margin-left","value":"16"}]},{"type":"rule","selectors":[".m-x-16"],"declarations":[{"type":"declaration","property":"margin-right","value":"16"},{"type":"declaration","property":"margin-left","value":"16"}]},{"type":"rule","selectors":[".m-y-16"],"declarations":[{"type":"declaration","property":"margin-top","value":"16"},{"type":"declaration","property":"margin-bottom","value":"16"}]},{"type":"rule","selectors":[".m-20"],"declarations":[{"type":"declaration","property":"margin","value":"20"}]},{"type":"rule","selectors":[".m-t-20"],"declarations":[{"type":"declaration","property":"margin-top","value":"20"}]},{"type":"rule","selectors":[".m-r-20"],"declarations":[{"type":"declaration","property":"margin-right","value":"20"}]},{"type":"rule","selectors":[".m-b-20"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":[".m-l-20"],"declarations":[{"type":"declaration","property":"margin-left","value":"20"}]},{"type":"rule","selectors":[".m-x-20"],"declarations":[{"type":"declaration","property":"margin-right","value":"20"},{"type":"declaration","property":"margin-left","value":"20"}]},{"type":"rule","selectors":[".m-y-20"],"declarations":[{"type":"declaration","property":"margin-top","value":"20"},{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":[".m-24"],"declarations":[{"type":"declaration","property":"margin","value":"24"}]},{"type":"rule","selectors":[".m-t-24"],"declarations":[{"type":"declaration","property":"margin-top","value":"24"}]},{"type":"rule","selectors":[".m-r-24"],"declarations":[{"type":"declaration","property":"margin-right","value":"24"}]},{"type":"rule","selectors":[".m-b-24"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"24"}]},{"type":"rule","selectors":[".m-l-24"],"declarations":[{"type":"declaration","property":"margin-left","value":"24"}]},{"type":"rule","selectors":[".m-x-24"],"declarations":[{"type":"declaration","property":"margin-right","value":"24"},{"type":"declaration","property":"margin-left","value":"24"}]},{"type":"rule","selectors":[".m-y-24"],"declarations":[{"type":"declaration","property":"margin-top","value":"24"},{"type":"declaration","property":"margin-bottom","value":"24"}]},{"type":"rule","selectors":[".m-25"],"declarations":[{"type":"declaration","property":"margin","value":"25"}]},{"type":"rule","selectors":[".m-t-25"],"declarations":[{"type":"declaration","property":"margin-top","value":"25"}]},{"type":"rule","selectors":[".m-r-25"],"declarations":[{"type":"declaration","property":"margin-right","value":"25"}]},{"type":"rule","selectors":[".m-b-25"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"25"}]},{"type":"rule","selectors":[".m-l-25"],"declarations":[{"type":"declaration","property":"margin-left","value":"25"}]},{"type":"rule","selectors":[".m-x-25"],"declarations":[{"type":"declaration","property":"margin-right","value":"25"},{"type":"declaration","property":"margin-left","value":"25"}]},{"type":"rule","selectors":[".m-y-25"],"declarations":[{"type":"declaration","property":"margin-top","value":"25"},{"type":"declaration","property":"margin-bottom","value":"25"}]},{"type":"rule","selectors":[".m-28"],"declarations":[{"type":"declaration","property":"margin","value":"28"}]},{"type":"rule","selectors":[".m-t-28"],"declarations":[{"type":"declaration","property":"margin-top","value":"28"}]},{"type":"rule","selectors":[".m-r-28"],"declarations":[{"type":"declaration","property":"margin-right","value":"28"}]},{"type":"rule","selectors":[".m-b-28"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"28"}]},{"type":"rule","selectors":[".m-l-28"],"declarations":[{"type":"declaration","property":"margin-left","value":"28"}]},{"type":"rule","selectors":[".m-x-28"],"declarations":[{"type":"declaration","property":"margin-right","value":"28"},{"type":"declaration","property":"margin-left","value":"28"}]},{"type":"rule","selectors":[".m-y-28"],"declarations":[{"type":"declaration","property":"margin-top","value":"28"},{"type":"declaration","property":"margin-bottom","value":"28"}]},{"type":"rule","selectors":[".m-30"],"declarations":[{"type":"declaration","property":"margin","value":"30"}]},{"type":"rule","selectors":[".m-t-30"],"declarations":[{"type":"declaration","property":"margin-top","value":"30"}]},{"type":"rule","selectors":[".m-r-30"],"declarations":[{"type":"declaration","property":"margin-right","value":"30"}]},{"type":"rule","selectors":[".m-b-30"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"30"}]},{"type":"rule","selectors":[".m-l-30"],"declarations":[{"type":"declaration","property":"margin-left","value":"30"}]},{"type":"rule","selectors":[".m-x-30"],"declarations":[{"type":"declaration","property":"margin-right","value":"30"},{"type":"declaration","property":"margin-left","value":"30"}]},{"type":"rule","selectors":[".m-y-30"],"declarations":[{"type":"declaration","property":"margin-top","value":"30"},{"type":"declaration","property":"margin-bottom","value":"30"}]},{"type":"rule","selectors":[".p-0"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":[".p-t-0"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"}]},{"type":"rule","selectors":[".p-r-0"],"declarations":[{"type":"declaration","property":"padding-right","value":"0"}]},{"type":"rule","selectors":[".p-b-0"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"0"}]},{"type":"rule","selectors":[".p-l-0"],"declarations":[{"type":"declaration","property":"padding-left","value":"0"}]},{"type":"rule","selectors":[".p-x-0"],"declarations":[{"type":"declaration","property":"padding-right","value":"0"},{"type":"declaration","property":"padding-left","value":"0"}]},{"type":"rule","selectors":[".p-y-0"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"},{"type":"declaration","property":"padding-bottom","value":"0"}]},{"type":"rule","selectors":[".p-2"],"declarations":[{"type":"declaration","property":"padding","value":"2"}]},{"type":"rule","selectors":[".p-t-2"],"declarations":[{"type":"declaration","property":"padding-top","value":"2"}]},{"type":"rule","selectors":[".p-r-2"],"declarations":[{"type":"declaration","property":"padding-right","value":"2"}]},{"type":"rule","selectors":[".p-b-2"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"2"}]},{"type":"rule","selectors":[".p-l-2"],"declarations":[{"type":"declaration","property":"padding-left","value":"2"}]},{"type":"rule","selectors":[".p-x-2"],"declarations":[{"type":"declaration","property":"padding-right","value":"2"},{"type":"declaration","property":"padding-left","value":"2"}]},{"type":"rule","selectors":[".p-y-2"],"declarations":[{"type":"declaration","property":"padding-top","value":"2"},{"type":"declaration","property":"padding-bottom","value":"2"}]},{"type":"rule","selectors":[".p-4"],"declarations":[{"type":"declaration","property":"padding","value":"4"}]},{"type":"rule","selectors":[".p-t-4"],"declarations":[{"type":"declaration","property":"padding-top","value":"4"}]},{"type":"rule","selectors":[".p-r-4"],"declarations":[{"type":"declaration","property":"padding-right","value":"4"}]},{"type":"rule","selectors":[".p-b-4"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"4"}]},{"type":"rule","selectors":[".p-l-4"],"declarations":[{"type":"declaration","property":"padding-left","value":"4"}]},{"type":"rule","selectors":[".p-x-4"],"declarations":[{"type":"declaration","property":"padding-right","value":"4"},{"type":"declaration","property":"padding-left","value":"4"}]},{"type":"rule","selectors":[".p-y-4"],"declarations":[{"type":"declaration","property":"padding-top","value":"4"},{"type":"declaration","property":"padding-bottom","value":"4"}]},{"type":"rule","selectors":[".p-5"],"declarations":[{"type":"declaration","property":"padding","value":"5"}]},{"type":"rule","selectors":[".p-t-5"],"declarations":[{"type":"declaration","property":"padding-top","value":"5"}]},{"type":"rule","selectors":[".p-r-5"],"declarations":[{"type":"declaration","property":"padding-right","value":"5"}]},{"type":"rule","selectors":[".p-b-5"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"5"}]},{"type":"rule","selectors":[".p-l-5"],"declarations":[{"type":"declaration","property":"padding-left","value":"5"}]},{"type":"rule","selectors":[".p-x-5"],"declarations":[{"type":"declaration","property":"padding-right","value":"5"},{"type":"declaration","property":"padding-left","value":"5"}]},{"type":"rule","selectors":[".p-y-5"],"declarations":[{"type":"declaration","property":"padding-top","value":"5"},{"type":"declaration","property":"padding-bottom","value":"5"}]},{"type":"rule","selectors":[".p-8"],"declarations":[{"type":"declaration","property":"padding","value":"8"}]},{"type":"rule","selectors":[".p-t-8"],"declarations":[{"type":"declaration","property":"padding-top","value":"8"}]},{"type":"rule","selectors":[".p-r-8"],"declarations":[{"type":"declaration","property":"padding-right","value":"8"}]},{"type":"rule","selectors":[".p-b-8"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"8"}]},{"type":"rule","selectors":[".p-l-8"],"declarations":[{"type":"declaration","property":"padding-left","value":"8"}]},{"type":"rule","selectors":[".p-x-8"],"declarations":[{"type":"declaration","property":"padding-right","value":"8"},{"type":"declaration","property":"padding-left","value":"8"}]},{"type":"rule","selectors":[".p-y-8"],"declarations":[{"type":"declaration","property":"padding-top","value":"8"},{"type":"declaration","property":"padding-bottom","value":"8"}]},{"type":"rule","selectors":[".p-10"],"declarations":[{"type":"declaration","property":"padding","value":"10"}]},{"type":"rule","selectors":[".p-t-10"],"declarations":[{"type":"declaration","property":"padding-top","value":"10"}]},{"type":"rule","selectors":[".p-r-10"],"declarations":[{"type":"declaration","property":"padding-right","value":"10"}]},{"type":"rule","selectors":[".p-b-10"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"10"}]},{"type":"rule","selectors":[".p-l-10"],"declarations":[{"type":"declaration","property":"padding-left","value":"10"}]},{"type":"rule","selectors":[".p-x-10"],"declarations":[{"type":"declaration","property":"padding-right","value":"10"},{"type":"declaration","property":"padding-left","value":"10"}]},{"type":"rule","selectors":[".p-y-10"],"declarations":[{"type":"declaration","property":"padding-top","value":"10"},{"type":"declaration","property":"padding-bottom","value":"10"}]},{"type":"rule","selectors":[".p-12"],"declarations":[{"type":"declaration","property":"padding","value":"12"}]},{"type":"rule","selectors":[".p-t-12"],"declarations":[{"type":"declaration","property":"padding-top","value":"12"}]},{"type":"rule","selectors":[".p-r-12"],"declarations":[{"type":"declaration","property":"padding-right","value":"12"}]},{"type":"rule","selectors":[".p-b-12"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"12"}]},{"type":"rule","selectors":[".p-l-12"],"declarations":[{"type":"declaration","property":"padding-left","value":"12"}]},{"type":"rule","selectors":[".p-x-12"],"declarations":[{"type":"declaration","property":"padding-right","value":"12"},{"type":"declaration","property":"padding-left","value":"12"}]},{"type":"rule","selectors":[".p-y-12"],"declarations":[{"type":"declaration","property":"padding-top","value":"12"},{"type":"declaration","property":"padding-bottom","value":"12"}]},{"type":"rule","selectors":[".p-15"],"declarations":[{"type":"declaration","property":"padding","value":"15"}]},{"type":"rule","selectors":[".p-t-15"],"declarations":[{"type":"declaration","property":"padding-top","value":"15"}]},{"type":"rule","selectors":[".p-r-15"],"declarations":[{"type":"declaration","property":"padding-right","value":"15"}]},{"type":"rule","selectors":[".p-b-15"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"15"}]},{"type":"rule","selectors":[".p-l-15"],"declarations":[{"type":"declaration","property":"padding-left","value":"15"}]},{"type":"rule","selectors":[".p-x-15"],"declarations":[{"type":"declaration","property":"padding-right","value":"15"},{"type":"declaration","property":"padding-left","value":"15"}]},{"type":"rule","selectors":[".p-y-15"],"declarations":[{"type":"declaration","property":"padding-top","value":"15"},{"type":"declaration","property":"padding-bottom","value":"15"}]},{"type":"rule","selectors":[".p-16"],"declarations":[{"type":"declaration","property":"padding","value":"16"}]},{"type":"rule","selectors":[".p-t-16"],"declarations":[{"type":"declaration","property":"padding-top","value":"16"}]},{"type":"rule","selectors":[".p-r-16"],"declarations":[{"type":"declaration","property":"padding-right","value":"16"}]},{"type":"rule","selectors":[".p-b-16"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"16"}]},{"type":"rule","selectors":[".p-l-16"],"declarations":[{"type":"declaration","property":"padding-left","value":"16"}]},{"type":"rule","selectors":[".p-x-16"],"declarations":[{"type":"declaration","property":"padding-right","value":"16"},{"type":"declaration","property":"padding-left","value":"16"}]},{"type":"rule","selectors":[".p-y-16"],"declarations":[{"type":"declaration","property":"padding-top","value":"16"},{"type":"declaration","property":"padding-bottom","value":"16"}]},{"type":"rule","selectors":[".p-20"],"declarations":[{"type":"declaration","property":"padding","value":"20"}]},{"type":"rule","selectors":[".p-t-20"],"declarations":[{"type":"declaration","property":"padding-top","value":"20"}]},{"type":"rule","selectors":[".p-r-20"],"declarations":[{"type":"declaration","property":"padding-right","value":"20"}]},{"type":"rule","selectors":[".p-b-20"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".p-l-20"],"declarations":[{"type":"declaration","property":"padding-left","value":"20"}]},{"type":"rule","selectors":[".p-x-20"],"declarations":[{"type":"declaration","property":"padding-right","value":"20"},{"type":"declaration","property":"padding-left","value":"20"}]},{"type":"rule","selectors":[".p-y-20"],"declarations":[{"type":"declaration","property":"padding-top","value":"20"},{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".p-24"],"declarations":[{"type":"declaration","property":"padding","value":"24"}]},{"type":"rule","selectors":[".p-t-24"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"}]},{"type":"rule","selectors":[".p-r-24"],"declarations":[{"type":"declaration","property":"padding-right","value":"24"}]},{"type":"rule","selectors":[".p-b-24"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"24"}]},{"type":"rule","selectors":[".p-l-24"],"declarations":[{"type":"declaration","property":"padding-left","value":"24"}]},{"type":"rule","selectors":[".p-x-24"],"declarations":[{"type":"declaration","property":"padding-right","value":"24"},{"type":"declaration","property":"padding-left","value":"24"}]},{"type":"rule","selectors":[".p-y-24"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"},{"type":"declaration","property":"padding-bottom","value":"24"}]},{"type":"rule","selectors":[".p-25"],"declarations":[{"type":"declaration","property":"padding","value":"25"}]},{"type":"rule","selectors":[".p-t-25"],"declarations":[{"type":"declaration","property":"padding-top","value":"25"}]},{"type":"rule","selectors":[".p-r-25"],"declarations":[{"type":"declaration","property":"padding-right","value":"25"}]},{"type":"rule","selectors":[".p-b-25"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"25"}]},{"type":"rule","selectors":[".p-l-25"],"declarations":[{"type":"declaration","property":"padding-left","value":"25"}]},{"type":"rule","selectors":[".p-x-25"],"declarations":[{"type":"declaration","property":"padding-right","value":"25"},{"type":"declaration","property":"padding-left","value":"25"}]},{"type":"rule","selectors":[".p-y-25"],"declarations":[{"type":"declaration","property":"padding-top","value":"25"},{"type":"declaration","property":"padding-bottom","value":"25"}]},{"type":"rule","selectors":[".p-28"],"declarations":[{"type":"declaration","property":"padding","value":"28"}]},{"type":"rule","selectors":[".p-t-28"],"declarations":[{"type":"declaration","property":"padding-top","value":"28"}]},{"type":"rule","selectors":[".p-r-28"],"declarations":[{"type":"declaration","property":"padding-right","value":"28"}]},{"type":"rule","selectors":[".p-b-28"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"28"}]},{"type":"rule","selectors":[".p-l-28"],"declarations":[{"type":"declaration","property":"padding-left","value":"28"}]},{"type":"rule","selectors":[".p-x-28"],"declarations":[{"type":"declaration","property":"padding-right","value":"28"},{"type":"declaration","property":"padding-left","value":"28"}]},{"type":"rule","selectors":[".p-y-28"],"declarations":[{"type":"declaration","property":"padding-top","value":"28"},{"type":"declaration","property":"padding-bottom","value":"28"}]},{"type":"rule","selectors":[".p-30"],"declarations":[{"type":"declaration","property":"padding","value":"30"}]},{"type":"rule","selectors":[".p-t-30"],"declarations":[{"type":"declaration","property":"padding-top","value":"30"}]},{"type":"rule","selectors":[".p-r-30"],"declarations":[{"type":"declaration","property":"padding-right","value":"30"}]},{"type":"rule","selectors":[".p-b-30"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"30"}]},{"type":"rule","selectors":[".p-l-30"],"declarations":[{"type":"declaration","property":"padding-left","value":"30"}]},{"type":"rule","selectors":[".p-x-30"],"declarations":[{"type":"declaration","property":"padding-right","value":"30"},{"type":"declaration","property":"padding-left","value":"30"}]},{"type":"rule","selectors":[".p-y-30"],"declarations":[{"type":"declaration","property":"padding-top","value":"30"},{"type":"declaration","property":"padding-bottom","value":"30"}]},{"type":"rule","selectors":[".text-left"],"declarations":[{"type":"declaration","property":"text-align","value":"left"}]},{"type":"rule","selectors":[".text-right"],"declarations":[{"type":"declaration","property":"text-align","value":"right"}]},{"type":"rule","selectors":[".text-center"],"declarations":[{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":[".text-lowercase"],"declarations":[{"type":"declaration","property":"text-transform","value":"lowercase"}]},{"type":"rule","selectors":[".text-uppercase"],"declarations":[{"type":"declaration","property":"text-transform","value":"uppercase"}]},{"type":"rule","selectors":[".text-capitalize"],"declarations":[{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":[".font-weight-normal"],"declarations":[{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":[".font-weight-bold"],"declarations":[{"type":"declaration","property":"font-weight","value":"bold"}]},{"type":"rule","selectors":[".font-italic"],"declarations":[{"type":"declaration","property":"font-style","value":"italic"}]},{"type":"rule","selectors":[".t-10"],"declarations":[{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".t-12"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".t-14"],"declarations":[{"type":"declaration","property":"font-size","value":"16"}]},{"type":"rule","selectors":[".t-15"],"declarations":[{"type":"declaration","property":"font-size","value":"17"}]},{"type":"rule","selectors":[".t-16"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]},{"type":"rule","selectors":[".t-17"],"declarations":[{"type":"declaration","property":"font-size","value":"19"}]},{"type":"rule","selectors":[".t-18"],"declarations":[{"type":"declaration","property":"font-size","value":"20"}]},{"type":"rule","selectors":[".t-19"],"declarations":[{"type":"declaration","property":"font-size","value":"21"}]},{"type":"rule","selectors":[".t-20"],"declarations":[{"type":"declaration","property":"font-size","value":"22"}]},{"type":"rule","selectors":[".t-25"],"declarations":[{"type":"declaration","property":"font-size","value":"27"}]},{"type":"rule","selectors":[".t-30"],"declarations":[{"type":"declaration","property":"font-size","value":"32"}]},{"type":"rule","selectors":[".t-36"],"declarations":[{"type":"declaration","property":"font-size","value":"38"}]},{"type":"rule","selectors":[".h1",".h2",".h3",".h4",".h5",".h6"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"4"},{"type":"declaration","property":"font-weight","value":"normal"},{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark .h1",".ns-dark .h2",".ns-dark .h3",".ns-dark .h4",".ns-dark .h5",".ns-dark .h6"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".body",".body2",".footnote"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":[".ns-dark .body",".ns-dark .body2",".ns-dark .footnote"],"declarations":[{"type":"declaration","property":"color","value":"#b3b3b3"}]},{"type":"rule","selectors":[".h1"],"declarations":[{"type":"declaration","property":"font-size","value":"32"}]},{"type":"rule","selectors":[".h2"],"declarations":[{"type":"declaration","property":"font-size","value":"22"}]},{"type":"rule","selectors":[".h3"],"declarations":[{"type":"declaration","property":"font-size","value":"15"}]},{"type":"rule","selectors":[".h4"],"declarations":[{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".h5"],"declarations":[{"type":"declaration","property":"font-size","value":"11"}]},{"type":"rule","selectors":[".h6"],"declarations":[{"type":"declaration","property":"font-size","value":"10"}]},{"type":"rule","selectors":[".body"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".body2"],"declarations":[{"type":"declaration","property":"font-size","value":"17"}]},{"type":"rule","selectors":[".footnote"],"declarations":[{"type":"declaration","property":"font-size","value":"13"}]},{"type":"rule","selectors":[".ns-android .h1"],"declarations":[{"type":"declaration","property":"font-size","value":"34"}]},{"type":"rule","selectors":[".ns-android .h2"],"declarations":[{"type":"declaration","property":"font-size","value":"24"}]},{"type":"rule","selectors":[".ns-android .h3"],"declarations":[{"type":"declaration","property":"font-size","value":"16"}]},{"type":"rule","selectors":[".ns-android .h5"],"declarations":[{"type":"declaration","property":"font-size","value":"11"},{"type":"declaration","property":"font-weight","value":"bold"}]},{"type":"rule","selectors":[".ns-android .body2"],"declarations":[{"type":"declaration","property":"font-size","value":"14"},{"type":"declaration","property":"font-weight","value":"500"}]},{"type":"rule","selectors":[".img-rounded"],"declarations":[{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".img-circle"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":[".img-thumbnail"],"declarations":[{"type":"declaration","property":"border-radius","value":"0"}]},{"type":"rule","selectors":[".invisible"],"declarations":[{"type":"declaration","property":"visibility","value":"collapse"}]},{"type":"rule","selectors":[".pull-left"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":[".pull-right"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"right"}]},{"type":"rule","selectors":[".m-x-auto"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":[".m-y-auto"],"declarations":[{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":[".text-primary"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".text-danger"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"}]},{"type":"rule","selectors":[".bg-primary"],"declarations":[{"type":"declaration","property":"background-color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".bg-danger"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-modal",".ns-root"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"font-family","value":"sans-serif"},{"type":"declaration","property":"font-size","value":"12"}]},{"type":"rule","selectors":[".ns-dark.ns-modal",".ns-dark.ns-root"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".-hidden",".hidden"],"declarations":[{"type":"declaration","property":"visibility","value":"collapsed"}]},{"type":"rule","selectors":[".-rounded",".rounded"],"declarations":[{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".-circle"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":[".hr"],"declarations":[{"type":"declaration","property":"height","value":"1"},{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"margin","value":"9 0 10"},{"type":"declaration","property":"border-width","value":"0 0 1"},{"type":"declaration","property":"border-style","value":"solid"}]},{"type":"rule","selectors":[".text-muted"],"declarations":[{"type":"declaration","property":"color","value":"#ace4ff"}]},{"type":"rule","selectors":[".ns-dark .text-muted"],"declarations":[{"type":"declaration","property":"color","value":"#446f83"}]},{"type":"rule","selectors":["Label>*","Label>*>*","Button>*","Button>*>*","TextField>*","TextField>*>*","TextView>*","TextView>*>*"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["ListView","RadListView"],"declarations":[{"type":"declaration","property":"min-height","value":"100"}]},{"type":"rule","selectors":["Image"],"declarations":[{"type":"declaration","property":"min-height","value":"20"}]},{"type":"rule","selectors":[".nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":["Button",".nt-button"],"declarations":[{"type":"declaration","property":"text-transform","value":"none"},{"type":"declaration","property":"border-color","value":"transparent"},{"type":"declaration","property":"min-width","value":"64"},{"type":"declaration","property":"height","value":"52"},{"type":"declaration","property":"padding","value":"0 5 0 5"},{"type":"declaration","property":"font-size","value":"14"},{"type":"declaration","property":"margin","value":"8 16 8 16"}]},{"type":"rule","selectors":[".ns-ios Button",".ns-ios .nt-button"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-width","value":"0"}]},{"type":"rule","selectors":[".ns-android Button",".ns-android .nt-button"],"declarations":[{"type":"declaration","property":"margin","value":"4 12"}]},{"type":"rule","selectors":["Button.-outline",".nt-button.-outline"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-width","value":"1"}]},{"type":"rule","selectors":[".ns-android Button.-outline",".ns-android .nt-button.-outline"],"declarations":[{"type":"declaration","property":"margin","value":"8 16"}]},{"type":"rule","selectors":["Button.-rounded-sm","Button.-rounded-lg",".nt-button.-rounded-sm",".nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":[".ns-android Button.-rounded-sm",".ns-android Button.-rounded-lg",".ns-android .nt-button.-rounded-sm",".ns-android .nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"margin","value":"8 16"}]},{"type":"rule","selectors":["Button.-rounded-lg",".nt-button.-rounded-lg"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["Button[isEnabled=false]",".nt-button[isEnabled=false]"],"declarations":[{"type":"declaration","property":"opacity","value":".5"}]},{"type":"rule","selectors":["Button.-simple",".nt-button.-simple"],"declarations":[{"type":"declaration","property":"android-elevation","value":"0"},{"type":"declaration","property":"android-dynamic-elevation-offset","value":"0"}]},{"type":"rule","selectors":[".ns-root Button.-aqua",".ns-root .nt-button.-aqua"],"declarations":[{"type":"declaration","property":"border-color","value":"#00caab"},{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-aqua",".ns-dark.ns-root .nt-button.-aqua"],"declarations":[{"type":"declaration","property":"border-color","value":"#00caab"},{"type":"declaration","property":"color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-root Button.-aqua.-primary",".ns-root .nt-button.-aqua.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fdffff"},{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-aqua.-primary",".ns-dark.ns-root .nt-button.-aqua.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fdffff"},{"type":"declaration","property":"background-color","value":"#00caab"}]},{"type":"rule","selectors":[".ns-root Button.-blue",".ns-root .nt-button.-blue"],"declarations":[{"type":"declaration","property":"border-color","value":"#3a53ff"},{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-blue",".ns-dark.ns-root .nt-button.-blue"],"declarations":[{"type":"declaration","property":"border-color","value":"#3a53ff"},{"type":"declaration","property":"color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-root Button.-blue.-primary",".ns-root .nt-button.-blue.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-blue.-primary",".ns-dark.ns-root .nt-button.-blue.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#3a53ff"}]},{"type":"rule","selectors":[".ns-root Button.-brown",".ns-root .nt-button.-brown"],"declarations":[{"type":"declaration","property":"border-color","value":"#795548"},{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-brown",".ns-dark.ns-root .nt-button.-brown"],"declarations":[{"type":"declaration","property":"border-color","value":"#795548"},{"type":"declaration","property":"color","value":"#795548"}]},{"type":"rule","selectors":[".ns-root Button.-brown.-primary",".ns-root .nt-button.-brown.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fbf9f8"},{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-brown.-primary",".ns-dark.ns-root .nt-button.-brown.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fbf9f8"},{"type":"declaration","property":"background-color","value":"#795548"}]},{"type":"rule","selectors":[".ns-root Button.-forest",".ns-root .nt-button.-forest"],"declarations":[{"type":"declaration","property":"border-color","value":"#006968"},{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-forest",".ns-dark.ns-root .nt-button.-forest"],"declarations":[{"type":"declaration","property":"border-color","value":"#006968"},{"type":"declaration","property":"color","value":"#006968"}]},{"type":"rule","selectors":[".ns-root Button.-forest.-primary",".ns-root .nt-button.-forest.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#9cfffe"},{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-forest.-primary",".ns-dark.ns-root .nt-button.-forest.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#9cfffe"},{"type":"declaration","property":"background-color","value":"#006968"}]},{"type":"rule","selectors":[".ns-root Button.-grey",".ns-root .nt-button.-grey"],"declarations":[{"type":"declaration","property":"border-color","value":"#5c687c"},{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-grey",".ns-dark.ns-root .nt-button.-grey"],"declarations":[{"type":"declaration","property":"border-color","value":"#5c687c"},{"type":"declaration","property":"color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-root Button.-grey.-primary",".ns-root .nt-button.-grey.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-grey.-primary",".ns-dark.ns-root .nt-button.-grey.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#5c687c"}]},{"type":"rule","selectors":[".ns-root Button.-lemon",".ns-root .nt-button.-lemon"],"declarations":[{"type":"declaration","property":"border-color","value":"#ffea00"},{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lemon",".ns-dark.ns-root .nt-button.-lemon"],"declarations":[{"type":"declaration","property":"border-color","value":"#ffea00"},{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-root Button.-lemon.-primary",".ns-root .nt-button.-lemon.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lemon.-primary",".ns-dark.ns-root .nt-button.-lemon.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-root Button.-lime",".ns-root .nt-button.-lime"],"declarations":[{"type":"declaration","property":"border-color","value":"#aee406"},{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lime",".ns-dark.ns-root .nt-button.-lime"],"declarations":[{"type":"declaration","property":"border-color","value":"#aee406"},{"type":"declaration","property":"color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-root Button.-lime.-primary",".ns-root .nt-button.-lime.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-lime.-primary",".ns-dark.ns-root .nt-button.-lime.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#aee406"}]},{"type":"rule","selectors":[".ns-root Button.-orange",".ns-root .nt-button.-orange"],"declarations":[{"type":"declaration","property":"border-color","value":"#f57c00"},{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-orange",".ns-dark.ns-root .nt-button.-orange"],"declarations":[{"type":"declaration","property":"border-color","value":"#f57c00"},{"type":"declaration","property":"color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-root Button.-orange.-primary",".ns-root .nt-button.-orange.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-orange.-primary",".ns-dark.ns-root .nt-button.-orange.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#f57c00"}]},{"type":"rule","selectors":[".ns-root Button.-purple",".ns-root .nt-button.-purple"],"declarations":[{"type":"declaration","property":"border-color","value":"#8130ff"},{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-purple",".ns-dark.ns-root .nt-button.-purple"],"declarations":[{"type":"declaration","property":"border-color","value":"#8130ff"},{"type":"declaration","property":"color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-root Button.-purple.-primary",".ns-root .nt-button.-purple.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-purple.-primary",".ns-dark.ns-root .nt-button.-purple.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#8130ff"}]},{"type":"rule","selectors":[".ns-root Button.-ruby",".ns-root .nt-button.-ruby"],"declarations":[{"type":"declaration","property":"border-color","value":"#ff1744"},{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-ruby",".ns-dark.ns-root .nt-button.-ruby"],"declarations":[{"type":"declaration","property":"border-color","value":"#ff1744"},{"type":"declaration","property":"color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-root Button.-ruby.-primary",".ns-root .nt-button.-ruby.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-ruby.-primary",".ns-dark.ns-root .nt-button.-ruby.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#ff1744"}]},{"type":"rule","selectors":[".ns-root Button.-sky",".ns-root .nt-button.-sky"],"declarations":[{"type":"declaration","property":"border-color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-sky",".ns-dark.ns-root .nt-button.-sky"],"declarations":[{"type":"declaration","property":"border-color","value":"#30bcff"},{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-root Button.-sky.-primary",".ns-root .nt-button.-sky.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-root Button.-sky.-primary",".ns-dark.ns-root .nt-button.-sky.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":["Frame",".nt-frame"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark Frame",".ns-dark .nt-frame"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["Page",".nt-page"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark Page",".ns-dark .nt-page"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["ActivityIndicator",".nt-activity-indicator"],"declarations":[{"type":"declaration","property":"width","value":"30"},{"type":"declaration","property":"height","value":"30"}]},{"type":"rule","selectors":["Slider",".nt-slider"],"declarations":[{"type":"declaration","property":"margin","value":"20 16"}]},{"type":"rule","selectors":[".ns-ios Slider",".ns-ios .nt-slider"],"declarations":[{"type":"declaration","property":"margin","value":"10 15"}]},{"type":"rule","selectors":["Slider[isEnabled=false]",".nt-slider[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"#e0e0e0"},{"type":"declaration","property":"color","value":"#e0e0e0"}]},{"type":"rule","selectors":[".ns-android Switch",".ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"margin","value":"14 16"}]},{"type":"rule","selectors":[".ns-android Switch[isEnabled=false]",".ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[isEnabled=false]",".ns-dark.ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch",".ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"margin","value":"8 15"}]},{"type":"rule","selectors":[".ns-ios Switch[isEnabled=false]",".ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(48,188,255,.4)"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch[isEnabled=false]",".ns-dark.ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(99,205,255,.4)"}]},{"type":"rule","selectors":["TabView",".nt-tab-view"],"declarations":[{"type":"declaration","property":"tab-text-font-size","value":"14"},{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":["BottomNavigation",".nt-bottom-navigation"],"declarations":[{"type":"declaration","property":"font-size","value":"10"}]},{"type":"rule","selectors":["ListView","RadListView",".nt-list-view"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["ListView StackLayout","RadListView StackLayout",".nt-list-view StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"8"}]},{"type":"rule","selectors":["ListView>*","RadListView>*",".nt-list-view>*"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"padding","value":"8"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":["ListView>* Label","RadListView>* Label",".nt-list-view>* Label"],"declarations":[{"type":"declaration","property":"padding","value":"5"},{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":["ListView>* Image","RadListView>* Image",".nt-list-view>* Image"],"declarations":[{"type":"declaration","property":"stretch","value":"aspectFit"}]},{"type":"rule","selectors":["ListView .thumb","ListView .-thumb","RadListView .thumb","RadListView .-thumb",".nt-list-view .thumb",".nt-list-view .-thumb"],"declarations":[{"type":"declaration","property":"stretch","value":"fill"},{"type":"declaration","property":"width","value":"40"},{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"min-height","value":"0"},{"type":"declaration","property":"margin-right","value":"16"}]},{"type":"rule","selectors":["ListView.-single-col-cards Image","RadListView.-single-col-cards Image",".nt-list-view.-single-col-cards Image"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"height","value":"200"}]},{"type":"rule","selectors":["ListView.-two-col-cards Image","RadListView.-two-col-cards Image",".nt-list-view.-two-col-cards Image"],"declarations":[{"type":"declaration","property":"height","value":"100"}]},{"type":"rule","selectors":[".ns-ios ListView.-two-col-cards>StackLayout",".ns-ios RadListView.-two-col-cards>StackLayout",".ns-ios .nt-list-view.-two-col-cards>StackLayout"],"declarations":[{"type":"declaration","property":"width","value":"50%"}]},{"type":"rule","selectors":[".ns-ios ListView.-two-col-cards>StackLayout Image",".ns-ios RadListView.-two-col-cards>StackLayout Image",".ns-ios .nt-list-view.-two-col-cards>StackLayout Image"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"},{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":["ListView.-two-lines-image Image","ListView.-single-line-image Image","RadListView.-two-lines-image Image","RadListView.-single-line-image Image",".nt-list-view.-two-lines-image Image",".nt-list-view.-single-line-image Image"],"declarations":[{"type":"declaration","property":"width","value":"60"},{"type":"declaration","property":"height","value":"60"},{"type":"declaration","property":"margin-right","value":"10"},{"type":"declaration","property":"margin-bottom","value":"0"}]},{"type":"rule","selectors":["ListView .-separator","RadListView .-separator",".nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-width","value":"1"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete","RadListView .nt-list-view__delete",".nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"padding","value":"0 10"}]},{"type":"rule","selectors":[".ns-ios ListView .nt-list-view__delete",".ns-ios RadListView .nt-list-view__delete",".ns-ios .nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"padding","value":"0 10 0 25"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete>Label","RadListView .nt-list-view__delete>Label",".nt-list-view .nt-list-view__delete>Label"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"text-transform","value":"capitalize"}]},{"type":"rule","selectors":["ListView .nt-icon","RadListView .nt-icon",".nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"width","value":"56"},{"type":"declaration","property":"height","value":"100%"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["RadListView>StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":["RadListView>*>*"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header",".nt-drawer .nt-drawer__header"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"vertical-align","value":"top"},{"type":"declaration","property":"padding","value":"35 0"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header Label",".nt-drawer .nt-drawer__header Label"],"declarations":[{"type":"declaration","property":"padding","value":"0"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header>Label",".nt-drawer .nt-drawer__header>Label"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header-image",".nt-drawer .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"height","value":"74"},{"type":"declaration","property":"width","value":"74"},{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header-footnote",".nt-drawer .nt-drawer__header-footnote"],"declarations":[{"type":"declaration","property":"opacity","value":".5"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header>Label","RadSideDrawer .nt-drawer__header-image",".nt-drawer .nt-drawer__header>Label",".nt-drawer .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"margin-left","value":"15"},{"type":"declaration","property":"margin-right","value":"15"},{"type":"declaration","property":"horizontal-align","value":"center"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header.-left>Label","RadSideDrawer .nt-drawer__header.-left .nt-drawer__header-image",".nt-drawer .nt-drawer__header.-left>Label",".nt-drawer .nt-drawer__header.-left .nt-drawer__header-image"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item",".nt-drawer .nt-drawer__list-item"],"declarations":[{"type":"declaration","property":"padding-left","value":"15"},{"type":"declaration","property":"height","value":"48"},{"type":"declaration","property":"horizontal-align","value":"left"},{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"orientation","value":"horizontal"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item Label",".nt-drawer .nt-drawer__list-item Label"],"declarations":[{"type":"declaration","property":"vertical-align","value":"center"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item .nt-icon",".nt-drawer .nt-drawer__list-item .nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"width","value":"30"}]},{"type":"rule","selectors":["RadSideDrawer.ns-dark .nt-drawer__header",".nt-drawer.ns-dark .nt-drawer__header"],"declarations":[{"type":"declaration","property":"background-color","value":"#1e1e1e"}]},{"type":"rule","selectors":["RadSideDrawer.ns-dark .nt-drawer__header Label",".nt-drawer.ns-dark .nt-drawer__header Label"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["Form",".nt-form"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Roboto Regular\""},{"type":"declaration","property":"padding","value":"16 0 10"}]},{"type":"rule","selectors":[".ns-ios Form",".ns-ios .nt-form"],"declarations":[{"type":"declaration","property":"font-family","value":"\"SF UI Text Regular\",system"}]},{"type":"rule","selectors":["Form .-center",".nt-form .-center"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":["Form .nt-form__or-separator",".nt-form .nt-form__or-separator"],"declarations":[{"type":"declaration","property":"margin","value":"20 0"}]},{"type":"rule","selectors":["Form .nt-form__link",".nt-form .nt-form__link"],"declarations":[{"type":"declaration","property":"color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark Form .nt-form__link",".ns-dark .nt-form .nt-form__link"],"declarations":[{"type":"declaration","property":"color","value":"#63cdff"}]},{"type":"rule","selectors":["Form .nt-form__title",".nt-form .nt-form__title"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":["Form .nt-form__logo",".nt-form .nt-form__logo"],"declarations":[{"type":"declaration","property":"margin","value":"20 0"},{"type":"declaration","property":"width","value":"50%"}]},{"type":"rule","selectors":["Form .nt-form__validation-message",".nt-form .nt-form__validation-message"],"declarations":[{"type":"declaration","property":"color","value":"#d50000"},{"type":"declaration","property":"margin","value":"1 0 0"},{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"height","value":"19"}]},{"type":"rule","selectors":["Form .nt-form__footer",".nt-form .nt-form__footer"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"horizontal-align","value":"center"}]},{"type":"rule","selectors":["Form .nt-form__footer Button",".nt-form .nt-form__footer Button"],"declarations":[{"type":"declaration","property":"width","value":"50%"},{"type":"declaration","property":"margin","value":"5"}]},{"type":"rule","selectors":["Form[isEnabled=false] *",".nt-form[isEnabled=false] *"],"declarations":[{"type":"declaration","property":"opacity","value":".5"}]},{"type":"rule","selectors":["TextView.ng-valid","TextField.ng-valid","PickerField.ng-valid","DatePickerField.ng-valid","TimePickerField.ng-valid","RadAutoCompleteTextView.ng-valid"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":["TextView.ng-invalid.ng-dirty","TextField.ng-invalid.ng-dirty","PickerField.ng-invalid.ng-dirty","DatePickerField.ng-invalid.ng-dirty","TimePickerField.ng-invalid.ng-dirty","RadAutoCompleteTextView.ng-invalid.ng-dirty"],"declarations":[{"type":"declaration","property":"margin-bottom","value":"0"},{"type":"declaration","property":"border-color","value":"#d50000"}]},{"type":"rule","selectors":["TextView","TextField","PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"border-width","value":"0 0 1"},{"type":"declaration","property":"border-radius","value":"0"},{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"padding","value":"8 0 4"},{"type":"declaration","property":"margin","value":"5 16"}]},{"type":"rule","selectors":["TextView.-rounded","TextView.-border","TextField.-rounded","TextField.-border","PickerField.-rounded","PickerField.-border","DatePickerField.-rounded","DatePickerField.-border","TimePickerField.-rounded","TimePickerField.-border","DateTimePickerFields.-rounded","DateTimePickerFields.-border","DataFormEditorCore.-rounded","DataFormEditorCore.-border","RadAutoCompleteTextView.-rounded","RadAutoCompleteTextView.-border"],"declarations":[{"type":"declaration","property":"border-width","value":"1"},{"type":"declaration","property":"border-radius","value":"4"},{"type":"declaration","property":"padding","value":"12 14"}]},{"type":"rule","selectors":["TextView.-rounded","TextField.-rounded","PickerField.-rounded","DatePickerField.-rounded","TimePickerField.-rounded","DateTimePickerFields.-rounded","DataFormEditorCore.-rounded","RadAutoCompleteTextView.-rounded"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":["TextView[isEnabled=false]","TextField[isEnabled=false]","PickerField[isEnabled=false]","DatePickerField[isEnabled=false]","TimePickerField[isEnabled=false]","DateTimePickerFields[isEnabled=false]","DataFormEditorCore[isEnabled=false]","RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"opacity","value":".5"}]},{"type":"rule","selectors":["Label","DataFormEditorLabel"],"declarations":[{"type":"declaration","property":"padding","value":"2 0"}]},{"type":"rule","selectors":["TextView"],"declarations":[{"type":"declaration","property":"min-height","value":"100"}]},{"type":"rule","selectors":["RadAutoCompleteTextView[displayMode=Tokens]"],"declarations":[{"type":"declaration","property":"padding","value":"4 0 8"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"border-radius","value":"50%"}]},{"type":"rule","selectors":[".ns-android TokenClearButton"],"declarations":[{"type":"declaration","property":"width","value":"18"},{"type":"declaration","property":"height","value":"18"},{"type":"declaration","property":"border-radius","value":"50%"},{"type":"declaration","property":"opacity","value":".6"}]},{"type":"rule","selectors":["PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-repeat","value":"no-repeat"},{"type":"declaration","property":"background-position","value":"right center"}]},{"type":"rule","selectors":[".ns-ios PickerField",".ns-ios DatePickerField",".ns-ios TimePickerField",".ns-ios DateTimePickerFields",".ns-ios DataFormEditorCore",".ns-ios RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-size","value":"28 16"}]},{"type":"rule","selectors":["PropertyEditor[type=Date] DataFormEditorCore","DatePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAAD1BMVEVHcEwAAAAAAAAAAAAAAADTrAj/AAAABHRSTlMAwBAgU5DCQwAAAFdJREFUSMdjYCAVuLi4oDHop5RJxAUDOCpgVcroggUIYFXKgk2pMw6lChhudXHAoZSBVkrRw26EKcUC6Kt0NAoGkVIWaFSNKh25Sgd7QURCZURCFUcLAAC2I2hEECBYPgAAAABJRU5ErkJggg==\")"}]},{"type":"rule","selectors":["PropertyEditor[type=Time] DataFormEditorCore","TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAALVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACttl6nAAAADnRSTlMAYOBAwCAQ0FCAcPCwoEZwdhsAAAE2SURBVEjHY2AYLIB1Td27d89PBRBWyQhUCALPBQiq1HsHBY8IqGX1e/fuyWRjY0sQjd8N3e/eKSaAGGxC797twGs9UCWMDVSLzwly794mwNhs9949xK2SA8UgoBUNOJVGo5oj924rTqV+EEP53sGMfYLbU28ZkJUy3MPpMaZ3aqhKk94p4PS/AKpSRpxhUPeIAVUpg95zHJEKMwOhVO4d9sjlevcMXWneuwVYlfK8c0BXyvLuAI4AmICulPNdAValfO8M0JVyvHtArFJmqiqFACopbSBWKTsssBAAV2DBowABcEUBPGIRAFfEsmImOVzJBZ4IEQBXIoQnbaQc9JBAhoED3BkGlg3hAHc2hGVuhNYn1CgySCiISCjeSCk0SSiKIQX8DGPjTsIFPAnVBimVESlV3IABAKDkz5jHIcToAAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":["DateTimePickerFields"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAAwBAMAAAB3UCypAAAALVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACttl6nAAAADnRSTlMAQGDgwBAg0FCAcPCwoM9Ie+kAAAGcSURBVEjH5Ze/TsMwEMZD2pQWVRUZu0VijxASa8UTVJXYUXYWniDqilhgY+QBmBEjMw9RtTQlU79nICRyrDjxxYkdqYhviYe7X87/7s6WlQqAMDCgPwF15igpWhAOg9cQiD8DCtpHha7k9naYmcQeAZ1UQb/lzBmz2XoUdFFaU2ykc08WK3py3envNyCgVgPoA3CRLrhzBrybgdoJk40TqkdCxRMmg/rY5wfDWeHLBHRYCC4Je2kAeluMzcebAeg8C5S52Ij0oTb2RZeVbKsaQHu4LLpc47zBjdpI9t4rQm3Z/jeAhltxcrNYFzpgcXGoj0BzTU+wE11u8KIJHbOMyF36+NCE9vAouowk268OneBUdBlibR56dPDQTAcMXbaBZtZrCfSYHSmuEe40oeNyO6By+Glofk25VK4pDR2UE51KQqGheerjkqc+ZagvVg8iSStDWTnJRZQTZSgrfLmUCl8NlJVo/hOVEl0HbdVM1EFbtT110E4atG5ayUZNrzI0bc+fXfe+rj2v0E7zIdHJk6eTx5nluCUF1j/RDxQQPw3i9N+zAAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":[".ns-ios DateTimePickerFields"],"declarations":[{"type":"declaration","property":"background-size","value":"56 16"}]},{"type":"rule","selectors":["DateTimePickerFields .input","DateTimePickerFields DatePickerField","DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"none"},{"type":"declaration","property":"border-width","value":"0"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":[".ns-dark DateTimePickerFields .input",".ns-dark DateTimePickerFields DatePickerField",".ns-dark DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"none"},{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":["DateTimePickerFields TimePickerField"],"declarations":[{"type":"declaration","property":"margin-left","value":"-30"}]},{"type":"rule","selectors":["PickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAAGFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAABoAtTLAAAAB3RSTlMAoPAw0BAgCEJU4wAAAEpJREFUSMdjYBgFgwUwChCtVLyQaEPLy4k1Nqm8nFhjmdWJN9Zo1NghZiwJSol3wKihA2ooCZk7hPj0x+pOdEHEEEJ88TYKBgoAAAC5JRg49rIWAAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":["PickerPage.input"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"margin","value":"0"}]},{"type":"rule","selectors":["PickerPage ListView"],"declarations":[{"type":"declaration","property":"separator-color","value":"transparent"}]},{"type":"rule","selectors":["PickerPage ListView>*"],"declarations":[{"type":"declaration","property":"height","value":"48"},{"type":"declaration","property":"margin-top","value":"0"},{"type":"declaration","property":"padding","value":"10 12"},{"type":"declaration","property":"border-bottom-width","value":"1px"}]},{"type":"rule","selectors":[".ns-dark PickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTP///////////////////////////x1LVb4AAAAHdFJOUwCg8DDQECAIQlTjAAAASklEQVRIx2NgGAWDBTAKEK1UvJBoQ8vLiTU2qbycWGOZ1Yk31mjU2CFmLAlKiXfAqKEDaigJmTuE+PTH6k50QcQQQnzxNgoGCgAAALklGDj2shYAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark DatePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTP///////////////xPgMRoAAAAEdFJOUwDAECBTkMJDAAAAV0lEQVRIx2NgIBW4uLigMeinlEnEBQM4KmBVyuiCBQhgVcqCTakzDqUKGG51ccChlIFWStHDboQpxQLoq3Q0CgaRUhZoVI0qHblKB3tBREJlREIVRwsAALYjaEQQIFg+AAAAAElFTkSuQmCC\")"}]},{"type":"rule","selectors":[".ns-dark TimePickerField"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAwBAMAAAB9IEC+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAOdFJOUwBg4EDAIBDQUHDwsKCA4isvJAAAATZJREFUSMdjYBgsgHV23bt3z3cGEFbJCFQIAs8FCKrUewcFjwioZfV79+7JZWNjWxCN3w1d794pJoAYbELv3q3Aaz1QJYwNVIvPCXLv3iTA2Gzn3j3ErZIDxSCgFQ04lUahmiP3bilOpX4QQ/newYx9gttTbxiQlTKcw+kxpndqqEqT3ing9L8AqlJGnGFQ94gBVSmD3nMckQozA6FU7h32yOV89wxdad67CViVcr9zQFfK8m4DjgC4gK6U910BVqV87wzQlXK8e0CsUmaqKoUAKiltIFYpOyywEABXYMGjAAFwRQE8YhEAV8SyYiY5XMkFnggRAFcihCdtpBz0kECGgQPcGQaWDeEAdzaEZW6E1ifUKDJIKIhIKN5IKTRJKIohBfwNY+NewgU8CdUGKZURKVXcgAEAq1LPmF1qDewAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark DateTimePickerFields"],"declarations":[{"type":"declaration","property":"background-image","value":"url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAAwBAMAAAB3UCypAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAOdFJOUwBAYODAECDQUHDwsKCAaxMi1gAAAZxJREFUSMfll89Kw0AQxmPa1EppMQ9QCHgPIngtPkEpeJecPfkEoWdB8O5dPHr1JYrePLY2NZfyPYMxYbNkk51sshuo+F2yh5lfZv/NzFpWKgDCwID+BNSZo6RoQTgMnkIgfgsoaB8VupLb22FmEnsEdFIF/ZYzZ8xm61HQRWlNsZHOPVms6MN1p7/fgIBaDaD3wEW64M4Z8GIGaidMNk6oHgkVT5gM6mOfHwxnhS8T0GEhuCTspQHobTE2H88GoPMsUOZiI9KH2tgXXVayrWoA7eGy6HKN8wY3aiPZe68ItWX73wAabsXJzWJd6IDFxaE+As01PcFOdLnBoyZ0xDIid+njVRPaw7voMpZsvzp0glPRZYi1eejRwUMzHTB02QaaWa8l0GN2pLjGuNOEjsrtgMrhp6H5NeVSuaY0dFBOdCoJhYbmqY9LnvqUob5YPYgkrQxl5SQXUU6Uoazw5VIqfDVQVqL5T1RKdB20VTNRB23V9tRBO2nQumklGzW9ytC0Pf903Ye69rxCO82HRCdPnk4eZ5bjlhRY/0Q/Hn4/DfXSncYAAAAASUVORK5CYII=\")"}]},{"type":"rule","selectors":[".ns-dark PickerField",".ns-dark DatePickerField",".ns-dark TimePickerField",".ns-dark DateTimePickerFields",".ns-dark RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"class","value":"ns-dark"}]},{"type":"rule","selectors":["RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"padding","value":"5 0 0"}]},{"type":"rule","selectors":[".nt-input"],"declarations":[{"type":"declaration","property":"margin","value":"10 0"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input>Label"],"declarations":[{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"color","value":"#bababa"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input>Label",".nt-input>TextView",">TextField",">PickerField",">DatePickerField",">TimePickerField",">DateTimePickerFields",">RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"margin","value":"0 16"}]},{"type":"rule","selectors":[".nt-input.-sides"],"declarations":[{"type":"declaration","property":"margin","value":"0 0 10"}]},{"type":"rule","selectors":[".nt-input.-sides>Label"],"declarations":[{"type":"declaration","property":"margin","value":"5 16"}]},{"type":"rule","selectors":[".nt-input>.nt-icon"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"horizontal-align","value":"right"},{"type":"declaration","property":"margin","value":"-15 10 0 0"}]},{"type":"rule","selectors":["ActionBar",".nt-action-bar"],"declarations":[{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".ns-ios ActionBar",".ns-ios .nt-action-bar"],"declarations":[{"type":"declaration","property":"margin-left","value":"20"},{"type":"declaration","property":"vertical-align","value":"stretch"},{"type":"declaration","property":"horizontal-align","value":"stretch"}]},{"type":"rule","selectors":[".ns-landscape.ns-ios ActionBar",".ns-landscape.ns-ios .nt-action-bar"],"declarations":[{"type":"declaration","property":"margin-left","value":"100"},{"type":"declaration","property":"padding","value":"0 5"}]},{"type":"rule","selectors":["ActionBar Label","ActionBar Button","ActionBar .nt-action-bar__item",".nt-action-bar Label",".nt-action-bar Button",".nt-action-bar .nt-action-bar__item"],"declarations":[{"type":"declaration","property":"android-elevation","value":"0"},{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"padding","value":"12 10 12 0"},{"type":"declaration","property":"margin","value":"0"},{"type":"declaration","property":"min-width","value":"0"},{"type":"declaration","property":"width","value":"auto"},{"type":"declaration","property":"border-width","value":"0"},{"type":"declaration","property":"text-transform","value":"none"},{"type":"declaration","property":"font-weight","value":"normal"}]},{"type":"rule","selectors":["ActionBar Label:active","ActionBar Button:active","ActionBar .nt-action-bar__item:active",".nt-action-bar Label:active",".nt-action-bar Button:active",".nt-action-bar .nt-action-bar__item:active"],"declarations":[{"type":"declaration","property":"opacity","value":".7"}]},{"type":"rule","selectors":["ActionBar>Label",".nt-action-bar>Label"],"declarations":[{"type":"declaration","property":"font-weight","value":"bold"},{"type":"declaration","property":"font-size","value":"14"}]},{"type":"rule","selectors":[".ns-statusbar-transparent Page>ActionBar",".ns-statusbar-transparent Page>.nt-action-bar"],"declarations":[{"type":"declaration","property":"padding-top","value":"24"}]},{"type":"rule","selectors":[".ns-android__19.ns-statusbar-transparent Page>ActionBar",".ns-modal.ns-statusbar-transparent Page>ActionBar",".ns-android__19.ns-statusbar-transparent Page>.nt-action-bar",".ns-modal.ns-statusbar-transparent Page>.nt-action-bar"],"declarations":[{"type":"declaration","property":"padding-top","value":"0"}]},{"type":"rule","selectors":[".ns-android ActionBar Button",".ns-android ActionBar .nt-button",".ns-android .nt-action-bar Button",".ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"padding","value":"0 6"}]},{"type":"rule","selectors":[".ns-android ActionBar>Label",".ns-android .nt-action-bar>Label"],"declarations":[{"type":"declaration","property":"width","value":"100%"}]},{"type":"rule","selectors":["ActionBar>Label","ActionBar>GridLayout Label",".nt-action-bar>Label",".nt-action-bar>GridLayout Label"],"declarations":[{"type":"declaration","property":"font-size","value":"14"},{"type":"declaration","property":"vertical-align","value":"center"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":["ActionBar>GridLayout",".nt-action-bar>GridLayout"],"declarations":[{"type":"declaration","property":"width","value":"100%"},{"type":"declaration","property":"height","value":"100%"}]},{"type":"rule","selectors":["ActionBar>GridLayout>StackLayout",".nt-action-bar>GridLayout>StackLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0"},{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["ActionBar>GridLayout Button",".nt-action-bar>GridLayout Button"],"declarations":[{"type":"declaration","property":"padding","value":"12 10"},{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":["ActionBar>GridLayout [col=\"2\"]",".nt-action-bar>GridLayout [col=\"2\"]"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"right"}]},{"type":"rule","selectors":[".ns-android ActionBar>GridLayout",".ns-android .nt-action-bar>GridLayout"],"declarations":[{"type":"declaration","property":"padding","value":"0 4"}]},{"type":"rule","selectors":[".ns-android ActionBar>GridLayout Button",".ns-android .nt-action-bar>GridLayout Button"],"declarations":[{"type":"declaration","property":"padding","value":"12 16"},{"type":"declaration","property":"margin","value":"0"}]}],"parsingErrors":[]}};

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/sky.css":
/***/ (function(module, exports) {

module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"comment","comment":"!\n * NativeScript Theme v2.2.1 (https://nativescript.org)\n * Copyright 2016-2016 The Theme Authors\n * Copyright 2016-2019 Progress Software\n * Licensed under Apache 2.0 (https://github.com/NativeScript/theme/blob/master/LICENSE)\n "},{"type":"keyframes","name":"empty","keyframes":[]},{"type":"rule","selectors":["Button",".nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"color","value":"#332f00"}]},{"type":"rule","selectors":[".ns-dark Button",".ns-dark .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["Button:active","Button.-active",".nt-button:active",".nt-button.-active"],"declarations":[{"type":"declaration","property":"color","value":"#332f00"}]},{"type":"rule","selectors":[".ns-dark Button:active",".ns-dark Button.-active",".ns-dark .nt-button:active",".ns-dark .nt-button.-active"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["Button.-outline",".nt-button.-outline"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"border-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark Button.-outline",".ns-dark .nt-button.-outline"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"border-color","value":"#fe3"}]},{"type":"keyframes","name":"-hightlight-light","keyframes":[{"type":"keyframe","values":["0%"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"keyframe","values":["100%"],"declarations":[{"type":"declaration","property":"background-color","value":"#f2f2f2"}]}]},{"type":"keyframes","name":"-hightlight-dark","keyframes":[{"type":"keyframe","values":["0%"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"keyframe","values":["100%"],"declarations":[{"type":"declaration","property":"background-color","value":"#232323"}]}]},{"type":"rule","selectors":["Button.-outline:active","Button.-outline.-active",".nt-button.-outline:active",".nt-button.-outline.-active"],"declarations":[{"type":"declaration","property":"animation","value":"-hightlight-light .3s ease-out forwards"},{"type":"declaration","property":"background-color","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark Button.-outline:active",".ns-dark Button.-outline.-active",".ns-dark .nt-button.-outline:active",".ns-dark .nt-button.-outline.-active"],"declarations":[{"type":"declaration","property":"animation","value":"-hightlight-dark .3s ease-out forwards"},{"type":"declaration","property":"background-color","value":"#232323"}]},{"type":"rule","selectors":["Button.-primary",".nt-button.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#ffea00"},{"type":"declaration","property":"border-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark Button.-primary",".ns-dark .nt-button.-primary"],"declarations":[{"type":"declaration","property":"color","value":"#000"},{"type":"declaration","property":"background-color","value":"#fe3"},{"type":"declaration","property":"border-color","value":"#fe3"}]},{"type":"rule","selectors":["Button.-primary:active","Button.-primary.-active",".nt-button.-primary:active",".nt-button.-primary.-active"],"declarations":[{"type":"declaration","property":"background-color","value":"#cb0"}]},{"type":"rule","selectors":[".ns-dark Button.-primary:active",".ns-dark Button.-primary.-active",".ns-dark .nt-button.-primary:active",".ns-dark .nt-button.-primary.-active"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff266"}]},{"type":"rule","selectors":["ActivityIndicator",".nt-activity-indicator"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark ActivityIndicator",".ns-dark .nt-activity-indicator"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"}]},{"type":"rule","selectors":["SegmentedBar",".nt-segmented-bar"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"selected-background-color","value":"#fff266"}]},{"type":"rule","selectors":[".ns-dark SegmentedBar",".ns-dark .nt-segmented-bar"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"selected-background-color","value":"#cb0"}]},{"type":"rule","selectors":[".ns-ios SegmentedBar",".ns-ios .nt-segmented-bar"],"declarations":[{"type":"declaration","property":"margin","value":"0 15"}]},{"type":"rule","selectors":["Progress",".nt-progress"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"},{"type":"declaration","property":"background-color","value":"rgba(255,234,0,.1)"}]},{"type":"rule","selectors":[".ns-dark Progress",".ns-dark .nt-progress"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"},{"type":"declaration","property":"background-color","value":"rgba(255,238,51,.1)"}]},{"type":"rule","selectors":["Slider",".nt-slider"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"},{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark Slider",".ns-dark .nt-slider"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"},{"type":"declaration","property":"background-color","value":"#fe3"}]},{"type":"rule","selectors":["Slider[isEnabled=false]",".ns-android Slider[isEnabled=false]",".nt-slider[isEnabled=false]",".ns-android .nt-slider[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#e0e0e0"}]},{"type":"rule","selectors":["SearchBar",".nt-search-bar"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"},{"type":"declaration","property":"text-field-hint-color","value":"#000"},{"type":"declaration","property":"text-field-background-color","value":"transparent"}]},{"type":"rule","selectors":[".ns-dark SearchBar",".ns-dark .nt-search-bar"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#303030"},{"type":"declaration","property":"text-field-hint-color","value":"#b3b3b3"},{"type":"declaration","property":"text-field-background-color","value":"transparent"}]},{"type":"rule","selectors":[".ns-android Switch",".ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#ccc"},{"type":"declaration","property":"background-color","value":"#ccc"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch",".ns-dark.ns-android .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#636363"},{"type":"declaration","property":"background-color","value":"#636363"}]},{"type":"rule","selectors":[".ns-android Switch[checked=true]",".ns-android .nt-switch[checked=true]"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[checked=true]",".ns-dark.ns-android .nt-switch[checked=true]"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"}]},{"type":"rule","selectors":[".ns-android Switch[isEnabled=false]",".ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-android Switch[isEnabled=false]",".ns-dark.ns-android .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch",".ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#ffea00"},{"type":"declaration","property":"off-background-color","value":"#e6e6e6"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch",".ns-dark.ns-ios .nt-switch"],"declarations":[{"type":"declaration","property":"color","value":"#303030"},{"type":"declaration","property":"background-color","value":"#fe3"},{"type":"declaration","property":"off-background-color","value":"#4a4a4a"}]},{"type":"rule","selectors":[".ns-ios Switch[isEnabled=false]",".ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,234,0,.4)"}]},{"type":"rule","selectors":[".ns-dark.ns-ios Switch[isEnabled=false]",".ns-dark.ns-ios .nt-switch[isEnabled=false]"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,238,51,.4)"}]},{"type":"rule","selectors":["TabView",".nt-tab-view"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#ffea00"},{"type":"declaration","property":"tab-background-color","value":"#fff"},{"type":"declaration","property":"tab-text-color","value":"#e9e39d"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark TabView",".ns-dark .nt-tab-view"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#fe3"},{"type":"declaration","property":"tab-background-color","value":"#303030"},{"type":"declaration","property":"tab-text-color","value":"#e9e4ac"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#fe3"}]},{"type":"rule","selectors":["TabView.ns-dark",".nt-tab-view.ns-dark"],"declarations":[{"type":"declaration","property":"selected-tab-text-color","value":"#fe3"},{"type":"declaration","property":"tab-background-color","value":"#303030"},{"type":"declaration","property":"tab-text-color","value":"#e9e4ac"},{"type":"declaration","property":"android-selected-tab-highlight-color","value":"#fe3"}]},{"type":"rule","selectors":["TabStrip",".nt-tab-strip"],"declarations":[{"type":"declaration","property":"highlight-color","value":"#ffea00"},{"type":"declaration","property":"background","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark TabStrip",".ns-dark .nt-tab-strip"],"declarations":[{"type":"declaration","property":"highlight-color","value":"#fe3"},{"type":"declaration","property":"background","value":"#3a3a3a"}]},{"type":"rule","selectors":["TabStripItem",".nt-tab-strip__item"],"declarations":[{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark TabStripItem",".ns-dark .nt-tab-strip__item"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["TabStripItem:active","TabStripItem:active Label",".nt-tab-strip__item:active",".nt-tab-strip__item:active Label"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark TabStripItem:active",".ns-dark TabStripItem:active Label",".ns-dark .nt-tab-strip__item:active",".ns-dark .nt-tab-strip__item:active Label"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"}]},{"type":"rule","selectors":["TabContentItem",".nt-tab-content__item"],"declarations":[{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark TabContentItem",".ns-dark .nt-tab-content__item"],"declarations":[{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":["ListView","RadListView",".nt-list-view"],"declarations":[{"type":"declaration","property":"item-selected-background-color","value":"rgba(255,234,0,.15)"},{"type":"declaration","property":"separator-color","value":"#ccc"}]},{"type":"rule","selectors":[".ns-dark ListView",".ns-dark RadListView",".ns-dark .nt-list-view"],"declarations":[{"type":"declaration","property":"item-selected-background-color","value":"rgba(255,238,51,.15)"}]},{"type":"rule","selectors":["ListView>*.active","ListView>*:highlighted","RadListView>*.active","RadListView>*:highlighted",".nt-list-view>*.active",".nt-list-view>*:highlighted"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,234,0,.15)"}]},{"type":"rule","selectors":[".ns-dark ListView>*.active",".ns-dark ListView>*:highlighted",".ns-dark RadListView>*.active",".ns-dark RadListView>*:highlighted",".ns-dark .nt-list-view>*.active",".ns-dark .nt-list-view>*:highlighted"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,238,51,.15)"}]},{"type":"rule","selectors":["ListView .-separator","RadListView .-separator",".nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"#ccc"}]},{"type":"rule","selectors":[".ns-dark ListView .-separator",".ns-dark RadListView .-separator",".ns-dark .nt-list-view .-separator"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"#636363"}]},{"type":"rule","selectors":[".ns-dark ListView",".ns-dark RadListView",".ns-dark .nt-list-view"],"declarations":[{"type":"declaration","property":"separator-color","value":"#636363"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete","RadListView .nt-list-view__delete",".nt-list-view .nt-list-view__delete"],"declarations":[{"type":"declaration","property":"background-color","value":"#d50000"}]},{"type":"rule","selectors":["ListView .nt-list-view__delete>Label","RadListView .nt-list-view__delete>Label",".nt-list-view .nt-list-view__delete>Label"],"declarations":[{"type":"declaration","property":"color","value":"#262626"}]},{"type":"rule","selectors":[".ns-dark ListView .nt-list-view__delete>Label",".ns-dark RadListView .nt-list-view__delete>Label",".ns-dark .nt-list-view .nt-list-view__delete>Label"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["ListView .nt-icon","RadListView .nt-icon",".nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"color","value":"#807500"}]},{"type":"rule","selectors":[".ns-dark ListView .nt-icon",".ns-dark RadListView .nt-icon",".ns-dark .nt-list-view .nt-icon"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__header",".nt-drawer .nt-drawer__header"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#17b4ff"}]},{"type":"rule","selectors":["RadSideDrawer>*","RadSideDrawer .nt-drawer__content",".nt-drawer>*",".nt-drawer .nt-drawer__content"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item.-selected",".nt-drawer .nt-drawer__list-item.-selected"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,234,0,.15)"}]},{"type":"rule","selectors":["RadSideDrawer .nt-drawer__list-item.-selected Label",".nt-drawer .nt-drawer__list-item.-selected Label"],"declarations":[{"type":"declaration","property":"color","value":"#998c00"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__header","RadSideDrawer.ns-dark .nt-drawer__header",".ns-dark .nt-drawer .nt-drawer__header",".nt-drawer.ns-dark .nt-drawer__header"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#1a9edd"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer>*",".ns-dark RadSideDrawer .nt-drawer__content","RadSideDrawer.ns-dark>*","RadSideDrawer.ns-dark .nt-drawer__content",".ns-dark .nt-drawer>*",".ns-dark .nt-drawer .nt-drawer__content",".nt-drawer.ns-dark>*",".nt-drawer.ns-dark .nt-drawer__content"],"declarations":[{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__list-item.-selected","RadSideDrawer.ns-dark .nt-drawer__list-item.-selected",".ns-dark .nt-drawer .nt-drawer__list-item.-selected",".nt-drawer.ns-dark .nt-drawer__list-item.-selected"],"declarations":[{"type":"declaration","property":"background-color","value":"rgba(255,238,51,.15)"}]},{"type":"rule","selectors":[".ns-dark RadSideDrawer .nt-drawer__list-item.-selected Label","RadSideDrawer.ns-dark .nt-drawer__list-item.-selected Label",".ns-dark .nt-drawer .nt-drawer__list-item.-selected Label",".nt-drawer.ns-dark .nt-drawer__list-item.-selected Label"],"declarations":[{"type":"declaration","property":"color","value":"#fff799"}]},{"type":"rule","selectors":["TextView","TextField","PickerField","DatePickerField","TimePickerField","DateTimePickerFields","DataFormEditorCore","RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"},{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"placeholder-color","value":"#000"},{"type":"declaration","property":"border-color","value":"#c7c7c7"}]},{"type":"rule","selectors":[".ns-dark TextView",".ns-dark TextField",".ns-dark PickerField",".ns-dark DatePickerField",".ns-dark TimePickerField",".ns-dark DateTimePickerFields",".ns-dark DataFormEditorCore",".ns-dark RadAutoCompleteTextView"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"placeholder-color","value":"#b3b3b3"},{"type":"declaration","property":"border-color","value":"#fafafa"}]},{"type":"rule","selectors":["TextView:focus","TextField:focus","PickerField:focus","DatePickerField:focus","TimePickerField:focus","DateTimePickerFields:focus","DataFormEditorCore:focus","RadAutoCompleteTextView:focus"],"declarations":[{"type":"declaration","property":"border-color","value":"#998c00"}]},{"type":"rule","selectors":[".ns-dark TextView:focus",".ns-dark TextField:focus",".ns-dark PickerField:focus",".ns-dark DatePickerField:focus",".ns-dark TimePickerField:focus",".ns-dark DateTimePickerFields:focus",".ns-dark DataFormEditorCore:focus",".ns-dark RadAutoCompleteTextView:focus"],"declarations":[{"type":"declaration","property":"border-color","value":"#fff799"}]},{"type":"rule","selectors":["TextView[isEnabled=false]","TextField[isEnabled=false]","PickerField[isEnabled=false]","DatePickerField[isEnabled=false]","TimePickerField[isEnabled=false]","DateTimePickerFields[isEnabled=false]","DataFormEditorCore[isEnabled=false]","RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#f2f2f2"}]},{"type":"rule","selectors":[".ns-dark TextView[isEnabled=false]",".ns-dark TextField[isEnabled=false]",".ns-dark PickerField[isEnabled=false]",".ns-dark DatePickerField[isEnabled=false]",".ns-dark TimePickerField[isEnabled=false]",".ns-dark DateTimePickerFields[isEnabled=false]",".ns-dark DataFormEditorCore[isEnabled=false]",".ns-dark RadAutoCompleteTextView[isEnabled=false]"],"declarations":[{"type":"declaration","property":"color","value":"#e0e0e0"},{"type":"declaration","property":"background-color","value":"#3d3d3d"}]},{"type":"rule","selectors":["HtmlView"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":["PropertyEditor:focus DataFormEditorCore"],"declarations":[{"type":"declaration","property":"border-color","value":"#998c00"}]},{"type":"rule","selectors":[".ns-dark PropertyEditor:focus DataFormEditorCore"],"declarations":[{"type":"declaration","property":"border-color","value":"#fff799"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"background-color","value":"#fff266"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView Token"],"declarations":[{"type":"declaration","property":"background-color","value":"#cb0"}]},{"type":"rule","selectors":["RadAutoCompleteTextView Token:selected"],"declarations":[{"type":"declaration","property":"background-color","value":"#fe3"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView Token:selected"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffea00"}]},{"type":"rule","selectors":["RadAutoCompleteTextView ClearButton"],"declarations":[{"type":"declaration","property":"color","value":"#ffea00"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView ClearButton"],"declarations":[{"type":"declaration","property":"color","value":"#fe3"}]},{"type":"rule","selectors":["RadAutoCompleteTextView SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark RadAutoCompleteTextView SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["RadDataForm"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"placeholder-color","value":"#000"}]},{"type":"rule","selectors":[".ns-dark RadDataForm"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"placeholder-color","value":"#b3b3b3"}]},{"type":"rule","selectors":["RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background-color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark RadDataForm PropertyEditor"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#303030"}]},{"type":"rule","selectors":["PickerPage ListView"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark PickerPage ListView"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":["PickerPage ListView>*"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"rgba(255,234,0,.4)"}]},{"type":"rule","selectors":[".ns-dark PickerPage ListView>*"],"declarations":[{"type":"declaration","property":"border-bottom-color","value":"rgba(255,238,51,.4)"}]},{"type":"rule","selectors":["PickerPage.ns-dark ListView",".ns-dark SuggestionView"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":[".date-time-picker"],"declarations":[{"type":"declaration","property":"color","value":"#262626"},{"type":"declaration","property":"background","value":"#fff"}]},{"type":"rule","selectors":[".date-time-picker.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":[".date-time-picker-buttons"],"declarations":[{"type":"declaration","property":"color","value":"#332f00"}]},{"type":"rule","selectors":[".date-time-picker-buttons.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark.date-time-picker-button-cancel"],"declarations":[{"type":"declaration","property":"background","value":"#303030"}]},{"type":"rule","selectors":[".date-time-picker-spinners"],"declarations":[{"type":"declaration","property":"color","value":"#665e00"}]},{"type":"rule","selectors":[".date-time-picker-spinners.ns-dark"],"declarations":[{"type":"declaration","property":"color","value":"#fffbcc"}]},{"type":"rule","selectors":["DataFormEditorLabel",".nt-input>Label"],"declarations":[{"type":"declaration","property":"color","value":"#665e00"}]},{"type":"rule","selectors":[".ns-dark DataFormEditorLabel",".ns-dark .nt-input>Label"],"declarations":[{"type":"declaration","property":"color","value":"#fffbcc"}]},{"type":"rule","selectors":["ActionBar",".nt-action-bar"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark ActionBar",".ns-dark .nt-action-bar"],"declarations":[{"type":"declaration","property":"color","value":"#fff"},{"type":"declaration","property":"background-color","value":"#2ba9e6"}]},{"type":"rule","selectors":["ActionBar Label","ActionBar Button","ActionBar .nt-action-bar__item",".nt-action-bar Label",".nt-action-bar Button",".nt-action-bar .nt-action-bar__item"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark ActionBar Label",".ns-dark ActionBar Button",".ns-dark ActionBar .nt-action-bar__item",".ns-dark .nt-action-bar Label",".ns-dark .nt-action-bar Button",".ns-dark .nt-action-bar .nt-action-bar__item"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":["ActionBar Label:active","ActionBar Label.-active","ActionBar Button:active","ActionBar Button.-active","ActionBar .nt-action-bar__item:active","ActionBar .nt-action-bar__item.-active",".nt-action-bar Label:active",".nt-action-bar Label.-active",".nt-action-bar Button:active",".nt-action-bar Button.-active",".nt-action-bar .nt-action-bar__item:active",".nt-action-bar .nt-action-bar__item.-active"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-dark ActionBar Label:active",".ns-dark ActionBar Label.-active",".ns-dark ActionBar Button:active",".ns-dark ActionBar Button.-active",".ns-dark ActionBar .nt-action-bar__item:active",".ns-dark ActionBar .nt-action-bar__item.-active",".ns-dark .nt-action-bar Label:active",".ns-dark .nt-action-bar Label.-active",".ns-dark .nt-action-bar Button:active",".ns-dark .nt-action-bar Button.-active",".ns-dark .nt-action-bar .nt-action-bar__item:active",".ns-dark .nt-action-bar .nt-action-bar__item.-active"],"declarations":[{"type":"declaration","property":"color","value":"#fff"}]},{"type":"rule","selectors":[".ns-ios ActionBar Label",".ns-ios ActionBar Label:active",".ns-ios ActionBar Button",".ns-ios ActionBar Button:active",".ns-ios ActionBar .nt-action-bar__item",".ns-ios ActionBar .nt-action-bar__item:active",".ns-ios .nt-action-bar Label",".ns-ios .nt-action-bar Label:active",".ns-ios .nt-action-bar Button",".ns-ios .nt-action-bar Button:active",".ns-ios .nt-action-bar .nt-action-bar__item",".ns-ios .nt-action-bar .nt-action-bar__item:active"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":[".ns-dark.ns-ios ActionBar Label",".ns-dark.ns-ios ActionBar Label:active",".ns-dark.ns-ios ActionBar Button",".ns-dark.ns-ios ActionBar Button:active",".ns-dark.ns-ios ActionBar .nt-action-bar__item",".ns-dark.ns-ios ActionBar .nt-action-bar__item:active",".ns-dark.ns-ios .nt-action-bar Label",".ns-dark.ns-ios .nt-action-bar Label:active",".ns-dark.ns-ios .nt-action-bar Button",".ns-dark.ns-ios .nt-action-bar Button:active",".ns-dark.ns-ios .nt-action-bar .nt-action-bar__item",".ns-dark.ns-ios .nt-action-bar .nt-action-bar__item:active"],"declarations":[{"type":"declaration","property":"background-color","value":"transparent"}]},{"type":"rule","selectors":[".ns-android ActionBar Button",".ns-android ActionBar .nt-button",".ns-android .nt-action-bar Button",".ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#30bcff"}]},{"type":"rule","selectors":[".ns-dark.ns-android ActionBar Button",".ns-dark.ns-android ActionBar .nt-button",".ns-dark.ns-android .nt-action-bar Button",".ns-dark.ns-android .nt-action-bar .nt-button"],"declarations":[{"type":"declaration","property":"background-color","value":"#2ba9e6"}]},{"type":"rule","selectors":[".hr"],"declarations":[{"type":"declaration","property":"border-color","value":"#d9d9d9"}]},{"type":"rule","selectors":[".ns-dark .hr"],"declarations":[{"type":"declaration","property":"border-color","value":"#4d4d4d"}]},{"type":"rule","selectors":[".hr-light"],"declarations":[{"type":"declaration","property":"border-color","value":"#fff266"}]},{"type":"rule","selectors":[".ns-dark .hr-light"],"declarations":[{"type":"declaration","property":"border-color","value":"#fff"}]},{"type":"rule","selectors":[".hr-dark"],"declarations":[{"type":"declaration","property":"border-color","value":"#998c00"}]},{"type":"rule","selectors":[".ns-dark .hr-dark"],"declarations":[{"type":"declaration","property":"border-color","value":"#fff799"}]},{"type":"rule","selectors":[".ns-root",".ns-modal"],"declarations":[{"type":"declaration","property":"--color-black","value":"#000"},{"type":"declaration","property":"--color-white","value":"#fff"},{"type":"declaration","property":"--color-grey","value":"#e0e0e0"},{"type":"declaration","property":"--color-grey-light","value":"#bababa"},{"type":"declaration","property":"--color-charcoal","value":"#303030"},{"type":"declaration","property":"--color-transparent","value":"transparent"},{"type":"declaration","property":"--color-aqua","value":"#00caab"},{"type":"declaration","property":"--color-blue","value":"#3a53ff"},{"type":"declaration","property":"--color-brown","value":"#795548"},{"type":"declaration","property":"--color-forest","value":"#006968"},{"type":"declaration","property":"--color-grey-dark","value":"#5c687c"},{"type":"declaration","property":"--color-purple","value":"#8130ff"},{"type":"declaration","property":"--color-lemon","value":"#ffea00"},{"type":"declaration","property":"--color-lime","value":"#aee406"},{"type":"declaration","property":"--color-orange","value":"#f57c00"},{"type":"declaration","property":"--color-ruby","value":"#ff1744"},{"type":"declaration","property":"--color-sky","value":"#30bcff"},{"type":"declaration","property":"--color-error","value":"#d50000"},{"type":"declaration","property":"--const-font-size","value":"12"},{"type":"declaration","property":"--const-background-alt-10","value":"#c0ebff"},{"type":"declaration","property":"--const-btn-color-secondary","value":"#01a0ec"},{"type":"declaration","property":"--const-btn-color-disabled","value":"#a4a4a4"},{"type":"declaration","property":"--const-btn-font-size","value":"14"},{"type":"declaration","property":"--const-btn-min-width","value":"64"},{"type":"declaration","property":"--const-btn-height","value":"52"},{"type":"declaration","property":"--const-btn-padding-x","value":"5"},{"type":"declaration","property":"--const-btn-padding-y","value":"0"},{"type":"declaration","property":"--const-btn-margin-x","value":"16"},{"type":"declaration","property":"--const-btn-margin-y","value":"8"},{"type":"declaration","property":"--const-btn-radius","value":"0"},{"type":"declaration","property":"--const-headings-margin-bottom","value":"4"},{"type":"declaration","property":"--const-headings-font-weight","value":"normal"},{"type":"declaration","property":"--const-border-width","value":"1"},{"type":"declaration","property":"--const-border-radius","value":""},{"type":"declaration","property":"--const-border-radius-sm","value":"4"},{"type":"declaration","property":"--const-border-radius-lg","value":"50%"},{"type":"declaration","property":"--const-icon-font-size","value":"12"},{"type":"declaration","property":"--const-icon-font-size-lg","value":"16"},{"type":"declaration","property":"--const-disabled-opacity","value":"0.5"},{"type":"declaration","property":"--light-primary","value":"#262626"},{"type":"declaration","property":"--light-background","value":"#fff"},{"type":"declaration","property":"--light-secondary","value":"black"},{"type":"declaration","property":"--light-accent","value":"#ffea00"},{"type":"declaration","property":"--light-complementary","value":"#30bcff"},{"type":"declaration","property":"--light-complementary-color","value":"#fff"},{"type":"declaration","property":"--light-btn-color","value":"#262626"},{"type":"declaration","property":"--light-border-color","value":"#30bcff"},{"type":"declaration","property":"--light-background-alt-5","value":"#f2f2f2"},{"type":"declaration","property":"--light-background-alt-10","value":"#e6e6e6"},{"type":"declaration","property":"--light-background-alt-20","value":"#cccccc"},{"type":"declaration","property":"--light-disabled","value":"#fff799"},{"type":"declaration","property":"--light-text-color","value":"#262626"},{"type":"declaration","property":"--light-headings-color","value":"#262626"},{"type":"declaration","property":"--light-tab-text-color","value":"#e9e39d"},{"type":"declaration","property":"--light-accent-dark","value":"#998c00"},{"type":"declaration","property":"--light-accent-light","value":"#fff266"},{"type":"declaration","property":"--light-accent-transparent","value":"rgba(255, 234, 0, 0.8)"},{"type":"declaration","property":"--light-primary-accent","value":"rgba(255, 234, 0, 0.4)"},{"type":"declaration","property":"--light-background-accent","value":"rgba(255, 234, 0, 0.1)"},{"type":"declaration","property":"--light-background-dark-accent","value":"rgba(255, 234, 0, 0.15)"},{"type":"declaration","property":"--light-item-active-color","value":"#676767"},{"type":"declaration","property":"--light-item-active-background","value":"rgba(255, 234, 0, 0.15)"},{"type":"declaration","property":"--light-complementary-dark","value":"#17b4ff"},{"type":"declaration","property":"--light-item-active-icon-color","value":"#676767"},{"type":"declaration","property":"--light-btn-color-inverse","value":"black"},{"type":"declaration","property":"--light-btn-color-secondary","value":"#0d0d0d"},{"type":"declaration","property":"--dark-primary","value":"white"},{"type":"declaration","property":"--dark-background","value":"#303030"},{"type":"declaration","property":"--dark-secondary","value":"#b3b3b3"},{"type":"declaration","property":"--dark-accent","value":"#ffee33"},{"type":"declaration","property":"--dark-complementary","value":"#2ba9e6"},{"type":"declaration","property":"--dark-btn-color","value":"#fff"},{"type":"declaration","property":"--dark-border-color","value":"#ffee33"},{"type":"declaration","property":"--dark-background-alt-5","value":"#3d3d3d"},{"type":"declaration","property":"--dark-background-alt-10","value":"#4a4a4a"},{"type":"declaration","property":"--dark-background-alt-20","value":"#636363"},{"type":"declaration","property":"--dark-disabled","value":"#837c31"},{"type":"declaration","property":"--dark-text-color","value":"white"},{"type":"declaration","property":"--dark-headings-color","value":"white"},{"type":"declaration","property":"--dark-tab-text-color","value":"#e9e4ac"},{"type":"declaration","property":"--dark-accent-dark","value":"#fff799"},{"type":"declaration","property":"--dark-accent-light","value":"white"},{"type":"declaration","property":"--dark-accent-transparent","value":"rgba(255, 238, 51, 0.8)"},{"type":"declaration","property":"--dark-primary-accent","value":"rgba(255, 238, 51, 0.4)"},{"type":"declaration","property":"--dark-background-accent","value":"rgba(255, 238, 51, 0.1)"},{"type":"declaration","property":"--dark-background-dark-accent","value":"rgba(255, 238, 51, 0.15)"},{"type":"declaration","property":"--dark-item-active-color","value":"#c1c1c1"},{"type":"declaration","property":"--dark-item-active-background","value":"rgba(255, 238, 51, 0.15)"},{"type":"declaration","property":"--dark-complementary-color","value":"white"},{"type":"declaration","property":"--dark-complementary-dark","value":"#1a9edd"},{"type":"declaration","property":"--dark-item-active-icon-color","value":"#c1c1c1"},{"type":"declaration","property":"--dark-btn-color-inverse","value":"black"},{"type":"declaration","property":"--dark-btn-color-secondary","value":"#e6e6e6"}]}],"parsingErrors":[]}};

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hmr/hmr-update.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var hot = __webpack_require__("../node_modules/nativescript-dev-webpack/hot.js");

var file_system_1 = __webpack_require__("tns-core-modules/file-system");

function hmrUpdate() {
  var currentAppFolder = file_system_1.knownFolders.currentApp();

  var latestHash = __webpack_require__["h"]();

  return hot(latestHash, filename => {
    var fullFilePath = file_system_1.path.join(currentAppFolder.path, filename);
    return file_system_1.File.exists(fullFilePath) ? currentAppFolder.getFile(filename) : null;
  });
}

exports.hmrUpdate = hmrUpdate;

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hmr/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var hmr_update_1 = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/hmr-update.js");

exports.hmrUpdate = hmr_update_1.hmrUpdate;

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hot.js":
/***/ (function(module, exports, __webpack_require__) {

var hmrPrefix = 'HMR:';
var log = {
  info: message => console.info("".concat(hmrPrefix, " ").concat(message)),
  warn: message => console.warn("".concat(hmrPrefix, " ").concat(message)),
  error: message => console.error("".concat(hmrPrefix, " ").concat(message))
};
var refresh = 'Application needs to be restarted in order to apply the changes.';
var hotOptions = {
  ignoreUnaccepted: false,
  ignoreDeclined: false,
  ignoreErrored: false,

  onUnaccepted(data) {
    var chain = [].concat(data.chain);
    var last = chain[chain.length - 1];

    if (last === 0) {
      chain.pop();
    }

    log.warn("Ignored an update to unaccepted module: ");
    chain.forEach(mod => log.warn("         \u27AD ".concat(mod)));
  },

  onDeclined(data) {
    log.warn("Ignored an update to declined module:");
    data.chain.forEach(mod => log.warn("         \u27AD ".concat(mod)));
  },

  onErrored(data) {
    log.warn("Ignored an error while updating module ".concat(data.moduleId, " <").concat(data.type, ">"));
    log.warn(data.error);
  }

};
var nextHash;
var currentHash;

function upToDate() {
  return nextHash.indexOf(__webpack_require__.h()) >= 0;
}

function result(modules, appliedModules) {
  var unaccepted = modules.filter(moduleId => appliedModules && appliedModules.indexOf(moduleId) < 0);

  if (unaccepted.length > 0) {
    log.warn('The following modules could not be updated:');

    for (var moduleId of unaccepted) {
      log.warn("          \u29BB ".concat(moduleId));
    }
  }

  if (!(appliedModules || []).length) {
    log.info('No Modules Updated.');
  } else {
    log.info('The following modules were updated:');

    for (var _moduleId of appliedModules) {
      log.info("         \u21BB ".concat(_moduleId));
    }

    var numberIds = appliedModules.every(moduleId => typeof moduleId === 'number');

    if (numberIds) {
      log.info('Please consider using the NamedModulesPlugin for module names.');
    }
  }
}

function check(options) {
  return module.hot.check().then(modules => {
    if (!modules) {
      log.warn("Cannot find update. ".concat(refresh));
      return null;
    }

    return module.hot.apply(hotOptions).then(appliedModules => {
      var nextCheck;

      if (!upToDate()) {
        nextCheck = check(options);
      }

      result(modules, appliedModules);

      if (upToDate()) {
        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
        log.info("Successfully applied update with hmr hash ".concat(currentHash, ". App is up to date."));
      }

      return nextCheck || null;
    }).catch(err => {
      var status = module.hot.status();

      if (['abort', 'fail'].indexOf(status) >= 0) {
        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
        log.error("Cannot apply update with hmr hash ".concat(currentHash, "."));
        log.error(err.message || err.stack);
      } else {
        log.error("Update failed: ".concat(err.message || err.stack));
      }
    });
  }).catch(err => {
    var status = module.hot.status();

    if (['abort', 'fail'].indexOf(status) >= 0) {
      log.error("Cannot check for update. ".concat(refresh));
      log.error(err.message || err.stack);
    } else {
      log.error("Update check failed: ".concat(err.message || err.stack));
    }
  });
}

if (true) {
  log.info('Hot Module Replacement Enabled. Waiting for signal.');
} else {}

function update(latestHash, options) {
  nextHash = latestHash;

  if (!upToDate()) {
    var status = module.hot.status();

    if (status === 'idle') {
      //Do not modify message - CLI depends on this exact content to determine hmr operation status.
      log.info("Checking for updates to the bundle with hmr hash ".concat(currentHash, "."));
      return check(options);
    } else if (['abort', 'fail'].indexOf(status) >= 0) {
      log.warn("Cannot apply update. A previous update ".concat(status, "ed. ").concat(refresh));
    }
  }
}

;

function getNextHash(hash, getFileContent) {
  var file = getFileContent("".concat(hash, ".hot-update.json"));

  if (!file) {
    return Promise.resolve(hash);
  }

  return file.readText().then(hotUpdateContent => {
    if (hotUpdateContent) {
      var manifest = JSON.parse(hotUpdateContent);
      var newHash = manifest.h;
      return getNextHash(newHash, getFileContent);
    } else {
      return Promise.resolve(hash);
    }
  }).catch(error => Promise.reject(error));
}

module.exports = function checkState(initialHash, getFileContent) {
  currentHash = initialHash;
  return getNextHash(initialHash, getFileContent).then(nextHash => {
    if (nextHash != initialHash) {
      return update(nextHash, {});
    }
  });
};

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/load-application-css-regular.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var loadCss = __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css.js");

module.exports = function () {
  loadCss(function () {
    var appCssContext = __webpack_require__("./ sync ^\\.\\/app\\.(css|scss|less|sass)$");

    global.registerWebpackModules(appCssContext);
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/load-application-css.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (loadModuleFn) {
  var application = __webpack_require__("tns-core-modules/application");

  __webpack_require__("tns-core-modules/ui/styling/style-scope");

  loadModuleFn();
  application.loadAppCss();
};

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../node_modules/nativescript-vue/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * NativeScript-Vue v2.4.0
 * (Using Vue v2.6.10)
 * (c) 2017-2019 rigor789
 * Released under the MIT license.
 */


global.process = global.process || {};
global.process.env = global.process.env || {};

var application = __webpack_require__("tns-core-modules/application");

__webpack_require__("tns-core-modules/ui/frame");

var arrayMap = function arrayMap(xs, f) {
  if (xs.map) {
    return xs.map(f);
  }

  var res = [];

  for (var i = 0; i < xs.length; i++) {
    var x = xs[i];

    if (hasOwn.call(xs, i)) {
      res.push(f(x, i, xs));
    }
  }

  return res;
};

var hasOwn = Object.prototype.hasOwnProperty;
var indexOf = [].indexOf;

var indexof = function indexof(arr, obj) {
  if (indexOf) {
    return arr.indexOf(obj);
  }

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) {
      return i;
    }
  }

  return -1;
};

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var hasOwn$1 = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var foreach = function forEach(obj, fn, ctx) {
  if (toString.call(fn) !== '[object Function]') {
    throw new TypeError('iterator must be a function');
  }

  var l = obj.length;

  if (l === +l) {
    for (var i = 0; i < l; i++) {
      fn.call(ctx, obj[i], i, obj);
    }
  } else {
    for (var k in obj) {
      if (hasOwn$1.call(obj, k)) {
        fn.call(ctx, obj[k], k, obj);
      }
    }
  }
};

var hasOwn$2 = Object.prototype.hasOwnProperty;

var arrayReduce = function arrayReduce(xs, f, acc) {
  var hasAcc = arguments.length >= 3;

  if (hasAcc && xs.reduce) {
    return xs.reduce(f, acc);
  }

  if (xs.reduce) {
    return xs.reduce(f);
  }

  for (var i = 0; i < xs.length; i++) {
    if (!hasOwn$2.call(xs, i)) {
      continue;
    }

    if (!hasAcc) {
      acc = xs[i];
      hasAcc = true;
      continue;
    }

    acc = f(acc, xs[i], i);
  }

  return acc;
};

var hasOwn$3 = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;

var isFunction = function isFunction(fn) {
  return typeof fn === 'function' && !(fn instanceof RegExp) || toString$1.call(fn) === '[object Function]';
};

var foreach$1 = function forEach(obj, fn) {
  if (!isFunction(fn)) {
    throw new TypeError('iterator must be a function');
  }

  var i,
      k,
      isString = typeof obj === 'string',
      l = obj.length,
      context = arguments.length > 2 ? arguments[2] : null;

  if (l === +l) {
    for (i = 0; i < l; i++) {
      if (context === null) {
        fn(isString ? obj.charAt(i) : obj[i], i, obj);
      } else {
        fn.call(context, isString ? obj.charAt(i) : obj[i], i, obj);
      }
    }
  } else {
    for (k in obj) {
      if (hasOwn$3.call(obj, k)) {
        if (context === null) {
          fn(obj[k], k, obj);
        } else {
          fn.call(context, obj[k], k, obj);
        }
      }
    }
  }
};

var toString$2 = Object.prototype.toString;

var isArguments = function isArguments(value) {
  var str = toString$2.call(value);
  var isArguments = str === '[object Arguments]';

  if (!isArguments) {
    isArguments = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toString$2.call(value.callee) === '[object Function]';
  }

  return isArguments;
}; // modified from https://github.com/es-shims/es5-shim


var has = Object.prototype.hasOwnProperty,
    toString$3 = Object.prototype.toString,
    hasDontEnumBug = !{
  'toString': null
}.propertyIsEnumerable('toString'),
    hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype'),
    dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];

var keysShim = function keys(object) {
  var isObject = object !== null && typeof object === 'object',
      isFunction = toString$3.call(object) === '[object Function]',
      isArguments$1 = isArguments(object),
      theKeys = [];

  if (!isObject && !isFunction && !isArguments$1) {
    throw new TypeError("Object.keys called on a non-object");
  }

  if (isArguments$1) {
    foreach$1(object, function (value, index) {
      theKeys.push(index);
    });
  } else {
    var name,
        skipProto = hasProtoEnumBug && isFunction;

    for (name in object) {
      if (!(skipProto && name === 'prototype') && has.call(object, name)) {
        theKeys.push(name);
      }
    }
  }

  if (hasDontEnumBug) {
    var ctor = object.constructor,
        skipConstructor = ctor && ctor.prototype === object;
    foreach$1(dontEnums, function (dontEnum) {
      if (!(skipConstructor && dontEnum === 'constructor') && has.call(object, dontEnum)) {
        theKeys.push(dontEnum);
      }
    });
  }

  return theKeys;
};

keysShim.shim = function shimObjectKeys() {
  if (!Object.keys) {
    Object.keys = keysShim;
  }

  return Object.keys || keysShim;
};

var objectKeys = keysShim;
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var json3 = createCommonjsModule(function (module, exports) {
  (function (root) {
    // Detect the `define` function exposed by asynchronous module loaders. The
    // strict `define` check is necessary for compatibility with `r.js`.
    var isLoader =  false && false; // Use the `global` object exposed by Node (including Browserify via
    // `insert-module-globals`), Narwhal, and Ringo as the default context.
    // Rhino exports a `global` function instead.

    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;

    if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal)) {
      root = freeGlobal;
    } // Public: Initializes JSON 3 using the given `context` object, attaching the
    // `stringify` and `parse` functions to the specified `exports` object.


    function runInContext(context, exports) {
      context || (context = root["Object"]());
      exports || (exports = root["Object"]()); // Native constructor aliases.

      var Number = context["Number"] || root["Number"],
          String = context["String"] || root["String"],
          Object = context["Object"] || root["Object"],
          Date = context["Date"] || root["Date"],
          SyntaxError = context["SyntaxError"] || root["SyntaxError"],
          TypeError = context["TypeError"] || root["TypeError"],
          Math = context["Math"] || root["Math"],
          nativeJSON = context["JSON"] || root["JSON"]; // Delegate to the native `stringify` and `parse` implementations.

      if (typeof nativeJSON == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
      } // Convenience aliases.


      var objectProto = Object.prototype,
          getClass = objectProto.toString,
          _isProperty,
          _forEach,
          undef; // Test the `Date#getUTC*` methods. Based on work by @Yaffle.


      var isExtended = new Date(-3509827334573292);

      try {
        // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
        // results for certain dates in Opera >= 10.53.
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      } catch (exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
      // implementations are spec-compliant. Based on work by Ken Snyder.


      function has(name) {
        if (has[name] !== undef) {
          // Return cached feature test result.
          return has[name];
        }

        var isSupported;

        if (name == "bug-string-char-index") {
          // IE <= 7 doesn't support accessing string characters using square
          // bracket notation. IE 8 only supports this for primitives.
          isSupported = "a"[0] != "a";
        } else if (name == "json") {
          // Indicates whether both `JSON.stringify` and `JSON.parse` are
          // supported.
          isSupported = has("json-stringify") && has("json-parse");
        } else {
          var value,
              serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'; // Test `JSON.stringify`.

          if (name == "json-stringify") {
            var stringify = exports.stringify,
                stringifySupported = typeof stringify == "function" && isExtended;

            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function value() {
                return 1;
              }).toJSON = value;

              try {
                stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" && stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef && // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" && stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({
                  "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
              } catch (exception) {
                stringifySupported = false;
              }
            }

            isSupported = stringifySupported;
          } // Test `JSON.parse`.


          if (name == "json-parse") {
            var parse = exports.parse;

            if (typeof parse == "function") {
              try {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  var parseSupported = value["a"].length == 5 && value["a"][0] === 1;

                  if (parseSupported) {
                    try {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    } catch (exception) {}

                    if (parseSupported) {
                      try {
                        // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                        // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                        // certain octal literals.
                        parseSupported = parse("01") !== 1;
                      } catch (exception) {}
                    }

                    if (parseSupported) {
                      try {
                        // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                        // points. These environments, along with FF 3.1b1 and 2,
                        // also allow trailing commas in JSON objects and arrays.
                        parseSupported = parse("1.") !== 1;
                      } catch (exception) {}
                    }
                  }
                }
              } catch (exception) {
                parseSupported = false;
              }
            }

            isSupported = parseSupported;
          }
        }

        return has[name] = !!isSupported;
      }

      if (!has("json")) {
        // Common `[[Class]]` name aliases.
        var functionClass = "[object Function]",
            dateClass = "[object Date]",
            numberClass = "[object Number]",
            stringClass = "[object String]",
            arrayClass = "[object Array]",
            booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.

        var charIndexBuggy = has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.

        if (!isExtended) {
          var floor = Math.floor; // A mapping between the months of the year and the number of days between
          // January 1st and the first of the respective month.

          var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; // Internal: Calculates the number of days between the Unix epoch and the
          // first day of the given month.

          var getDay = function getDay(year, month) {
            return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
          };
        } // Internal: Determines if a property is a direct property of the given
        // object. Delegates to the native `Object#hasOwnProperty` method.


        if (!(_isProperty = objectProto.hasOwnProperty)) {
          _isProperty = function isProperty(property) {
            var members = {},
                constructor;

            if ((members.__proto__ = null, members.__proto__ = {
              // The *proto* property cannot be set multiple times in recent
              // versions of Firefox and SeaMonkey.
              "toString": 1
            }, members).toString != getClass) {
              // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
              // supports the mutable *proto* property.
              _isProperty = function isProperty(property) {
                // Capture and break the objectgs prototype chain (see section 8.6.2
                // of the ES 5.1 spec). The parenthesized expression prevents an
                // unsafe transformation by the Closure Compiler.
                var original = this.__proto__,
                    result = property in (this.__proto__ = null, this); // Restore the original prototype chain.

                this.__proto__ = original;
                return result;
              };
            } else {
              // Capture a reference to the top-level `Object` constructor.
              constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
              // other environments.

              _isProperty = function isProperty(property) {
                var parent = (this.constructor || constructor).prototype;
                return property in this && !(property in parent && this[property] === parent[property]);
              };
            }

            members = null;
            return _isProperty.call(this, property);
          };
        } // Internal: A set of primitive types used by `isHostType`.


        var PrimitiveTypes = {
          "boolean": 1,
          "number": 1,
          "string": 1,
          "undefined": 1
        }; // Internal: Determines if the given object `property` value is a
        // non-primitive.

        var isHostType = function isHostType(object, property) {
          var type = typeof object[property];
          return type == "object" ? !!object[property] : !PrimitiveTypes[type];
        }; // Internal: Normalizes the `for...in` iteration algorithm across
        // environments. Each enumerated key is yielded to a `callback` function.


        _forEach = function forEach(object, callback) {
          var size = 0,
              Properties,
              members,
              property; // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.

          (Properties = function Properties() {
            this.valueOf = 0;
          }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.

          members = new Properties();

          for (property in members) {
            // Ignore all properties inherited from `Object.prototype`.
            if (_isProperty.call(members, property)) {
              size++;
            }
          }

          Properties = members = null; // Normalize the iteration algorithm.

          if (!size) {
            // A list of non-enumerable properties inherited from `Object.prototype`.
            members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
            // properties.

            _forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && isHostType(object, "hasOwnProperty") ? object.hasOwnProperty : _isProperty;

              for (property in object) {
                // Gecko <= 1.0 enumerates the `prototype` property of functions under
                // certain conditions; IE does not.
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              } // Manually invoke the callback for each non-enumerable property.


              for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {}
            };
          } else if (size == 2) {
            // Safari <= 2.0.4 enumerates shadowed properties twice.
            _forEach = function forEach(object, callback) {
              // Create a set of iterated properties.
              var members = {},
                  isFunction = getClass.call(object) == functionClass,
                  property;

              for (property in object) {
                // Store each property name to prevent double enumeration. The
                // `prototype` property of functions is not enumerated due to cross-
                // environment inconsistencies.
                if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            // No bugs detected; use the standard `for...in` algorithm.
            _forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  isConstructor;

              for (property in object) {
                if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              } // Manually invoke the callback for the `constructor` property due to
              // cross-environment inconsistencies.


              if (isConstructor || _isProperty.call(object, property = "constructor")) {
                callback(property);
              }
            };
          }

          return _forEach(object, callback);
        }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
        // `filter` argument may specify either a function that alters how object and
        // array members are serialized, or an array of strings and numbers that
        // indicates which properties should be serialized. The optional `width`
        // argument may be either a string or number that specifies the indentation
        // level of the output.


        if (!has("json-stringify")) {
          // Internal: A map of control characters and their escaped equivalents.
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          }; // Internal: Converts `value` into a zero-padded string such that its
          // length is at least equal to `width`. The `width` must be <= 6.

          var leadingZeroes = "000000";

          var toPaddedString = function toPaddedString(width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          }; // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.


          var unicodePrefix = "\\u00";

          var quote = function quote(value) {
            var result = '"',
                index = 0,
                length = value.length,
                useCharIndex = !charIndexBuggy || length > 10;
            var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);

            for (; index < length; index++) {
              var charCode = value.charCodeAt(index); // If the character is a control character, append its Unicode or
              // shorthand escape sequence; otherwise, append the character as-is.

              switch (charCode) {
                case 8:
                case 9:
                case 10:
                case 12:
                case 13:
                case 34:
                case 92:
                  result += Escapes[charCode];
                  break;

                default:
                  if (charCode < 32) {
                    result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                    break;
                  }

                  result += useCharIndex ? symbols[index] : value.charAt(index);
              }
            }

            return result + '"';
          }; // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.


          var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
            var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;

            try {
              // Necessary for host object support.
              value = object[property];
            } catch (exception) {}

            if (typeof value == "object" && value) {
              className = getClass.call(value);

              if (className == dateClass && !_isProperty.call(value, "toJSON")) {
                if (value > -1 / 0 && value < 1 / 0) {
                  // Dates are serialized according to the `Date#toJSON` method
                  // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                  // for the ISO 8601 date time string format.
                  if (getDay) {
                    // Manually compute the year, month, date, hours, minutes,
                    // seconds, and milliseconds if the `getUTC*` methods are
                    // buggy. Adapted from @Yaffle's `date-shim` project.
                    date = floor(value / 864e5);

                    for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {}

                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {}

                    date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                    // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                    // to compute `A modulo B`, as the `%` operator does not
                    // correspond to the `modulo` operation for negative numbers.

                    time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                    // decomposing the time within the day. See section 15.9.1.10.

                    hours = floor(time / 36e5) % 24;
                    minutes = floor(time / 6e4) % 60;
                    seconds = floor(time / 1e3) % 60;
                    milliseconds = time % 1e3;
                  } else {
                    year = value.getUTCFullYear();
                    month = value.getUTCMonth();
                    date = value.getUTCDate();
                    hours = value.getUTCHours();
                    minutes = value.getUTCMinutes();
                    seconds = value.getUTCSeconds();
                    milliseconds = value.getUTCMilliseconds();
                  } // Serialize extended years correctly.


                  value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
                } else {
                  value = null;
                }
              } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
                // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                // ignores all `toJSON` methods on these objects unless they are
                // defined directly on an instance.
                value = value.toJSON(property);
              }
            }

            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }

            if (value === null) {
              return "null";
            }

            className = getClass.call(value);

            if (className == booleanClass) {
              // Booleans are represented literally.
              return "" + value;
            } else if (className == numberClass) {
              // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
              // `"null"`.
              return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
            } else if (className == stringClass) {
              // Strings are double-quoted and escaped.
              return quote("" + value);
            } // Recursively serialize objects and arrays.


            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              } // Add the object to the stack of traversed objects.


              stack.push(value);
              results = []; // Save the current indentation level and indent one additional level.

              prefix = indentation;
              indentation += whitespace;

              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undef ? "null" : element);
                }

                result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                _forEach(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);

                  if (element !== undef) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });

                result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
              } // Remove the object from the traversed object stack.


              stack.pop();
              return result;
            }
          }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.


          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;

            if (typeof filter == "function" || typeof filter == "object" && filter) {
              if ((className = getClass.call(filter)) == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};

                for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {}
              }
            }

            if (width) {
              if ((className = getClass.call(width)) == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {}
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            } // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).


            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        } // Public: Parses a JSON source string.


        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
          // equivalents.

          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          }; // Internal: Stores the parser state.

          var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.

          var abort = function abort() {
            Index = Source = null;
            throw SyntaxError();
          }; // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.


          var lex = function lex() {
            var source = Source,
                length = source.length,
                value,
                begin,
                position,
                isSigned,
                charCode;

            while (Index < length) {
              charCode = source.charCodeAt(Index);

              switch (charCode) {
                case 9:
                case 10:
                case 13:
                case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;

                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                  // the current position.
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;

                case 34:
                  // `"` delimits a JSON string; advance to the next character and
                  // begin parsing the string. String tokens are prefixed with the
                  // sentinel `@` character to distinguish them from punctuators and
                  // end-of-string tokens.
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);

                    if (charCode < 32) {
                      // Unescaped ASCII control characters (those with a code unit
                      // less than the space character) are not permitted.
                      abort();
                    } else if (charCode == 92) {
                      // A reverse solidus (`\`) marks the beginning of an escaped
                      // control character (including `"`, `\`, and `/`) or Unicode
                      // escape sequence.
                      charCode = source.charCodeAt(++Index);

                      switch (charCode) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          // Revive escaped control characters.
                          value += Unescapes[charCode];
                          Index++;
                          break;

                        case 117:
                          // `\u` marks the beginning of a Unicode escape sequence.
                          // Advance to the first character and validate the
                          // four-digit code point.
                          begin = ++Index;

                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.

                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              // Invalid Unicode escape sequence.
                              abort();
                            }
                          } // Revive the escaped character.


                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;

                        default:
                          // Invalid escape sequence.
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        // An unescaped double-quote character marks the end of the
                        // string.
                        break;
                      }

                      charCode = source.charCodeAt(Index);
                      begin = Index; // Optimize for the common case where a string is valid.

                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      } // Append the string as-is.


                      value += source.slice(begin, Index);
                    }
                  }

                  if (source.charCodeAt(Index) == 34) {
                    // Advance to the next character and return the revived string.
                    Index++;
                    return value;
                  } // Unterminated string.


                  abort();

                default:
                  // Parse numbers and literals.
                  begin = Index; // Advance past the negative sign, if one is specified.

                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  } // Parse an integer or floating-point value.


                  if (charCode >= 48 && charCode <= 57) {
                    // Leading zeroes are interpreted as octal literals.
                    if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                      // Illegal octal literal.
                      abort();
                    }

                    isSigned = false; // Parse the integer component.

                    for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {} // Floats cannot contain a leading decimal point; however, this
                    // case is already accounted for by the parser.


                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index; // Parse the decimal component.

                      for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}

                      if (position == Index) {
                        // Illegal trailing decimal.
                        abort();
                      }

                      Index = position;
                    } // Parse exponents. The `e` denoting the exponent is
                    // case-insensitive.


                    charCode = source.charCodeAt(Index);

                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                      // specified.

                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      } // Parse the exponential component.


                      for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}

                      if (position == Index) {
                        // Illegal empty exponent.
                        abort();
                      }

                      Index = position;
                    } // Coerce the parsed value to a JavaScript number.


                    return +source.slice(begin, Index);
                  } // A negative sign may only precede numbers.


                  if (isSigned) {
                    abort();
                  } // `true`, `false`, and `null` literals.


                  if (source.slice(Index, Index + 4) == "true") {
                    Index += 4;
                    return true;
                  } else if (source.slice(Index, Index + 5) == "false") {
                    Index += 5;
                    return false;
                  } else if (source.slice(Index, Index + 4) == "null") {
                    Index += 4;
                    return null;
                  } // Unrecognized token.


                  abort();
              }
            } // Return the sentinel `$` character if the parser has reached the end
            // of the source string.


            return "$";
          }; // Internal: Parses a JSON `value` token.


          var get = function get(value) {
            var results, hasMembers;

            if (value == "$") {
              // Unexpected end of input.
              abort();
            }

            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                // Remove the sentinel `@` character.
                return value.slice(1);
              } // Parse object and array literals.


              if (value == "[") {
                // Parses a JSON array, returning a new JavaScript array.
                results = [];

                for (;; hasMembers || (hasMembers = true)) {
                  value = lex(); // A closing square bracket marks the end of the array literal.

                  if (value == "]") {
                    break;
                  } // If the array literal contains elements, the current token
                  // should be a comma separating the previous element from the
                  // next.


                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();

                      if (value == "]") {
                        // Unexpected trailing `,` in array literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each array element.
                      abort();
                    }
                  } // Elisions and leading commas are not permitted.


                  if (value == ",") {
                    abort();
                  }

                  results.push(get(value));
                }

                return results;
              } else if (value == "{") {
                // Parses a JSON object, returning a new JavaScript object.
                results = {};

                for (;; hasMembers || (hasMembers = true)) {
                  value = lex(); // A closing curly brace marks the end of the object literal.

                  if (value == "}") {
                    break;
                  } // If the object literal contains members, the current token
                  // should be a comma separator.


                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();

                      if (value == "}") {
                        // Unexpected trailing `,` in object literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each object member.
                      abort();
                    }
                  } // Leading commas are not permitted, object property names must be
                  // double-quoted strings, and a `:` must separate each property
                  // name and value.


                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }

                  results[value.slice(1)] = get(lex());
                }

                return results;
              } // Unexpected token encountered.


              abort();
            }

            return value;
          }; // Internal: Updates a traversed object member.


          var update = function update(source, property, callback) {
            var element = walk(source, property, callback);

            if (element === undef) {
              delete source[property];
            } else {
              source[property] = element;
            }
          }; // Internal: Recursively traverses a parsed JSON object, invoking the
          // `callback` function for each value. This is an implementation of the
          // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.


          var walk = function walk(source, property, callback) {
            var value = source[property],
                length;

            if (typeof value == "object" && value) {
              // `forEach` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(value, length, callback);
                }
              } else {
                _forEach(value, function (property) {
                  update(value, property, callback);
                });
              }
            }

            return callback.call(source, property, value);
          }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.


          exports.parse = function (source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.

            if (lex() != "$") {
              abort();
            } // Reset the parser state.


            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports["runInContext"] = runInContext;
      return exports;
    }

    if (exports && !exports.nodeType && !isLoader) {
      // Export for CommonJS environments.
      runInContext(root, exports);
    } else {
      // Export for web browsers and JavaScript engines.
      var nativeJSON = root.JSON;
      var JSON3 = runInContext(root, root["JSON3"] = {
        // Public: Restores the original value of the global `JSON` object and
        // returns a reference to the `JSON3` object.
        "noConflict": function noConflict() {
          root.JSON = nativeJSON;
          return JSON3;
        }
      });
      root.JSON = {
        "parse": JSON3.parse,
        "stringify": JSON3.stringify
      };
    }
  })(commonjsGlobal);
});
/**
 * Module dependencies.
 */

/**
 * Make sure `Object.keys` work for `undefined`
 * values that are still there, like `document.all`.
 * http://lists.w3.org/Archives/Public/public-html/2009Jun/0546.html
 *
 * @api private
 */

function objectKeys$1(val) {
  if (Object.keys) {
    return Object.keys(val);
  }

  return objectKeys(val);
}
/**
 * Module exports.
 */


var utilInspect = inspect;
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 * @license MIT (© Joyent)
 */

/* legacy: obj, showHidden, depth, colors*/

function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) {
    ctx.depth = arguments[2];
  }

  if (arguments.length >= 4) {
    ctx.colors = arguments[3];
  }

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) {
    ctx.showHidden = false;
  }

  if (isUndefined(ctx.depth)) {
    ctx.depth = 2;
  }

  if (isUndefined(ctx.colors)) {
    ctx.colors = false;
  }

  if (isUndefined(ctx.customInspect)) {
    ctx.customInspect = true;
  }

  if (ctx.colors) {
    ctx.stylize = stylizeWithColor;
  }

  return formatValue(ctx, obj, ctx.depth);
} // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics


inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeNoColor(str, styleType) {
  return str;
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isUndefined(arg) {
  return arg === void 0;
}

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function isFunction$1(arg) {
  return typeof arg === 'function';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isNull(arg) {
  return arg === null;
}

function hasOwn$4(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function arrayToHash(array) {
  var hash = {};
  foreach(array, function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwn$4(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  foreach(keys, function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction$1(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = objectKeys$1(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden && Object.getOwnPropertyNames) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (indexof(keys, 'message') >= 0 || indexof(keys, 'description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction$1(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isarray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction$1(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = arrayMap(keys, function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = {
    value: value[key]
  };

  if (Object.getOwnPropertyDescriptor) {
    desc = Object.getOwnPropertyDescriptor(value, key) || desc;
  }

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwn$4(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (indexof(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = arrayMap(str.split('\n'), function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + arrayMap(str.split('\n'), function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = json3.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) {
    return ctx.stylize('undefined', 'undefined');
  }

  if (isString(value)) {
    var simple = '\'' + json3.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) {
    return ctx.stylize('' + value, 'number');
  }

  if (isBoolean(value)) {
    return ctx.stylize('' + value, 'boolean');
  } // For some reason typeof null is "object", so special case here.


  if (isNull(value)) {
    return ctx.stylize('null', 'null');
  }
}

function reduceToSingleString(output, base, braces) {
  var length = arrayReduce(output, function (prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) {
    return origin;
  }

  var keys = objectKeys$1(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
}
/*  */


var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject$1(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp$1(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString$4(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn$5(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function no(a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function identity(_) {
  return _;
};
/**
 * Generate a string containing static keys from compiler modules.
 */


function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || []);
  }, []).join(',');
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject$1(a);
  var isObjectB = isObject$1(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */


var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {}
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer = false;

var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject$1(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn$5(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ( true && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ( true && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
     true && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ( true && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
     true && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn$5(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn$5(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if (true) {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if (true) {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if (true) {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];

      if (typeof def === 'function') {
        dirs[key] = {
          bind: def,
          update: def
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn$5(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn$5(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn$5(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn$5(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ( true && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn$5(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn$5(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if (true) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn$5(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ( true && isObject$1(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean$1() {
  var args = [],
      len = arguments.length;

  while (len--) {
    args[len] = arguments[len];
  }

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (true) {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function timerFunc() {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function timerFunc() {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function timerFunc() {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function timerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/*  */


var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject$1(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has$1 = {};

  if (true) {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function getNow() {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has$1[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ( true && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has$1[id] == null) {
    has$1[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$1 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$1; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true ? expOrFn.toString() : undefined; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
       true && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject$1(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };

    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
  var name, def, cur, old, event;

  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
       true && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if (true) {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn$5(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn$5(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn$5(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if (true) {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function warnReservedPrefix(target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if (true) {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {} // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
     true && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if (true) {
      if (methods && hasOwn$5(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn$5(props, key)) {
       true && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ( true && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ( true && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn$5(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if (true) {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn$5(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (true) {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */


var uid$2 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$2++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if (true) {
      initProxy(vm);
    } else {} // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function normalized() {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject$1(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ( true && !isObject$1(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject$1(value)) {
       true && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString$4;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn$5(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject$1(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if (true) {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function merged(a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
     true && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ( true && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject$1(data.style)) {
    traverse(data.style);
  }

  if (isObject$1(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject$1(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function forceRender(renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
       true && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject$1(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject( true ? "timeout (" + res.timeout + "ms)" : undefined);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if (true) {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if (true) {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ( true && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (true) {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp$1(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ( true && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (true) {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ( true && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ( true && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (true) {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      elm.setAttribute(key, cur);
    }
  }

  for (key in oldAttrs) {
    if (attrs[key] == null) {
      elm.setAttribute(key);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');
var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject$1(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticClass && !data.class && (!oldData || !oldData.staticClass && !oldData.class)) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var class_ = {
  create: updateClass,
  update: updateClass
};
var target$1;

function add$1(event, handler, once, capture) {
  if (capture) {
    console.log('bubble phase not supported');
    return;
  }

  if (once) {
    var oldHandler = handler;

    handler = function handler() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      var res = oldHandler.call.apply(oldHandler, [null].concat(args));

      if (res !== null) {
        remove$2(event, null, null, target$1);
      }
    };
  }

  target$1.addEventListener(event, handler);
}

function remove$2(event, handler, capture, _target) {
  if (_target === void 0) _target = target$1;

  _target.removeEventListener(event);
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
var normalize = cached(camelize);

function createStyle(oldVnode, vnode) {
  // console.log(`\t\t ===> createStyle(${oldVnode}, ${vnode})`)
  if (!vnode.data.staticStyle) {
    updateStyle(oldVnode, vnode);
    return;
  }

  var elm = vnode.elm;
  var staticStyle = vnode.data.staticStyle;

  for (var name in staticStyle) {
    if (staticStyle[name]) {
      elm.setStyle(normalize(name), staticStyle[name]);
    }
  }

  updateStyle(oldVnode, vnode);
}

function updateStyle(oldVnode, vnode) {
  if (!oldVnode.data.style && !vnode.data.style) {
    return;
  }

  var cur, name;
  var elm = vnode.elm;
  var oldStyle = oldVnode.data.style || {};
  var style = vnode.data.style || {};
  var needClone = style.__ob__; // handle array syntax

  if (Array.isArray(style)) {
    style = vnode.data.style = toObject$1(style);
  } // clone the style for future updates,
  // in case the user mutates the style object in-place.


  if (needClone) {
    style = vnode.data.style = extend({}, style);
  }

  for (name in oldStyle) {
    if (!style[name]) {
      elm.setStyle(normalize(name), '');
    }
  }

  for (name in style) {
    cur = style[name];
    elm.setStyle(normalize(name), cur);
  }
}

function toObject$1(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}

var style = {
  create: createStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def === 'object') {
    var res = {};

    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }

    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) ;
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) ;
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject$1(duration) ? duration.enter : duration);

  if ( true && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject$1(duration) ? duration.leave : duration);

  if ( true && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = {
  create: _enter,
  activate: _enter,
  remove: function remove(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
};
var platformModules = [attrs, class_, events, style, transition];
var actionBar = {
  template: "\n    <NativeActionBar ~actionBar v-bind=\"$attrs\" v-on=\"$listeners\">\n      <slot />\n    </NativeActionBar>\n  "
};
var android = {
  functional: true,
  render: function render(h, ref) {
    var children = ref.children;

    if (__webpack_require__("tns-core-modules/platform").isAndroid) {
      return children;
    }
  }
};
var frames = new Map();

function setFrame(id, frame) {
  return frames.set(id, frame);
}

function getFrame(id) {
  return frames.get(id);
}

function deleteFrame(id) {
  return frames.delete(id);
}

var idCounter = 1;
var frame = {
  props: {
    id: {
      default: 'default'
    },
    transition: {
      type: [String, Object],
      required: false,
      default: null
    },
    'ios:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    'android:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    clearHistory: {
      type: Boolean,
      required: false,
      default: false
    },
    backstackVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    // injected by the template compiler
    hasRouterView: {
      default: false
    }
  },
  data: function data() {
    return {
      properties: {}
    };
  },
  created: function created() {
    var properties = {};

    if (getFrame(this.$props.id)) {
      properties.id = this.$props.id + idCounter++;
    }

    this.properties = Object.assign({}, this.$attrs, this.$props, properties);
    setFrame(this.properties.id, this);
  },
  destroyed: function destroyed() {
    deleteFrame(this.properties.id);
  },
  render: function render(h) {
    return h('NativeFrame', {
      attrs: this.properties,
      on: this.$listeners
    }, this.$slots.default);
  },
  methods: {
    _getFrame: function _getFrame() {
      return this.$el.nativeView;
    },
    _ensureTransitionObject: function _ensureTransitionObject(transition) {
      if (typeof transition === 'string') {
        return {
          name: transition
        };
      }

      return transition;
    },
    _composeTransition: function _composeTransition(entry) {
      var isAndroid = __webpack_require__("tns-core-modules/platform").isAndroid;

      var platformEntryProp = "transition" + (isAndroid ? 'Android' : 'iOS');
      var entryProp = entry[platformEntryProp] ? platformEntryProp : 'transition';
      var platformProp = (isAndroid ? 'android' : 'ios') + ":transition";
      var prop = this[platformProp] ? platformProp : 'transition';

      if (entry[entryProp]) {
        entry[entryProp] = this._ensureTransitionObject(entry[entryProp]);
      } else if (this[prop]) {
        entry[entryProp] = this._ensureTransitionObject(this[prop]);
      }

      return entry;
    },
    notifyPageMounted: function notifyPageMounted(pageVm) {
      var this$1 = this;
      var options = {
        backstackVisible: this.backstackVisible,
        clearHistory: this.clearHistory,
        create: function create() {
          return pageVm.$el.nativeView;
        }
      };
      this.$nextTick(function () {
        this$1.navigate(options);
      });
    },
    navigate: function navigate(entry, back) {
      var this$1 = this;
      if (back === void 0) back = false;

      var frame = this._getFrame();

      if (back) {
        return frame.goBack(entry);
      } // resolve the page from the entry and attach a navigatedTo listener
      // to fire the frame events


      var page = entry.create();
      page.once('navigatedTo', function () {
        this$1.$emit('navigated', entry);
      });

      var handler = function handler(args) {
        if (args.isBackNavigation) {
          page.off('navigatedFrom', handler);
          this$1.$emit('navigatedBack', entry);
        }
      };

      page.on('navigatedFrom', handler);

      entry.create = function () {
        return page;
      };

      this._composeTransition(entry);

      frame.navigate(entry);
    },
    back: function back(backstackEntry) {
      if (backstackEntry === void 0) backstackEntry = null;
      this.navigate(backstackEntry, true);
    }
  }
};
var ios = {
  functional: true,
  render: function render(h, ref) {
    var children = ref.children;

    if (__webpack_require__("tns-core-modules/platform").isIOS) {
      return children;
    }
  }
};
var VUE_VIEW = '__vueVNodeRef__';
var tid = 0;
var vTemplate = {
  props: {
    name: {
      type: String
    },
    if: {
      type: String
    }
  },
  mounted: function mounted() {
    if (!this.$scopedSlots.default) {
      return;
    }

    this.$templates = this.$el.parentNode.$templates = this.$parent.$templates = this.$parent.$templates || new TemplateBag();
    this.$templates.registerTemplate(this.$props.name || (this.$props.if ? "v-template-" + tid++ : 'default'), this.$props.if, this.$scopedSlots.default);
  },
  render: function render(h) {}
};

var TemplateBag = function TemplateBag() {
  this._templateMap = new Map();
};

var prototypeAccessors$1 = {
  selectorFn: {
    configurable: true
  }
};

TemplateBag.prototype.registerTemplate = function registerTemplate(name, condition, scopedFn) {
  this._templateMap.set(name, {
    scopedFn: scopedFn,
    conditionFn: this.getConditionFn(condition),
    keyedTemplate: new VueKeyedTemplate(name, scopedFn)
  });
};

prototypeAccessors$1.selectorFn.get = function () {
  var self = this;
  return function templateSelectorFn(item) {
    var iterator = self._templateMap.entries();

    var curr;

    while (curr = iterator.next().value) {
      var name = curr[0];
      var conditionFn = curr[1].conditionFn;

      try {
        if (conditionFn(item)) {
          return name;
        }
      } catch (err) {}
    }

    return 'default';
  };
};

TemplateBag.prototype.getConditionFn = function getConditionFn(condition) {
  return new Function('ctx', "with(ctx) { return !!(" + condition + ") }");
};

TemplateBag.prototype.getKeyedTemplate = function getKeyedTemplate(name) {
  return this._templateMap.get(name).keyedTemplate;
};

TemplateBag.prototype.patchTemplate = function patchTemplate(name, context, oldVnode) {
  var vnode = this._templateMap.get(name).scopedFn(context); // in 2.6 scopedFn returns an array!


  if (Array.isArray(vnode)) {
    vnode = vnode[0];
  }

  var nativeView = patch(oldVnode, vnode).nativeView;
  nativeView[VUE_VIEW] = vnode;
  return nativeView;
};

TemplateBag.prototype.getAvailable = function getAvailable() {
  return Array.from(this._templateMap.keys());
};

TemplateBag.prototype.getKeyedTemplates = function getKeyedTemplates() {
  return Array.from(this._templateMap.values()).map(function (ref) {
    var keyedTemplate = ref.keyedTemplate;
    return keyedTemplate;
  });
};

Object.defineProperties(TemplateBag.prototype, prototypeAccessors$1);

var VueKeyedTemplate = function VueKeyedTemplate(key, scopedFn) {
  this._key = key;
  this._scopedFn = scopedFn;
};

var prototypeAccessors$1$1 = {
  key: {
    configurable: true
  }
};

prototypeAccessors$1$1.key.get = function () {
  return this._key;
};

VueKeyedTemplate.prototype.createView = function createView() {
  // we are returning null because we don't have the data here
  // the view will be created in the `patchTemplate` method above.
  // see https://github.com/nativescript-vue/nativescript-vue/issues/229#issuecomment-390330474
  return null;
};

Object.defineProperties(VueKeyedTemplate.prototype, prototypeAccessors$1$1);
var listView = {
  props: {
    items: {
      type: [Array, Object],
      validator: function validator(val) {
        var ObservableArray = __webpack_require__("tns-core-modules/data/observable-array").ObservableArray;

        return Array.isArray(val) || val instanceof ObservableArray;
      },
      required: true
    },
    '+alias': {
      type: String,
      default: 'item'
    },
    '+index': {
      type: String
    }
  },
  template: "\n    <NativeListView\n      ref=\"listView\"\n      :items=\"items\"\n      v-bind=\"$attrs\"\n      v-on=\"listeners\"\n      @itemTap=\"onItemTap\"\n      @itemLoading=\"onItemLoading\"\n    >\n      <slot />\n    </NativeListView>\n  ",
  watch: {
    items: {
      handler: function handler(newVal) {
        this.$refs.listView.setAttribute('items', newVal);
        this.refresh();
      },
      deep: true
    }
  },
  created: function created() {
    // we need to remove the itemTap handler from a clone of the $listeners
    // object because we are emitting the event ourselves with added data.
    var listeners = extend({}, this.$listeners);
    delete listeners.itemTap;
    this.listeners = listeners;
    this.getItemContext = getItemContext.bind(this);
  },
  mounted: function mounted() {
    var this$1 = this;

    if (!this.$templates) {
      return;
    }

    this.$refs.listView.setAttribute('_itemTemplatesInternal', this.$templates.getKeyedTemplates());
    this.$refs.listView.setAttribute('_itemTemplateSelector', function (item, index) {
      return this$1.$templates.selectorFn(this$1.getItemContext(item, index));
    });
  },
  methods: {
    onItemTap: function onItemTap(args) {
      this.$emit('itemTap', extend({
        item: this.getItem(args.index)
      }, args));
    },
    onItemLoading: function onItemLoading(args) {
      if (!this.$templates) {
        return;
      }

      var index = args.index;
      var items = args.object.items;
      var currentItem = this.getItem(index);

      var name = args.object._itemTemplateSelector(currentItem, index, items);

      var context = this.getItemContext(currentItem, index);
      var oldVnode = args.view && args.view[VUE_VIEW];
      args.view = this.$templates.patchTemplate(name, context, oldVnode);
    },
    refresh: function refresh() {
      this.$refs.listView.nativeView.refresh();
    },
    getItem: function getItem(idx) {
      return typeof this.items.getItem === 'function' ? this.items.getItem(idx) : this.items[idx];
    }
  }
};

function getItemContext(item, index, alias, index_alias) {
  var obj;
  if (alias === void 0) alias = this.$props['+alias'];
  if (index_alias === void 0) index_alias = this.$props['+index'];
  return obj = {}, obj[alias] = item, obj[index_alias || '$index'] = index, obj.$even = index % 2 === 0, obj.$odd = index % 2 !== 0, obj;
}

var PAGE_REF = '__vuePageRef__';
var page = {
  render: function render(h) {
    return h('NativePage', {
      attrs: this.$attrs,
      on: this.$listeners
    }, this.$slots.default);
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$el.nativeView[PAGE_REF] = this;

    var frame = this._findParentFrame();

    if (frame) {
      frame.notifyPageMounted(this);
    }

    var handler = function handler(e) {
      if (e.isBackNavigation) {
        this$1.$el.nativeView.off('navigatedFrom', handler);
        this$1.$parent.$destroy();
      }
    };

    this.$el.nativeView.on('navigatedFrom', handler); // ensure that the parent vue instance is destroyed when the
    // page is disposed (clearHistory: true for example)

    var dispose = this.$el.nativeView.disposeNativeView;

    this.$el.nativeView.disposeNativeView = function () {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      this$1.$parent.$destroy();
      dispose.call(this$1.$el.nativeView, args);
    };
  },
  methods: {
    _findParentFrame: function _findParentFrame() {
      var frame = this.$parent;

      while (frame && frame.$options.name !== 'Frame') {
        frame = frame.$parent;
      }

      return frame;
    }
  }
};
var tabView = {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  render: function render(h) {
    return h('NativeTabView', {
      on: this.$listeners,
      attrs: this.$attrs
    }, this.$slots.default);
  },
  methods: {
    registerTab: function registerTab(tabView) {
      var items = this.$el.nativeView.items || [];
      this.$el.setAttribute('items', items.concat([tabView]));
    }
  }
};
var tabViewItem = {
  template: "<NativeTabViewItem><slot /></NativeTabViewItem>",
  mounted: function mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabViewItem should contain only 1 root element', this);
    }

    var _nativeView = this.$el.nativeView;
    _nativeView.view = this.$el.childNodes[0].nativeView;
    this.$parent.registerTab(_nativeView);
  }
};
var bottomNavigation = {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  render: function render(h) {
    return h('NativeBottomNavigation', {
      on: this.$listeners,
      attrs: this.$attrs
    }, this.$slots.default);
  },
  methods: {
    registerTabStrip: function registerTabStrip(tabStrip) {
      this.$el.setAttribute('tabStrip', tabStrip);
    },
    registerTabContentItem: function registerTabContentItem(tabContentItem) {
      var items = this.$el.nativeView.items || [];
      this.$el.setAttribute('items', items.concat([tabContentItem]));
    }
  }
};
var tabs = {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  render: function render(h) {
    return h('NativeTabs', {
      on: this.$listeners,
      attrs: this.$attrs
    }, this.$slots.default);
  },
  methods: {
    registerTabStrip: function registerTabStrip(tabStrip) {
      this.$el.setAttribute('tabStrip', tabStrip);
    },
    registerTabContentItem: function registerTabContentItem(tabContentItem) {
      var items = this.$el.nativeView.items || [];
      this.$el.setAttribute('items', items.concat([tabContentItem]));
    }
  }
};
var tabStrip = {
  render: function render(h) {
    return h('NativeTabStrip', {
      on: this.$listeners,
      attrs: this.$attrs
    }, this.$slots.default);
  },
  mounted: function mounted() {
    var _nativeView = this.$el.nativeView;
    this.$parent.registerTabStrip(_nativeView);
  },
  methods: {
    registerTabStripItem: function registerTabStripItem(tabStripItem) {
      var items = this.$el.nativeView.items || [];
      this.$el.setAttribute('items', items.concat([tabStripItem]));
    }
  }
};
var tabStripItem = {
  template: "<NativeTabStripItem><slot /></NativeTabStripItem>",
  mounted: function mounted() {
    var _nativeView = this.$el.nativeView;
    this.$parent.registerTabStripItem(_nativeView);
  }
};
var tabContentItem = {
  template: "<NativeTabContentItem><slot /></NativeTabContentItem>",
  mounted: function mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabContentItem should contain only 1 root element', this);
    }

    var _nativeView = this.$el.nativeView;
    _nativeView.view = this.$el.childNodes[0].nativeView;
    this.$parent.registerTabContentItem(_nativeView);
  }
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function isNotTextNode(c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function isVShowDirective(d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ( true && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ( true && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function performLeave() {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
var elementMap = {};
var nativeRegExp = /Native/gi;
var dashRegExp = /-/g;
var defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpenTag: false,
  model: null,
  component: null
};

function normalizeElementName(elementName) {
  return "native" + elementName.replace(nativeRegExp, '').replace(dashRegExp, '').toLowerCase();
}

function registerElement(elementName, resolver, meta) {
  var normalizedName = normalizeElementName(elementName);
  meta = Object.assign({}, defaultViewMeta, meta);

  if (elementMap[normalizedName]) {
    throw new Error("Element for " + elementName + " already registered.");
  }

  if (!meta.component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    meta.component = {
      functional: true,
      model: meta.model,
      render: function render(h, ref) {
        var data = ref.data;
        var children = ref.children;
        return h(normalizedName, data, children);
      }
    };
  }

  meta.component.name = elementName;
  var entry = {
    resolver: resolver,
    meta: meta
  };
  elementMap[normalizedName] = entry;
}

function getElementMap() {
  return elementMap;
}

function getViewClass(elementName) {
  var normalizedName = normalizeElementName(elementName);
  var entry = elementMap[normalizedName];

  if (!entry) {
    throw new TypeError("No known component for element " + elementName + ".");
  }

  try {
    return entry.resolver();
  } catch (e) {
    throw new TypeError("Could not load view for: " + elementName + ". " + e);
  }
}

function getViewMeta(elementName) {
  var normalizedName = normalizeElementName(elementName);
  var meta = defaultViewMeta;
  var entry = elementMap[normalizedName];

  if (entry && entry.meta) {
    meta = entry.meta;
  }

  return meta;
}

function isKnownView(elementName) {
  return elementMap[normalizeElementName(elementName)];
}

registerElement('ActionBar', function () {
  return __webpack_require__("tns-core-modules/ui/action-bar").ActionBar;
}, {
  removeChild: function removeChild(parent, child) {
    try {
      parent.nativeView._removeView(child.nativeView);
    } catch (e) {// ignore exception - child is likely already removed/replaced
      // fixes #76
    }
  },
  component: actionBar
});
registerElement('ActionItem', function () {
  return __webpack_require__("tns-core-modules/ui/action-bar").ActionItem;
});
registerElement('android', null, {
  component: android
});
registerElement('ios', null, {
  component: ios
});
registerElement('ListView', function () {
  return __webpack_require__("tns-core-modules/ui/list-view").ListView;
}, {
  component: listView
});
registerElement('NavigationButton', function () {
  return __webpack_require__("tns-core-modules/ui/action-bar").NavigationButton;
});
registerElement('TabView', function () {
  return __webpack_require__("tns-core-modules/ui/tab-view").TabView;
}, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  component: tabView
});
registerElement('TabViewItem', function () {
  return __webpack_require__("tns-core-modules/ui/tab-view").TabViewItem;
}, {
  skipAddToDom: true,
  component: tabViewItem
});
registerElement('BottomNavigation', function () {
  return __webpack_require__("tns-core-modules/ui/bottom-navigation").BottomNavigation;
}, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  component: bottomNavigation
});
registerElement('Tabs', function () {
  return __webpack_require__("tns-core-modules/ui/tabs").Tabs;
}, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  component: tabs
});
registerElement('TabStrip', function () {
  return __webpack_require__("tns-core-modules/ui/tab-navigation-base/tab-strip").TabStrip;
}, {
  skipAddToDom: true,
  component: tabStrip
});
registerElement('TabStripItem', function () {
  return __webpack_require__("tns-core-modules/ui/tab-navigation-base/tab-strip-item").TabStripItem;
}, {
  skipAddToDom: true,
  component: tabStripItem
});
registerElement('TabContentItem', function () {
  return __webpack_require__("tns-core-modules/ui/tab-navigation-base/tab-content-item").TabContentItem;
}, {
  skipAddToDom: true,
  component: tabContentItem
});
registerElement('transition', null, {
  component: Transition
});
registerElement('v-template', null, {
  component: vTemplate
}); // NS components which uses the automatic registerElement Vue wrapper
// as they do not need any special logic

registerElement('Label', function () {
  return __webpack_require__("tns-core-modules/ui/label").Label;
}, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
});
registerElement('DatePicker', function () {
  return __webpack_require__("tns-core-modules/ui/date-picker").DatePicker;
}, {
  model: {
    prop: 'date',
    event: 'dateChange'
  }
});
registerElement('AbsoluteLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/absolute-layout").AbsoluteLayout;
});
registerElement('ActivityIndicator', function () {
  return __webpack_require__("tns-core-modules/ui/activity-indicator").ActivityIndicator;
});
registerElement('Border', function () {
  return __webpack_require__("tns-core-modules/ui/border").Border;
});
registerElement('Button', function () {
  return __webpack_require__("tns-core-modules/ui/button").Button;
});
registerElement('ContentView', function () {
  return __webpack_require__("tns-core-modules/ui/content-view").ContentView;
});
registerElement('DockLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/dock-layout").DockLayout;
});
registerElement('GridLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/grid-layout").GridLayout;
});
registerElement('HtmlView', function () {
  return __webpack_require__("tns-core-modules/ui/html-view").HtmlView;
});
registerElement('Image', function () {
  return __webpack_require__("tns-core-modules/ui/image").Image;
});
registerElement('img', function () {
  return __webpack_require__("tns-core-modules/ui/image").Image;
});
registerElement('ListPicker', function () {
  return __webpack_require__("tns-core-modules/ui/list-picker").ListPicker;
}, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
});
registerElement('Page', function () {
  return __webpack_require__("tns-core-modules/ui/page").Page;
}, {
  skipAddToDom: true,
  component: page
});
registerElement('Placeholder', function () {
  return __webpack_require__("tns-core-modules/ui/placeholder").Placeholder;
});
registerElement('Progress', function () {
  return __webpack_require__("tns-core-modules/ui/progress").Progress;
}, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
});
registerElement('ProxyViewContainer', function () {
  return __webpack_require__("tns-core-modules/ui/proxy-view-container").ProxyViewContainer;
}); // registerElement(
//   'Repeater',
//   () => require('tns-core-modules/ui/repeater').Repeater
// )

registerElement('ScrollView', function () {
  return __webpack_require__("tns-core-modules/ui/scroll-view").ScrollView;
});
registerElement('SearchBar', function () {
  return __webpack_require__("tns-core-modules/ui/search-bar").SearchBar;
}, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
});
registerElement('SegmentedBar', function () {
  return __webpack_require__("tns-core-modules/ui/segmented-bar").SegmentedBar;
}, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
});
registerElement('SegmentedBarItem', function () {
  return __webpack_require__("tns-core-modules/ui/segmented-bar").SegmentedBarItem;
});
registerElement('Slider', function () {
  return __webpack_require__("tns-core-modules/ui/slider").Slider;
}, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
});
registerElement('StackLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/stack-layout").StackLayout;
});
registerElement('FlexboxLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/flexbox-layout").FlexboxLayout;
});
registerElement('Switch', function () {
  return __webpack_require__("tns-core-modules/ui/switch").Switch;
}, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
});
registerElement('TextField', function () {
  return __webpack_require__("tns-core-modules/ui/text-field").TextField;
}, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
});
registerElement('TextView', function () {
  return __webpack_require__("tns-core-modules/ui/text-view").TextView;
}, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
});
registerElement('TimePicker', function () {
  return __webpack_require__("tns-core-modules/ui/time-picker").TimePicker;
}, {
  model: {
    prop: 'time',
    event: 'timeChange'
  }
});
registerElement('WebView', function () {
  return __webpack_require__("tns-core-modules/ui/web-view").WebView;
});
registerElement('WrapLayout', function () {
  return __webpack_require__("tns-core-modules/ui/layouts/wrap-layout").WrapLayout;
});
registerElement('FormattedString', function () {
  return __webpack_require__("tns-core-modules/text/formatted-string").FormattedString;
});
registerElement('Span', function () {
  return __webpack_require__("tns-core-modules/text/span").Span;
});
registerElement('DetachedContainer', function () {
  return __webpack_require__("tns-core-modules/ui/proxy-view-container").ProxyViewContainer;
}, {
  skipAddToDom: true
});
registerElement('DetachedText', function () {
  return __webpack_require__("tns-core-modules/ui/placeholder").Placeholder;
}, {
  skipAddToDom: true
});
registerElement('Comment', function () {
  return __webpack_require__("tns-core-modules/ui/placeholder").Placeholder;
});
registerElement('Document', function () {
  return __webpack_require__("tns-core-modules/ui/proxy-view-container").ProxyViewContainer;
}, {
  skipAddToDom: true
});
registerElement('Frame', function () {
  return __webpack_require__("tns-core-modules/ui/frame").Frame;
}, {
  insertChild: function insertChild(parentNode, childNode, atIndex) {// if (normalizeElementName(childNode.tagName) === 'nativepage') {
    // parentNode.nativeView.navigate({ create: () => childNode.nativeView })
    // }
  },
  component: frame
});
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject$1 = function isPlainObject(o) {
  var ctor, prot;

  if (isObjectObject(o) === false) {
    return false;
  } // If has modified constructor


  ctor = o.constructor;

  if (typeof ctor !== 'function') {
    return false;
  } // If has modified prototype


  prot = ctor.prototype;

  if (isObjectObject(prot) === false) {
    return false;
  } // If constructor does not have an Object-specific method


  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  } // Most likely a plain Object


  return true;
};

function set$1(target, path, value, options) {
  if (!isObject$2(target)) {
    return target;
  }

  var opts = options || {};
  var isArray = Array.isArray(path);

  if (!isArray && typeof path !== 'string') {
    return target;
  }

  var merge = opts.merge;

  if (merge && typeof merge !== 'function') {
    merge = Object.assign;
  }

  var keys = isArray ? path : split(path, opts);
  var len = keys.length;
  var orig = target;

  if (!options && keys.length === 1) {
    result(target, keys[0], value, merge);
    return target;
  }

  for (var i = 0; i < len; i++) {
    var prop = keys[i];

    if (!isObject$2(target[prop])) {
      target[prop] = {};
    }

    if (i === len - 1) {
      result(target, prop, value, merge);
      break;
    }

    target = target[prop];
  }

  return orig;
}

function result(target, path, value, merge) {
  if (merge && isPlainObject$1(target[path]) && isPlainObject$1(value)) {
    target[path] = merge({}, target[path], value);
  } else {
    target[path] = value;
  }
}

function split(path, options) {
  var id = createKey(path, options);

  if (set$1.memo[id]) {
    return set$1.memo[id];
  }

  var char = options && options.separator ? options.separator : '.';
  var keys = [];
  var res = [];

  if (options && typeof options.split === 'function') {
    keys = options.split(path);
  } else {
    keys = path.split(char);
  }

  for (var i = 0; i < keys.length; i++) {
    var prop = keys[i];

    while (prop && prop.slice(-1) === '\\' && keys[i + 1]) {
      prop = prop.slice(0, -1) + char + keys[++i];
    }

    res.push(prop);
  }

  set$1.memo[id] = res;
  return res;
}

function createKey(pattern, options) {
  var id = pattern;

  if (typeof options === 'undefined') {
    return id + '';
  }

  var keys = Object.keys(options);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    id += ';' + key + '=' + String(options[key]);
  }

  return id;
}

function isObject$2(val) {
  switch (typeof val) {
    case 'null':
      return false;

    case 'object':
      return true;

    case 'function':
      return true;

    default:
      {
        return false;
      }
  }
}

set$1.memo = {};
var setValue = set$1;

function isView(view) {
  return view instanceof __webpack_require__("tns-core-modules/ui/core/view").View;
}

function isLayout(view) {
  return view instanceof __webpack_require__("tns-core-modules/ui/layouts/layout-base").LayoutBase;
}

function isContentView(view) {
  return view instanceof __webpack_require__("tns-core-modules/ui/content-view").ContentView;
}

function insertChild(parentNode, childNode, atIndex) {
  if (atIndex === void 0) atIndex = -1;

  if (!parentNode) {
    return;
  }

  if (parentNode.meta && typeof parentNode.meta.insertChild === 'function') {
    return parentNode.meta.insertChild(parentNode, childNode, atIndex);
  }

  if (childNode.meta.skipAddToDom) {
    return;
  }

  var parentView = parentNode.nativeView;
  var childView = childNode.nativeView;

  if (isLayout(parentView)) {
    if (childView.parent === parentView) {
      var index = parentView.getChildIndex(childView);

      if (index !== -1) {
        parentView.removeChild(childView);
      }
    }

    if (atIndex !== -1) {
      parentView.insertChild(childView, atIndex);
    } else {
      parentView.addChild(childView);
    }
  } else if (isContentView(parentView)) {
    if (childNode.nodeType === 8) {
      parentView._addView(childView, atIndex);
    } else {
      parentView.content = childView;
    }
  } else if (parentView && parentView._addChildFromBuilder) {
    parentView._addChildFromBuilder(childNode._nativeView.constructor.name, childView);
  }
}

function removeChild(parentNode, childNode) {
  if (!parentNode) {
    return;
  }

  if (parentNode.meta && typeof parentNode.meta.removeChild === 'function') {
    return parentNode.meta.removeChild(parentNode, childNode);
  }

  if (childNode.meta.skipAddToDom) {
    return;
  }

  var parentView = parentNode.nativeView;
  var childView = childNode.nativeView;

  if (isLayout(parentView)) {
    parentView.removeChild(childView);
  } else if (isContentView(parentView)) {
    if (parentView.content === childView) {
      parentView.content = null;
    }

    if (childNode.nodeType === 8) {
      parentView._removeView(childView);
    }
  } else if (isView(parentView)) {
    parentView._removeView(childView);
  }
}

var XML_ATTRIBUTES = Object.freeze(['style', 'rows', 'columns', 'fontAttributes']);

var ViewNode = function ViewNode() {
  this.nodeType = null;
  this._tagName = null;
  this.parentNode = null;
  this.childNodes = [];
  this.prevSibling = null;
  this.nextSibling = null;
  this._ownerDocument = null;
  this._nativeView = null;
  this._meta = null;
  /* istanbul ignore next
   * make vue happy :)
   */

  this.hasAttribute = this.removeAttribute = function () {
    return false;
  };
};

var prototypeAccessors$2 = {
  tagName: {
    configurable: true
  },
  firstChild: {
    configurable: true
  },
  lastChild: {
    configurable: true
  },
  nativeView: {
    configurable: true
  },
  meta: {
    configurable: true
  },
  ownerDocument: {
    configurable: true
  }
};
/* istanbul ignore next */

ViewNode.prototype.toString = function toString() {
  return this.constructor.name + "(" + this.tagName + ")";
};

prototypeAccessors$2.tagName.set = function (name) {
  this._tagName = normalizeElementName(name);
};

prototypeAccessors$2.tagName.get = function () {
  return this._tagName;
};

prototypeAccessors$2.firstChild.get = function () {
  return this.childNodes.length ? this.childNodes[0] : null;
};

prototypeAccessors$2.lastChild.get = function () {
  return this.childNodes.length ? this.childNodes[this.childNodes.length - 1] : null;
};

prototypeAccessors$2.nativeView.get = function () {
  return this._nativeView;
};

prototypeAccessors$2.nativeView.set = function (view) {
  if (this._nativeView) {
    throw new Error("Can't override native view.");
  }

  this._nativeView = view;
};

prototypeAccessors$2.meta.get = function () {
  if (this._meta) {
    return this._meta;
  }

  return this._meta = getViewMeta(this.tagName);
};
/* istanbul ignore next */


prototypeAccessors$2.ownerDocument.get = function () {
  if (this._ownerDocument) {
    return this._ownerDocument;
  }

  var el = this;

  while ((el = el.parentNode).nodeType !== 9) {// do nothing
  }

  return this._ownerDocument = el;
};

ViewNode.prototype.getAttribute = function getAttribute(key) {
  return this.nativeView[key];
};
/* istanbul ignore next */


ViewNode.prototype.setAttribute = function setAttribute(key, value) {
  var ref = __webpack_require__("tns-core-modules/platform");

  var isAndroid = ref.isAndroid;
  var isIOS = ref.isIOS;
  var nv = this.nativeView;

  try {
    if (XML_ATTRIBUTES.indexOf(key) !== -1) {
      nv[key] = value;
    } else {
      // detect expandable attrs for boolean values
      // See https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean
      if (__webpack_require__("tns-core-modules/utils/types").isBoolean(nv[key]) && value === '') {
        value = true;
      }

      if (isAndroid && key.startsWith('android:')) {
        setValue(nv, key.substr(8), value);
      } else if (isIOS && key.startsWith('ios:')) {
        setValue(nv, key.substr(4), value);
      } else if (key.endsWith('.decode')) {
        setValue(nv, key.slice(0, -7), __webpack_require__("tns-core-modules/xml").XmlParser._dereferenceEntities(value));
      } else {
        setValue(nv, key, value);
      }
    }
  } catch (e) {// ignore
  }
};
/* istanbul ignore next */


ViewNode.prototype.setStyle = function setStyle(property, value) {
  if (!(value = value.trim()).length) {
    return;
  }

  if (property.endsWith('Align')) {
    // NativeScript uses Alignment instead of Align, this ensures that text-align works
    property += 'ment';
  }

  this.nativeView.style[property] = value;
};
/* istanbul ignore next */


ViewNode.prototype.setText = function setText(text) {
  if (this.nodeType === 3) {
    this.parentNode.setText(text);
  } else {
    this.setAttribute('text', text);
  }
};
/* istanbul ignore next */


ViewNode.prototype.addEventListener = function addEventListener(event, handler) {
  this.nativeView.on(event, handler);
};
/* istanbul ignore next */


ViewNode.prototype.removeEventListener = function removeEventListener(event) {
  this.nativeView.off(event);
};

ViewNode.prototype.insertBefore = function insertBefore(childNode, referenceNode) {
  if (!childNode) {
    throw new Error("Can't insert child.");
  } // in some rare cases insertBefore is called with a null referenceNode
  // this makes sure that it get's appended as the last child


  if (!referenceNode) {
    return this.appendChild(childNode);
  }

  if (referenceNode.parentNode !== this) {
    throw new Error("Can't insert child, because the reference node has a different parent.");
  }

  if (childNode.parentNode && childNode.parentNode !== this) {
    throw new Error("Can't insert child, because it already has a different parent.");
  }

  if (childNode.parentNode === this) ;
  var index = this.childNodes.indexOf(referenceNode);
  childNode.parentNode = this;
  childNode.nextSibling = referenceNode;
  childNode.prevSibling = this.childNodes[index - 1];
  referenceNode.prevSibling = childNode;
  this.childNodes.splice(index, 0, childNode);
  insertChild(this, childNode, index);
};

ViewNode.prototype.appendChild = function appendChild(childNode) {
  if (!childNode) {
    throw new Error("Can't append child.");
  }

  if (childNode.parentNode && childNode.parentNode !== this) {
    throw new Error("Can't append child, because it already has a different parent.");
  }

  if (childNode.parentNode === this) ;
  childNode.parentNode = this;

  if (this.lastChild) {
    childNode.prevSibling = this.lastChild;
    this.lastChild.nextSibling = childNode;
  }

  this.childNodes.push(childNode);
  insertChild(this, childNode, this.childNodes.length - 1);
};

ViewNode.prototype.removeChild = function removeChild$1(childNode) {
  if (!childNode) {
    throw new Error("Can't remove child.");
  }

  if (!childNode.parentNode) {
    throw new Error("Can't remove child, because it has no parent.");
  }

  if (childNode.parentNode !== this) {
    throw new Error("Can't remove child, because it has a different parent.");
  }

  childNode.parentNode = null;

  if (childNode.prevSibling) {
    childNode.prevSibling.nextSibling = childNode.nextSibling;
  }

  if (childNode.nextSibling) {
    childNode.nextSibling.prevSibling = childNode.prevSibling;
  } // reset the prevSibling and nextSibling. If not, a keep-alived component will
  // still have a filled nextSibling attribute so vue will not
  // insert the node again to the parent. See #220


  childNode.prevSibling = null;
  childNode.nextSibling = null;
  this.childNodes = this.childNodes.filter(function (node) {
    return node !== childNode;
  });
  removeChild(this, childNode);
};

Object.defineProperties(ViewNode.prototype, prototypeAccessors$2);
var VUE_ELEMENT_REF = '__vue_element_ref__';

var ElementNode = /*@__PURE__*/function (ViewNode) {
  function ElementNode(tagName) {
    ViewNode.call(this);
    this.nodeType = 1;
    this.tagName = tagName;
    var viewClass = getViewClass(tagName);
    this._nativeView = new viewClass();
    this._nativeView[VUE_ELEMENT_REF] = this;
  }

  if (ViewNode) ElementNode.__proto__ = ViewNode;
  ElementNode.prototype = Object.create(ViewNode && ViewNode.prototype);
  ElementNode.prototype.constructor = ElementNode;

  ElementNode.prototype.appendChild = function appendChild(childNode) {
    ViewNode.prototype.appendChild.call(this, childNode);

    if (childNode.nodeType === 3) {
      this.setText(childNode.text);
    }
  };

  ElementNode.prototype.insertBefore = function insertBefore(childNode, referenceNode) {
    ViewNode.prototype.insertBefore.call(this, childNode, referenceNode);

    if (childNode.nodeType === 3) {
      this.setText(childNode.text);
    }
  };

  ElementNode.prototype.removeChild = function removeChild(childNode) {
    ViewNode.prototype.removeChild.call(this, childNode);

    if (childNode.nodeType === 3) {
      this.setText('');
    }
  };

  return ElementNode;
}(ViewNode);

var CommentNode = /*@__PURE__*/function (ElementNode) {
  function CommentNode(text) {
    ElementNode.call(this, 'comment');
    this.nodeType = 8;
    this.text = text;
  }

  if (ElementNode) CommentNode.__proto__ = ElementNode;
  CommentNode.prototype = Object.create(ElementNode && ElementNode.prototype);
  CommentNode.prototype.constructor = CommentNode;
  return CommentNode;
}(ElementNode);

var TextNode = /*@__PURE__*/function (ViewNode) {
  function TextNode(text) {
    ViewNode.call(this);
    this.nodeType = 3;
    this.text = text;
    this._meta = {
      skipAddToDom: true
    };
  }

  if (ViewNode) TextNode.__proto__ = ViewNode;
  TextNode.prototype = Object.create(ViewNode && ViewNode.prototype);
  TextNode.prototype.constructor = TextNode;

  TextNode.prototype.setText = function setText(text) {
    this.text = text;
    this.parentNode.setText(text);
  };

  return TextNode;
}(ViewNode);

var DocumentNode = /*@__PURE__*/function (ViewNode) {
  function DocumentNode() {
    ViewNode.call(this);
    this.nodeType = 9;
    this.documentElement = new ElementNode('document'); // make static methods accessible via this

    this.createComment = this.constructor.createComment;
    this.createElement = this.constructor.createElement;
    this.createElementNS = this.constructor.createElementNS;
    this.createTextNode = this.constructor.createTextNode;
  }

  if (ViewNode) DocumentNode.__proto__ = ViewNode;
  DocumentNode.prototype = Object.create(ViewNode && ViewNode.prototype);
  DocumentNode.prototype.constructor = DocumentNode;

  DocumentNode.createComment = function createComment(text) {
    return new CommentNode(text);
  };

  DocumentNode.createElement = function createElement(tagName) {
    return new ElementNode(tagName);
  };

  DocumentNode.createElementNS = function createElementNS(namespace, tagName) {
    return new ElementNode(namespace + ':' + tagName);
  };

  DocumentNode.createTextNode = function createTextNode(text) {
    return new TextNode(text);
  };

  return DocumentNode;
}(ViewNode);

var isReservedTag = makeMap('template', true);

var _Vue;

function setVue(Vue) {
  _Vue = Vue;
}

var canBeLeftOpenTag = function canBeLeftOpenTag(el) {
  return getViewMeta(el).canBeLeftOpenTag;
};

var isUnaryTag = function isUnaryTag(el) {
  return getViewMeta(el).isUnaryTag;
};

function mustUseProp() {// console.log('mustUseProp')
}

function getTagNamespace(el) {
  return getViewMeta(el).tagNamespace;
}

function isUnknownElement(el) {
  return !isKnownView(el);
}

var VUE_VERSION = global.process.env.VUE_VERSION || '2.6.10';
var NS_VUE_VERSION = global.process.env.NS_VUE_VERSION || '2.4.0';
var infoTrace = once(function () {
  console.log("NativeScript-Vue has \"Vue.config.silent\" set to true, to see output logs set it to false.");
});

function trace(message) {
  if (_Vue && _Vue.config.silent) {
    return infoTrace();
  }

  console.log("{NSVue (Vue: " + VUE_VERSION + " | NSVue: " + NS_VUE_VERSION + ")} -> " + message);
}

var namespaceMap = {};

function createElement$1(tagName, vnode) {
  trace("CreateElement(" + tagName + ")");
  return DocumentNode.createElement(tagName);
}

function createElementNS(namespace, tagName) {
  trace("CreateElementNS(" + namespace + "#" + tagName + ")");
  return DocumentNode.createElementNS(namespace, tagName);
}

function createTextNode(text) {
  trace("CreateTextNode(" + text + ")");
  return DocumentNode.createTextNode(text);
}

function createComment(text) {
  trace("CreateComment(" + text + ")");
  return DocumentNode.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  trace("InsertBefore(" + parentNode + ", " + newNode + ", " + referenceNode + ")");
  return parentNode.insertBefore(newNode, referenceNode);
}

function removeChild$1(node, child) {
  trace("RemoveChild(" + node + ", " + child + ")");
  return node.removeChild(child);
}

function appendChild(node, child) {
  trace("AppendChild(" + node + ", " + child + ")");
  return node.appendChild(child);
}

function parentNode(node) {
  trace("ParentNode(" + node + ") -> " + node.parentNode);
  return node.parentNode;
}

function nextSibling(node) {
  trace("NextSibling(" + node + ") -> " + node.nextSibling);
  return node.nextSibling;
}

function tagName(elementNode) {
  trace("TagName(" + elementNode + ") -> " + elementNode.tagName);
  return elementNode.tagName;
}

function setTextContent(node, text) {
  trace("SetTextContent(" + node + ", " + text + ")");
  node.setText(text);
}

function setAttribute(node, key, val) {
  trace("SetAttribute(" + node + ", " + key + ", " + val + ")");
  node.setAttribute(key, val);
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  namespaceMap: namespaceMap,
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild$1,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute,
  setStyleScope: setStyleScope
});
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
var he = {
  decode: decode
};

function decode(html) {
  // todo?
  return html;
}
/*  */


var isUnaryTag$1 = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var canBeLeftOpenTag$1 = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'); // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content

var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
/**
 * Not type-checking this file because it's mostly vendor code.
 */
// Regular Expressions for parsing tags and attributes

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeRegExp.source + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp("^<" + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
var doctype = /^<!DOCTYPE [^>]+>/i; // #7298: escape - to avoid being pased as HTML comment when inlined in page

var comment = /^<!\--/;
var conditionalComment = /^<!\[/; // Special Elements (can contain anything)

var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};
var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g; // #5992

var isIgnoreNewlineTag = makeMap('pre,textarea', true);

var shouldIgnoreFirstNewline = function shouldIgnoreFirstNewline(tag, html) {
  return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
};

function decodeAttr(value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) {
    return decodingMap[match];
  });
}

function parseHTML(html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag = options.isUnaryTag || no;
  var canBeLeftOpenTag = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;

  while (html) {
    last = html; // Make sure we're not in a plaintext content element like script/style

    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }

            advance(commentEnd + 3);
            continue;
          }
        } // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment


        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        } // Doctype:


        var doctypeMatch = html.match(doctype);

        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        } // End tag:


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        } // Start tag:


        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          handleStartTag(startTagMatch);

          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }

          continue;
        }
      }

      var text = void 0,
          rest = void 0,
          next = void 0;

      if (textEnd >= 0) {
        rest = html.slice(textEnd);

        while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);

          if (next < 0) {
            break;
          }

          textEnd += next;
          rest = html.slice(textEnd);
        }

        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;

        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text.replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
          .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }

        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }

        if (options.chars) {
          options.chars(text);
        }

        return '';
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);

      if ( true && !stack.length && options.warn) {
        options.warn("Mal-formatted tag at end of template: \"" + html + "\"", {
          start: index + html.length
        });
      }

      break;
    }
  } // Clean up any remaining tags


  parseEndTag();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);

    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;

      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }

      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }

      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag(tagName) || !!unarySlash;
    var l = match.attrs.length;
    var attrs = new Array(l);

    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };

      if ( true && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs: attrs,
        start: match.start,
        end: match.end
      });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;

    if (start == null) {
      start = index;
    }

    if (end == null) {
      end = index;
    } // Find the closest opened tag of the same type


    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();

      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ( true && (i > pos || !tagName) && options.warn) {
          options.warn("tag <" + stack[i].tag + "> has no matching end tag.", {
            start: stack[i].start,
            end: stack[i].end
          });
        }

        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }

      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}
/*  */


var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters(exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);

    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) {
        inSingle = false;
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) {
        inDouble = false;
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) {
        inTemplateString = false;
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) {
        inRegex = false;
      }
    } else if (c === 0x7C && // pipe
    exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;
          break;
        // "

        case 0x27:
          inSingle = true;
          break;
        // '

        case 0x60:
          inTemplateString = true;
          break;
        // `

        case 0x28:
          paren++;
          break;
        // (

        case 0x29:
          paren--;
          break;
        // )

        case 0x5B:
          square++;
          break;
        // [

        case 0x5D:
          square--;
          break;
        // ]

        case 0x7B:
          curly++;
          break;
        // {

        case 0x7D:
          curly--;
          break;
        // }
      }

      if (c === 0x2f) {
        // /
        var j = i - 1;
        var p = void 0; // find first non-whitespace prev char

        for (; j >= 0; j--) {
          p = exp.charAt(j);

          if (p !== ' ') {
            break;
          }
        }

        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression;
}

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');

  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args);
  }
}
/*  */


var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

function parseText(text, delimiters) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;

  if (!tagRE.test(text)) {
    return;
  }

  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;

  while (match = tagRE.exec(text)) {
    index = match.index; // push text token

    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    } // tag token


    var exp = parseFilters(match[1].trim());
    tokens.push("_s(" + exp + ")");
    rawTokens.push({
      '@binding': exp
    });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }

  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  };
}
/*  */

/**
 * Cross-platform code generation for component v-model
 */


function genComponentModel(el, value, modifiers) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;
  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;

  if (trim) {
    valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
  }

  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var assignment = genAssignmentCode(value, valueExpression);
  el.model = {
    value: "(" + value + ")",
    expression: JSON.stringify(value),
    callback: "function (" + baseValueExpression + ") {" + assignment + "}"
  };
}
/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


function genAssignmentCode(value, assignment) {
  var res = parseModel(value);

  if (res.key === null) {
    return value + "=" + assignment;
  } else {
    return "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
  }
}
/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */


var len, str, chr, index$1, expressionPos, expressionEndPos;

function parseModel(val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');

    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */

    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}

function next() {
  return str.charCodeAt(++index$1);
}

function eof() {
  return index$1 >= len;
}

function isStringStart(chr) {
  return chr === 0x22 || chr === 0x27;
}

function parseBracket(chr) {
  var inBracket = 1;
  expressionPos = index$1;

  while (!eof()) {
    chr = next();

    if (isStringStart(chr)) {
      parseString(chr);
      continue;
    }

    if (chr === 0x5B) {
      inBracket++;
    }

    if (chr === 0x5D) {
      inBracket--;
    }

    if (inBracket === 0) {
      expressionEndPos = index$1;
      break;
    }
  }
}

function parseString(chr) {
  var stringQuote = chr;

  while (!eof()) {
    chr = next();

    if (chr === stringQuote) {
      break;
    }
  }
}
/*  */

/* eslint-disable no-unused-vars */


function baseWarn(msg, range) {
  console.error("[Vue compiler]: " + msg);
}
/* eslint-enable no-unused-vars */


function pluckModuleFunction(modules, key) {
  return modules ? modules.map(function (m) {
    return m[key];
  }).filter(function (_) {
    return _;
  }) : [];
}

function addProp(el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({
    name: name,
    value: value,
    dynamic: dynamic
  }, range));
  el.plain = false;
}

function addAttr(el, name, value, range, dynamic) {
  var attrs = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
  attrs.push(rangeSetItem({
    name: name,
    value: value,
    dynamic: dynamic
  }, range));
  el.plain = false;
} // add a raw attr (use this in preTransforms)


function addRawAttr(el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({
    name: name,
    value: value
  }, range));
}

function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker(symbol, name, dynamic) {
  return dynamic ? "_p(" + name + ",\"" + symbol + "\")" : symbol + name; // mark the event as captured
}

function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
  modifiers = modifiers || emptyObject; // warn prevent and passive modifier

  /* istanbul ignore if */

  if ( true && warn && modifiers.prevent && modifiers.passive) {
    warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.', range);
  } // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.


  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  } // check capture modifier


  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }

  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */


  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;

  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({
    value: value.trim(),
    dynamic: dynamic
  }, range);

  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */

  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr(el, name) {
  return el.rawAttrsMap[':' + name] || el.rawAttrsMap['v-bind:' + name] || el.rawAttrsMap[name];
}

function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);

  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);

    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
} // note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.


function getAndRemoveAttr(el, name, removeFromMap) {
  var val;

  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;

    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }

  if (removeFromMap) {
    delete el.attrsMap[name];
  }

  return val;
}

function getAndRemoveAttrByRegex(el, name) {
  var list = el.attrsList;

  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];

    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr;
    }
  }
}

function rangeSetItem(item, range) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }

    if (range.end != null) {
      item.end = range.end;
    }
  }

  return item;
}
/*  */


var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;
var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
var slotRE = /^v-slot(:|$)|^#/;
var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;
var invalidAttributeRE = /[\s"'<>\/=]/;
var decodeHTMLCached = cached(he.decode);
var emptySlotScopeToken = "_empty_"; // configurable state

var warn$1;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  };
}
/**
 * Convert HTML string to AST.
 */


function parse(template, options) {
  warn$1 = options.warn || baseWarn;
  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;

  maybeComponent = function maybeComponent(el) {
    return !!el.component || !isReservedTag(el.tag);
  };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;
  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce(msg, range) {
    if (!warned) {
      warned = true;
      warn$1(msg, range);
    }
  }

  function closeElement(element) {
    trimEndingWhitespace(element);

    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    } // tree management


    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (true) {
          checkRootConstraints(element);
        }

        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if (true) {
        warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.", {
          start: element.start
        });
      }
    }

    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"';
          (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }

        currentParent.children.push(element);
        element.parent = currentParent;
      }
    } // final children cleanup
    // filter out scoped slots


    element.children = element.children.filter(function (c) {
      return !c.slotScope;
    }); // remove trailing whitespace node again

    trimEndingWhitespace(element); // check pre state

    if (element.pre) {
      inVPre = false;
    }

    if (platformIsPreTag(element.tag)) {
      inPre = false;
    } // apply post-transforms


    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace(el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;

      while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === ' ') {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints(el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.', {
        start: el.start
      });
    }

    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.', el.rawAttrsMap['v-for']);
    }
  }

  parseHTML(template, {
    warn: warn$1,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start(tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag); // handle IE svg bug

      /* istanbul ignore if */

      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);

      if (ns) {
        element.ns = ns;
      }

      if (true) {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated;
          }, {});
        }

        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$1("Invalid dynamic argument expression: attribute names cannot contain " + "spaces, quotes, <, >, / or =.", {
              start: attr.start + attr.name.indexOf("["),
              end: attr.start + attr.name.length
            });
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
         true && warn$1('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.', {
          start: element.start
        });
      } // apply pre-transforms


      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);

        if (element.pre) {
          inVPre = true;
        }
      }

      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }

      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;

        if (true) {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },
    end: function end(tag, start, end$1) {
      var element = stack[stack.length - 1]; // pop stack

      stack.length -= 1;
      currentParent = stack[stack.length - 1];

      if ( true && options.outputSourceRange) {
        element.end = end$1;
      }

      closeElement(element);
    },
    chars: function chars(text, start, end) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce('Component template requires a root element, rather than just text.', {
              start: start
            });
          } else if (text = text.trim()) {
            warnOnce("text \"" + text + "\" outside root element will be ignored.", {
              start: start
            });
          }
        }

        return;
      } // IE textarea placeholder bug

      /* istanbul ignore if */


      if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
        return;
      }

      var children = currentParent.children;

      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }

      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }

        var res;
        var child;

        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }

        if (child) {
          if ( true && options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }

          children.push(child);
        }
      }
    },
    comment: function comment(text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };

        if ( true && options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }

        currentParent.children.push(child);
      }
    }
  });
  return root;
}

function processPre(el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs(el) {
  var list = el.attrsList;
  var len = list.length;

  if (len) {
    var attrs = el.attrs = new Array(len);

    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };

      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement(element, options) {
  processKey(element); // determine whether this is a plain element after
  // removing structural attributes

  element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;
  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);

  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }

  processAttrs(element);
  return element;
}

function processKey(el) {
  var exp = getBindingAttr(el, 'key');

  if (exp) {
    if (true) {
      if (el.tag === 'template') {
        warn$1("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, 'key'));
      }

      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;

        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$1("Do not use v-for index as key on <transition-group> children, " + "this is the same as not using keys.", getRawBindingAttr(el, 'key'), true
          /* tip */
          );
        }
      }
    }

    el.key = exp;
  }
}

function processRef(el) {
  var ref = getBindingAttr(el, 'ref');

  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor(el) {
  var exp;

  if (exp = getAndRemoveAttr(el, 'v-for')) {
    var res = parseFor(exp);

    if (res) {
      extend(el, res);
    } else if (true) {
      warn$1("Invalid v-for expression: " + exp, el.rawAttrsMap['v-for']);
    }
  }
}

function parseFor(exp) {
  var inMatch = exp.match(forAliasRE);

  if (!inMatch) {
    return;
  }

  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);

  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();

    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }

  return res;
}

function processIf(el) {
  var exp = getAndRemoveAttr(el, 'v-if');

  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }

    var elseif = getAndRemoveAttr(el, 'v-else-if');

    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);

  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$1("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.", el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
  }
}

function findPrevElement(children) {
  var i = children.length;

  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      if ( true && children[i].text !== ' ') {
        warn$1("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.", children[i]);
      }

      children.pop();
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }

  el.ifConditions.push(condition);
}

function processOnce(el) {
  var once = getAndRemoveAttr(el, 'v-once');

  if (once != null) {
    el.once = true;
  }
} // handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">


function processSlotContent(el) {
  var slotScope;

  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */

    if ( true && slotScope) {
      warn$1("the \"scope\" attribute for scoped slots have been deprecated and " + "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " + "can also be used on plain elements in addition to <template> to " + "denote scoped slots.", el.rawAttrsMap['scope'], true);
    }

    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if (slotScope = getAndRemoveAttr(el, 'slot-scope')) {
    /* istanbul ignore if */
    if ( true && el.attrsMap['v-for']) {
      warn$1("Ambiguous combined usage of slot-scope and v-for on <" + el.tag + "> " + "(v-for takes higher priority). Use a wrapper <template> for the " + "scoped slot to make it clearer.", el.rawAttrsMap['slot-scope'], true);
    }

    el.slotScope = slotScope;
  } // slot="xxx"


  var slotTarget = getBindingAttr(el, 'slot');

  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']); // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.

    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  } // 2.6 v-slot syntax


  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);

      if (slotBinding) {
        if (true) {
          if (el.slotTarget || el.slotScope) {
            warn$1("Unexpected mixed usage of different slot syntaxes.", el);
          }

          if (el.parent && !maybeComponent(el.parent)) {
            warn$1("<template v-slot> can only appear at the root level inside " + "the receiving the component", el);
          }
        }

        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);

      if (slotBinding$1) {
        if (true) {
          if (!maybeComponent(el)) {
            warn$1("v-slot can only be used on components or <template>.", slotBinding$1);
          }

          if (el.slotScope || el.slotTarget) {
            warn$1("Unexpected mixed usage of different slot syntaxes.", el);
          }

          if (el.scopedSlots) {
            warn$1("To avoid scope ambiguity, the default slot should also use " + "<template> syntax when there are other named slots.", slotBinding$1);
          }
        } // add the component's children to its default slot


        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true;
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken; // remove children as they are returned from scopedSlots now

        el.children = []; // mark el non-plain so data gets generated

        el.plain = false;
      }
    }
  }
}

function getSlotName(binding) {
  var name = binding.name.replace(slotRE, '');

  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if (true) {
      warn$1("v-slot shorthand syntax requires a slot name.", binding);
    }
  }

  return dynamicArgRE.test(name) // dynamic [name]
  ? {
    name: name.slice(1, -1),
    dynamic: true
  } // static name
  : {
    name: "\"" + name + "\"",
    dynamic: false
  };
} // handle <slot/> outlets


function processSlotOutlet(el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');

    if ( true && el.key) {
      warn$1("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.", getRawBindingAttr(el, 'key'));
    }
  }
}

function processComponent(el) {
  var binding;

  if (binding = getBindingAttr(el, 'is')) {
    el.component = binding;
  }

  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs(el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;

  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;

    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true; // modifiers

      modifiers = parseModifiers(name.replace(dirRE, '')); // support .foo shorthand syntax for the .prop modifier

      if (modifiers) {
        name = name.replace(modifierRE, '');
      }

      if (bindRE.test(name)) {
        // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);

        if (isDynamic) {
          name = name.slice(1, -1);
        }

        if ( true && value.trim().length === 0) {
          warn$1("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"");
        }

        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);

            if (name === 'innerHtml') {
              name = 'innerHTML';
            }
          }

          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }

          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");

            if (!isDynamic) {
              addHandler(el, "update:" + camelize(name), syncGen, null, false, warn$1, list[i]);

              if (hyphenate(name) !== camelize(name)) {
                addHandler(el, "update:" + hyphenate(name), syncGen, null, false, warn$1, list[i]);
              }
            } else {
              // handler w/ dynamic event name
              addHandler(el, "\"update:\"+(" + name + ")", syncGen, null, false, warn$1, list[i], true // dynamic
              );
            }
          }
        }

        if (modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);

        if (isDynamic) {
          name = name.slice(1, -1);
        }

        addHandler(el, name, value, modifiers, false, warn$1, list[i], isDynamic);
      } else {
        // normal directives
        name = name.replace(dirRE, ''); // parse arg

        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;

        if (arg) {
          name = name.slice(0, -(arg.length + 1));

          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }

        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);

        if ( true && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);

        if (res) {
          warn$1(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
        }
      }

      addAttr(el, name, JSON.stringify(value), list[i]); // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation

      if (!el.component && name === 'muted' && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor(el) {
  var parent = el;

  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }

    parent = parent.parent;
  }

  return false;
}

function parseModifiers(name) {
  var match = name.match(modifierRE);

  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

function makeAttrsMap(attrs) {
  var map = {};

  for (var i = 0, l = attrs.length; i < l; i++) {
    if ( true && map[attrs[i].name] && !isIE && !isEdge) {
      warn$1('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }

    map[attrs[i].name] = attrs[i].value;
  }

  return map;
} // for script (e.g. type="x/template") or style, do not decode content


function isTextTag(el) {
  return el.tag === 'script' || el.tag === 'style';
}

function isForbiddenTag(el) {
  return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;
/* istanbul ignore next */

function guardIESVGBug(attrs) {
  var res = [];

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];

    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }

  return res;
}

function checkForAliasModel(el, value) {
  var _el = el;

  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap['v-model']);
    }

    _el = _el.parent;
  }
}
/*  */


var isStaticKey;
var isPlatformReservedTag;
var genStaticKeysCached = cached(genStaticKeys$1);
/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */

function optimize(root, options) {
  if (!root) {
    return;
  }

  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no; // first pass: mark all non-static nodes.

  markStatic$1(root); // second pass: mark static roots.

  markStaticRoots(root, false);
}

function genStaticKeys$1(keys) {
  return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' + (keys ? ',' + keys : ''));
}

function markStatic$1(node) {
  node.static = isStatic(node);

  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
      return;
    }

    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);

      if (!child.static) {
        node.static = false;
      }
    }

    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);

        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    } // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.


    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }

    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }

    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic(node) {
  if (node.type === 2) {
    // expression
    return false;
  }

  if (node.type === 3) {
    // text
    return true;
  }

  return !!(node.pre || !node.hasBindings && // no dynamic bindings
  !node.if && !node.for && // not v-if or v-for or v-else
  !isBuiltInTag(node.tag) && // not a built-in
  isPlatformReservedTag(node.tag) && // not a component
  !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}

function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;

    if (node.tag !== 'template') {
      return false;
    }

    if (node.for) {
      return true;
    }
  }

  return false;
}
/*  */


var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/; // KeyboardEvent.keyCode aliases

var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
}; // KeyboardEvent.key aliases

var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
}; // #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once

var genGuard = function genGuard(condition) {
  return "if(" + condition + ")return null;";
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers(events, isNative) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";

  for (var name in events) {
    var handlerCode = genHandler(events[name]);

    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }

  staticHandlers = "{" + staticHandlers.slice(0, -1) + "}";

  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + dynamicHandlers.slice(0, -1) + "])";
  } else {
    return prefix + staticHandlers;
  }
}

function genHandler(handler) {
  if (!handler) {
    return 'function(){}';
  }

  if (Array.isArray(handler)) {
    return "[" + handler.map(function (handler) {
      return genHandler(handler);
    }).join(',') + "]";
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value;
    }

    return "function($event){" + (isFunctionInvocation ? "return " + handler.value : handler.value) + "}"; // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];

    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key]; // left/right

        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = handler.modifiers;
        genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta'].filter(function (keyModifier) {
          return !modifiers[keyModifier];
        }).map(function (keyModifier) {
          return "$event." + keyModifier + "Key";
        }).join('||'));
      } else {
        keys.push(key);
      }
    }

    if (keys.length) {
      code += genKeyFilter(keys);
    } // Make sure modifiers like prevent and stop get executed after key filtering


    if (genModifierCode) {
      code += genModifierCode;
    }

    var handlerCode = isMethodPath ? "return " + handler.value + "($event)" : isFunctionExpression ? "return (" + handler.value + ")($event)" : isFunctionInvocation ? "return " + handler.value : handler.value;
    return "function($event){" + code + handlerCode + "}";
  }
}

function genKeyFilter(keys) {
  return (// make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" + keys.map(genFilterCode).join('&&') + ")return null;"
  );
}

function genFilterCode(key) {
  var keyVal = parseInt(key, 10);

  if (keyVal) {
    return "$event.keyCode!==" + keyVal;
  }

  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return "_k($event.keyCode," + JSON.stringify(key) + "," + JSON.stringify(keyCode) + "," + "$event.key," + "" + JSON.stringify(keyName) + ")";
}
/*  */


function on(el, dir) {
  if ( true && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }

  el.wrapListeners = function (code) {
    return "_g(" + code + "," + dir.value + ")";
  };
}
/*  */


function bind$1(el, dir) {
  el.wrapData = function (code) {
    return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
  };
}
/*  */


var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};
/*  */

var CodegenState = function CodegenState(options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;

  this.maybeComponent = function (el) {
    return !!el.component || !isReservedTag(el.tag);
  };

  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};

function generate(ast, options) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: "with(this){return " + code + "}",
    staticRenderFns: state.staticRenderFns
  };
}

function genElement(el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0';
  } else if (el.tag === 'slot') {
    return genSlot(el, state);
  } else {
    // component or element
    var code;

    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;

      if (!el.plain || el.pre && state.maybeComponent(el)) {
        data = genData(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
    } // module transforms


    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }

    return code;
  }
} // hoist static sub-trees out


function genStatic(el, state) {
  el.staticProcessed = true; // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.

  var originalPreState = state.pre;

  if (el.pre) {
    state.pre = el.pre;
  }

  state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
  state.pre = originalPreState;
  return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
} // v-once


function genOnce(el, state) {
  el.onceProcessed = true;

  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;

    while (parent) {
      if (parent.for) {
        key = parent.key;
        break;
      }

      parent = parent.parent;
    }

    if (!key) {
       true && state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap['v-once']);
      return genElement(el, state);
    }

    return "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")";
  } else {
    return genStatic(el, state);
  }
}

function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true; // avoid recursion

  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}

function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || '_e()';
  }

  var condition = conditions.shift();

  if (condition.exp) {
    return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
  } else {
    return "" + genTernaryExp(condition.block);
  } // v-if with v-once should generate code like (a)?_m(0):_m(1)


  function genTernaryExp(el) {
    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
  }
}

function genFor(el, state, altGen, altHelper) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
  var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

  if ( true && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
    state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", el.rawAttrsMap['v-for'], true
    /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion

  return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
}

function genData(el, state) {
  var data = '{'; // directives first.
  // directives may mutate the el's other properties before they are generated.

  var dirs = genDirectives(el, state);

  if (dirs) {
    data += dirs + ',';
  } // key


  if (el.key) {
    data += "key:" + el.key + ",";
  } // ref


  if (el.ref) {
    data += "ref:" + el.ref + ",";
  }

  if (el.refInFor) {
    data += "refInFor:true,";
  } // pre


  if (el.pre) {
    data += "pre:true,";
  } // record original tag name for components using "is" attribute


  if (el.component) {
    data += "tag:\"" + el.tag + "\",";
  } // module data generation functions


  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  } // attributes


  if (el.attrs) {
    data += "attrs:" + genProps(el.attrs) + ",";
  } // DOM props


  if (el.props) {
    data += "domProps:" + genProps(el.props) + ",";
  } // event handlers


  if (el.events) {
    data += genHandlers(el.events, false) + ",";
  }

  if (el.nativeEvents) {
    data += genHandlers(el.nativeEvents, true) + ",";
  } // slot target
  // only for non-scoped slots


  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + el.slotTarget + ",";
  } // scoped slots


  if (el.scopedSlots) {
    data += genScopedSlots(el, el.scopedSlots, state) + ",";
  } // component v-model


  if (el.model) {
    data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
  } // inline-template


  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);

    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }

  data = data.replace(/,$/, '') + '}'; // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.

  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + el.tag + "\"," + genProps(el.dynamicAttrs) + ")";
  } // v-bind data wrap


  if (el.wrapData) {
    data = el.wrapData(data);
  } // v-on data wrap


  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }

  return data;
}

function genDirectives(el, state) {
  var dirs = el.directives;

  if (!dirs) {
    return;
  }

  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;

  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];

    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }

    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:" + (dir.isDynamicArg ? dir.arg : "\"" + dir.arg + "\"") : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
    }
  }

  if (hasRuntime) {
    return res.slice(0, -1) + ']';
  }
}

function genInlineTemplate(el, state) {
  var ast = el.children[0];

  if ( true && (el.children.length !== 1 || ast.type !== 1)) {
    state.warn('Inline-template components must have exactly one child element.', {
      start: el.start
    });
  }

  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
      return "function(){" + code + "}";
    }).join(',') + "]}";
  }
}

function genScopedSlots(el, slots, state) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    ;
  }); // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.

  var needsKey = !!el.if; // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.

  if (!needsForceUpdate) {
    var parent = el.parent;

    while (parent) {
      if (parent.slotScope && parent.slotScope !== emptySlotScopeToken || parent.for) {
        needsForceUpdate = true;
        break;
      }

      if (parent.if) {
        needsKey = true;
      }

      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots).map(function (key) {
    return genScopedSlot(slots[key], state);
  }).join(',');
  return "scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? ",null,false," + hash(generatedSlots) : "") + ")";
}

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

function containsSlotChild(el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true;
    }

    return el.children.some(containsSlotChild);
  }

  return false;
}

function genScopedSlot(el, state) {
  var isLegacySyntax = el.attrsMap['slot-scope'];

  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null");
  }

  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot);
  }

  var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
  var fn = "function(" + slotScope + "){" + "return " + (el.tag === 'template' ? el.if && isLegacySyntax ? "(" + el.if + ")?" + (genChildren(el, state) || 'undefined') + ":undefined" : genChildren(el, state) || 'undefined' : genElement(el, state)) + "}"; // reverse proxy v-slot without scope on this.$slots

  var reverseProxy = slotScope ? "" : ",proxy:true";
  return "{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}";
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  var children = el.children;

  if (children.length) {
    var el$1 = children[0]; // optimize single v-for

    if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
      var normalizationType = checkSkip ? state.maybeComponent(el$1) ? ",1" : ",0" : "";
      return "" + (altGenElement || genElement)(el$1, state) + normalizationType;
    }

    var normalizationType$1 = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
    var gen = altGenNode || genNode;
    return "[" + children.map(function (c) {
      return gen(c, state);
    }).join(',') + "]" + (normalizationType$1 ? "," + normalizationType$1 : '');
  }
} // determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed


function getNormalizationType(children, maybeComponent) {
  var res = 0;

  for (var i = 0; i < children.length; i++) {
    var el = children[i];

    if (el.type !== 1) {
      continue;
    }

    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return needsNormalization(c.block);
    })) {
      res = 2;
      break;
    }

    if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return maybeComponent(c.block);
    })) {
      res = 1;
    }
  }

  return res;
}

function needsNormalization(el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}

function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state);
  } else if (node.type === 3 && node.isComment) {
    return genComment(node);
  } else {
    return genText(node);
  }
}

function genText(text) {
  return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
  : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
}

function genComment(comment) {
  return "_e(" + JSON.stringify(comment.text) + ")";
}

function genSlot(el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? "," + children : '');
  var attrs = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) {
    return {
      // slot props are camelized
      name: camelize(attr.name),
      value: attr.value,
      dynamic: attr.dynamic
    };
  })) : null;
  var bind = el.attrsMap['v-bind'];

  if ((attrs || bind) && !children) {
    res += ",null";
  }

  if (attrs) {
    res += "," + attrs;
  }

  if (bind) {
    res += (attrs ? '' : ',null') + "," + bind;
  }

  return res + ')';
} // componentName is el.component, take it as argument to shun flow's pessimistic refinement


function genComponent(componentName, el, state) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return "_c(" + componentName + "," + genData(el, state) + (children ? "," + children : '') + ")";
}

function genProps(props) {
  var staticProps = "";
  var dynamicProps = "";

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);

    if (prop.dynamic) {
      dynamicProps += prop.name + "," + value + ",";
    } else {
      staticProps += "\"" + prop.name + "\":" + value + ",";
    }
  }

  staticProps = "{" + staticProps.slice(0, -1) + "}";

  if (dynamicProps) {
    return "_d(" + staticProps + ",[" + dynamicProps.slice(0, -1) + "])";
  } else {
    return staticProps;
  }
} // #3895, #4268


function transformSpecialNewlines(text) {
  return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
/*  */
// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed


var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b'); // these unary operators should not be used as property/method names

var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)'); // strip strings in expressions

var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g; // detect problematic expressions in a template

function detectErrors(ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode(node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];

        if (value) {
          var range = node.rawAttrsMap[name];

          if (name === 'v-for') {
            checkFor(node, "v-for=\"" + value + "\"", warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, name + "=\"" + value + "\"", warn, range);
          } else {
            checkExpression(value, name + "=\"" + value + "\"", warn, range);
          }
        }
      }
    }

    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent(exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);

  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim(), range);
  }

  checkExpression(exp, text, warn, range);
}

function checkFor(node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier(ident, type, text, warn, range) {
  if (typeof ident === 'string') {
    try {
      new Function("var " + ident + "=_");
    } catch (e) {
      warn("invalid " + type + " \"" + ident + "\" in expression: " + text.trim(), range);
    }
  }
}

function checkExpression(exp, text, warn, range) {
  try {
    new Function("return " + exp);
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);

    if (keywordMatch) {
      warn("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\"\n  Raw expression: " + text.trim(), range);
    } else {
      warn("invalid expression: " + e.message + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + text.trim() + "\n", range);
    }
  }
}
/*  */


var range = 2;

function generateCodeFrame(source, start, end) {
  if (start === void 0) start = 0;
  if (end === void 0) end = source.length;
  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];

  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;

    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue;
        }

        res.push("" + (j + 1) + repeat$1(" ", 3 - String(j + 1).length) + "|  " + lines[j]);
        var lineLength = lines[j].length;

        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }

          count += lineLength + 1;
        }
      }

      break;
    }
  }

  return res.join('\n');
}

function repeat$1(str, n) {
  var result = '';

  if (n > 0) {
    while (true) {
      // eslint-disable-line
      if (n & 1) {
        result += str;
      }

      n >>>= 1;

      if (n <= 0) {
        break;
      }

      str += str;
    }
  }

  return result;
}
/*  */


function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({
      err: err,
      code: code
    });
    return noop;
  }
}

function createCompileToFunctionFn(compile) {
  var cache = Object.create(null);
  return function compileToFunctions(template, options, vm) {
    options = extend({}, options);
    var warn$1 = options.warn || warn;
    delete options.warn;
    /* istanbul ignore if */

    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$1('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
        }
      }
    } // check cache


    var key = options.delimiters ? String(options.delimiters) + template : template;

    if (cache[key]) {
      return cache[key];
    } // compile


    var compiled = compile(template, options); // check compilation errors/tips

    if (true) {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$1("Error compiling template:\n\n" + e.msg + "\n\n" + generateCodeFrame(template, e.start, e.end), vm);
          });
        } else {
          warn$1("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
            return "- " + e;
          }).join('\n') + '\n', vm);
        }
      }

      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) {
            return tip(e.msg, vm);
          });
        } else {
          compiled.tips.forEach(function (msg) {
            return tip(msg, vm);
          });
        }
      }
    } // turn code into functions


    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors);
    }); // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use

    /* istanbul ignore if */

    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$1("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
          var err = ref.err;
          var code = ref.code;
          return err.toString() + " in\n\n" + code + "\n";
        }).join('\n'), vm);
      }
    }

    return cache[key] = res;
  };
}
/*  */


function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function warn(msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if ( true && options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function warn(msg, range, tip) {
            var data = {
              msg: msg
            };

            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }

              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }

            (tip ? tips : errors).push(data);
          };
        } // merge custom modules


        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
        } // merge custom directives


        if (options.directives) {
          finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
        } // copy other options


        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;
      var compiled = baseCompile(template.trim(), finalOptions);

      if (true) {
        detectErrors(compiled.ast, warn);
      }

      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    };
  };
}
/*  */
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.


var createCompiler = createCompilerCreator(function baseCompile(template, options) {
  var ast = parse(template.trim(), options);

  if (options.optimize !== false) {
    optimize(ast, options);
  }

  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
});

function transformNode(el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');

  if ( true && staticClass) {
    var expression = parseText(staticClass, options.delimiters);

    if (expression) {
      warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
    }
  }

  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }

  var classBinding = getBindingAttr(el, 'class', false
  /* getStatic */
  );

  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1(el) {
  var data = '';

  if (el.staticClass) {
    data += "staticClass:" + el.staticClass + ",";
  }

  if (el.classBinding) {
    data += "class:" + el.classBinding + ",";
  }

  return data;
}

var class_$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};
var normalize$1 = cached(camelize);

function transformNode$1(el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  var ref = parseStaticStyle(staticStyle, options);
  var dynamic = ref.dynamic;
  var styleResult = ref.styleResult;

  if ( true && dynamic) {
    warn("style=\"" + String(staticStyle) + "\": " + 'Interpolation inside attributes has been deprecated. ' + 'Use v-bind or the colon shorthand instead.');
  }

  if (!dynamic && styleResult) {
    el.staticStyle = styleResult;
  }

  var styleBinding = getBindingAttr(el, 'style', false
  /* getStatic */
  );

  if (styleBinding) {
    el.styleBinding = styleBinding;
  } else if (dynamic) {
    el.styleBinding = styleResult;
  }
}

function genData$2(el) {
  var data = '';

  if (el.staticStyle) {
    data += "staticStyle:" + el.staticStyle + ",";
  }

  if (el.styleBinding) {
    data += "style:" + el.styleBinding + ",";
  }

  return data;
}

function parseStaticStyle(staticStyle, options) {
  // "width: 200px; height: 200px;" -> {width: 200, height: 200}
  // "width: 200px; height: {{y}}" -> {width: 200, height: y}
  var dynamic = false;
  var styleResult = '';

  if (staticStyle) {
    var styleList = staticStyle.trim().split(';').map(function (style) {
      var result = style.trim().split(':');

      if (result.length !== 2) {
        return;
      }

      var key = normalize$1(result[0].trim());
      var value = result[1].trim();
      var dynamicValue = parseText(value, options.delimiters);

      if (dynamicValue) {
        dynamic = true;
        return key + ':' + dynamicValue;
      }

      return key + ':' + JSON.stringify(value);
    }).filter(function (result) {
      return result;
    });

    if (styleList.length) {
      styleResult = '{' + styleList.join(',') + '}';
    }
  }

  return {
    dynamic: dynamic,
    styleResult: styleResult
  };
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

function preTransformNode(el) {
  var vfor;

  if (normalizeElementName(el.tag) === 'nativelistview') {
    vfor = getAndRemoveAttr(el, 'v-for');
    delete el.attrsMap['v-for'];

    if ( true && vfor) {
      warn("The v-for directive is not supported on a " + el.tag + ", " + 'Use the "for" attribute instead. For example, instead of ' + "<" + el.tag + " v-for=\"" + vfor + "\"> use <" + el.tag + " for=\"" + vfor + "\">.");
    }
  }

  var exp = getAndRemoveAttr(el, 'for') || vfor;

  if (!exp) {
    return;
  }

  var res = parseFor(exp);

  if (!res) {
    if (true) {
      warn("Invalid for expression: " + exp);
    }

    return;
  }

  addRawAttr(el, ':items', res.for);
  addRawAttr(el, '+alias', res.alias);

  if (res.iterator1) {
    addRawAttr(el, '+index', res.iterator1);
  }
}

var for_ = {
  preTransformNode: preTransformNode
};

function preTransformNode$1(el) {
  if (el.tag !== 'router-view') {
    return;
  }

  if (normalizeElementName(el.parent.tag) === 'nativeframe') {
    addAttr(el.parent, 'hasRouterView', 'true');
  }
}

var router = {
  preTransformNode: preTransformNode$1
};

function preTransformNode$2(el) {
  if (el.parent && el.parent.tag === 'v-template') {
    var alias = el.parent.parent.attrsMap['+alias'] || 'item';
    var index = el.parent.parent.attrsMap['+index'] || '$index';
    el.slotScope = buildScopeString(alias, index);
  }
}

var vTemplate$1 = {
  preTransformNode: preTransformNode$2
};

function buildScopeString(alias, index) {
  return "{ " + alias + ", " + index + ", $even, $odd }";
} // transforms ~test -> v-view:test


function transformNode$2(el) {
  var attr = Object.keys(el.attrsMap).find(function (attr) {
    return attr.startsWith('~');
  });

  if (attr) {
    var attrName = attr.substr(1);
    var ref = attrName.split('.');
    var arg = ref[0];
    var modifiers = ref.slice(1);
    modifiers = modifiers.reduce(function (mods, mod) {
      mods[mod] = true;
      return mods;
    }, {});
    getAndRemoveAttr(el, attr, true);
    addDirective(el, 'view', "v-view:" + attrName, '', arg, false, modifiers);
  }
}

var view = {
  transformNode: transformNode$2
};
var modules$1 = [class_$1, style$1, vTemplate$1, for_, router, view];

function model(el, dir) {
  if (el.type === 1 && isKnownView(el.tag)) {
    genDefaultModel(el, dir.value, dir.modifiers);
  } else {
    genComponentModel(el, dir.value, dir.modifiers);
  }
}

function genDefaultModel(el, value, modifiers) {
  var ref = modifiers || {};
  var trim = ref.trim;
  var number = ref.number;
  var ref$1 = getViewMeta(el.tag).model;
  var prop = ref$1.prop;
  var event = ref$1.event;
  var valueExpression = "$event.value" + (trim ? '.trim()' : '');

  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  addAttr(el, prop, "(" + value + ")");
  addHandler(el, event, code, null, true);
}

var directives$1 = {
  model: model
};
var baseOptions = {
  modules: modules$1,
  directives: directives$1,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  preserveWhitespace: false,
  staticKeys: genStaticKeys(modules$1)
};
var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

function Vue(options) {
  if ( true && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp$1(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached = cache[key];

  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if (true) {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10'; // recursively search for possible transition defined inside the component root

function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalVisibility = el.__vOriginalVisibility = el.getAttribute('visibility') === 'none' ? '' : el.getAttribute('visibility');

    if (value && transition) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.setAttribute('visibility', originalVisibility);
      });
    } else {
      el.setAttribute('visibility', value ? originalVisibility : 'collapsed');
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;

    if (transition) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.setAttribute('visibility', el.__vOriginalVisibility);
        });
      } else {
        leave(vnode, function () {
          el.setAttribute('visibility', 'collapsed');
        });
      }
    } else {
      el.setAttribute('visibility', value ? el.__vOriginalVisibility : 'collapsed');
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.setAttribute('visibility', el.__vOriginalVisibility);
    }
  }
};
var view$1 = {
  inserted: function inserted(el, ref) {
    var arg = ref.arg;
    var modifiers = ref.modifiers;
    var parent = el.parentNode.nativeView;

    if (parent) {
      if (modifiers.array) {
        parent[arg] = (parent[arg] || []).push(el.nativeView);
      } else {
        parent[arg] = el.nativeView;
      }
    }
  }
};
var platformDirectives = {
  show: show,
  view: view$1
}; // Ensure `application` and `frame` modules are loaded

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isUnknownElement = isUnknownElement;
Vue.$document = Vue.prototype.$document = new DocumentNode();
Vue.compile = compileToFunctions;
Vue.registerElement = registerElement;
Object.assign(Vue.options.directives, platformDirectives);
Vue.prototype.__patch__ = patch;

Vue.prototype.$mount = function (el, hydrating) {
  var options = this.$options; // resolve template/el and convert to render function

  if (!options.render) {
    var template = options.template;

    if (template && typeof template !== 'string') {
      warn('invalid template option: ' + template, this);
      return this;
    }

    if (template) {
      var ref = compileToFunctions(template, {
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }

  return mountComponent(this, el, hydrating);
};

Vue.prototype.$start = function () {
  var self = this;
  var AppConstructor = Vue.extend(this.$options); // register NS components into Vue

  Object.values(getElementMap()).forEach(function (entry) {
    Vue.component(entry.meta.component.name, entry.meta.component);
  });
  application.on(application.launchEvent, function (args) {
    if (self.$el) {
      self.$destroy();
      self = new AppConstructor();
    }

    self.$mount();
    args.root = self.$el.nativeView;
  });
  application.run();
}; // Define a `nativeView` getter in every NS vue instance


Object.defineProperty(Vue.prototype, 'nativeView', {
  get: function get() {
    return this.$el.nativeView;
  }
});

function _findParentModalEntry(vm) {
  if (!vm) {
    return false;
  }

  var entry = vm.$parent;

  while (entry && entry.$options.name !== 'ModalEntry') {
    entry = entry.$parent;
  }

  return entry;
}

var ModalPlugin = {
  install: function install(Vue) {
    Vue.mixin({
      created: function created() {
        var self = this;
        this.$modal = {
          close: function close(data) {
            var entry = _findParentModalEntry(self);

            if (entry) {
              entry.closeCb(data);
            }
          }
        };
      }
    });

    Vue.prototype.$showModal = function (component, options) {
      var this$1 = this;
      return new Promise(function (resolve) {
        var resolved = false;

        var closeCb = function closeCb(data) {
          if (resolved) {
            return;
          }

          resolved = true;
          resolve(data);
          modalPage.closeModal(); // emitted to show up in devtools
          // for debugging purposes

          navEntryInstance.$emit('modal:close', data);
          navEntryInstance.$destroy();
        }; // build options object with defaults


        options = Object.assign({}, options, {
          context: null,
          closeCallback: closeCb
        });
        var navEntryInstance = new Vue({
          name: 'ModalEntry',
          parent: this$1.$root,
          methods: {
            closeCb: closeCb
          },
          render: function render(h) {
            return h(component, {
              props: options.props
            });
          }
        });
        var modalPage = navEntryInstance.$mount().$el.nativeView;
        this$1.$el.nativeView.showModal(modalPage, options);
      });
    };
  }
};

function getFrameInstance(frame) {
  // get the frame that we need to navigate
  // this can be a frame id (String)
  // a Vue ref to a frame
  // a Frame ViewNode
  // or a Frame instance
  if (isObject$1(frame) && isDef(frame.$el)) {
    frame = frame.$el.nativeView;
  } else if (isPrimitive(frame)) {
    frame = __webpack_require__("tns-core-modules/ui/frame").getFrameById(frame);
  } else if (isDef(frame.nativeView)) {
    frame = frame.nativeView;
  } // finally get the component instance for this frame


  return getFrame(frame.id);
}

function findParentNavigationEntry(vm) {
  if (!vm) {
    return false;
  }

  var entry = vm.$parent;

  while (entry && entry.$options.name !== 'NavigationEntry') {
    entry = entry.$parent;
  }

  return entry;
}

var NavigatorPlugin = {
  install: function install(Vue) {
    Vue.prototype.$navigateBack = function (options, backstackEntry) {
      if (backstackEntry === void 0) backstackEntry = null;
      var navEntry = findParentNavigationEntry(this);
      var defaultOptions = {
        frame: navEntry ? navEntry.$options.frame : 'default'
      };
      options = Object.assign({}, defaultOptions, options);
      var frame = getFrameInstance(options.frame);
      frame.back(backstackEntry);
    };

    Vue.prototype.$navigateTo = function (component, options) {
      var this$1 = this;
      var defaultOptions = {
        frame: 'default'
      }; // build options object with defaults

      options = Object.assign({}, defaultOptions, options);
      return new Promise(function (resolve) {
        var frame = getFrameInstance(options.frame);
        var navEntryInstance = new Vue({
          name: 'NavigationEntry',
          parent: this$1.$root,
          frame: frame,
          props: {
            frame: {
              default: frame.id
            }
          },
          render: function render(h) {
            return h(component, {
              props: options.props
            });
          }
        });
        var page = navEntryInstance.$mount().$el.nativeView;

        var handler = function handler(args) {
          if (args.isBackNavigation) {
            page.off('navigatedFrom', handler);
            navEntryInstance.$destroy();
          }
        };

        page.on('navigatedFrom', handler); // ensure that the navEntryInstance vue instance is destroyed when the
        // page is disposed (clearHistory: true for example)

        var dispose = page.disposeNativeView;

        page.disposeNativeView = function () {
          var args = [],
              len = arguments.length;

          while (len--) {
            args[len] = arguments[len];
          }

          navEntryInstance.$destroy();
          dispose.call(page, args);
        };

        frame.navigate(Object.assign({}, options, {
          create: function create() {
            return page;
          }
        }));
        resolve(page);
      });
    };
  }
};
Vue.config.silent = true;
setVue(Vue);
Vue.use(ModalPlugin);
Vue.use(NavigatorPlugin);
var newLineRegExp = /\\n/g;

console.log = function (log, inspect, Vue) {
  return function () {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    return log.call.apply(log, [this].concat(Array.prototype.map.call(args, function (arg) {
      return inspect(arg, {
        depth: 2,
        colors: Vue.config.debug,
        showHidden: true
      }).replace(newLineRegExp, '\n');
    })));
  };
}(console.log, utilInspect, Vue);

global.__onLiveSyncCore = function () {
  var frame = __webpack_require__("tns-core-modules/ui/frame").topmost();

  if (frame) {
    if (frame.currentPage && frame.currentPage.modal) {
      frame.currentPage.modal.closeModal();
    }

    if (frame.currentPage) {
      frame.currentPage.addCssFile(__webpack_require__("tns-core-modules/application").getCssFileName());
    }
  }
}; // Fix a rollup problem which does not define
// module.export.default = Vue
// so a `import Vue from 'nativescript-vue'` will
// fail from a Typescript file


Vue.default = Vue;
module.exports = Vue;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-hot-reload-api/dist/index.js":
/***/ (function(module, exports) {

var Vue; // late bind

var version;
var map = Object.create(null);

if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map;
}

var installed = false;
var isBrowserify = false;
var initHookName = 'beforeCreate';

exports.install = function (vue, browserify) {
  if (installed) {
    return;
  }

  installed = true;
  Vue = vue.__esModule ? vue.default : vue;
  version = Vue.version.split('.').map(Number);
  isBrowserify = browserify; // compat with < 2.0.0-alpha.7

  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init';
  }

  exports.compatible = version[0] >= 2;

  if (!exports.compatible) {
    console.warn('[HMR] You are using a version of vue-hot-reload-api that is ' + 'only compatible with Vue.js core ^2.0.0.');
    return;
  }
};
/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */


exports.createRecord = function (id, options) {
  if (map[id]) {
    return;
  }

  var Ctor = null;

  if (typeof options === 'function') {
    Ctor = options;
    options = Ctor.options;
  }

  makeOptionsHot(id, options);
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  };
};
/**
 * Check if module is recorded
 *
 * @param {String} id
 */


exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined';
};
/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */


function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render;

    options.render = function (h, ctx) {
      var instances = map[id].instances;

      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent);
      }

      return render(h, ctx);
    };
  } else {
    injectHook(options, initHookName, function () {
      var record = map[id];

      if (!record.Ctor) {
        record.Ctor = this.constructor;
      }

      record.instances.push(this);
    });
    injectHook(options, 'beforeDestroy', function () {
      var instances = map[id].instances;
      instances.splice(instances.indexOf(this), 1);
    });
  }
}
/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */


function injectHook(options, name, hook) {
  var existing = options[name];
  options[name] = existing ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook] : [hook];
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn('Something went wrong during Vue component hot-reload. Full reload required.');
    }
  };
}

function updateOptions(oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key];
    }
  }

  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1];
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id];

  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate();
    });
    return;
  }

  if (typeof options === 'function') {
    options = options.options;
  }

  if (record.Ctor) {
    record.Ctor.options.render = options.render;
    record.Ctor.options.staticRenderFns = options.staticRenderFns;
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render;
      instance.$options.staticRenderFns = options.staticRenderFns; // reset static trees
      // pre 2.5, all static trees are cached together on the instance

      if (instance._staticTrees) {
        instance._staticTrees = [];
      } // 2.5.0


      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = [];
      } // 2.5.3


      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = [];
      } // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update


      var restore = patchScopedSlots(instance);
      instance.$forceUpdate();
      instance.$nextTick(restore);
    });
  } else {
    // functional or no instance created yet
    record.options.render = options.render;
    record.options.staticRenderFns = options.staticRenderFns; // handle functional component re-render

    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options);
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles;

        if (injectStyles) {
          var render = options.render;

          record.options.render = function (h, ctx) {
            injectStyles.call(ctx);
            return render(h, ctx);
          };
        }
      }

      record.options._Ctor = null; // 2.5.3

      if (Array.isArray(record.options.cached)) {
        record.options.cached = [];
      }

      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate();
      });
    }
  }
});
exports.reload = tryWrap(function (id, options) {
  var record = map[id];

  if (options) {
    if (typeof options === 'function') {
      options = options.options;
    }

    makeOptionsHot(id, options);

    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options;
      }

      var newCtor = record.Ctor.super.extend(options); // prevent record.options._Ctor from being overwritten accidentally

      newCtor.options._Ctor = record.options._Ctor;
      record.Ctor.options = newCtor.options;
      record.Ctor.cid = newCtor.cid;
      record.Ctor.prototype = newCtor.prototype;

      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release();
      }
    } else {
      updateOptions(record.options, options);
    }
  }

  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate();
    } else {
      console.warn('Root or manually mounted instance modified. Full reload required.');
    }
  });
}); // 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.

function patchScopedSlots(instance) {
  if (!instance._u) {
    return;
  } // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js


  var original = instance._u;

  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true);
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true);
    }
  };

  return function () {
    instance._u = original;
  };
}

/***/ }),

/***/ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);