from PIL import Image


def mergeImagesHorizontally(images, coordinate):
    # create two lists - one for heights and one for widths
    widths, heights = zip(*(i.size for i in images))
    resultWidth = sum(widths)
    resultheight = min(heights)  # take minimum height
    # create new image
    resultImage = Image.new('RGB', (resultWidth, resultheight))
    nextImagePosition = 0
    for im in images:
        resultImage.paste(im, (nextImagePosition, 0))
        nextImagePosition += im.size[0]  # position for the next image
    resultImage.save('final'+str(coordinate)+'.jpg')


def mergeImagesVertically(images):
    # create two lists - one for heights and one for widths
    widths, heights = zip(*(i.size for i in images))
    resultWidth = min(widths)  # take minimum width
    resultheight = sum(heights)
    # create new image
    resultImage = Image.new('RGB', (resultWidth, resultheight))
    nextImagePosition = 0
    for im in images:
        resultImage.paste(im, (0, nextImagePosition))
        nextImagePosition += im.size[1]  # position for the next image
    resultImage.save('final-merged-map.jpg')


def main():
    """This code works in two parts.

    The first part generates horizontal slices while the second part
    merges all the horizontal slices into the complete map.
    """
    listOfRows = []
    for x in range(-10, 10):
        """Here, we generate a list of lists, with each list element containing
        one row of filepaths of the 20x20 grid, making for a total of 20
        rows."""
        imageRow = []
        for y in range(-10, 10):
            filepath = 'tile-'+str(y)+'_'+str(x)+'.jpg'
            imageRow.append(filepath)
        listOfRows.append(imageRow)

    listOfMergedRows = []

    for x in range(20):
        '''Here, we loop through the list of rows and horizontally
        merge each row, and generate a list of filepaths of
        horizontal strips for the next step.'''
        imgs = [Image.open(im) for im in listOfRows[x]]
        mergeImagesHorizontally(imgs, x)

        '''Since we traverse from -10 to 10, we reverse the filepath order
        for the final merge so as not to end up with a reversed merge'''
        listOfMergedRows.append('final'+str(19-x)+'.jpg')

        # Finally, we merge the horizontal strip into one complete image
        images = [Image.open(im) for im in listOfMergedRows]
        mergeImagesVertically(images)


if __name__ == '__main__':
    main()
