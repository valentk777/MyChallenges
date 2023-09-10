export const getRandomImage = () => {
    const images = [
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-2137-768x512.jpg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-1948-768x512.jpg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-1969-768x512.jpg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-1794-768x512.jpg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-296-768x512.jpeg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-405-768x512.jpeg',
        'https://freenaturestock.com/wp-content/uploads/freenaturestock-2147-768x512.jpg',
    ]

    const imageId = Math.floor(Math.random() * 100) % 7;

    return images[imageId];
}

export default getRandomImage;