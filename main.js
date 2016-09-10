// main code of the application

let PIXI = require('./pixi.min');

let renderer = PIXI.autoDetectRenderer(512, 512);
let resources = PIXI.loader.resources;
let interactionManager = new PIXI.interaction.InteractionManager(renderer);

renderer.backgroundColor = 0x000000;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();
let tweetBoxArray = [];

function addTweet(userName, content)
{
    let boxWidth = renderer.view.width - 20;

    let nameStyle =
    {
        fontFamily : 'Arial',
        fontSize : 24,
        fill : 0xff1010,
        align : 'left',
        wordWrap : true,
        wordWrapWidth : boxWidth
    };

    let contentStyle =
    {
        fontFamily : 'Arial',
        fontSize : 14,
        fill : 0xff1010,
        align : 'left',
        wordWrap : true,
        wordWrapWidth : boxWidth
    };

    let tweetBox =
    {
        userNameSprite : new PIXI.Text(userName, nameStyle),
        contentSprite : new PIXI.Text(content, contentStyle),
        box : new PIXI.Graphics
    };

    userNameSprite = tweetBox.userNameSprite;
    userNameSprite.x = 10;
    userNameSprite.y = 10;
    contentSprite = tweetBox.contentSprite;
    contentSprite.x = 10;
    contentSprite.y = 10 + userNameSprite.height + 10;

    let boxHeight = 10 + userNameSprite.height + 10 + contentSprite.height + 10;
    tweetBox.box.beginFill(0xffffff);
    tweetBox.box.drawRoundedRect(0, 0, boxWidth, boxHeight, 5);
    tweetBox.box.endFill();

    tweetBox.box.addChild(userNameSprite);
    tweetBox.box.addChild(contentSprite);

    tweetBox.box.x = 10;
    tweetBox.box.y = 0;

    stage.addChild(tweetBox.box);
    tweetBoxArray.push(tweetBox)
    updateBoxesHeights();
    return tweetBox;
}

function updateBoxesHeights()
{
    let y = 10;

    for (tweetBox of tweetBoxArray)
    {
        tweetBox.box.y = y;
        y += tweetBox.box.height + 15;
    }
}

function mouseDownCallback(event)
{
    removeBoxAtPos(event.data.global.x, event.data.global.y);
    updateBoxesHeights();
    renderer.render(stage);
}

function removeBoxAtPos(x, y)
{
    for (let i = 0; i < tweetBoxArray.length; i++)
    {
        if (tweetBoxArray[i].box.getBounds().contains(x, y))
        {
            tweetBoxArray[i].box.destroy(true);
            tweetBoxArray.splice(i, 1);
            return;
        }
    }
}

addTweet("Olivier", "Busy coding an awesome node.js utility!");
addTweet("Olivier", "Still coding an awesome node.js utility! Look, this "
    + "message fits on multiple lines!");
addTweet("NewUSer", "Du texte");
addTweet("Coder", "Node.js ftw");

interactionManager.on("mousedown", mouseDownCallback);

renderer.render(stage);
