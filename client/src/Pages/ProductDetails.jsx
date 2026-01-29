import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [mainImage, setMainImage] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (product) {
            const images = Array.isArray(product.image) ? product.image : [product.image];
            setMainImage(images[0]);
            window.scrollTo(0, 0);
        }
    }, [id, product]);

    useEffect(() => {
        if (products.length > 0 && product) {
            let productsCopy = products.filter((item) => product.category === item.category && item._id !== id);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products, product, id]);

    if (!product || !mainImage) {
        return <div className = "min-h-screen flex items-center justify-center" > Loading... < /div>;
    }

    const productImages = Array.isArray(product.image) ? product.image : [product.image];

    return ( <
        div className = "pt-10 transition-opacity ease-in duration-500 opacity-100" >
        <
        div className = "flex items-center gap-2 text-gray-500 text-sm mb-10" >
        <
        Link to = "/"
        className = "hover:text-black" > Home < /Link> <
        span > /</span >
        <
        Link to = "/products"
        className = "hover:text-black" > Products < /Link> <
        span > /</span >
        <
        p className = "capitalize" > { product.category } < /p> <
        span > /</span >
        <
        p className = "text-orange-500 font-medium" > { product.name } < /p> <
        /div>

        <
        div className = "flex gap-12 flex-col sm:flex-row" >
        <
        div className = "flex-1 flex flex-col-reverse gap-3 sm:flex-row" >
        <
        div className = "flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full" > {
            productImages.map((item, index) => ( <
                img onClick = {
                    () => setMainImage(item) }
                src = { item }
                key = { index }
                className = { `w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border transition-all ${mainImage === item ? 'border-orange-500' : 'border-gray-200'}` }
                alt = "" /
                >
            ))
        } <
        /div> <
        div className = "w-full sm:w-[80%]" >
        <
        img className = "w-full h-auto"
        src = { mainImage }
        alt = { product.name }
        /> <
        /div> <
        /div>

        <
        div className = "flex-1" >
        <
        h1 className = "font-medium text-3xl mt-2" > { product.name } < /h1> <
        div className = "flex items-center gap-0.5 mt-1" > {
            Array(5).fill('').map((_, i) => ( <
                img key = { i }
                src = { i < product.rating ? assets.star_icon : assets.star_dull_icon }
                alt = ""
                className = "md:w-4 w-3.5" / >
            ))
        } <
        p className = "text-base ml-2 text-gray-500" > ({ product.rating }) < /p> <
        /div>

        <
        div className = "mt-6" >
        <
        p className = "text-gray-400 text-sm line-through" > MRP: { currency } { product.price } < /p> <
        p className = "text-2xl font-medium" > MRP: { currency } { product.offerPrice } < /p> <
        p className = "text-xs text-gray-400" > (inclusive of all taxes) < /p> <
        /div>

        <
        div className = "mt-6" >
        <
        p className = "text-base font-semibold text-gray-700" > About Product < /p> <
        ul className = "list-disc ml-4 text-gray-500 text-sm mt-2 space-y-1" > {
            product.description && product.description.map((desc, index) => ( <
                li key = { index } > { desc } < /li>
            ))
        } <
        /ul> <
        /div>

        <
        div className = "flex items-center mt-10 gap-4 text-base" >
        <
        button onClick = {
            () => addToCart(product._id) }
        className = "w-full py-3 cursor-pointer font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition" > Add to Cart < /button> <
        button onClick = {
            () => { addToCart(product._id);
                navigate("/cart"); } }
        className = "w-full py-3 cursor-pointer font-medium bg-[#4cb080] text-white hover:bg-[#3e9169] transition" > Buy now < /button> <
        /div> <
        /div> <
        /div>

        <
        div className = "flex flex-col items-center mt-24" >
        <
        div className = "flex flex-col items-center w-max" >
        <
        p className = "text-3xl font-medium" > Related Products < /p> <
        div className = "w-20 h-1 bg-[#4cb080] rounded-full mt-2" > < /div> <
        /div> <
        div className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-10 w-full" > {
            relatedProducts.map((item, index) => ( <
                ProductCard key = { index }
                product = { item }
                />
            ))
        } <
        /div> <
        /div> <
        /div>
    );
};

export default ProductDetails;
