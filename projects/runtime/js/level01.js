var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 650, "y": groundY},
                { "type": "sawblade", "x": 900, "y": groundY},
                { "type": "sawblade", "x": 1200, "y": groundY},
                { "type": "boulder", "x": 400},
                { "type": "boulder", "x": 900},
                { "type": "boulder", "x": 1200},
                { "type": "greenSlime", "x": 2000, "y": 250},
                { "type": "greenSlime", "x": 400, "y": groundY - 10},
                { "type": "greenSlime", "x": 800, "y": groundY - 100},
                { "type": "greenSlime", "x": 1200, "y": groundY - 50},
                { "type": "oil", "x": 500, "y": groundY - 30},
                { "type": "oil", "x": 1000, "y": groundY - 30},
                { "type": "oil", "x": 1500, "y": groundY - 30},
            ]
        };

        // for(var i = 0; i < levelData.gameItems.length; i++) {
        //     if(levelData.gameItems[i].type === "sawblade") {
        //         createSawBlade(levelData.gameItems.x);
        //     };
        //     if(levelData.gameItems[i].type === "boulder") {
        //         createBoulder(levelData.gameItems.x);
        //     };
        //     if(levelData.gameItems[i].type === "greenSlime") {
        //         createEnemy(levelData.gameItems.x, levelData.gameItems.y);
        //     };
        //     if(levelData.gameItems[i].type === "oil") {
        //         createEnemy(levelData.gameItems.x, levelData.gameItems.y);
        //     };
        // }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        

        function createSawBlade(PositionX) {
            var hitZoneSize = 15;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = PositionX;
            sawBladeHitZone.y = groundY - 2; // needs to stay at this y position because it is a ground button obstacle
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/Red_Pressure_Plate.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -12;
            obstacleImage.y = -5;
        }

        createSawBlade(650);
        createSawBlade(900);
        createSawBlade(1200);
        
        function createBoulder(PositionX) {
            var boulderHitZoneSize = 20;
            var boulderDamageFromObstacle = 20;
            var boulderHitZone = game.createObstacle(boulderHitZoneSize, boulderDamageFromObstacle);
            boulderHitZone.x = PositionX;
            boulderHitZone.y = groundY - 20; // needs to stay at this y position because it is a ground boulder obstacle
            game.addGameItem(boulderHitZone);
            var boudlerImage = draw.bitmap("img/Boulder.png");
            boulderHitZone.addChild(boudlerImage);
            boudlerImage.x = -20;
            boudlerImage.y = -20;
        }

        createBoulder(400);
        createBoulder(1000);
        createBoulder(1500);

        function createEnemy(x,y) {
            var enemy = game.createGameItem("enemy", 25);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            var greenSlime = draw.bitmap("img/Green_Slime.png");
            enemy.addChild(greenSlime);
            greenSlime.x = -21.5;
            greenSlime.y = -20;
            enemy.velocityX = -2.5;
            enemy.velocityY = .20;
            enemy.rotationalVelocity = 1;
            enemy.onPlayerCollision = function playerColossion() {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function enemyCollision() {
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        createEnemy(2000, 250);
        createEnemy(400, groundY - 10);
        createEnemy(800, groundY - 100);
        createEnemy(1200, groundY - 50);

        function createReward(x,y) {
            var reward = game.createGameItem("reward", 25);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -2.5;
            game.addGameItem(reward);
            var oilImage = draw.bitmap("img/Oil.png");
            reward.addChild(oilImage);
            oilImage.x = -21.5;
            oilImage.y = -20;
            reward.onPlayerCollision = function rewardCollision() {
                game.increaseScore(70);
                hud.setIntegrity(100);
                reward.fadeOut();
            };
        }
        createReward(500, groundY - 30);
        createReward(1000, groundY - 30);
        createReward(1500, groundY - 30);


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
