<script>

export default {
  name: 'WeatherDashboard',
  layout: 'default',
  data() {
    return {
      Phaser: null
    }
  },
  mounted(){
    if ( window.innerWidth < 960 ) return
    const Phaser = require('phaser')
    this.Phaser = Phaser
    let config = {
      type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
            arcade: {
              gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
          preload: preload,
            create: create,
            update: update
        }
    }

    let platforms, player, cursors, stars, bombs, scoreText
    let score = 0
    let gameOver = false

    let game = new Phaser.Game(config)

    function preload() {
      this.load.image('sky', '/sky.png')
      this.load.image('ground', '/platform.png')
      this.load.image('star', '/star.png')
      this.load.image('bomb', '/bomb.png')
      this.load.spritesheet('dude', 
          '/dude.png',
          { frameWidth: 32, frameHeight: 48 }
      )      
    }

    function create() {
      this.add.image(400, 300, 'sky')

      platforms = this.physics.add.staticGroup()

      platforms.create(400, 568, 'ground').setScale(2).refreshBody()

      platforms.create(600, 400, 'ground')
      platforms.create(50, 250, 'ground')
      platforms.create(750, 220, 'ground')

      player = this.physics.add.sprite(100, 450, 'dude')

      player.setBounce(0.2)
      player.setCollideWorldBounds(true)

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      })

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      })

      cursors = this.input.keyboard.createCursorKeys()

      stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      })

      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
      })

      bombs = this.physics.add.group()

      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

      this.physics.add.collider(player, platforms)
      this.physics.add.collider(stars, platforms)
      this.physics.add.collider(bombs, platforms)

      this.physics.add.overlap(player, stars, collectStar, null, this)
      this.physics.add.collider(player, bombs, hitBomb, null, this)
    }

    function update() {
      if (gameOver) {
        return
      }
      if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)
      }
      else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)
      }
      else {
        player.setVelocityX(0)
        player.anims.play('turn')
      }

      if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330)
      }      
    }

    function collectStar(player, star) {
      star.disableBody(true, true)
      score += 10
      scoreText.setText('Score: ' + score)
      if (stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true)
        })

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

        let bomb = bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        bomb.allowGravity = false
      }        
    }

    function hitBomb (player, bomb) {
      this.physics.pause()
      player.setTint(0xff0000)
      player.anims.play('turn')
      gameOver = true
    }

  }
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="white--text text-center" style="z-index: 7">
      <h1>Phaser Game</h1>
    </v-col>
    <v-col cols="12" style="height: 700px">
      <client-only>
        <h2 v-if="$vuetify.breakpoint.smAndDown" class="white--text text-center pt-10" style="z-index: 11">This game is only available in desktop win a min screen width of 960px </h2>
      </client-only>
    </v-col>
  </v-row>
</template>

<style lang="scss">
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    margin: 125px auto 0;
    width: 800px;
    right: 0;
    z-index: 10;    
  }
</style>