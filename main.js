import "./style.css";
import Phaser from "phaser";

const PLAYER_ANIMS = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
};

class MainScene extends Phaser.Scene {
	constructor() {
		super("main-scene");
	}

	preload() {
		this.load.atlas("robot", "robot.png", "robot.json");
	}

	create() {
		// const height = this.scale.height;
		// const width = this.scale.width;

		// object destructuring
		const { height, width } = this.scale;

		let player = this.add.sprite(
			width / 2,
			height / 2,
			"robot",
			"character_robot_idle.png"
		);

		// single frame
		player.anims.create({
			key: PLAYER_ANIMS.idle,
			frames: [{ key: "robot", frame: "character_robot_idle.png" }],
		});

		player.anims.create({
			key: PLAYER_ANIMS.jump,
			frames: [{ key: "robot", frame: "character_robot_jump.png" }],
		});

		// multiple frames
		player.anims.create({
			key: PLAYER_ANIMS.run,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 2,
				prefix: "character_robot_run",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});

		player.anims.create({
			key: PLAYER_ANIMS.walk,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 7,
				prefix: "character_robot_walk",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});

		player.play(PLAYER_ANIMS.jump);
	}

	update() {}
}

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.WEBGL,
	width: 400,
	height: 400,
	scene: [MainScene],
};

const game = new Phaser.Game(config);
