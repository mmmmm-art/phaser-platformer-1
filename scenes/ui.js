//@ts-check
import Phaser from "phaser";
import { events, COIN_COLLECTED_EVENT } from "../constants";

export class UiScene extends Phaser.Scene {
	constructor() {
		super("ui-scene");

		this.scoreText;
	}

	preload() {
		this.load.image("coin-ui", "coin.png");
	}

	create() {
		let coin = this.add.image(32, 32, "coin");
		coin.setScale(0.5);

		this.scoreText = this.add.text(55, 10, "0", {
			color: "#000",
			fontSize: 40,
			fontFamily: "fantasy, arial, sans-serif",
		});

		events.addListener(COIN_COLLECTED_EVENT, this.handleCoinCollected, this);
	}

	handleCoinCollected(score) {
		//@ts-ignore not undefined
		this.scoreText.setText(score);
	}
}
