import wget

# The map is a Cartesian-system-ordered, 20x20 map with tile bounds
# (-10,-10) and (10,10)
for x in range(-10, 10):
    for y in range(-10, 10):
        # Set up the image URL
        image_url = "https://genshin-impact.b-cdn.net/jpg-v12/7/tile-" + \
            str(x)+"_"+str(y)+".jpg"
        # Use wget download method to download specified image url.
        wget.download(image_url)
        print('Successfully downloaded tile: ('+str(x)+', '+str(y)+').')
