var a = 1;
console.log(a);
function change() {
    var fileElement = document.querySelectorAll('input')[0];
    var file = fileElement.files;
    console.log(file);
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log(e.target.result);
        var buffer = e.target.result;
        var dateView = new DataView(buffer);
        var unit8Array = new Uint8Array(buffer);
        // magic number 为 array buffer 判断格式的方法
        var magicNumber = dateView.getUint32(0, false).toString(16).toUpperCase();
        console.log(magicNumber);
        var map = {
            // mkv mka mks mk3d webm
            mkv: {
                start: 0,
                length: 4,
                magicNumber: '1A 45 DF A3',
                format: 'mkv'
            },
            mp4: {
                start: 4,
                length: 8,
                magicNumber: '66 74 79 70 69 73 6F 6D',
                format: 'mp4'
            }
        };
        var values = Object.values(map);
        console.log(values);
        var result = values.find(function (item) {
            var magicNumber = unit8Array.slice(item.start, item.start + item.length).reduce(function (str, current) {
                return str.concat(current.toString(16).toUpperCase());
            }, []);
            console.log(item.magicNumber + '=====' + magicNumber.join(' '));
            return item.magicNumber === magicNumber.join(' ');
        });
        console.log(unit8Array, unit8Array.slice(5, 200).toString(16));
    };
    console.log(reader);
    reader.readAsArrayBuffer(file[0]);
    // reader.readAsBinaryString(file[0])
}
