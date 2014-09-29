from django.template import Context, loader
from django.views.decorators.cache import never_cache
from django import http
import json
import numpy as nu
import os

VARIABLES = nu.load(os.path.join(os.path.split(__file__)[0],'variables_raw.npy'))

# Fun Fact: float('nan') != float('nan')
nan2none = lambda x: x if x==x else None
INF = float('inf')
inf2none = lambda x: x if x!=INF else None


def getVars(offset):
    """
        return a blockgroup's row of census values
    """
    rec = VARIABLES[offset]
    vals = map(nan2none, rec.tolist())
    vals = map(inf2none, vals)
    return dict(zip(rec.dtype.names, vals))

@never_cache
def home(request):
    t = loader.get_template('index.html')
    random_number=nu.random.randint(10)
    c = Context({
                    'random_number': random_number,
                })
    #return http.HttpResponse('Coming soon!')
    return http.HttpResponse(t.render(c))

def profile(request, blockgroup_offset):
    t = loader.get_template('statistical_profile.html')
    block=getVars(int(blockgroup_offset))
    block.pop("geoids")
    block["Average income"]=block["income"]
    block.pop("income")
    block["Percent traveled abroad in last year"]=block["mobility_abroad"]
    block.pop("mobility_abroad")
    block["Percent living in another metro in last year"]=block["mobility_msa"]
    block.pop("mobility_msa")
    block["Percent homes for sale"]=block["forsale"]
    block.pop("forsale")

    c = Context({
                    'block':block,
                })
    #return http.HttpResponse('Coming soon!')
    # Pretty print as json with formatting
    #block_json=json.dumps(block, sort_keys=True, indent=4, separators=(',', ': '))
    #print block_json
    return http.HttpResponse(t.render(c))
