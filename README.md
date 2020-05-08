# image-converter
convert image into different sizes

requirements

Accept image as input
Store that image on server & create another 4 images.
horizontal : 755 x 450
vertical : 365 x 450
horizontal small : 365 x 212
gallery : 380 x 380

Images should not be stretched, they should be cropped.

Save all four of these images locally on the server

API Input:
Image size 1024 X 1024

O/P:
send relative path of all images
{
    status: true,
    data: {
        orignal: 'url',
        horizontal: 'url',
        vertical: 'url',
        horizontalSmall: 'url',
        gallery: 'url',
    }
}