//@ts-check
import { HEIGHT, WIDTH } from "./constants";

export class TileMap {
	constructor(map) {
		this.map = map;
		this.platforms;

		this.playerSpawn = {
			x: WIDTH / 2,
			y: HEIGHT / 2,
		};

		this.enemySpawnPoints = [];
		this.setupMap();
	}

	setupMap() {
		// object layer from Tiled
		const objectLayer = this.map.getObjectLayer("Objects");
		objectLayer.objects.forEach((o) => {
			const { x = 0, y = 0, name, width = 0, height = 0 } = o;
			switch (name) {
				case "player-spawn":
					this.playerSpawn.x = x + width / 2;
					this.playerSpawn.y = y + height / 2;
					break;
				case "enemy-spawn":
					this.enemySpawnPoints.push({
						x: x + width / 2,
						y: y + height / 2,
					});
					break;
			}
		});

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

		/* @type {Phaser.Tilemaps.TilemapLayer} */
		this.platforms = this.map.createLayer(
			"Platforms",
			[marbleTiles, rockTiles, sandTiles, stoneTiles],
			0,
			0
		);
		this.platforms.setCollisionByProperty({ collides: true });
	}
}
