//@ts-check
import Phaser from "phaser";
import { TILE_SIZE } from "../constants";

const PLAYER_ANIMS = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
	cheer: "cheer",
	fall: "fall",
};

export class Player {
	/**
	 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
	 * @param {Phaser.Scene} scene
	 */
	constructor(sprite, scene) {
		this.sprite = sprite;

		this.jumpNoise = scene.sound.add("jump-noise", {
			volume: 0.5,
		});

		/** @type {object} */
		this.cursors = scene?.input?.keyboard?.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.A,
			leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
			upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
			up: Phaser.Input.Keyboard.KeyCodes.W,
		});

		this.sprite
			.setCollideWorldBounds(true)
			.setBounce(0.2)
			.setSize(TILE_SIZE * 2, TILE_SIZE * 4.5)
			.setScale(0.5)
			.setOffset(TILE_SIZE * 1.7, TILE_SIZE * 2.6);

		this.createAnimations();
	}

	createAnimations() {
		// single frame
		this.sprite.anims.create({
			key: PLAYER_ANIMS.idle,
			frames: [{ key: "robot", frame: "character_robot_idle.png" }],
		});

		this.sprite.anims.create({
			key: PLAYER_ANIMS.fall,
			frames: [{ key: "robot", frame: "character_robot_fall.png" }],
		});

		this.sprite.anims.create({
			key: PLAYER_ANIMS.jump,
			frames: [{ key: "robot", frame: "character_robot_jump.png" }],
		});

		// multiple frames
		this.sprite.anims.create({
			key: PLAYER_ANIMS.run,
			frames: this.sprite.anims.generateFrameNames("robot", {
				start: 0,
				end: 2,
				prefix: "character_robot_run",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});

		this.sprite.anims.create({
			key: PLAYER_ANIMS.walk,
			frames: this.sprite.anims.generateFrameNames("robot", {
				start: 0,
				end: 7,
				prefix: "character_robot_walk",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});
		this.sprite.anims.create({
			key: PLAYER_ANIMS.cheer,
			frames: this.sprite.anims.generateFrameNames("robot", {
				start: 0,
				end: 1,
				prefix: "character_robot_cheer",
				suffix: ".png",
			}),
			frameRate: 5, // frames per second
			repeat: -1, // infinite repeat
		});

		this.sprite.play(PLAYER_ANIMS.run);
	}

	update() {
		if (this.cursors.left.isDown || this.cursors.leftArrow.isDown) {
			this.sprite.setVelocityX(-150);
		} else if (this.cursors.right.isDown || this.cursors.rightArrow.isDown) {
			this.sprite.setVelocityX(150);
		} else {
			this.sprite.setVelocityX(0);
		}

		if (
			(this.cursors.up.isDown ||
				this.cursors.upArrow.isDown ||
				this.cursors.jump.isDown) &&
			this.sprite.body.onFloor()
		) {
			this.jumpNoise.play();
			this.sprite.setVelocityY(-300);
		}

		let { x, y } = this.sprite.body.velocity;

		this.sprite.flipX = x < 0;

		if (this.sprite.body.onFloor()) {
			if (x === 0) {
				this.sprite.play(PLAYER_ANIMS.idle);
			} else {
				this.sprite.play(PLAYER_ANIMS.run, true);
			}
		} else {
			if (y < 0) {
				this.sprite.play(PLAYER_ANIMS.jump, true);
			} else {
				this.sprite.play(PLAYER_ANIMS.fall, true);
			}
		}
	}
}
