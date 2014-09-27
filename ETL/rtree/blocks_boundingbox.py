import fiona
import pysal
import sys
sys.path.append("/usr/local/lib/python2.7/site-packages")
import utm
import json

shpfile="/Users/slow/workspace/geoscore/S3/shapefiles/USA_blockgroup_2010/US_blck_grp_2010.shp"
shpfile="/Users/slow/workspace/splunk-choropleth/bin/usa_block_groups_lonlat_shapefile/usa_block_groups_lonlat.shp"

# rbush expects
# [minX, minY, maxX, maxY] (bounding box coordinates, or just [x, y, x, y]

with open("bounding_boxes.json","w") as output:
    bb_list=[]
    shp=pysal.open(shpfile, 'r');
    N=len(shp)
    
    for enum,i in enumerate(shp):
        print enum,"of", N
        x=round(i.bounding_box.left,4)
        y=round(i.bounding_box.lower,4)
        X=round(i.bounding_box.right,4)
        Y=round(i.bounding_box.upper,4)
        bb_list.append([x,y,X,Y,{"o":enum}])
        #break
    json.dump(bb_list,output)

        
