import Card from "./Card";
import { Grid } from "@mantine/core";

import Trend from "../../../Images/Trend.json";
import Cart from "../../../Images/Cart.json";
import Money from "../../../Images/Money.json";

export default function Cards() {
    const cards = [
        {
            logo: Money,
            title: "رأس المال",
            number: 451234,
            // badge: "11%",
        },
        {
            logo: Trend,
            title: "مبيعات اليوم",
            number: 1304,
            badge: "11%",
        },
        {
            logo: Money,
            title: "أرباح اليوم",
            number: 42.5,
            badge: "11%",
        },
        {
            logo: Cart,
            title: "المنتجات المباعة",
            number: 42.5,
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
                        badge={card.badge}
                    />
                </Grid.Col>
            ))}
        </>
    );
}
