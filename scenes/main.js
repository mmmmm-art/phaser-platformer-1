//@ts-check
import Phaser from "phaser";
import { TileMap } from "../tilemap";
import {
	WIDTH,
	HEIGHT,
	TILE_SIZE,
	events,
	COIN_COLLECTED_EVENT,
	scoreSpan,
	restartDialog,
} from "../constants";
import { CoinsGroup } from "../entities/coins";
import { EnemiesGroup } from "../entities/enemies";
import { Player } from "../entities/player";
restartDialog.showModal();
export class MainScene extends Phaser.Scene {
	constructor() {
		super("main-scene");

		/** @type {TileMap} */ //@ts-ignore setup in create()
		this.map;
		/** @type {Player} */ //@ts-ignore setup in create()
		this.player;
		/** @type {CoinsGroup} */ //@ts-ignore setup in create()
		this.coins;
		/** @type {EnemiesGroup} */ //@ts-ignore setup in create()
		this.enemies;

		this.coinNoise;
		this.music;

		this.score = 0;
	}

	init() {
		this.scene.launch("ui-scene");
		this.score = 0;
	}

	preload() {
		this.load.atlas("robot", "robot.png", "robot.json");

		this.load.image("marble", "tilesets/marble.png");
		this.load.image("rock", "tilesets/rock.png");
		this.load.image("sand", "tilesets/sand.png");
		this.load.image("stone", "tilesets/stone.png");

		this.load.tilemapTiledJSON("map", "tilesets/map.json");

		this.load.image("coin", "coin.png");
		this.load.image("enemy", "spikeBall.png");

		this.load.audio("coin-noise", "coin.mp3");
		this.load.audio("jump-noise", "jump.wav");
		this.load.audio("music", "background-music.mp3");
	}

	create() {
		this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
		this.map = new TileMap(this.make.tilemap({ key: "map" }));

		this.coins = new CoinsGroup(
			this.physics.add.group({
				key: "coin",
				quantity: 12,
				setXY: { x: TILE_SIZE * 4, y: 0, stepX: WIDTH / 11 },
				setScale: { x: 0.25, y: 0.25 },
			})
		);

		this.player = new Player(
			this.physics.add.sprite(
				this.map.playerSpawn.x,
				this.map.playerSpawn.y,
				"robot",
				"character_robot_idle.png"
			),
			this
		);

		this.enemies = new EnemiesGroup(
			this.physics.add.group(),
			this.map.enemySpawnPoints
		);

		this.setupAudio();
		this.setupCamera();
		this.setupCollisions();
	}

	setupAudio() {
		this.coinNoise = this.sound.add("coin-noise");
		this.music = this.sound.add("music", {
			loop: true,
			volume: 0.5,
		});
		//this.music.play();
	}

	setupCollisions() {
		this.physics.add.collider(this.coins.group, this.map.platforms);
		this.physics.add.collider(this.coins.group, this.coins.group);
		this.physics.add.collider(this.player.sprite, this.map.platforms);
		this.physics.add.collider(this.enemies.group, this.map.platforms);
		this.physics.add.collider(this.enemies.group, this.enemies.group);
		this.physics.add.collider(this.enemies.group, this.coins.group);

		this.physics.add.overlap(
			this.player.sprite,
			this.coins.group,
			this.collectCoin,
			undefined,
			this
		);

		this.physics.add.overlap(
			this.player.sprite,
			this.enemies.group,
			this.hitPlayer,
			undefined,
			this
		);
	}

	setupCamera() {
		this.cameras.main.setBounds(0, 0, WIDTH, HEIGHT);
		this.cameras.main.startFollow(this.player.sprite);
		this.cameras.main.zoom = 1.5;
	}

	update() {
		this.player?.update();
	}

	collectCoin(player, coin) {
		this.score++;
		events.emit(COIN_COLLECTED_EVENT, this.score);

		scoreSpan.innerText = this.score.toString();

		coin.disableBody(true, true);
		this.coinNoise?.play();

		// debugger;
		this.enemies?.spawn();
	}

	hitPlayer(player, enemy) {
		this.physics.pause();
		this.player?.sprite.setTint(0x0000bb); // light blue death color for Hawkin

		restartDialog.showModal();
	}
}
