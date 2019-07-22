var arr = [25, 18, 5, 96, 74, 52, 14, 14, 5];

function bubble(arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    } else {
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - i - 2; j++) {
                if (arr[j] < arr[j + 1]) {
                    var tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
        return arr;
    }
}


function insert(arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    } else {
        for (var i = 1; i < len; i++) {
            var tmp = arr[i];
            var j = i - 1;
            while (j >= 0 && tmp < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = tmp;
        }
        return arr;
    }
}

function quick(arr) {
    var len=arr.length;
    if (len <= 1) {
        return arr;
    } else {
        var coordIndex = Math.floor(len / 2);
        var coord = arr[coordIndex];
        arr.splice(coordIndex, 1);
        var left = [];
        var right = [];
        var len2 = arr.length;
        for (var i = 0; i < len2; i++) {
            if (arr[i] < coord) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        var leftArr=quick(left);
        var rightArr=quick(right);
        return leftArr.concat([coord],rightArr);
    }
}
module.exports={
    bubble,
    insert,
    quick
}