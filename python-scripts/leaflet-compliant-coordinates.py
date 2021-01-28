'''This is a script for people who want to use leaflet's tile overlay. 
So far, I haven't been able to get it to work, but you'll need this 
coordinate system in order to properly render the map.

NOTE: You should have a folder named leaflet-compliant-coordinates here.
'''

for x in range(-10, 10):
    for y in range(-10, 10):
        filepath = 'tile-'+str(x)+'_'+str(y)+'.jpg'
        initial_file = open(filepath, 'rb')
        imageData = initial_file.read()
        initial_file.close()
        # Because leaflet uses an inverted y-axis, we invert the polarity here.
        modifiedFilepath = './leaflet-compliant-coordinates/tile-' + str(x)+'_'+str(-y)+'.jpg'
        final_file = open(modifiedFilepath, 'wb')
        final_file.write(imageData)
        final_file.close()
