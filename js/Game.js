class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    lambo = createSprite(100,200)
    lambo.addImage("blah",c1);

    ferrari = createSprite(300,200)
    ferrari.addImage("blah blah",c2)

    Tesla = createSprite(500,200)
    Tesla.addImage("blah blah black", c3)

    BMW = createSprite(700,200)
    BMW.addImage("blah blah black sheep", c4)

    volks = [lambo,ferrari,Tesla,BMW]

  }

  play(){
    
    form.hide();
  
    
    Player.getPlayerInfo();
    player.getRank();

    if(allPlayers !== undefined){
      //background(ground);
      image(track,0,-displayHeight * 4,displayWidth, displayHeight * 5)
      
      var index = 0;
      // x and y of cars
      var x = 250;
      var y;
      //console.log(x)
      for(var plr in allPlayers){
        // positioning the cars away from each other
        x = x+200;
        y = displayHeight-allPlayers[plr].distance
        volks[index].x = x
        volks[index].y = y


        if(index + 1 === player.index ){
          volks[index].shapeColor = "yellow"
          var pos = camera.position

          pos.x = displayWidth/2
          pos.y = volks[index].y

          fill("red")
          stroke(10)
          circle(x,y,60)
          
        }
        index = index + 1;
      }
    }

    if(player.distance > 4100){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateRank(player.rank);
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();

  }

  end(){
    console.log(player.distance)
   // game.update(2);
   
  }
}
