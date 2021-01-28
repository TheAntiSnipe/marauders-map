import numpy as np
from PIL import Image


def merge_images_horizontally(imgs, coordinate):
    # create two lists - one for heights and one for widths
    widths, heights = zip(*(i.size for i in imgs))
    width_of_new_image = sum(widths)
    height_of_new_image = min(heights)  # take minimum height
    # create new image
    new_im = Image.new('RGB', (width_of_new_image, height_of_new_image))
    new_pos = 0
    for im in imgs:
        new_im.paste(im, (new_pos, 0))
        new_pos += im.size[0]  # position for the next image
    new_im.save('final'+str(coordinate)+'.jpg')


def merge_images_vertically(imgs):
    '''
    This function merges images vertically
    '''
    # create two lists - one for heights and one for widths
    widths, heights = zip(*(i.size for i in imgs))
    width_of_new_image = min(widths)  # take minimum width
    height_of_new_image = sum(heights)
    # create new image
    new_im = Image.new('RGB', (width_of_new_image, height_of_new_image))
    new_pos = 0
    for im in imgs:
        new_im.paste(im, (0, new_pos))
        new_pos += im.size[1]  # position for the next image
    new_im.save('final-merged-map.jpg')


def main():
    '''This code works in two parts. The first part generates horizontal slices
    while the second part merges all the horizontal slices into the complete map.'''
    listOfRows = []
    for x in range(-10, 10):
        '''Here, we generate a list of lists, with each list element containing
        one row of filepaths of the 20x20 grid, making for a total of 20 rows.'''
        image_row = []
        for y in range(-10, 10):
            filepath = 'tile-'+str(y)+'_'+str(x)+'.jpg'
            image_row.append(filepath)
        listOfRows.append(image_row)

    listOfMergedRows = []

    for x in range(20):
        '''Here, we loop through the list of rows and horizontally merge each row,
        and generate a list of filepaths of horizontal strips for the next step.'''
        imgs = [Image.open(im) for im in listOfRows[x]]
        merge_images_horizontally(imgs, x)

        '''Since we traverse from -10 to 10, we reverse the filepath order 
        for the final merge so as not to end up with a reversed merge'''
        listOfMergedRows.append('final'+str(19-x)+'.jpg')

    # Finally, we merge the horizontal strip into one complete image
    imgs = [Image.open(im) for im in listOfMergedRows]
    merge_images_vertically(imgs)


if __name__ == '__main__':
    main()
