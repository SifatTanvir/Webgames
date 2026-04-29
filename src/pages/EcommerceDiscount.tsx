import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Home } from "lucide-react"

export const TASK_ID_EccomerceDiscount = "ecommerce-couponcard-validcoupon"
export const PASSWORD_EcommerceDiscount = "funmarketing"

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: {
        width: number
        height: number
        depth: number
    }
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Array<{
        rating: number
        comment: string
        date: string
        reviewerName: string
        reviewerEmail: string
    }>
    returnPolicy: string
    minimumOrderQuantity: number
    meta: {
        createdAt: string
        updatedAt: string
        barcode: string
        qrCode: string
    }
    images: string[]
    thumbnail: string
    isDiscountEligible?: boolean
}

interface CartItem extends Product {
    quantity: number
}

const products = [
    {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
            "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "BEA-ESS-ESS-001",
        weight: 4,
        dimensions: {
            width: 15.14,
            height: 13.08,
            depth: 22.99,
        },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships in 3-5 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 3,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Eleanor Collins",
                reviewerEmail: "eleanor.collins@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Very satisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Lucas Gordon",
                reviewerEmail: "lucas.gordon@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Eleanor Collins",
                reviewerEmail: "eleanor.collins@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 48,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "5784719087687",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    },
    {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description:
            "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        category: "beauty",
        price: 19.99,
        discountPercentage: 18.19,
        rating: 2.86,
        stock: 34,
        tags: ["beauty", "eyeshadow"],
        brand: "Glamour Beauty",
        sku: "BEA-GLA-EYE-002",
        weight: 9,
        dimensions: {
            width: 9.26,
            height: 22.47,
            depth: 27.67,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Savannah Gomez",
                reviewerEmail: "savannah.gomez@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Awesome product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Christian Perez",
                reviewerEmail: "christian.perez@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nicholas Bailey",
                reviewerEmail: "nicholas.bailey@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 20,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "9170275171413",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    },
    {
        id: 3,
        title: "Powder Canister",
        description:
            "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
        category: "beauty",
        price: 14.99,
        discountPercentage: 9.84,
        rating: 4.64,
        stock: 89,
        tags: ["beauty", "face powder"],
        brand: "Velvet Touch",
        sku: "BEA-VEL-POW-003",
        weight: 8,
        dimensions: {
            width: 29.27,
            height: 27.93,
            depth: 20.59,
        },
        warrantyInformation: "3 months warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Alexander Jones",
                reviewerEmail: "alexander.jones@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Elijah Cruz",
                reviewerEmail: "elijah.cruz@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Very dissatisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Avery Perez",
                reviewerEmail: "avery.perez@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 22,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "8418883906837",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    },
    {
        id: 4,
        title: "Red Lipstick",
        description:
            "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 91,
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
            width: 18.11,
            height: 28.38,
            depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Liam Garcia",
                reviewerEmail: "liam.garcia@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Ruby Andrews",
                reviewerEmail: "ruby.andrews@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Clara Berry",
                reviewerEmail: "clara.berry@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "9467746727219",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    },
    {
        id: 5,
        title: "Red Nail Polish",
        description:
            "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
        category: "beauty",
        price: 8.99,
        discountPercentage: 11.44,
        rating: 4.32,
        stock: 79,
        tags: ["beauty", "nail polish"],
        brand: "Nail Couture",
        sku: "BEA-NAI-NAI-005",
        weight: 8,
        dimensions: {
            width: 21.63,
            height: 16.48,
            depth: 29.84,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 2,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Benjamin Wilson",
                reviewerEmail: "benjamin.wilson@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Liam Smith",
                reviewerEmail: "liam.smith@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Very unhappy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Clara Berry",
                reviewerEmail: "clara.berry@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 22,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "4063010628104",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
    },
    {
        id: 6,
        title: "Calvin Klein CK One",
        description:
            "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
        category: "fragrances",
        price: 49.99,
        discountPercentage: 1.89,
        rating: 4.37,
        stock: 29,
        tags: ["fragrances", "perfumes"],
        brand: "Calvin Klein",
        sku: "FRA-CAL-CAL-006",
        weight: 7,
        dimensions: {
            width: 29.36,
            height: 27.76,
            depth: 20.72,
        },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 2,
                comment: "Very disappointed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Layla Young",
                reviewerEmail: "layla.young@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Fast shipping!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Daniel Cook",
                reviewerEmail: "daniel.cook@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Not as described!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Jacob Cooper",
                reviewerEmail: "jacob.cooper@x.dummyjson.com",
            },
        ],
        returnPolicy: "90 days return policy",
        minimumOrderQuantity: 9,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "2451534060749",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
    },
    {
        id: 7,
        title: "Chanel Coco Noir Eau De",
        description:
            "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
        category: "fragrances",
        price: 129.99,
        discountPercentage: 16.51,
        rating: 4.26,
        stock: 58,
        tags: ["fragrances", "perfumes"],
        brand: "Chanel",
        sku: "FRA-CHA-CHA-007",
        weight: 7,
        dimensions: {
            width: 24.5,
            height: 25.7,
            depth: 25.98,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Ruby Andrews",
                reviewerEmail: "ruby.andrews@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Awesome product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Leah Henderson",
                reviewerEmail: "leah.henderson@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Very happy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Xavier Wright",
                reviewerEmail: "xavier.wright@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 1,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "4091737746820",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    },
    {
        id: 8,
        title: "Dior J'adore",
        description:
            "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
        category: "fragrances",
        price: 89.99,
        discountPercentage: 14.72,
        rating: 3.8,
        stock: 98,
        tags: ["fragrances", "perfumes"],
        brand: "Dior",
        sku: "FRA-DIO-DIO-008",
        weight: 4,
        dimensions: {
            width: 27.67,
            height: 28.28,
            depth: 11.83,
        },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Great value for money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nicholas Bailey",
                reviewerEmail: "nicholas.bailey@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Great value for money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Penelope Harper",
                reviewerEmail: "penelope.harper@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Emma Miller",
                reviewerEmail: "emma.miller@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 10,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "1445086097250",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
    },
    {
        id: 9,
        title: "Dolce Shine Eau de",
        description:
            "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
        category: "fragrances",
        price: 69.99,
        discountPercentage: 0.62,
        rating: 3.96,
        stock: 4,
        tags: ["fragrances", "perfumes"],
        brand: "Dolce & Gabbana",
        sku: "FRA-DOL-DOL-009",
        weight: 6,
        dimensions: {
            width: 27.28,
            height: 29.88,
            depth: 18.3,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
            {
                rating: 4,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Mateo Bennett",
                reviewerEmail: "mateo.bennett@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly recommended!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nolan Gonzalez",
                reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Very happy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Aurora Lawson",
                reviewerEmail: "aurora.lawson@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 2,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "3023868210708",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
    },
    {
        id: 10,
        title: "Gucci Bloom Eau de",
        description:
            "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
        category: "fragrances",
        price: 79.99,
        discountPercentage: 14.39,
        rating: 2.74,
        stock: 91,
        tags: ["fragrances", "perfumes"],
        brand: "Gucci",
        sku: "FRA-GUC-GUC-010",
        weight: 7,
        dimensions: {
            width: 20.92,
            height: 21.68,
            depth: 11.2,
        },
        warrantyInformation: "6 months warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 1,
                comment: "Very dissatisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Cameron Perez",
                reviewerEmail: "cameron.perez@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Very happy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Daniel Cook",
                reviewerEmail: "daniel.cook@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Addison Wright",
                reviewerEmail: "addison.wright@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 2,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "3170832177880",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
            "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
    },
    {
        id: 11,
        title: "Annibale Colombo Bed",
        description:
            "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
        category: "furniture",
        price: 1899.99,
        discountPercentage: 8.57,
        rating: 4.77,
        stock: 88,
        tags: ["furniture", "beds"],
        brand: "Annibale Colombo",
        sku: "FUR-ANN-ANN-011",
        weight: 10,
        dimensions: {
            width: 28.16,
            height: 25.36,
            depth: 17.28,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 2,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Christopher West",
                reviewerEmail: "christopher.west@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Vivian Carter",
                reviewerEmail: "vivian.carter@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Mason Wright",
                reviewerEmail: "mason.wright@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 1,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "3610757456581",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
    },
    {
        id: 12,
        title: "Annibale Colombo Sofa",
        description:
            "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
        category: "furniture",
        price: 2499.99,
        discountPercentage: 14.4,
        rating: 3.92,
        stock: 60,
        tags: ["furniture", "sofas"],
        brand: "Annibale Colombo",
        sku: "FUR-ANN-ANN-012",
        weight: 6,
        dimensions: {
            width: 12.75,
            height: 20.55,
            depth: 19.06,
        },
        warrantyInformation: "Lifetime warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 3,
                comment: "Very unhappy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Christian Perez",
                reviewerEmail: "christian.perez@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Fast shipping!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Lillian Bishop",
                reviewerEmail: "lillian.bishop@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Lillian Simmons",
                reviewerEmail: "lillian.simmons@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 1,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "1777662847736",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
            "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
    },
    {
        id: 13,
        title: "Bedside Table African Cherry",
        description:
            "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
        category: "furniture",
        price: 299.99,
        discountPercentage: 19.09,
        rating: 2.87,
        stock: 64,
        tags: ["furniture", "bedside tables"],
        brand: "Furniture Co.",
        sku: "FUR-FUR-BED-013",
        weight: 2,
        dimensions: {
            width: 13.47,
            height: 24.99,
            depth: 27.35,
        },
        warrantyInformation: "5 year warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Aaliyah Hanson",
                reviewerEmail: "aaliyah.hanson@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Liam Smith",
                reviewerEmail: "liam.smith@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly recommended!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Avery Barnes",
                reviewerEmail: "avery.barnes@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 3,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "6441287925979",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
            "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
            "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
    },
    {
        id: 14,
        title: "Knoll Saarinen Executive Conference Chair",
        description:
            "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
        category: "furniture",
        price: 499.99,
        discountPercentage: 2.01,
        rating: 4.88,
        stock: 26,
        tags: ["furniture", "office chairs"],
        brand: "Knoll",
        sku: "FUR-KNO-KNO-014",
        weight: 10,
        dimensions: {
            width: 13.81,
            height: 7.5,
            depth: 5.62,
        },
        warrantyInformation: "2 year warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 2,
                comment: "Waste of money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Ella Cook",
                reviewerEmail: "ella.cook@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Very dissatisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Clara Berry",
                reviewerEmail: "clara.berry@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Elena Long",
                reviewerEmail: "elena.long@x.dummyjson.com",
            },
        ],
        returnPolicy: "60 days return policy",
        minimumOrderQuantity: 5,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "8919386859966",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
            "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
            "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp",
        ],
        thumbnail:
            "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
    },
    {
        id: 15,
        title: "Wooden Bathroom Sink With Mirror",
        description:
            "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
        category: "furniture",
        price: 799.99,
        discountPercentage: 8.8,
        rating: 3.59,
        stock: 7,
        tags: ["furniture", "bathroom"],
        brand: "Bath Trends",
        sku: "FUR-BAT-WOO-015",
        weight: 10,
        dimensions: {
            width: 7.98,
            height: 8.88,
            depth: 28.46,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 3-5 business days",
        availabilityStatus: "Low Stock",
        reviews: [
            {
                rating: 4,
                comment: "Fast shipping!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Logan Torres",
                reviewerEmail: "logan.torres@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Very pleased!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Aria Parker",
                reviewerEmail: "aria.parker@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Dylan Wells",
                reviewerEmail: "dylan.wells@x.dummyjson.com",
            },
        ],
        returnPolicy: "60 days return policy",
        minimumOrderQuantity: 2,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "1958104402873",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
            "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
            "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
    },
    {
        id: 16,
        title: "Apple",
        description: "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
        category: "groceries",
        price: 1.99,
        discountPercentage: 12.62,
        rating: 4.19,
        stock: 8,
        tags: ["fruits"],
        sku: "GRO-BRD-APP-016",
        weight: 9,
        dimensions: {
            width: 13.66,
            height: 11.01,
            depth: 9.73,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Very satisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Sophia Brown",
                reviewerEmail: "sophia.brown@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Very dissatisfied!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Scarlett Bowman",
                reviewerEmail: "scarlett.bowman@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Very unhappy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "William Gonzalez",
                reviewerEmail: "william.gonzalez@x.dummyjson.com",
            },
        ],
        returnPolicy: "90 days return policy",
        minimumOrderQuantity: 7,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "7962803553314",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
    },
    {
        id: 17,
        title: "Beef Steak",
        description: "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
        category: "groceries",
        price: 12.99,
        discountPercentage: 9.61,
        rating: 4.47,
        stock: 86,
        tags: ["meat"],
        sku: "GRO-BRD-BEE-017",
        weight: 10,
        dimensions: {
            width: 18.9,
            height: 5.77,
            depth: 18.57,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 3,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Eleanor Tyler",
                reviewerEmail: "eleanor.tyler@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Fast shipping!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Alexander Jones",
                reviewerEmail: "alexander.jones@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Great value for money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Natalie Harris",
                reviewerEmail: "natalie.harris@x.dummyjson.com",
            },
        ],
        returnPolicy: "60 days return policy",
        minimumOrderQuantity: 43,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "5640063409695",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
    },
    {
        id: 18,
        title: "Cat Food",
        description: "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
        category: "groceries",
        price: 8.99,
        discountPercentage: 9.58,
        rating: 3.13,
        stock: 46,
        tags: ["pet supplies", "cat food"],
        sku: "GRO-BRD-FOO-018",
        weight: 10,
        dimensions: {
            width: 18.08,
            height: 9.26,
            depth: 21.86,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 3,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Noah Lewis",
                reviewerEmail: "noah.lewis@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Very unhappy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Ruby Andrews",
                reviewerEmail: "ruby.andrews@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Very disappointed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Ethan Thompson",
                reviewerEmail: "ethan.thompson@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 18,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "1483991328610",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
    },
    {
        id: 19,
        title: "Chicken Meat",
        description: "Fresh and tender chicken meat, suitable for various culinary preparations.",
        category: "groceries",
        price: 9.99,
        discountPercentage: 13.7,
        rating: 3.19,
        stock: 97,
        tags: ["meat"],
        sku: "GRO-BRD-CHI-019",
        weight: 1,
        dimensions: {
            width: 11.03,
            height: 22.11,
            depth: 16.01,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Mateo Bennett",
                reviewerEmail: "mateo.bennett@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly recommended!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Jackson Evans",
                reviewerEmail: "jackson.evans@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Not worth the price!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Sadie Morales",
                reviewerEmail: "sadie.morales@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 22,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "8829514594521",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
            "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/2.webp",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
    },
    {
        id: 20,
        title: "Cooking Oil",
        description: "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
        category: "groceries",
        price: 4.99,
        discountPercentage: 9.33,
        rating: 4.8,
        stock: 10,
        tags: ["cooking essentials"],
        sku: "GRO-BRD-COO-020",
        weight: 5,
        dimensions: {
            width: 19.95,
            height: 27.54,
            depth: 24.86,
        },
        warrantyInformation: "Lifetime warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Very happy with my purchase!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Victoria McDonald",
                reviewerEmail: "victoria.mcdonald@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Hazel Evans",
                reviewerEmail: "hazel.evans@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Zoe Bennett",
                reviewerEmail: "zoe.bennett@x.dummyjson.com",
            },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 46,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "4874727824518",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
    },
    {
        id: 21,
        title: "Cucumber",
        description: "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
        category: "groceries",
        price: 1.49,
        discountPercentage: 0.16,
        rating: 4.07,
        stock: 84,
        tags: ["vegetables"],
        sku: "GRO-BRD-CUC-021",
        weight: 4,
        dimensions: {
            width: 12.8,
            height: 28.38,
            depth: 21.34,
        },
        warrantyInformation: "2 year warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Lincoln Kelly",
                reviewerEmail: "lincoln.kelly@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Great value for money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Savannah Gomez",
                reviewerEmail: "savannah.gomez@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "James Davis",
                reviewerEmail: "james.davis@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 2,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "5300066378225",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
    },
    {
        id: 22,
        title: "Dog Food",
        description: "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
        category: "groceries",
        price: 10.99,
        discountPercentage: 10.27,
        rating: 4.55,
        stock: 71,
        tags: ["pet supplies", "dog food"],
        sku: "GRO-BRD-FOO-022",
        weight: 10,
        dimensions: {
            width: 16.93,
            height: 27.15,
            depth: 9.29,
        },
        warrantyInformation: "No warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nicholas Edwards",
                reviewerEmail: "nicholas.edwards@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Awesome product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Zachary Lee",
                reviewerEmail: "zachary.lee@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nova Cooper",
                reviewerEmail: "nova.cooper@x.dummyjson.com",
            },
        ],
        returnPolicy: "60 days return policy",
        minimumOrderQuantity: 43,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "5906686116469",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
    },
    {
        id: 23,
        title: "Eggs",
        description: "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
        category: "groceries",
        price: 2.99,
        discountPercentage: 11.05,
        rating: 2.53,
        stock: 9,
        tags: ["dairy"],
        sku: "GRO-BRD-EGG-023",
        weight: 2,
        dimensions: {
            width: 11.42,
            height: 7.44,
            depth: 16.95,
        },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 3,
                comment: "Disappointing product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Penelope King",
                reviewerEmail: "penelope.king@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Poor quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Eleanor Tyler",
                reviewerEmail: "eleanor.tyler@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Very pleased!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Benjamin Foster",
                reviewerEmail: "benjamin.foster@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 32,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "3478638588469",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
    },
    {
        id: 24,
        title: "Fish Steak",
        description: "Quality fish steak, suitable for grilling, baking, or pan-searing.",
        category: "groceries",
        price: 14.99,
        discountPercentage: 4.23,
        rating: 3.78,
        stock: 74,
        tags: ["seafood"],
        sku: "GRO-BRD-FIS-024",
        weight: 6,
        dimensions: {
            width: 14.95,
            height: 26.31,
            depth: 11.27,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 3-5 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 2,
                comment: "Would not buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Caleb Perkins",
                reviewerEmail: "caleb.perkins@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Isabella Jackson",
                reviewerEmail: "isabella.jackson@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Great value for money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nathan Dixon",
                reviewerEmail: "nathan.dixon@x.dummyjson.com",
            },
        ],
        returnPolicy: "60 days return policy",
        minimumOrderQuantity: 50,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "9595036192098",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
    },
    {
        id: 25,
        title: "Green Bell Pepper",
        description: "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
        category: "groceries",
        price: 1.29,
        discountPercentage: 0.16,
        rating: 3.25,
        stock: 33,
        tags: ["vegetables"],
        sku: "GRO-BRD-GRE-025",
        weight: 2,
        dimensions: {
            width: 15.33,
            height: 26.65,
            depth: 14.44,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Highly recommended!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Avery Carter",
                reviewerEmail: "avery.carter@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Would not recommend!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Henry Hill",
                reviewerEmail: "henry.hill@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Addison Wright",
                reviewerEmail: "addison.wright@x.dummyjson.com",
            },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 12,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "2365227493323",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
    },
    {
        id: 26,
        title: "Green Chili Pepper",
        description: "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
        category: "groceries",
        price: 0.99,
        discountPercentage: 1,
        rating: 3.66,
        stock: 3,
        tags: ["vegetables"],
        sku: "GRO-BRD-GRE-026",
        weight: 7,
        dimensions: {
            width: 15.38,
            height: 18.12,
            depth: 19.92,
        },
        warrantyInformation: "2 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "Low Stock",
        reviews: [
            {
                rating: 4,
                comment: "Great product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Luna Russell",
                reviewerEmail: "luna.russell@x.dummyjson.com",
            },
            {
                rating: 1,
                comment: "Waste of money!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Noah Lewis",
                reviewerEmail: "noah.lewis@x.dummyjson.com",
            },
            {
                rating: 3,
                comment: "Very disappointed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Clara Berry",
                reviewerEmail: "clara.berry@x.dummyjson.com",
            },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 39,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "9335000538563",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
    },
    {
        id: 27,
        title: "Honey Jar",
        description: "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
        category: "groceries",
        price: 6.99,
        discountPercentage: 14.4,
        rating: 3.97,
        stock: 34,
        tags: ["condiments"],
        sku: "GRO-BRD-HON-027",
        weight: 2,
        dimensions: {
            width: 9.28,
            height: 21.72,
            depth: 17.74,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 1,
                comment: "Very disappointed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Autumn Gomez",
                reviewerEmail: "autumn.gomez@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Benjamin Wilson",
                reviewerEmail: "benjamin.wilson@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Very disappointed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nicholas Edwards",
                reviewerEmail: "nicholas.edwards@x.dummyjson.com",
            },
        ],
        returnPolicy: "90 days return policy",
        minimumOrderQuantity: 47,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "6354306346329",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
    },
    {
        id: 28,
        title: "Ice Cream",
        description: "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
        category: "groceries",
        price: 5.49,
        discountPercentage: 8.69,
        rating: 3.39,
        stock: 27,
        tags: ["desserts"],
        sku: "GRO-BRD-CRE-028",
        weight: 1,
        dimensions: {
            width: 14.83,
            height: 15.07,
            depth: 24.2,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Very pleased!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Elijah Cruz",
                reviewerEmail: "elijah.cruz@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Jace Smith",
                reviewerEmail: "jace.smith@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Highly impressed!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Sadie Morales",
                reviewerEmail: "sadie.morales@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 42,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "0788954559076",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
            "https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp",
            "https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp",
            "https://cdn.dummyjson.com/public/qr-code.png",
        ],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
    },
    {
        id: 29,
        title: "Juice",
        description: "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
        category: "groceries",
        price: 3.99,
        discountPercentage: 12.06,
        rating: 3.94,
        stock: 50,
        tags: ["beverages"],
        sku: "GRO-BRD-JUI-029",
        weight: 1,
        dimensions: {
            width: 18.56,
            height: 21.46,
            depth: 28.02,
        },
        warrantyInformation: "6 months warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 5,
                comment: "Excellent quality!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nolan Gonzalez",
                reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Would buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Bella Grant",
                reviewerEmail: "bella.grant@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Awesome product!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Aria Flores",
                reviewerEmail: "aria.flores@x.dummyjson.com",
            },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 25,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "6936112580956",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/juice/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
    },
    {
        id: 30,
        title: "Kiwi",
        description: "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
        category: "groceries",
        price: 2.49,
        discountPercentage: 15.22,
        rating: 4.93,
        stock: 99,
        tags: ["fruits"],
        sku: "GRO-BRD-KIW-030",
        weight: 5,
        dimensions: {
            width: 19.4,
            height: 18.67,
            depth: 17.13,
        },
        warrantyInformation: "6 months warranty",
        shippingInformation: "Ships overnight",
        availabilityStatus: "In Stock",
        reviews: [
            {
                rating: 4,
                comment: "Highly recommended!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Emily Brown",
                reviewerEmail: "emily.brown@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Would not buy again!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Jackson Morales",
                reviewerEmail: "jackson.morales@x.dummyjson.com",
            },
            {
                rating: 4,
                comment: "Fast shipping!",
                date: "2025-04-30T09:41:02.053Z",
                reviewerName: "Nora Russell",
                reviewerEmail: "nora.russell@x.dummyjson.com",
            },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 30,
        meta: {
            createdAt: "2025-04-30T09:41:02.053Z",
            updatedAt: "2025-04-30T09:41:02.053Z",
            barcode: "2530169917252",
            qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: ["https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp"],
        thumbnail: "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
    },
]

declare global {
    interface Window {
        __PAIR_PRODUCTS?: number[] | null
        __PAIR_COUPON?: string | null
    }
}

export default function EcommerceDiscount() {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    // const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterDiscountEligible, setFilterDiscountEligible] = useState(false)
    const [sortBy, setSortBy] = useState<"none" | "lowToHigh" | "highToLow">("none")
    const [activeView, setActiveView] = useState<"dashboard" | "coupons" | "checkout">("dashboard")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [checkoutForm, setCheckoutForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })
    const [couponCodeInput, setCouponCodeInput] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
    const [secretPassword, setSecretPassword] = useState<string | null>(null)
    const [checkoutError, setCheckoutError] = useState<string | null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [hasMadeIncorrectAttempt, setHasMadeIncorrectAttempt] = useState(false)
    const [showAddToCartTooltip, setShowAddToCartTooltip] = useState(false)
    const [tooltipProductName, setTooltipProductName] = useState("")
    const [coupon1Code, setCoupon1Code] = useState("")
    const [coupon2Code, setCoupon2Code] = useState("")
    const DISCOUNT_PERCENTAGE_1 = 0.1 
    const DISCOUNT_PERCENTAGE_2 = 0.3 
    const [targetProductsForSecret, setTargetProductsForSecret] = useState<Product[]>([])
    const [targetCouponForSecret, setTargetCouponForSecret] = useState<string | null>(null)
    const [addToCartStatus, setAddToCartStatus] = useState<{ [productId: number]: "idle" | "adding" | "added" }>({})

    const HARDCODED_CHECKOUT = {
        name: "Alice",
        email: "alice@example.com",
        phone: "9876543210",
        address: "123 Main St, City, Country",
    }

    const shuffleArray = useCallback(<T extends any[]>(array: T): T => {
        const arr = [...array] as T
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }, [])

    const resetTask = useCallback(() => {
        const generateRandomCode = (prefix: string) => {
            return prefix + Math.random().toString(36).substring(2, 8).toUpperCase()
        }

        const c1 = generateRandomCode("SAVE")
        const c2 = generateRandomCode("BUY")
        setCoupon1Code(c1)
        setCoupon2Code(c2)

        const allProductsWithEligibility = products.map((product) => ({
            ...product,
            isDiscountEligible: product.price > 20,
        }))

        const discountEligibleCandidates = allProductsWithEligibility.filter((p) => p.isDiscountEligible)

        let currentTargetProducts: any = []
        let currentTargetCoupon: string | null = null

        if (discountEligibleCandidates.length < 2) {
            console.warn(
                "Not enough discount-eligible products to form a pair for the secret. Secret feature might not work as expected.",
            )
            currentTargetProducts = shuffleArray(allProductsWithEligibility).slice(0, 2)
            currentTargetCoupon = c1
        } else {
            const shuffledEligible = shuffleArray(discountEligibleCandidates)
            currentTargetProducts = shuffledEligible.slice(0, 2)

            const availableCoupons = [c1, c2]
            currentTargetCoupon = availableCoupons[Math.floor(Math.random() * availableCoupons.length)]
        }

        setTargetProductsForSecret(currentTargetProducts)
        setTargetCouponForSecret(currentTargetCoupon)

        window.__PAIR_PRODUCTS = currentTargetProducts.map((p: any) => p.id)
        window.__PAIR_COUPON = currentTargetCoupon

        const initialDisplayedProducts: Product[] = []
        const numToDisplay = 12

        initialDisplayedProducts.push(...currentTargetProducts)

        const nonTargetProducts = allProductsWithEligibility.filter(
            (p) => !currentTargetProducts.some((targetP: any) => targetP.id === p.id),
        )

        const shuffledNonTargets = shuffleArray(nonTargetProducts)
        let i = 0
        while (initialDisplayedProducts.length < numToDisplay && i < shuffledNonTargets.length) {
            const productToAdd: any = shuffledNonTargets[i]
            if (!initialDisplayedProducts.some((p) => p.id === productToAdd.id)) {
                initialDisplayedProducts.push(productToAdd)
            }
            i++
        }

        const finalShuffledDisplayedProducts = shuffleArray(initialDisplayedProducts)

        setAllProducts(finalShuffledDisplayedProducts)
        // setDisplayedProducts(finalShuffledDisplayedProducts)

        setCart([])
        setCouponCodeInput("")
        setAppliedCoupon(null)
        setSecretPassword(null)
        setCheckoutError(null)
        setCheckoutForm({
            name: "",
            email: "",
            phone: "",
            address: "",
        })
        setShowSuccessModal(false)
        setActiveView("dashboard")
        setHasMadeIncorrectAttempt(false)
    }, [shuffleArray])

    useEffect(() => {
        resetTask()
    }, [resetTask])
    const cartTotal = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [cart])

    const discountEligibleCartCount = useMemo(() => {
        return cart.filter((item) => item.isDiscountEligible).reduce((sum, item) => sum + item.quantity, 0)
    }, [cart])

    const isCouponValid = useCallback(() => {
        if (!appliedCoupon) return false
        const baseConditionsMet = discountEligibleCartCount >= 2

        if (appliedCoupon === coupon1Code) {
            return baseConditionsMet && cartTotal > 20
        } else if (appliedCoupon === coupon2Code) {
            return baseConditionsMet && cartTotal > 50
        }
        return false
    }, [appliedCoupon, coupon1Code, coupon2Code, discountEligibleCartCount, cartTotal])

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts]
        if (searchTerm) {
            filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        if (filterDiscountEligible) {
            filtered = filtered.filter((product) => product.isDiscountEligible)
        }
        switch (sortBy) {
            case "lowToHigh":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "highToLow":
                filtered.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }
        return filtered
    }, [allProducts, searchTerm, filterDiscountEligible, sortBy])

    const handleAddToCart = useCallback((product: Product) => {
        setAddToCartStatus((prev) => ({ ...prev, [product.id]: "adding" }))
        setTimeout(() => {
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === product.id)
                if (existingItem) {
                    return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
                }
                return [...prevCart, { ...product, quantity: 1 }]
            })
            setTooltipProductName(product.title)
            setShowAddToCartTooltip(true)
            setAddToCartStatus((prev) => ({ ...prev, [product.id]: "added" }))
            setTimeout(() => {
                setShowAddToCartTooltip(false)
                setTooltipProductName("")
                setAddToCartStatus((prev) => ({ ...prev, [product.id]: "idle" }))
            }, 2000)
        }, 500)
    }, [])

    const handleRemoveFromCart = useCallback((productId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId)
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
            }
            return prevCart.filter((item) => item.id !== productId)
        })
    }, [])

    const handleCheckoutSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            setCheckoutError(null)
            setSecretPassword(null)

            const pairIds = (window.__PAIR_PRODUCTS || []) as number[]
            const requiredCoupon = window.__PAIR_COUPON

            console.log("--- Checkout Submission Debug ---")
            console.log("Target Product IDs:", pairIds)
            console.log(
                "Cart contents (IDs):",
                cart.map((item) => item.id),
            )
            console.log("Required Coupon:", requiredCoupon)
            console.log("Applied Coupon:", appliedCoupon)
            console.log("Current Checkout Form:", checkoutForm)
            console.log("Hardcoded Checkout Values:", HARDCODED_CHECKOUT)

            const hasTargetProductsInCartStrict =
                cart.length === pairIds.length && pairIds.every((id) => cart.some((item) => item.id === id))

            const hasCorrectAndValidCoupon = appliedCoupon && appliedCoupon === requiredCoupon && isCouponValid()

            const formIsCorrect =
                checkoutForm.name.trim().toLowerCase() === HARDCODED_CHECKOUT.name.toLowerCase() &&
                checkoutForm.email.trim().toLowerCase() === HARDCODED_CHECKOUT.email.toLowerCase() &&
                checkoutForm.phone.trim() === HARDCODED_CHECKOUT.phone &&
                checkoutForm.address.trim().toLowerCase() === HARDCODED_CHECKOUT.address.toLowerCase()

            console.log("hasTargetProductsInCartStrict:", hasTargetProductsInCartStrict)
            console.log("hasCorrectAndValidCoupon:", hasCorrectAndValidCoupon)
            console.log("isCouponValid() result:", isCouponValid())
            console.log("formIsCorrect:", formIsCorrect)
            console.log("hasMadeIncorrectAttempt (before update):", hasMadeIncorrectAttempt)

            let determinedSecret: string | null = null
            if (hasMadeIncorrectAttempt) {
                determinedSecret = "NO_COUPON_APPLIED"
            } else if (hasTargetProductsInCartStrict && hasCorrectAndValidCoupon && formIsCorrect) {
                determinedSecret = PASSWORD_EcommerceDiscount
            } else {
                determinedSecret = "NO_COUPON_APPLIED"
                setHasMadeIncorrectAttempt(true)
            }
            setSecretPassword(determinedSecret)
            setShowSuccessModal(true)
            setCart([])
            setCheckoutForm({
                name: "",
                email: "",
                phone: "",
                address: "",
            }) 
            setAppliedCoupon(null)
            setCouponCodeInput("")
        },
        [
            checkoutForm,
            appliedCoupon,
            isCouponValid,
            cart,
            HARDCODED_CHECKOUT,
            hasMadeIncorrectAttempt,
        ],
    )

    const handleApplyCoupon = useCallback(() => {
        const inputUpper = couponCodeInput.toUpperCase()
        if (inputUpper === coupon1Code || inputUpper === coupon2Code) {
            setAppliedCoupon(inputUpper)
            setCheckoutError(null)
        } else {
            setAppliedCoupon(null)
            setCheckoutError("Invalid coupon code.")
        }
    }, [couponCodeInput, coupon1Code, coupon2Code])

    const getDiscountedTotal = useCallback(() => {
        let total = cartTotal
        if (appliedCoupon && isCouponValid()) {
            if (appliedCoupon === coupon1Code) {
                total = Math.max(0, total * (1 - DISCOUNT_PERCENTAGE_1))
            } else if (appliedCoupon === coupon2Code) {
                total = Math.max(0, total * (1 - DISCOUNT_PERCENTAGE_2))
            }
        }
        return total
    }, [cartTotal, appliedCoupon, isCouponValid, coupon1Code, coupon2Code, DISCOUNT_PERCENTAGE_1, DISCOUNT_PERCENTAGE_2])

    const closeModal = useCallback(() => {
        setShowSuccessModal(false)
        setSecretPassword(null)
        setActiveView("dashboard")
        setCart([])
        setCheckoutForm({
            name: "",
            email: "",
            phone: "",
            address: "",
        })
        setAppliedCoupon(null)
        setCouponCodeInput("")
    }, [])

    const instructionMessage = useMemo(() => {
        if (targetProductsForSecret.length === 2 && targetCouponForSecret) {
            const product1 = targetProductsForSecret[0]
            const product2 = targetProductsForSecret[1]
            let couponType = ""
            if (targetCouponForSecret === coupon1Code) {
                couponType = `${DISCOUNT_PERCENTAGE_1 * 100}% off, cart over $20`
            } else if (targetCouponForSecret === coupon2Code) {
                couponType = `${DISCOUNT_PERCENTAGE_2 * 100}% off, cart over $50`
            }

            return (
                <span>
                    To reveal the secret password, add "<span className="font-bold">{product1.title}</span>" and "<span className="font-bold">{product2.title}</span>" to your cart. Apply coupon code "<span className="font-bold">{targetCouponForSecret}</span>" ({couponType}). Fill checkout form with: Name: <span className="font-bold">"{HARDCODED_CHECKOUT.name}"</span>, Email: <span className="font-bold">"{HARDCODED_CHECKOUT.email}"</span>, Phone: <span className="font-bold">"{HARDCODED_CHECKOUT.phone}"</span>, Address: <span className="font-bold">"{HARDCODED_CHECKOUT.address}"</span> .
                </span>
            )
        }
        return <span>No specific product pair available for coupon use to reveal the secret password.</span>
    }, [
        targetProductsForSecret,
        targetCouponForSecret,
        coupon1Code,
        coupon2Code,
        DISCOUNT_PERCENTAGE_1,
        DISCOUNT_PERCENTAGE_2,
        HARDCODED_CHECKOUT,
    ])

    const isInCart = (productId: number) => cart.some((item) => item.id === productId)

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            <aside
                className={`fixed inset-y-0 left-0 z-20 bg-white text-gray-800 p-6 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"
                    }`}
            >
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 md:hidden"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <div className="flex items-center mb-8">
                    <span className="text-2xl font-bold">{isSidebarOpen ? "E-Shop" : "ES"}</span>
                </div>
                <nav className="flex-1">
                    <ul>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveView("dashboard")}
                                className={`flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-200 transition-colors ${activeView === "dashboard" ? "bg-gray-200" : ""
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                {isSidebarOpen && "Dashboard"}
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveView("coupons")}
                                className={`flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-200 transition-colors ${activeView === "coupons" ? "bg-gray-200" : ""
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                {isSidebarOpen && "Coupons"}
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main
                className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-20"}`}
            >
                <header className="bg-white shadow-sm p-4 flex items-center justify-between border-b border-gray-200">
                    <div className="md:hidden mr-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={() => setActiveView("dashboard")}
                        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Go to dashboard"
                    >
                        <Home className="h-6 w-6 text-gray-600" />
                    </button>
                    <div className="flex-1 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="ml-4">
                        <button
                            onClick={() => setActiveView("coupons")}
                            className="relative p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label="View cart"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {cart.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </header>
                <div className="w-full flex justify-between items-center bg-yellow-100 border-b border-yellow-300 py-2 px-4">
                    <div className="text-yellow-800 text-sm flex-1 overflow-x-auto whitespace-normal">
                        {instructionMessage}
                    </div>

                    {activeView === "dashboard" && (
                        <button
                            onClick={resetTask}
                            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors shrink-0"
                        >
                            New Task
                        </button>
                    )}
                </div>
                <div className="flex-1 p-6 overflow-auto">
                    {activeView === "dashboard" && (
                        <section className="dashboard-section">
                            <h2 className="text-3xl font-bold mb-6">Products</h2>
                            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filterDiscountEligible}
                                        onChange={(e) => setFilterDiscountEligible(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-2 text-lg">Show #discount-eligible</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as "none" | "lowToHigh" | "highToLow")}
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                    >
                                        <option value="none">Sort by</option>
                                        <option value="lowToHigh">Price: Low to High</option>
                                        <option value="highToLow">Price: High to Low</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredAndSortedProducts.length > 0 ? (
                                    filteredAndSortedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <img
                                                src={product.thumbnail || "/placeholder.svg"}
                                                alt={product.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-xl font-semibold mb-2 truncate">{product.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                                                    {product.isDiscountEligible && (
                                                        <span className="bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                            #discount-eligible
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (isInCart(product.id)) {
                                                            handleRemoveFromCart(product.id)
                                                        } else {
                                                            handleAddToCart(product)
                                                        }
                                                    }}
                                                    className={`w-full py-2 rounded-md transition-colors duration-200
                                                        ${addToCartStatus[product.id] === "adding"
                                                            ? "bg-gray-400 text-white cursor-wait"
                                                            : isInCart(product.id)
                                                            ? "bg-red-500 text-white hover:bg-red-600"
                                                            : "bg-blue-500 text-white hover:bg-blue-600"}
                                                    `}
                                                    disabled={addToCartStatus[product.id] === "adding"}
                                                >
                                                    {addToCartStatus[product.id] === "adding"
                                                        ? (isInCart(product.id) ? "Removing..." : "Adding...")
                                                        : isInCart(product.id)
                                                        ? "Remove from Cart"
                                                        : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600 col-span-full">No products found matching your criteria.</p>
                                )}
                            </div>
                        </section>
                    )}
                    {activeView === "coupons" && (
                        <section className="coupons-section">
                            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                {cart.length === 0 ? (
                                    <p className="text-gray-600">Your cart is empty. Add some products from the Dashboard!</p>
                                ) : (
                                    <>
                                        <ul className="mb-4">
                                            {cart.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            src={item.thumbnail || "/placeholder.svg"}
                                                            alt={item.title}
                                                            className="w-12 h-12 object-cover rounded-md mr-4"
                                                        />
                                                        <div>
                                                            <span className="font-medium">{item.title}</span>
                                                            <span className="text-sm text-gray-500 block">
                                                                ${item.price.toFixed(2)} x {item.quantity}
                                                                {item.isDiscountEligible && " (#discount-eligible)"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-semibold mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                                                        <button
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                            aria-label={`Remove ${item.title} from cart`}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm-1 3a1 1 0 100 2h8a1 1 0 100-2H6z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-200">
                                            <span>Subtotal:</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <button
                                            onClick={() => setActiveView("checkout")}
                                            disabled={cart.length === 0}
                                            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-4">Available Coupons</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 className="font-bold text-lg text-blue-800 mb-2">{coupon1Code}</h4>
                                        <p className="text-blue-700 text-sm">Get {DISCOUNT_PERCENTAGE_1 * 100}% off your order!</p>
                                        <ul className="list-disc list-inside text-blue-700 text-sm mt-2">
                                            <li>Requires 2+ #discount-eligible products in cart.</li>
                                            <li>Cart total must be over $20.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <h4 className="font-bold text-lg text-purple-800 mb-2">{coupon2Code}</h4>
                                        <p className="text-purple-700 text-sm">Get {DISCOUNT_PERCENTAGE_2 * 100}% off your order!</p>
                                        <ul className="list-disc list-inside text-purple-700 text-sm mt-2">
                                            <li>Requires 2+ #discount-eligible products in cart.</li>
                                            <li>Cart total must be over $50.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {activeView === "checkout" && (
                        <section className="checkout-section">
                            <h2 className="text-3xl font-bold mb-6">Complete Your Purchase</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
                                <ul className="mb-4">
                                    {cart.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={item.thumbnail || "/placeholder.svg"}
                                                    alt={item.title}
                                                    className="w-10 h-10 object-cover rounded-md mr-3"
                                                />
                                                <div>
                                                    <span className="font-medium">{item.title}</span>
                                                    <span className="text-sm text-gray-500 block">
                                                        ${item.price.toFixed(2)} x {item.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-200">
                                    <span>Subtotal:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-xl font-bold text-green-600 mt-2">
                                        <span>
                                            Discount ({appliedCoupon} -{" "}
                                            {appliedCoupon === coupon1Code ? DISCOUNT_PERCENTAGE_1 * 100 : DISCOUNT_PERCENTAGE_2 * 100}
                                            %):
                                        </span>
                                        <span>-${(cartTotal - getDiscountedTotal()).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-2xl font-bold mt-4 pt-4 border-t-2 border-gray-300">
                                    <span>Total:</span>
                                    <span>${getDiscountedTotal().toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                <h3 className="text-2xl font-semibold mb-4">Apply Coupon</h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder={`Enter coupon code (e.g., ${coupon1Code})`}
                                        value={couponCodeInput}
                                        onChange={(e) => setCouponCodeInput(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                                {appliedCoupon && (
                                    <p className="mt-2 text-green-600">
                                        Coupon "{appliedCoupon}" applied. Status: {isCouponValid() ? "Valid" : "Invalid"}
                                    </p>
                                )}
                                {checkoutError && !appliedCoupon && <p className="mt-2 text-red-500">{checkoutError}</p>}
                            </div>
                            {/* Checkout Form */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
                                <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={checkoutForm.name}
                                            onChange={(e) =>
                                                setCheckoutForm({
                                                    ...checkoutForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={checkoutForm.email}
                                            onChange={(e) =>
                                                setCheckoutForm({
                                                    ...checkoutForm,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={checkoutForm.phone}
                                            onChange={(e) =>
                                                setCheckoutForm({
                                                    ...checkoutForm,
                                                    phone: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            value={checkoutForm.address}
                                            onChange={(e) =>
                                                setCheckoutForm({
                                                    ...checkoutForm,
                                                    address: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                                        >
                                            Complete Purchase
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveView("coupons")}
                                            className="w-full bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition-colors duration-200 text-lg font-semibold"
                                        >
                                            Back to Cart
                                        </button>
                                    </div>
                                </form>
                                {checkoutError && <p className="mt-4 text-red-500 text-center">{checkoutError}</p>}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-900/10 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h3>
                        {secretPassword && secretPassword !== "NO_COUPON_APPLIED" ? (
                            <>
                                <p className="text-lg text-gray-700 mb-2">A special coupon was applied!</p>
                                <p className="text-lg text-gray-700 mb-6">
                                    Your secret password is: <span className="font-bold text-blue-600">{secretPassword}</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg text-gray-700 mb-6">No special coupon applied this time.</p>
                                <button
                                    onClick={closeModal}
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                                >
                                    Back to Home
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
            {showAddToCartTooltip && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
                    <p className="font-semibold">{tooltipProductName} added to cart successfully!</p>
                </div>
            )}
        </div>
    )
}