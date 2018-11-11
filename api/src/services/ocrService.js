var tesseract = require('node-tesseract-ocr');
var gm = require('gm');
const fs = require('fs')
const path = require('path');

var options = {

    l: 'eng',
    psm: 6,
    env: {
        maxBuffer: 4096 * 4096
    }
};



async function main(dir, cb) {
    outfile = 'images/modify/IMAGE_modify.jpg'
    outfile2 = 'images/modify/IMAGE_modify2.jpg'

    cleanUp(dir, outfile);
    setTimeout(async () => {
        cleanUp2(outfile, outfile2);
        setTimeout(async () => {
            var response = await imageToText(outfile2, cb);
            setTimeout(() => {directory = './images/modify'
            fs.readdir(directory, (err, files) => {
                if (err) throw err;
            
                for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
                }
                return response
          })}
          , 200)
        }, 200);
    }, 200);
}

async function imageToText(path, cb) {
    // will be dynamic later
    await tesseract.recognize(path, options)
    .then(text => {
        // split the text by line
        var lines = text.match(/^.*([\n\r]+|$)/gm);
        return readAndCreateJson(lines, cb)
    })
    .catch(err => {
        console.log('error:', err)
    })
}

async function readAndCreateJson(resultData, cb) {
    // var result = []
    var entireReceipt = {
        'items': [],
        'TOTAL': 0
    }

    for (i = 0; i < resultData.length; i++) {
        if (resultData[i].indexOf('$') != -1 || /\d/.test(resultData[i])) {
            var splitted = resultData[i].replace('\n', '').split(' ')

            var lastIndex = splitted.length - 1

            // not divided ideally
            if (splitted.length < 2) {
                continue;
            }
            
            // fixing the weird cut off problem
            if ((splitted[lastIndex].indexOf(',') == -1 && splitted[lastIndex].indexOf('.') == -1 && splitted[lastIndex - 1].indexOf('.') != -1)
            || (splitted[lastIndex].indexOf('.') == -1 && splitted[lastIndex].indexOf(',') == -1 && splitted[lastIndex - 1].indexOf(',') != -1)) {
                splitted[lastIndex] = splitted[lastIndex - 1] + splitted[lastIndex]
            }

            splitted[lastIndex] = splitted[lastIndex].replace(',', '.').replace('$', '').replace('~', '-')

            // assuming the dollar value contains decimal points
            if (splitted[lastIndex].indexOf('.') == -1) {
                continue;
            }

            // possibly filter out unwated items with unit price.
            resultData[lastIndex] = resultData[lastIndex].replace('$','')
            if (splitted[lastIndex].indexOf('/') != -1 || splitted[0].indexOf('%') != -1) {
                continue;
            }

            // ignore all the confusing key words
            if (splitted[0].indexOf('change') != -1 || splitted[0].indexOf('CHANGE') != -1
            || splitted[0].indexOf('cash') != -1 || splitted[0].indexOf('CASH') != -1) {
                continue;
            }

            // avoid some date being included
            if (splitted[lastIndex].toString().split(".")[1].length > 2) {
                continue
            }

            // store total value separately
            if (splitted[0].indexOf("total") != -1 || splitted[0].indexOf("TOTAL") != -1 || splitted[0].indexOf("Total") != -1 
            || splitted[0].indexOf("Balance") != -1 || splitted[0].indexOf("BALANCE") != -1 || splitted[0].indexOf("balance") != -1) {
                entireReceipt.TOTAL = splitted[lastIndex]
                continue;
            }

            // combining the name
            if (lastIndex > 1) {
                for (j = 1; j < lastIndex; j++) {
                    splitted[0] = splitted[0] + ' ' + splitted[j]
                    // let's prevent unnecessarily long name
                    if (j > 2) {
                        break;
                    }
                }
            }
            
            splitted[0] = splitted[0].trim()

            // also record multiple items with same names
            var dup = 1;
            if (entireReceipt.items[splitted[0]]) {
                if (parseFloat(splitted[lastIndex])) {
                    // claimer: {'userId': ''}
                    var singleObject = { name: '', price: 0, claimer: [] }
                    singleObject['name'] = splitted[0]
                    singleObject['price'] = parseFloat(splitted[lastIndex])
                    entireReceipt.items.push(singleObject)
                    dup++
                }
            }

            // make sure that the value is valid
            if (parseFloat(splitted[lastIndex])) {
                // claimer: {'userId': ''}
                var singleObject = { name: '', price: 0, claimer: [] }
                singleObject['name'] = splitted[0]
                singleObject['price'] = parseFloat(splitted[lastIndex])
                entireReceipt.items.push(singleObject)
            }
        }
    }
    // return entireReceipt
    cb(JSON.stringify(entireReceipt));
}

async function cleanUp(path, outfile) {
    gm(path)
    .density(400, 300)
    .units('PixelsPerInch')
    .colorspace('gray')
    .type('grayscale')
    .modulate(100, 0)
    .level('25%', 1.5, '75%')
    .blur(0, 0.4)
    .sharpen(0, 0.7)
    .write(outfile, function (error) {
    //   console.log(error, outfile)
    });
    return;
}

async function cleanUp2(path, outfile) {
    gm(path)
    .treeDepth(8)
    .density(400, 300)
    .in('-colorspace', 'gray').in('-type', 'grayscale').in('-modulate', '100,0')
    .in('-gamma', '0.5')
    .in('-level', '25%, 75%')
    .in('-blur', '0x0.2').in('-sharpen', '0x0.5')
    .in('-trim')
    .write(outfile, function (error) {
    //   console.log(error, outfile)
    });
    return;
}

module.exports = {
    main: main
  };