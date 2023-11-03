import "./style.css";
import Phaser from "phaser";

const PLAYER_ANIMS = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
	cheer: "cheer",
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

		let player = this.physics.add.sprite(
			width / 2,
			height / 2,
			"robot",
			"character_robot_idle.png"
		);

		player.setCollideWorldBounds(true);
		player.setBounce(0.5);

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
		player.anims.create({
			key: PLAYER_ANIMS.cheer,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 1,
				prefix: "character_robot_cheer",
				suffix: ".png",
			}),
			frameRate: 5, // frames per second
			repeat: -1, // infinite repeat
		});

		player.play(PLAYER_ANIMS.run);
	}

	update() {}
}

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.WEBGL,
	width: 400,
	height: 400,
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
		},
	},
};

const game = new Phaser.Game(config);
