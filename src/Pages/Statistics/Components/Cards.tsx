import { useEffect, useState } from "react";
import Card from "./Card";
import { Grid } from "@mantine/core";
import { collection, getAggregateFromServer, query, sum, where } from "firebase/firestore";
import { db } from "../../../Firebase-config";

import Trend from "../../../Images/Trend.json";
import Cart from "../../../Images/Cart.json";
import Money from "../../../Images/Money.json";
import { useProductsStore } from "../../../Store";

export default function Cards() {
    const [todaySales, setTodaySales] = useState(0);
    const [todayProfit, setTodayProfit] = useState(0);
    const [todaySoldProducts, setTodaySoldProducts] = useState(0);

    const today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    useEffect(() => {
        async function getData() {
            const coll = collection(db, "Sales");
            const q = query(coll, where("timeStamp", "==", dateString));
            const snapshot = await getAggregateFromServer(q, {
                todaySales: sum("totalPrice"),
                todayProfit: sum("totalProfit"),
                todaySoldProducts: sum("totalQuantity"),
            });
            setTodaySales(snapshot.data().todaySales);
            setTodayProfit(snapshot.data().todayProfit);
            setTodaySoldProducts(snapshot.data().todaySoldProducts);
        }
        getData();
    });

    const capital = useProductsStore((e: any) =>
        e.products.reduce(
            (sum: number, product: { price: number; quantity: number }) =>
                sum + product.price * product.quantity,
            0
        )
    );

    const cards = [
        {
            logo: Money,
            title: "رأس المال",
            number: capital,
        },
        {
            logo: Trend,
            title: "مبيعات اليوم",
            number: todaySales,
            badge: "11%",
        },
        {
            logo: Money,
            title: "أرباح اليوم",
            number: todayProfit,
            badge: "11%",
        },
        {
            logo: Cart,
            title: "المنتجات المباعة",
            number: todaySoldProducts,
            badge: "11%",
        },
    ];

    return (
        <>
            {cards.map((card) => (
                <Grid.Col key={card.title} span={{ xs: 12, sm: 6, lg: 3 }}>
                    <Card
                        logo={card.logo}
                        title={card.title}
                        number={card.number}
                        // badge={card.badge}
                    />
                </Grid.Col>
            ))}
        </>
    );
}
