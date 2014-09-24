var rbush = require('./rbush');

console.log("Hello world");


var block_bounding_boxes = [[10,10,20,20],[3,3,10,100]];

var fs = require('fs');
fs.writeFile("test_file_write.json", block_bounding_boxes, function(err) {
        if(err){
                    console.log(err);
        }else{
                    console.log("The file was saved!");
            }
}); 

var jsonFile = require('json-file-plus');
var path = require('path'); // in node-core
var filename = path.join(process.cwd(), 'package.json');
jsonFile(filename, function (err, file) {
        if (err) { return doSomethingWithError(err); }

        file.data; // Direct access to the data from the file
        console.log("file.data", file.data);
        file.data=[[1,1,1,1],[2,2,2,2]];
        console.log("file.data", file.data);

        file.format; // extracted formatting data. change at will.

        file.get('version'); // get top-level keys, synchronously
        //file.get('version', callback); // get top-level keys, asynchronously
        file.get(); // get entire data, synchronously
        //file.get(callback); // get entire data, asynchronously

        /* pass any plain object into "set" to merge in a deep copy */
        /* please note: references will be broken. */
        /* if a non-plain object is passed, will throw a TypeError. */
        file.set({});

        /* change the filename if desired */
        file.filename = path.join(process.cwd(), 'output_test.json');

        /* Save the file, preserving formatting. */
        /* Callback will be passed to fs.writeFile */
        file.save();
        //file.save(fsWriteFileCallback);
});

