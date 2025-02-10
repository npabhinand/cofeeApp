// import { HEIGHT, WIDTH } from '../dimension';
import { beansIcon, cartIcon, documentIcon, editIcon, peoplesIcon, profitIcon } from '../../assets/icons';

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
        img: 'coffee1',
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
        img: 'coffee2',
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
        img: 'coffee3',
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
        img: 'coffee4',
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
];

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
const coffeeImageArray = {
    coffee1: require('../../assets/images/coffee1/coffee.png'),
    coffee2: require('../../assets/images/coffee2/coffee2.png'),
    coffee3: require('../../assets/images/coffee3/coffee3.png'),
    coffee4: require('../../assets/images/coffee4/coffee4.png'),
};



const cardArray = [
    { id: 1, title: 'Product', count: 1, icon: beansIcon, navigate: 'ProductListScreen' },
    { id: 2, title: 'User', count: 1, icon: peoplesIcon, navigate: 'UserListScreen' },
    { id: 3, title: 'Orders', count: 1, icon: cartIcon, navigate: 'OrderListScreen' },
    { id: 4, title: 'Stock', count: 1, icon: documentIcon, navigate: 'CommentListScreen' },
    { id: 5, title: 'Profit', count: 1, icon: profitIcon, navigate: 'ProfitListScreen' },
];

// const flavorsArray = [
//     { id: 1, name: 'citrus' },
//     { id: 2, name: 'floral' },
//     { id: 3, name: 'berry' },
//     { id: 4, name: 'chocolatey' },
//     { id: 5, name: 'nutty' },
//     { id: 6, name: 'buttery' },
//     { id: 7, name: 'caramelly' },
//     { id: 8, name: 'smokey' },
//     { id: 9, name: 'spicy' },
//     { id: 10, name: 'sweet' },
//     { id: 11, name: 'sour' },
//     { id: 12, name: 'vanilla' },
// ];

// const sugarSelectionArray = [
//     { id: 1, name: '100 % sugar' },
//     { id: 2, name: '70 % sugar' },
//     { id: 3, name: '50 % sugar' },
//     { id: 4, name: '0 % sugar' },
// ];
// const sizeArray = [
//     { id: 1, name: 'S' },
//     { id: 2, name: 'M' },
//     { id: 3, name: 'L' },
// ];

const AttributeArray = [
    { id: 1, name: 'Add Size' },
    { id: 1, name: 'Add Flavors' },
    { id: 1, name: 'Add Sugar' },
]
export { filterArray, coffeeArray, orderType, editAdressArray, onBoardScreenData, productDetailData, sizeButton, DeliveryData, coffeeImageArray, cardArray, AttributeArray };
