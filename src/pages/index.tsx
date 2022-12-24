import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

interface Upgrade {
	id: string;
	name: string;
	cost: number;
	costModiferFunction: () => void;
	upgradeFunction: () => void;
}

const Home: NextPage = () => {
	const [money, setMoney] = useState(0);
	const [moneyIncrement, setMoneyIncrement] = useState(1);

	const upgrades = [
		{
			id: "incrementUpgrade",
			name: "increment upgrade",
			cost: 10,
			costModiferFunction() {
				this.cost = this.cost + this.cost * 1.25;
				console.log(this.cost);
			},
			upgradeFunction() {
				this.costModiferFunction();
				setMoneyIncrement(moneyIncrement + 1);
			},
		},
		{
			id: "anotherIncrementUpgrade",
			name: "another increment upgrade",
			cost: 20,
			costModiferFunction() {
				console.log(this.cost);
			},
			upgradeFunction() {
				this.costModiferFunction();
				setMoneyIncrement(moneyIncrement + 2);
			},
		},
	];

	const handleClick = () => {
		setMoney(money + moneyIncrement);
	};

	const handleBuy = (upgradeId: Upgrade["id"]) => {
		for (let i = 0; i < upgrades.length; i++) {
			const upgrade = upgrades[i];
			if (upgrade !== undefined) {
				if (upgrade.id === upgradeId && money >= upgrade.cost) {
                    setMoney(money - upgrade.cost);
					upgrade.upgradeFunction();
                }
                } else {
                    console.log("upgrade is undefined");
			}
		}
	};

	return (
		<>
			<Head>
				<title>clicker game</title>
			</Head>

			<main className="container mx-auto flex min-h-screen justify-evenly p-4">
				<div>
					<p>money: {money}</p>
					<button onClick={handleClick}>click me</button>
				</div>
				<div>
					{upgrades.map((upgrade) => {
						return (
							<div
								className="flex items-center"
								key={upgrade.id}
							>
								<div className="flex flex-col">
									<p>{upgrade.name}</p>
									<p>cost: {upgrade.cost}</p>
								</div>
								<button
									className={"ml-auto px-4 py-2"}
									onClick={() => {
										handleBuy(upgrade.id);
									}}
								>
									buy
								</button>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default Home;
