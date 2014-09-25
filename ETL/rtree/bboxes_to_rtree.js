var rbush = require('./rbush');
var fs = require('fs');

var file="block_group_bounding_boxes.json";
var jsonFile = require('json-file-plus');
var path = require('path'); // in node-core
var filename = path.join(process.cwd(), file);

console.log("filename", filename);

jsonFile(filename, function (err, file) {
        if (err) { return 
                        console.log("File didnt open?"); 
                        console.log(err); 
                }
        var tree = rbush(9);
        console.log("Inspect input data of bounding boxes:");
        console.log(typeof file.data);
        console.log(file.data.slice(0,2));
        tree.load(file.data)

        file.format; // extracted formatting data. change at will.

        /* OUTPUT */
        var treeData = tree.toJSON();
        var fs = require('fs');
        fs.writeFile("treeData.json", treeData, function(err) {
                if(err){
                            console.log(err);
                }else{
                            console.log("The file was saved!");
                    }
        });
});
