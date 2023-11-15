import "./style.css";
import Phaser from "phaser";

const TILE_SIZE = 18;

const PLAYER_ANIMS = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
	cheer: "cheer",
	fall: "fall",
};

class MainScene extends Phaser.Scene {
	constructor() {
		super("main-scene");

		this.player;
		this.map;
		this.cursors;
	}

	preload() {
		this.load.atlas("robot", "robot.png", "robot.json");

		this.load.image("marble", "tilesets/marble.png");
		this.load.image("rock", "tilesets/rock.png");
		this.load.image("sand", "tilesets/sand.png");
		this.load.image("stone", "tilesets/stone.png");

		this.load.tilemapTiledJSON("map", "tilesets/map.json");
	}

	create() {
		// object destructuring
		const { height, width } = this.scale;

		this.map = this.make.tilemap({ key: "map" });

		const marbleTiles = this.map.addTilesetImage("marble", "marble");
		const rockTiles = this.map.addTilesetImage("rock", "rock");
		const sandTiles = this.map.addTilesetImage("sand", "sand");
		const stoneTiles = this.map.addTilesetImage("stone", "stone");

		this.map.createLayer(
			"Background",
			[marbleTiles, rockTiles, sandTiles, stoneTiles],
			0,
			0
		);

		const platformLayer = this.map.createLayer(
			"Platforms",
			[marbleTiles, rockTiles, sandTiles, stoneTiles],
			0,
			0
		);

		this.player = this.physics.add.sprite(
			width / 2,
			height / 2,
			"robot",
			"character_robot_idle.png"
		);

		this.player.setCollideWorldBounds(true);
		this.player.setBounce(0.5);

		// single frame
		this.player.anims.create({
			key: PLAYER_ANIMS.idle,
			frames: [{ key: "robot", frame: "character_robot_idle.png" }],
		});

		this.player.anims.create({
			key: PLAYER_ANIMS.fall,
			frames: [{ key: "robot", frame: "character_robot_fall.png" }],
		});

		this.player.anims.create({
			key: PLAYER_ANIMS.jump,
			frames: [{ key: "robot", frame: "character_robot_jump.png" }],
		});

		// multiple frames
		this.player.anims.create({
			key: PLAYER_ANIMS.run,
			frames: this.player.anims.generateFrameNames("robot", {
				start: 0,
				end: 2,
				prefix: "character_robot_run",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});

		this.player.anims.create({
			key: PLAYER_ANIMS.walk,
			frames: this.player.anims.generateFrameNames("robot", {
				start: 0,
				end: 7,
				prefix: "character_robot_walk",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});
		this.player.anims.create({
			key: PLAYER_ANIMS.cheer,
			frames: this.player.anims.generateFrameNames("robot", {
				start: 0,
				end: 1,
				prefix: "character_robot_cheer",
				suffix: ".png",
			}),
			frameRate: 5, // frames per second
			repeat: -1, // infinite repeat
		});

		this.player.play(PLAYER_ANIMS.run);

		this.cursors = this.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.A,
			leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
			upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
			up: Phaser.Input.Keyboard.KeyCodes.W,
		});
	}

	update() {
		if (this.cursors.left.isDown || this.cursors.leftArrow.isDown) {
			this.player.setVelocityX(-150);
		} else if (this.cursors.right.isDown || this.cursors.rightArrow.isDown) {
			this.player.setVelocityX(150);
		} else {
			this.player.setVelocityX(0);
		}

		if (
			(this.cursors.up.isDown ||
				this.cursors.upArrow.isDown ||
				this.cursors.jump.isDown) &&
			this.player.body.onFloor()
		) {
			this.player.setVelocityY(-300);
		}

		// let x = this.player.body.velocity.x;
		// let y = this.player.body.velocity.y;
		let { x, y } = this.player.body.velocity;

		this.player.flipX = x < 0;

		if (this.player.body.onFloor()) {
			if (x === 0) {
				this.player.play(PLAYER_ANIMS.idle);
			} else {
				this.player.play(PLAYER_ANIMS.run, true);
			}
		} else {
			if (y < 0) {
				this.player.play(PLAYER_ANIMS.jump, true);
			} else {
				this.player.play(PLAYER_ANIMS.fall, true);
			}
		}
	}
}

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.WEBGL,
	width: 44 * TILE_SIZE,
	height: 33 * TILE_SIZE,
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
		},
	},
};

const game = new Phaser.Game(config);
