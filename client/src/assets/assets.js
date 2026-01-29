import veggies_img from "./veggies.png"
import fruitts_img from "./fruitts.png"
import drinks_img from "./drinks.png"
import instantfood_img from "./instantfood.png"
import dairy_img from "./dairy.png"
import bread_img from "./bread.png"
import cereals_img from "./cereals.png"

import star_icon from "./star.png"
import star_dull_icon from "./star_dull.png"

import potato_img from "./potato.png"
import tomato_img from "./tomato.png"
import onion_img from "./onion.png"
import spinach_img from "./spinach.png"
import carrot_img from "./carrot.png"
import apple_img from "./apple.png"
import orange_img from "./orange.png"
import grapes_img from "./grapes.png"
import mango_img from "./mango.png"
import pomegranate_img from "./pomegranate.png"

import pepsi_img from "./pepsi.png"
import fanta_img from "./fanta.png"
import miranda_img from "./miranda.png"
import maaza_img from "./maaza.png"
import slice_img from "./slice.png"

import milk_img from "./mpowder.png"
import butter_img from "./butter.png"
import cheese_img from "./cheese.png"
import paneer_img from "./panner.png"
import ghee_img from "./ghee.png"

import bread_item_img from "./bread.png"
import buns_img from "./buns.png"
import cupcakes_img from "./cupcakes.png"
import cookies_img from "./cokkies.png"
import chocolate_img from "./chocolate.png"

import maggie_img from "./magiee.png"
import top_ramen_img from "./tramen.png"
import yippee_img from "./yipee.png"
import knorr_img from "./knorr.png"
import anil_img from "./anil.png"

import mysore_dal_img from "./mysoredall.png"
import toor_dal_img from "./toor dall .png"
import urad_img from "./urad.png"
import rice_img from "./rice.png"
import barley_img from "./barley.png"

export const assets = {
    veggies_img,
    fruitts_img,
    drinks_img,
    instantfood_img,
    dairy_img,
    bread_img,
    cereals_img,
    star_icon,
    star_dull_icon
}

export const categories = [
    { text: "Organic Veggies", image: veggies_img, bgColor: "#DFF5EA" },
    { text: "Fresh Fruits", image: fruitts_img, bgColor: "#ECF7EE" },
    { text: "Cold Drinks", image: drinks_img, bgColor: "#FDF0E7" },
    { text: "Instant Food", image: instantfood_img, bgColor: "#EDF1F7" },
    { text: "Dairy Products", image: dairy_img, bgColor: "#F3E8FB" },
    { text: "Breads & Bakery", image: bread_img, bgColor: "#E7F9FD" },
    { text: "Cereals & Grains", image: cereals_img, bgColor: "#FBF1E8" }
]

