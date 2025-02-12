

interface userDataItem {
    email: string;
    userType: string,
    phone: number,
    name: string,
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
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
    update?: boolean;
    id?: string;
    name?: string;
    phone?: number;
    address?: string;
    selected?: boolean;
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
        id: number;
        product: string;
        coffeeType: string;
        description: string;
        types: any;
        price: number;
        rating: number;
        image: string;
        profit: string;
    }
    userId: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ProductDetailScreenProps {
    route: { params: { section: coffeeProps } };
}

interface buttonProps {
    buttonName: string;
    selected: boolean;
    onPress: () => void;
}
interface CartProps {
    // item: {
    item: {
        id: string;
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
    item: productsProps
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
    id: number;
    name: string;
    coffeeType: string;
    description: string;
    type: any,
    rating: number;
    img: number;
    quantity: number;
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
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

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
        products: CartItem;
        profit: number;
        address: [{
            address: string;
            name: string;
            phone: string;
            userId: string;

        }]
    }
    handleModal?: () => void;
}
export type { userDataItem, addressProps, contactProps, productProp, coffeeProps, buttonProps, CartProps, productItems, userProps, ProductDetailScreenProps, dropDownProps, productsProps, addressItems, CartState, CartItem, ContactItem, PriceState, dropDownState, StockProps, profitProps, orderDetailProps, countState };
