//@ts-check
import "./style.css";
import Phaser from "phaser";
import { MainScene } from "./scenes/main";
import { UiScene } from "./scenes/ui";
import { restartButton, restartDialog } from "./constants";

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.WEBGL,
	width: window.innerWidth,
	height: window.innerHeight,
	scene: [MainScene, UiScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			//debug: true,
		},
	},
};

const game = new Phaser.Game(config);

restartButton.addEventListener("click", () => {
	game.scene.start("main-scene");
	restartDialog.close();
});
