var fso = {
    name: null,
    f: new ActiveXObject("Scripting.FileSystemObject"),
    temp: null,
    txt: {
        file: null,
        io: null,
        created: false,
        read: function () {
            var size = fso.f.getFile(fso.name).size;
            if ( !! this.file && size && this.io === 1) {
                var ret = this.file.ReadAll();
                this.file.Close();
                return ret;
            } else {
                if (!this.file || !size) return '';
                fso.open(fso.name).read();
            }
        },
        write: function (str) {
            if (!this.file || this.io !== 2) return fso.open(fso.name, {
                mode: 2
            }).write(str);
            else {
                this.file.Write(str);
                return fso.open(fso.name).read();
            }
        },
        append: function (str) {
            if (!this.file || this.io !== 8) {
                return fso.open(fso.name, {
                    mode: 8
                }).append(str);
            } else {
                this.file.Write(str);
                return fso.open(fso.name).read();
            }
        },
        prepend: function (str) {
            if (!this.file || this.io !== 2) {
                fso.temp = this.read();
                return fso.open(fso.name, {
                    mode: 2
                }).prepend(str);
            } else {
                this.file.Write(str + fso.temp);
                return fso.open(fso.name).read();
            }
        }
    },
    create: function (fileName) {
        if (fso.f.exists(fileName)) return false;
        return fso.open(fileName, {
            create: true
        });
    },
    open: function (fileName, params) {
        params = params || {};
        params = {
            mode: params.mode || 1,
            create: params.create || true,
            format: params.format || 0
        };
        fso.txt.io = params.mode;
        fso.txt.created = !fso.exists(fileName);
        if (fso.txt.file) fso.txt.file.Close();
        fso.txt.file = fso.f.OpenTextFile(fileName, params.mode, params.create, params.format);
        fso.name = fileName;
        return fso.txt;
    },
    exists: function (fileName) {
        return fso.f.FileExists(fileName) || fso.f.FolderExists(fileName);
    }
};