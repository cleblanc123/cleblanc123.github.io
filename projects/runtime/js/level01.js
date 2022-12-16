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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
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


        var enemy = game.createGameItem("enemy", 25);
        enemy.x = 1000;
        enemy.y = groundY - 10;
        game.addGameItem(enemy);
        var greenSlime = draw.bitmap("img/Green_Slime.png");
        enemy.addChild(greenSlime);
        greenSlime.x = -21.5;
        greenSlime.y = -20;
        enemy.velocityX = -1;
        enemy.velocityY = -1;
        if(enemy.y >= groundY + 10) {
            enemy.velocityY = enemy.velocityY * -1;
        }else if (enemy.y <= -15) {
            enemy.velocityY = enemy.velocityY * -1;
        }
        



        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
