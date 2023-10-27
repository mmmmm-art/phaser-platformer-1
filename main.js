import "./style.css";
import Phaser from "phaser";

/** @type {Phaser.Core.Config} */
const config = {
	type: Phaser.WEBGL,
	width: 400,
	height: 400,
};

const game = new Phaser.Game(config);
