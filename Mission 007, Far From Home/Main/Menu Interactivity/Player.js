class Player extends BaseClassModule {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, {'density' : 0.1, 'restitution' : 1.5, friction: 0.4}, "Image", img);
    }
    display() {
        super.display();
    }
}