export const dummyProducts = [{
        _id: "p1",
        name: "Potato 500g",
        category: "Vegetables",
        price: 25,
        offerPrice: 15,
        rating: 4,
        image: potato_img,
        instock: true,
        description: ["Farm-fresh premium quality potatoes", "Rich in essential carbohydrates", "Perfect for daily cooking needs"]
    },
    {
        _id: "p2",
        name: "Tomato 1kg",
        category: "Vegetables",
        price: 40,
        offerPrice: 30,
        rating: 5,
        image: tomato_img,
        instock: true,
        description: ["Hand-picked ripe red tomatoes", "High in Vitamin C and Lycopene", "Perfect for salads and gravies"]
    },
    {
        _id: "p3",
        name: "Onion 1kg",
        category: "Vegetables",
        price: 35,
        offerPrice: 28,
        rating: 4,
        image: onion_img,
        instock: true,
        description: ["Crisp and pungent flavored onions", "Essential ingredient for all Indian dishes", "Stored in hygienic conditions"]
    },
    {
        _id: "p4",
        name: "Spinach Bunch",
        category: "Vegetables",
        price: 20,
        offerPrice: 12,
        rating: 5,
        image: spinach_img,
        instock: true,
        description: ["Freshly harvested green leafy spinach", "Extremely rich source of iron", "Naturally grown without harmful pesticides"]
    },
    {
        _id: "p5",
        name: "Carrot 500g",
        category: "Vegetables",
        price: 30,
        offerPrice: 22,
        rating: 4,
        image: carrot_img,
        instock: true,
        description: ["Sweet and crunchy orange carrots", "Excellent source of Vitamin A", "Ideal for healthy salads and juices"]
    },
    {
        _id: "p6",
        name: "Apple 1kg",
        category: "Fruits",
        price: 120,
        offerPrice: 99,
        rating: 5,
        image: apple_img,
        instock: true,
        description: ["Premium crisp and sweet apples", "Packed with dietary fiber", "High quality export-grade fruit"]
    },
    {
        _id: "p7",
        name: "Orange 1kg",
        category: "Fruits",
        price: 80,
        offerPrice: 65,
        rating: 4,
        image: orange_img,
        instock: true,
        description: ["Juicy citrus oranges with thin skin", "Rich in natural Vitamin C", "Best for boosting immunity"]
    },
    {
        _id: "p8",
        name: "Grapes 500g",
        category: "Fruits",
        price: 70,
        offerPrice: 55,
        rating: 4,
        image: grapes_img,
        instock: true,
        description: ["Seedless sweet green grapes", "Hygienically cleaned and packed", "Perfect healthy snack for children"]
    },
    {
        _id: "p9",
        name: "Mango 1kg",
        category: "Fruits",
        price: 150,
        offerPrice: 120,
        rating: 5,
        image: mango_img,
        instock: true,
        description: ["Naturally ripened sweet mangoes", "Velvety texture and aromatic flavor", "Sourced from the best orchards"]
    },
    {
        _id: "p10",
        name: "Pomegranate 1kg",
        category: "Fruits",
        price: 180,
        offerPrice: 160,
        rating: 5,
        image: pomegranate_img,
        instock: true,
        description: ["Premium red pomegranate seeds", "High in heart-healthy antioxidants", "Freshly picked for maximum juice"]
    },
    {
        _id: "p11",
        name: "Pepsi 1L",
        category: "Drinks",
        price: 60,
        offerPrice: 50,
        rating: 4,
        image: pepsi_img,
        instock: true,
        description: ["Classic refreshing cola taste", "Best served chilled for maximum fizz", "Perfect for parties and gatherings"]
    },
    {
        _id: "p12",
        name: "Fanta 1L",
        category: "Drinks",
        price: 60,
        offerPrice: 50,
        rating: 4,
        image: fanta_img,
        instock: true,
        description: ["Vibrant bubbly orange flavor", "Instantly refreshes and energizes", "Loved by all age groups"]
    },
    {
        _id: "p13",
        name: "Miranda 1L",
        category: "Drinks",
        price: 60,
        offerPrice: 50,
        rating: 4,
        image: miranda_img,
        instock: true,
        description: ["Tangy orange fruit flavored drink", "Refreshing fizz in every sip", "Great companion for snacks"]
    },
    {
        _id: "p14",
        name: "Maaza 1L",
        category: "Drinks",
        price: 75,
        offerPrice: 65,
        rating: 5,
        image: maaza_img,
        instock: true,
        description: ["Made from real hand-picked mangoes", "Thick and pulpy original taste", "No artificial colors or flavors"]
    },
    {
        _id: "p15",
        name: "Slice Mango",
        category: "Drinks",
        price: 40,
        offerPrice: 35,
        rating: 4,
        image: slice_img,
        instock: true,
        description: ["Indulgent mango fruit drink", "Rich and smooth texture", "Offers the taste of real Alphonso mangoes"]
    },
    {
        _id: "p16",
        name: "Milk Powder",
        category: "Dairy",
        price: 55,
        offerPrice: 50,
        rating: 4,
        image: milk_img,
        instock: true,
        description: ["Premium quality instant milk powder", "Rich in calcium and proteins", "Ideal for tea, coffee, and desserts"]
    },
    {
        _id: "p17",
        name: "Butter 500g",
        category: "Dairy",
        price: 250,
        offerPrice: 220,
        rating: 5,
        image: butter_img,
        instock: true,
        description: ["Creamy and delicious salted butter", "Made from pure cow milk", "Perfect spread for bread and parathas"]
    },
    {
        _id: "p18",
        name: "Cheese Block",
        category: "Dairy",
        price: 180,
        offerPrice: 160,
        rating: 5,
        image: cheese_img,
        instock: true,
        description: ["Freshly processed cheddar cheese block", "Easy to grate and melt", "High in protein and nutrition"]
    },
    {
        _id: "p19",
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 75,
        rating: 5,
        image: paneer_img,
        instock: true,
        description: ["Ultra-soft and fresh cottage cheese", "Vaccum packed for longer freshness", "High protein source for vegetarians"]
    },
    {
        _id: "p20",
        name: "Ghee 500ml",
        category: "Dairy",
        price: 320,
        offerPrice: 280,
        rating: 5,
        image: ghee_img,
        instock: true,
        description: ["Pure traditional ghee", "Rich aroma and golden texture", "Healthy fats for a balanced diet"]
    },
    {
        _id: "p21",
        name: "Bread",
        category: "Bakery",
        price: 40,
        offerPrice: 35,
        rating: 4,
        image: bread_item_img,
        instock: true,
        description: ["Freshly baked soft white bread", "Prepared with premium quality wheat", "Ideal for daily breakfast sandwiches"]
    },
    {
        _id: "p22",
        name: "Buns Pack",
        category: "Bakery",
        price: 35,
        offerPrice: 30,
        rating: 4,
        image: buns_img,
        instock: true,
        description: ["Light and fluffy burger buns", "Baked fresh every single day", "Perfect for making homemade burgers"]
    },
    {
        _id: "p23",
        name: "Cupcakes",
        category: "Bakery",
        price: 100,
        offerPrice: 85,
        rating: 5,
        image: cupcakes_img,
        instock: true,
        description: ["Delightful soft and moist cupcakes", "Available in premium flavors", "Great for parties and small treats"]
    },
    {
        _id: "p24",
        name: "Choco Cookies",
        category: "Bakery",
        price: 50,
        offerPrice: 45,
        rating: 4,
        image: cookies_img,
        instock: true,
        description: ["Crispy cookies with dark choco chips", "Baked to a perfect golden crunch", "Best enjoyed with milk or coffee"]
    },
    {
        _id: "p25",
        name: "Dark Chocolate",
        category: "Bakery",
        price: 80,
        offerPrice: 70,
        rating: 5,
        image: chocolate_img,
        instock: true,
        description: ["Rich cocoa premium dark chocolate", "Perfectly balanced bitter-sweet taste", "Ideal for baking or direct consumption"]
    },
    {
        _id: "p26",
        name: "Maggie",
        category: "Instant Food",
        price: 60,
        offerPrice: 55,
        rating: 5,
        image: maggie_img,
        instock: true,
        description: ["Classic 2-minute instant masala noodles", "Delicious secret spice mix included", "The favorite quick meal solution"]
    },
    {
        _id: "p27",
        name: "Top Ramen",
        category: "Instant Food",
        price: 55,
        offerPrice: 50,
        rating: 4,
        image: top_ramen_img,
        instock: true,
        description: ["Smooth and non-sticky instant noodles", "Authentic curry flavored spices", "Easy to cook and highly satisfying"]
    },
    {
        _id: "p28",
        name: "Yippee",
        category: "Instant Food",
        price: 55,
        offerPrice: 48,
        rating: 4,
        image: yippee_img,
        instock: true,
        description: ["Round noodles that don't lump", "Loaded with real vegetable bits", "Long slurpy noodles for more fun"]
    },
    {
        _id: "p29",
        name: "Knorr Soup",
        category: "Instant Food",
        price: 50,
        offerPrice: 40,
        rating: 4,
        image: knorr_img,
        instock: true,
        description: ["Healthy instant mixed vegetable soup", "Made with 100% real vegetables", "Ready to serve in just 3 minutes"]
    },
    {
        _id: "p30",
        name: "Anil",
        category: "Instant Food",
        price: 350,
        offerPrice: 320,
        rating: 4,
        image: anil_img,
        instock: true,
        description: ["Premium roasted wheat vermicelli", "Prepared using traditional methods", "Ideal for sweet and savory dishes"]
    },
    {
        _id: "p31",
        name: "Mysore Dal",
        category: "Cereals",
        price: 180,
        offerPrice: 160,
        rating: 5,
        image: mysore_dal_img,
        instock: true,
        description: ["Unpolished split red lentils (Masoor)", "Rich source of plant-based protein", "Cooks quickly into a creamy texture"]
    },
    {
        _id: "p32",
        name: "Toor Dal",
        category: "Cereals",
        price: 160,
        offerPrice: 145,
        rating: 4,
        image: toor_dal_img,
        instock: true,
        description: ["Highest quality Arhar / Toor Dal", "Naturally rich in iron and fiber", "Perfect for traditional sambar and dal"]
    },
    {
        _id: "p33",
        name: "Urad Dal",
        category: "Cereals",
        price: 150,
        offerPrice: 135,
        rating: 4,
        image: urad_img,
        instock: true,
        description: ["Premium split white Urad Dal", "Essential for making fluffy idlis", "Free from artificial colors or polish"]
    },
    {
        _id: "p34",
        name: "Rice 1kg",
        category: "Cereals",
        price: 60,
        offerPrice: 55,
        rating: 4,
        image: rice_img,
        instock: true,
        description: ["Aromatic long-grain polished rice", "Fluffy and non-sticky after cooking", "Sourced from the best paddy fields"]
    },
    {
        _id: "p35",
        name: "Barley 1kg",
        category: "Cereals",
        price: 120,
        offerPrice: 100,
        rating: 4,
        image: barley_img,
        instock: true,
        description: ["Healthy and natural whole barley grains", "Great for weight management", "Can be used in soups and beverages"]
    }
]

export const footerLinks = [
    { title: "Quick Links", links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"] },
    { title: "Need help?", links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"] },
    { title: "Follow Us", links: ["Instagram", "Twitter", "Facebook", "YouTube"] }
]

export const dummyAddress = [{
        _id: "a1",
        street: "123 Green Avenue",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        zipcode: "400001"
    },
    {
        _id: "a2",
        street: "456 Garden Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        zipcode: "560001"
    }
]
export const dummyOrders = [{
        _id: "67e2589af87e63366786400",
        items: [{
                product: dummyProducts[0], // Potato
                quantity: 2
            },
            {
                product: dummyProducts[5], // Apple
                quantity: 1
            }
        ],
        amount: 129,
        status: "Order Placed",
        paymentType: "Online",
        isPaid: true,
        createdAt: "2026-01-19T07:17:46.018Z"
    },
    {
        _id: "67e258798f87e633667863f3",
        items: [{
            product: dummyProducts[10],
            quantity: 3
        }],
        amount: 150,
        status: "Shipped",
        paymentType: "COD",
        isPaid: false,
        createdAt: "2026-01-18T09:12:13.068Z"
    }
];