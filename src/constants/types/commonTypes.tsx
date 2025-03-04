

interface userDataItem {
    id: string;
    email: string;
    userType: string,
    phone: number,
    name: string,
    image: string,
}

interface addressItems {
    update: boolean;
    id: string;
    name: string;
    phone: number;
    address: string;
    selected: boolean;
}
interface addressProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update?: boolean;
    addressId?: string;
    name?: string;
    phone?: number;
    address?: string;
    selected?: boolean;
    details?: any
}

interface contactProps {
    item: {
        id: string;
        name: string;
        phone: string;
        address: string;
        selected: boolean;
    };
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
}
interface productProp {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
    item?: {
        id: string,
        price: number;
        product: string,
        coffeeType: string,
        image: string,
        description: string;
        types: {}
    };
}
interface coffeeProps {

    item: {
        id: string;
        selected: boolean;
        isAddedInCart:boolean;
        product:
        {
            id: string;
            product: string;
            coffeeType: string;
            description: string;
            types: any;
            price: number;
            rating: number;
            image: string;
            profit?: string;
        }
    }
    orderType?: string;
    userId?: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ProductDetailScreenProps {
    route: { params: { section: coffeeProps } };
}
interface ordersScreenProps {
    route: { params: { orderTypes: string; buttonNames: [{ id: number; name: string; }]; showItem: string } };
}
interface buttonProps {
    buttonName: string;
    selected: boolean;
    onPress: () => void;
}
interface CartProps {
    // item: {
    item: {
        itemId: string;
        name: string;
        coffeeType: string;
        description: string;
        price: string;
        type: {},
        rating: number;
        image: string;
        quantity: number;
        // }
    }
}


interface productsProps {
    id: string,
    product: string,
    coffeeType: string,
    image: string,
    price: number;
    profit: number;
    types: { size: string, price: number }
}
interface productItems {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
    item: productsProps;
    showButtons: boolean;
}

interface userProps {
    item: {
        name?: string;
        email?: string;
        phone?: number;
    }
}
interface dropDownProps {
    color?: string;
    // setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isVisible: boolean
    onPressClose: any
}
interface CartState {
    cartCount: number;
}

interface dropDownState {
    isVisible: boolean;
}
interface PriceState {
    totalPrice: number;
}

interface countState {

    productCount: number;
    userCount: number;
    orderCount: number;
    profit: number;
    stockCount: number;
}
interface CartItem {
    itemId: string;
    coffeeType: string;
    description: string;
    image: string;
    name: string;
    orderType:string;
    price: number;
    quantity:number;
    types: {};
}
interface FavoriteItem {
    id: string;
    product: string;
    coffeeType: string;
    description: string;
    types: any,
    price: number;
    image: string;
    selected: boolean;
    orderType: string;
}


interface products {
    product: {
        name: string;
        quantity: number;
    }
}
interface productItem {
    product: {
        item: CartItem
    };
}
interface ContactItem {
    id: number;
    name: string;
    phone: number;
    address: string;
    selected: boolean;
}

interface profitProps {
    item: productsProps;
    // loading: boolean;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;

}
interface StockProps {
    item: {
        id: string;
        product: string;
        coffeeType: string;
        description: string;
        types: any,
        rating: number;
        image: string;
        stock: number;
    }
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}
interface orderDetailProps {
    item: {
        id: string;
        orderTime: number;
        TotalPrice: number;
        products: [CartItem];
        profit: number;
        status: string;
        address: {
            address: string;
            name: string;
            phone: string;
            userId: string;

        }[]
    }
    update?:boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    onNavigation?: () => void;
    marginTop?: number;
    handleModal?: () => void;
}
interface orderComponentProps {
    userType?: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading:boolean;

    item: {
        id: string;
        orderTime: number;
        totalPrice: number;
        products: [CartItem];
        profit: number;
        status: string;
        orderType:string;
        table?:string[];
        shop?:any;

        address: {
            address: string;
            name: string;
            phone: string;
            userId: string;

        }
    }
    onNavigation?: () => void;
    marginTop?: number;
    handleModal?: () => void;
    showItem?: string;
   
}
interface headerProps {
    header: string;
}
interface detailProps {
    detail: {
        label: string;
        value: string;
    }
}
interface addressProp {
    address:any;
}

interface buttonProp {
    onPress1: () => void;
    onPress2: () => void;
    text1: string;
    text2: string;
}

interface shopItem {
    id: string;
    image: string;
    name: string;
    place: string;
    address: string;
    time: string;
    tables:{tableId:string;capacity:string;}[]
}
interface shopProps {
    // setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    // isVisible: boolean;
    item: shopItem
    modalShow: string;
}
interface addShopProps {
    item?: shopItem;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    isVisible: boolean;
}

interface carts {
    itemId: string;
    coffeeType: string;
    description: string;
    image?: string;
    name?: string;
    price: number;
    quantity: number;
    types: {};
}

interface bookButtonProps {
    icon: number;
    onPress: () => void;
}

interface OrderTypeState {
    orderType: string;
}

interface BookingItem{
    tables:string[];
    shopId:string;
    name:string;
}

interface countItem{
    productCount:number;
    userCount:number;
    orderCount:number;
    stockCount:number;
    totalProfit:number;
    shopCount:number;
}

interface paymentNavprops{
    cartItems: any;
    totalPrice: number;
    orderType: string;
    selectedShops?: any[];
    selectedContact?: any;
    selectedShop?: any;
    setUpdate: (update: boolean) => void;
}
interface routeProps{
    route:
        paymentNavprops
    
}
interface orders{
    orderTypes:string;
    buttonNames?:any;
    showItem?:string;
}
interface OrderItem{
    id:string;
    orderTime:number;
    orderType:string;
    shop?:any;
    status:string;
    table?:[];
    totalPrice:number;
    userId:any;
    products:any;
    address?:any;

}

interface productsNavProp{
    section:{
    item:{
        id: string;
  selected: boolean;
  isAddedInCart: boolean;
  product: any;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }}
}
interface FavouriteProps{
    item:FavoriteItem
}
export type { BookingItem,userDataItem, addressProps, contactProps, productProp, coffeeProps, buttonProps, CartProps, productItems, userProps, 
    ProductDetailScreenProps, dropDownProps, productsProps, addressItems, CartState, CartItem, ContactItem, PriceState, dropDownState, StockProps, 
    profitProps, orderDetailProps, countState, headerProps, productItem, orderComponentProps, detailProps, products, ordersScreenProps, buttonProp, 
    FavoriteItem, shopProps, addShopProps, carts, bookButtonProps, OrderTypeState,addressProp, countItem,
    paymentNavprops, routeProps, OrderItem, orders, productsNavProp, FavouriteProps };
