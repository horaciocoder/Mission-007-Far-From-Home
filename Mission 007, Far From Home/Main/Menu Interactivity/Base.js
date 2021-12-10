const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
var engine = Engine.create(), world = engine.world;
var update = setInterval(()=> {
    Engine.update(engine);
}, 35);
class BaseClassModule {
    constructor(x, y, width, height, properties, type, img) {
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, width, height, properties);
        this.type = type;
        this.img = img;
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        if (this.type === "Rect" || this.type === "rect" || this.type === "RECT") {
            rectMode(CENTER);
            rect(pos.x, pos.y, this.width, this.height);
        }
        else if (this.type === "Image" || this.type === "image" || this.type === "IMAGE") {
            imageMode(CENTER);
            image(this.img, pos.x, pos.y, this.width, this.height);
        }
    }
}