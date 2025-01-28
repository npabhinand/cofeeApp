import { documentIcon, editIcon } from '../../assets/icons';
import { coffee1, coffee2, coffee3, coffee4 } from '../../assets/images';

const filterArray = [
    { id: 1, name: 'All Coffee' },
    { id: 2, name: 'Machiato' },
    { id: 3, name: 'Latte' },
    { id: 4, name: 'Americano' },
    { id: 5, name: 'Espresso' },
];

const coffeeArray = [
    {
        id: 1,
        img: coffee1,
        name: 'Coffee Mocha',
        coffeeType: 'Deep Foam',
        description: 'A rich blend of espresso, steamed milk, and chocolate syrup, topped with a thick layer of foam. A smooth espresso-based drink with a velvety microfoam texture, offering a strong coffee flavor.',
        type: [
            { size: 'S', price: 4.50 },
            { size: 'M', price: 5.60 },
            { size: 'L', price: 7.80 },
        ],
        rating: 4.8,
    },
    {
        id: 2,
        name: 'Flat White',
        img: coffee2,
        coffeeType: 'Espresso',
        description: 'A smooth espresso-based drink with a velvety microfoam texture, offering a strong coffee flavor. A delicious mix of espresso, milk, and chocolate, served either iced or hot for a refreshing treat.',
        type: [
            { size: 'S', price: 3.53 },
            { size: 'M', price: 4.63 },
            { size: 'L', price: 5.83 },
        ],
        rating: 4.6,
    },
    {
        id: 3,
        name: 'Flat White',
        img: coffee3,
        coffeeType: 'Americano',
        description: 'A creamy and rich espresso drink with a balanced amount of steamed milk and velvety foam. A delicious mix of espresso, milk, and chocolate, served either iced or hot for a refreshing treat.',
        type: [
            { size: 'S', price: 6.53 },
            { size: 'M', price: 7.63 },
            { size: 'L', price: 8.83 },
        ],
        rating: 4.5,
    },
    {
        id: 4,
        name: 'Mocha Fusi',
        img: coffee4,
        coffeeType: 'Ice/Hot',
        description: 'A delicious mix of espresso, milk, and chocolate, served either iced or hot for a refreshing treat. A creamy and rich espresso drink with a balanced amount of steamed milk and velvety foam.',
        type: [
            { size: 'S', price: 7.53 },
            { size: 'M', price: 8.63 },
            { size: 'L', price: 9.83 },
        ],
        rating: 4.3,
    },
];

const orderType = [
    { id: 1, name: 'Deliver' },
    { id: 2, name: 'Pick Up' },
];

const editAdressArray = [
    { id: 1, icon: editIcon, name: 'Edit Adress' },
    { id: 1, icon: documentIcon, name: 'Add Note' },
];
const sizeButton = [
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' },
]

const onBoardScreenData = {
    title: 'Fall in Love with Coffee in Blissful Delight!',
    description: 'Welcome to our cozy corner, where every cup is delightful for you.',
};

const productDetailData = {
    description: 'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the for A cappuccino is an approximately 150 ml (5 oz) beverage',

};

const DeliveryData = {
    description: 'we will deliver your goods to you in the shortest possible time.',

};
export { filterArray, coffeeArray, orderType, editAdressArray, onBoardScreenData, productDetailData, sizeButton, DeliveryData };
