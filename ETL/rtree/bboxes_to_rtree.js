var rbush = require('./rbush');
var fs = require('fs');
var jsonFile = require('json-file-plus');


// INPUT: bounding boxes from shapefile

//var file="block_group_bounding_boxes.json";
var file="block_group_bounding_boxes_w_offset.json";
var path = require('path'); // in node-core
var filename = path.join(process.cwd(), file);


jsonFile(filename, function (err, file) {
        if (err) { return 
                        console.log("File didnt open?"); 
                        console.log(err); 
                }
        var tree = rbush(9);
        console.log("Inspect input data of bounding boxes:");
        console.log(typeof file.data);
        console.log(file.data.slice(0,2));
        tree.load(file.data);
        var rec=[-117.70702999976885, 34.064940999658226, -117.69829200059435, 34.066827000259664];
        var result = tree.search(rec);
        var offsets=[];
        for (var i=0; i < result.length; i++) {
            offsets.push(result[i][4]);
            }
        console.log("Offsets intersecting 1st area:", offsets);

        file.format; // extracted formatting data. change at will.

        /* OUTPUT: RTree Data */
        var file = "treeData.json";
        var treeData = tree.toJSON();
        var jf = require('jsonfile');

        jf.writeFileSync(file, treeData);
        /*
        fs.writeFile(file, treeData, function(err) {
                if(err){
                            console.log(err);
                }else{
                            console.log("The file was saved!");
                    }
        });
        */
});



// TEST RTREE OUTPUT: 
/*
var file="treeData.json";
var path = require('path'); // in node-core
var filename = path.join(process.cwd(), file);


jsonFile(filename, function (err, file) {
        if (err) { return 
                        console.log("File didnt open?"); 
                        console.log(err); 
                }
        console.log("Rtree JSON filenam:",filename);
        // import previously exported data
        var tree = rbush(9).fromJSON(file.data);
        var p = tree[0];
        console.log("First record from tree:", p);
        var result= tree.search(p);
        console.log("Result", result);
});
*/
